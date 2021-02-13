import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Game } from '../Game'
import { MockedProvider } from '@apollo/client/testing'

describe('Game page component', () => {
  test('should render the fragment', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <MockedProvider>
          <Game />
        </MockedProvider>
      </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
