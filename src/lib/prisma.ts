import { PrismaClient } from '@prisma/client';

// 전역 객체에 prisma 속성을 추가하기 위한 타입 확장
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 전역 객체에 이미 prisma가 있으면 그것을 사용하고,
// 없으면 새로운 PrismaClient 인스턴스를 생성
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 개발 환경에서만 생성된 인스턴스를 전역 객체에 저장
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
