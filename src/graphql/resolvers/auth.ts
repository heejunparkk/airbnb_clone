import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface SignUpInput {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
}

export const authResolvers = {
  Query: {
    me: () => null, // 임시로 null 반환
  },
  Mutation: {
    signUp: async (_parent: unknown, { input }: { input: SignUpInput }) => {
      try {
        // 이메일 중복 체크
        const existingUser = await prisma.user.findUnique({
          where: { email: input.email },
        });

        if (existingUser) {
          throw new Error('이미 사용 중인 이메일입니다.');
        }

        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(input.password, 10);

        // 사용자 생성
        const user = await prisma.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
            name: input.name,
            phoneNumber: input.phoneNumber,
          },
        });

        // JWT 토큰 생성
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1d' });

        return {
          token,
          user,
        };
      } catch (error) {
        console.error('회원가입 에러:', error);
        throw new Error('회원가입 처리 중 오류가 발생했습니다.');
      }
    },

    signIn: async (_parent: unknown, { email, password }: { email: string; password: string }) => {
      try {
        // 사용자 찾기
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
        }

        // 비밀번호 확인
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
        }

        // JWT 토큰 생성
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1d' });

        return {
          token,
          user,
        };
      } catch (error) {
        console.error('로그인 에러:', error);
        throw new Error('로그인 처리 중 오류가 발생했습니다.');
      }
    },
  },
};
