import { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, Heading } from 'theme-ui'

import { CardModel } from '../models'

export const Card: FunctionComponent<CardModel> = ({
  strength,
  name,
  url,
  color,
}): JSX.Element => {
  const history = useHistory()
  const handleClick = () => {
    if (url) {
      history.push(url)
    }
  }
  return (
    <Flex
      onClick={handleClick}
      sx={{
        height: [250, 350],
        cursor: url ? 'pointer' : 'initial',
        pointerEvents: url ? 'auto' : 'none',
        bg: color,
        width: [150, 250],
        p: 2,
        borderRadius: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        '&:not(:last-child)': {
          mr: [2,4],
        },
        '> * ': {
          textAlign: 'center',
          color: 'black',
        },
      }}
    >
      <Heading as="h2" variant="styles.h2" sx={{ textTransform: 'capitalize' }}>
        {name}
      </Heading>
      {strength && (
        <Heading data-testid="strength" as="h3" variant="styles.h3">
          Strength: {strength}
        </Heading>
      )}
    </Flex>
  )
}
