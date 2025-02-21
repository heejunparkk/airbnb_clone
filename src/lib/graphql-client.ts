import { GraphQLClient } from 'graphql-request';

// 환경 변수가 없을 경우를 대비한 타입 안전성 체크
if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
  console.warn('NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined, using default endpoint');
}

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3000/api/graphql';

// 클라이언트 인스턴스 생성 함수 추가
export function createGraphQLClient(headers = {}) {
  return new GraphQLClient(endpoint, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers, // 동적 헤더 추가 가능
    },
  });
}

// 기본 클라이언트 인스턴스
export const graphqlClient = createGraphQLClient();
