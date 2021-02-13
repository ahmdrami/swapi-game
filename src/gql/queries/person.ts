import { gql } from "@apollo/client";

export const QUERY_PERSON_TOTAL = gql`
  query allPeople {
    allPeople {
      totalCount
    }
  }
`

export const QUERY_PERSON = gql`
  query person($id: ID!) {
    person(personID: $id) {
      name
      height
    }
  }
`