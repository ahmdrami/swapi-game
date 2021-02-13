import randomColor from 'randomcolor'
import { Flex, Heading } from 'theme-ui'

import { Card, Layout } from '../components'

const profiles = [
  {
    id: 1,
    name: 'person',
    url: '/game/person',
    color: randomColor({ luminosity: 'light' }),
  },
  {
    id: 2,
    name: 'starship',
    url: '/game/starship',
    color: randomColor({ luminosity: 'light' }),
  },
]
export const Home = () => {
  return (
    <Layout>
      <Flex>
        {profiles.map((profile) => (
          <Card {...profile} key={profile.id} />
        ))}
      </Flex>
      <Heading as="h1" variant="styles.h1" sx={{ mt: 3 }}>
        Choose your path{' '}
      </Heading>
    </Layout>
  )
}
