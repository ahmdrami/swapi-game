import { FunctionComponent } from 'react'
import { Container } from 'theme-ui'

export const Layout: FunctionComponent = ({ children }): JSX.Element => {
  return (
    <Container
      sx={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Container>
  )
}
