import { gql } from '@apollo/client'

export const QUERY_STARSHIPS_TOTAL = gql`
  query allStarships {
    allStarships {
      totalCount
    }
  }
`
export const QUERY_STARSHIP = gql`
  query starships($id: ID!) {
    starship(starshipID: $id) {
      name
      hyperdriveRating
    }
  }
`
