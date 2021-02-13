import { render } from '@testing-library/react'
import { CardModel } from '../../models'
import { Card } from '../Card'

let mockCardData: CardModel
describe('Card component', () => {
  beforeEach(() => {
    mockCardData = {
      id: 1,
      name: 'Skywalker',
      color: '#111111',
      strength: 2,
    }
  })
  test('should render the fragment', () => {
    const { asFragment } = render(<Card {...mockCardData} />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should verify the title to exist in the document', () => {
    const { getByText, queryByTestId } = render(<Card {...mockCardData} />)

    expect(getByText(/Skywalker/)).toBeInTheDocument()
    expect(getByText(/Skywalker/).nodeName).toEqual('H2')
    expect(queryByTestId(/strength/)).toBeDefined()
  })

  test('should not display the strength when undefined in props', () => {
    delete mockCardData.strength
    const { queryByTestId } = render(<Card {...mockCardData} />)

    expect(queryByTestId(/strength/)).toBeNull()
  })
})
