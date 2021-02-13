import { useQuery } from '@apollo/client'
import { Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Button, Flex, Heading, Spinner } from 'theme-ui'

import { Card, Layout } from '../components'
import { QUERY_PERSON_TOTAL, QUERY_STARSHIPS_TOTAL } from '../gql/queries'
import { useNewGame } from '../hooks/useNewGame'

type Params = {
  profile: 'person' | 'starship'
}

export const Game = () => {
  const { profile } = useParams<Params>()
  const history = useHistory()

  const allEntries = useQuery(
    profile === 'person' ? QUERY_PERSON_TOTAL : QUERY_STARSHIPS_TOTAL
  )
  const totalCount = allEntries.data
    ? allEntries.data[Object.keys(allEntries.data)[0]].totalCount
    : 0

  const { data, loading, initNewGame, winner } = useNewGame(
    profile,
    2,
    totalCount
  )

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Flex
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {data.map((card) => (
              <Card {...card} key={card.id} />
            ))}
          </Flex>
          <Flex
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              mt: 5,
            }}
          >
            <Heading
              as="h2"
              variant="styled.h2"
              sx={{
                textTransform: 'capitalize',
                p: 3,
                borderRadius: '5px',
              }}
            >
              {!winner ? 'Draw' : `${winner} wins`}
            </Heading>
            <Box
              sx={{
                mt: 4,
                '> button:not(:last-child)': {
                  mr: [0, 2],
                  mt: [2, 0],
                },
              }}
            >
              <Button variant="primary" onClick={() => initNewGame(true)}>
                Play again
              </Button>
              <Button variant="secondary" onClick={() => history.push('/')}>
                New Game
              </Button>
            </Box>
          </Flex>
        </Fragment>
      )}
    </Layout>
  )
}
