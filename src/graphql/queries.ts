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
  query GetAccommodation($id: Int!) {
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
