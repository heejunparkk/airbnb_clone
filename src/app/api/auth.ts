interface SignUpInput {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
}

interface ApiError {
  message: string;
  code?: string;
}

export const authApi = {
  signUp: async (input: SignUpInput) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const error = (await response.json()) as ApiError;
        throw new Error(error.message || '회원가입 중 오류가 발생했습니다.');
      }

      return response.json();
    } catch (error) {
      console.error('SignUp error:', error);
      throw error;
    }
  },

  signIn: async (email: string, password: string) => {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  },
};
