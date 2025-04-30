import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SignUpInput {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
}

export function useAuth() {
  const router = useRouter();

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

      return data;
    } catch (error) {
      console.error('Sign up error:', error);
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

      if (result?.ok) {
        router.push('/'); // 로그인 성공 시 홈으로 이동
        router.refresh(); // 페이지 새로고침 (세션 반영 등)
      } else {
        // signIn 결과가 ok도 아니고 error도 아닌 경우 (거의 발생하지 않음)
        throw new Error('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut({ redirect: false }); // 리다이렉트 없이 로그아웃
      router.push('/'); // 로그아웃 후 홈으로 이동
      router.refresh();
    } catch (error) {
      console.error('Signout error:', error);
      throw error;
    }
  };

  return {
    signUp,
    signIn: signInUser,
    signOut: signOutUser,
  };
}
