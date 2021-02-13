import { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Flex, Heading, useColorMode } from 'theme-ui'

export const Nav: FunctionComponent = (): JSX.Element => {
  const [colorMode, setColorMode] = useColorMode()
  const history = useHistory()
  return (
    <Flex
      as="nav"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        px: [2, 4],
        height: 75,
        '> button:not(:last-child)': {
          mr: [1, 2],
        },
      }}
    >
      <Heading as="h4" variant="styles.h4" sx={{ mr: 'auto' }}>
        Swapi Game
      </Heading>
      <Button onClick={() => history.push('/history')}>History</Button>
      <Button
        onClick={() =>
          setColorMode(colorMode === 'default' ? 'dark' : 'default')
        }
      >
        {colorMode === 'default' ? 'dark' : 'light'}
      </Button>
    </Flex>
  )
}
