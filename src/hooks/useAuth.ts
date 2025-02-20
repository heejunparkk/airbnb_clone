import { useMutation } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import { toast } from 'react-hot-toast';

interface SignUpInput {
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
}

const SIGN_UP = `
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

const SIGN_IN = `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export function useAuth() {
  const signUpMutation = useMutation({
    mutationFn: (input: SignUpInput) => graphqlClient.request(SIGN_UP, { input }),
    onSuccess: () => {
      toast.success('회원가입이 완료되었습니다');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const signInMutation = useMutation({
    mutationFn: (credentials: { email: string; password: string }) => graphqlClient.request(SIGN_IN, credentials),
    onSuccess: () => {
      toast.success('로그인되었습니다');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    signUp: signUpMutation.mutate,
    signIn: signInMutation.mutate,
    isLoading: signUpMutation.isPending || signInMutation.isPending,
  };
}
