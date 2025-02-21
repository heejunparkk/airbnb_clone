import { gql } from 'graphql-request';

export const CREATE_ACCOMMODATION = gql`
  mutation CreateAccommodation(
    $title: String!
    $location: String!
    $price: Int!
    $rating: Float!
    $images: [String!]!
    $category: String!
    $description: String!
    $bedrooms: Int!
    $beds: Int!
    $baths: Int!
    $maxGuests: Int!
    $amenities: [String!]!
    $checkInTime: String
    $checkOutTime: String
  ) {
    createAccommodation(
      title: $title
      location: $location
      price: $price
      rating: $rating
      images: $images
      category: $category
      description: $description
      bedrooms: $bedrooms
      beds: $beds
      baths: $baths
      maxGuests: $maxGuests
      amenities: $amenities
      checkInTime: $checkInTime
      checkOutTime: $checkOutTime
    ) {
      id
      title
      location
      price
      rating
      images
      category
      description
      bedrooms
      beds
      baths
      maxGuests
      amenities
      checkInTime
      checkOutTime
    }
  }
`;
