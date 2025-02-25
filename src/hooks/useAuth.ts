import { signIn, signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';

interface SignUpInput {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
}

export function useAuth() {
  const signUp = async (input: SignUpInput) => {
    try {
      // 요청 데이터 로그
      console.log('Attempting to sign up with:', input);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      // 응답 상태 로그
      console.log('Response status:', res.status);

      // 응답 헤더 로그
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));

      const text = await res.text();
      console.log('Raw response:', text);

      if (!text) {
        throw new Error('서버로부터 응답이 없습니다.');
      }

      const data = JSON.parse(text);

      if (!res.ok) {
        throw new Error(data.message || '회원가입 중 오류가 발생했습니다');
      }

      // 회원가입 성공 후 자동 로그인
      const result = await signIn('credentials', {
        email: input.email,
        password: input.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success('회원가입이 완료되었습니다');
      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error(error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다');
      throw error;
    }
  };

  const signInUser = async (credentials: { email: string; password: string }) => {
    try {
      const result = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success('로그인되었습니다');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다');
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut();
      toast.success('로그아웃되었습니다');
    } catch (error) {
      toast.error('로그아웃 중 오류가 발생했습니다');
      throw error;
    }
  };

  return {
    signUp,
    signIn: signInUser,
    signOut: signOutUser,
  };
}
