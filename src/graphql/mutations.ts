import { gql } from 'graphql-request';

export const CREATE_ACCOMMODATION = gql`
  mutation CreateAccommodation(
    $title: String!
    $location: String!
    $price: Int!
    $rating: Int!
    $images: [String!]!
    $category: String!
    $description: String!
  ) {
    createAccommodation(
      title: $title
      location: $location
      price: $price
      rating: $rating
      images: $images
      category: $category
      description: $description
    ) {
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
