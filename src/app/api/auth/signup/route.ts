import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. 요청 데이터 로그
    const body = await req.json();
    console.log('[Signup] Received request:', body);

    const { email, password, name, phoneNumber } = body;

    // 2. 입력값 검증
    if (!email || !password || !name) {
      console.log('Missing required fields');
      return NextResponse.json({ message: '필수 정보가 누락되었습니다.' }, { status: 400 });
    }

    // 3. 데이터베이스 연결 확인
    try {
      await prisma.$connect();
      console.log('[Signup] Database connected');
    } catch (dbError) {
      console.error('[Signup] Database connection error:', dbError);
      throw dbError;
    }

    // 4. 이메일 중복 체크
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        console.log('Email already exists:', email);
        return NextResponse.json({ message: '이미 사용 중인 이메일입니다.' }, { status: 400 });
      }
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }

    // 5. 비밀번호 해시화
    const hashedPassword = await hash(password, 12);

    // 6. 사용자 생성
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phoneNumber,
        },
      });

      console.log('[Signup] User created:', user.id);

      return NextResponse.json(
        {
          message: '회원가입이 완료되었습니다.',
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        },
        { status: 201 }
      );
    } catch (createError) {
      console.error('[Signup] User creation error:', createError);
      throw createError;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('[Signup] Error:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error('[Signup] Unknown error:', error);
    }

    return NextResponse.json({ message: '회원가입 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
