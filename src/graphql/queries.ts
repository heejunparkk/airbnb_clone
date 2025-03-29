import { gql } from 'graphql-request';

export const GET_ACCOMMODATIONS = gql`
  query GetAccommodations {
    accommodations {
      id
      title
      location
      price
      rating
      images
      category
      description
    }
  }
`;

export const GET_ACCOMMODATION = gql`
  query GetAccommodation($id: String!) {
    accommodation(id: $id) {
      id
      title
      location
      price
      rating
      images
      category
      description
    }
  }
`;

// 카테고리별 숙소 조회 쿼리 추가
export const GET_ACCOMMODATIONS_BY_CATEGORY = gql`
  query GetAccommodationsByCategory($category: String!) {
    accommodationsByCategory(category: $category) {
      id
      title
      location
      price
      rating
      images
      category
      description
    }
  }
`;
