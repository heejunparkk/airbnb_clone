import { gql, useMutation } from '@apollo/client';

const SIGN_UP = gql`
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

const SIGN_IN = gql`
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
  const [signUpMutation, { loading: signUpLoading }] = useMutation(SIGN_UP);
  const [signInMutation, { loading: signInLoading }] = useMutation(SIGN_IN);

  return {
    signUp: signUpMutation,
    signIn: signInMutation,
    isLoading: signUpLoading || signInLoading,
  };
}
