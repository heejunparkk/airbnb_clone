import { cookies } from 'next/headers';
import redis from './redis';
import crypto from 'crypto';

const SESSION_EXPIRY = 24 * 60 * 60; // 24시간을 상수로 정의

export async function createSession(userId: string) {
  try {
    const sessionId = crypto.randomUUID();
    await redis.set(`session:${sessionId}`, userId, 'EX', SESSION_EXPIRY);

    const cookieStore = await cookies();
    cookieStore.set('sessionId', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_EXPIRY,
      path: '/', // 경로 추가
    });

    return sessionId;
  } catch (error) {
    console.error('세션 생성 에러:', error);
    throw new Error('세션을 생성할 수 없습니다.');
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;
    if (!sessionId) return null;

    const userId = await redis.get(`session:${sessionId}`);
    return userId;
  } catch (error) {
    console.error('세션 조회 에러:', error);
    return null;
  }
}

export async function deleteSession() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get('sessionId')?.value;
    if (sessionId) {
      await redis.del(`session:${sessionId}`);
      cookieStore.delete('sessionId'); // 옵션 제거
    }
  } catch (error) {
    console.error('세션 삭제 에러:', error);
    throw new Error('세션을 삭제할 수 없습니다.');
  }
}
