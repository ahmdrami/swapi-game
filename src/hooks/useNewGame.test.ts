import { renderHook } from '@testing-library/react-hooks'
import { useNewGame } from './useNewGame'
import client from '../apollo-client'

jest.mock('../apollo-client')

const mockQuery = client.query as jest.Mock

describe('useNewGame', () => {
  beforeEach(() => {
    mockQuery.mockReset()
  })
  test('should verify data to have both players information', async () => {
    mockQuery.mockResolvedValueOnce({
      data: { person: { name: 'Skywalker', id: 2, height: 3 } },
    })
    mockQuery.mockResolvedValueOnce({
      data: { person: { name: 'Poggle', id: 3, height: 5 } },
    })
    const { result, waitForNextUpdate } = await renderHook(() =>
      useNewGame('person', 2, 50)
    )

    await waitForNextUpdate()

    expect(result.current.data).toHaveLength(2)
    expect(result.current.data[1].name).toEqual('Poggle')
  })

  test('should verify player 2 wins the game', async () => {
    mockQuery.mockResolvedValueOnce({
      data: { person: { name: 'Skywalker', id: 2, height: 3 } },
    })
    mockQuery.mockResolvedValueOnce({
      data: { person: { name: 'Poggle', id: 3, height: 5 } },
    })
    const { result, waitForNextUpdate } = await renderHook(() =>
      useNewGame('person', 2, 50)
    )

    await waitForNextUpdate()

    expect(result.current.winner).toEqual('Poggle')
  })

  test('should return winner as null when game draws', async () => {
    mockQuery.mockResolvedValueOnce({
      data: { person: { name: 'Skywalker', id: 2, height: 5 } },
    })
    mockQuery.mockResolvedValueOnce({
      data: { person: { name: 'Poggle', id: 3, height: 5 } },
    })
    const { result, waitForNextUpdate } = await renderHook(() =>
      useNewGame('person', 2, 50)
    )

    await waitForNextUpdate()

    expect(result.current.winner).toBeNull()
  })
})
