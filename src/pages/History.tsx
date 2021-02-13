import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Alert,
  Link as ThemeUILink,
  Badge,
  Divider,
  Flex,
  Heading,
  Text,
} from 'theme-ui'
import { Layout } from '../components'
import { GameSessionModel } from '../models'
import { retrieveSession } from '../utils/session'

export const History = () => {
  const [gameHistory, setGameHistory] = useState<GameSessionModel[]>([])

  useEffect(() => {
    setGameHistory(retrieveSession())
  }, [])
  return (
    <Layout>
      <Flex
        sx={{
          flexDirection: 'column',
          maxWidth: 650,
          width: '100%',
          textAlign: 'center',
          mt: 6,
        }}
      >
        <Heading as="h1" sx={{ textAlign: 'center', mb: 3 }}>
          {gameHistory.length > 0 ? 'Games played' : 'Go play some games'}
        </Heading>
        <Divider sx={{ mb: 3 }} />
        {gameHistory.map(({ result, game }) => (
          <Alert
            sx={{ justifyContent: 'space-between', mt: 2 }}
            key={`game-${game}`}
          >
            <Heading>
              {result}
              <Text as="small" variant="small" sx={{ fontSize: 2, ml: 2 }}>
                {result !== 'draw' && 'winner'}
              </Text>
            </Heading>
            <Badge>Game: {game}</Badge>
          </Alert>
        ))}

        <Link component={ThemeUILink} to="/" sx={{ my: 4 }}>
          Play
        </Link>
      </Flex>
    </Layout>
  )
}
