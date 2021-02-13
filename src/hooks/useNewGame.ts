import { useCallback, useEffect, useState } from 'react'
import randomColor from 'randomcolor'

import client from '../apollo-client'
import { QUERY_PERSON, QUERY_STARSHIP } from '../gql/queries'
import { CardModel } from '../models'
import { saveGameSession } from '../utils/session'

type GameState = {
  loading: boolean
  error: boolean
  winner: string | null
  data: CardModel[]
}

export const useNewGame = (
  profile: string,
  totalPlayers: number,
  totalCount = 0
) => {
  const [{ loading, error, data, winner }, setState] = useState<GameState>({
    loading: true,
    error: false,
    winner: null,
    data: [],
  })

  const initNewGame = useCallback(
    async (reset = false) => {
      const cards: CardModel[] = []

      // when play again is triggered
      if (reset) {
        setState((ps) => ({ ...ps, loading: true }))
      }
      // fetch data for all the players
      while (cards.length !== totalPlayers) {
        try {
          const id = Math.floor(Math.random() * (totalCount - 1 + 1)) + 1
          const isExist = data.find((item) => item.id === id)

          if (!isExist) {
            const response = await client.query({
              query: profile === 'person' ? QUERY_PERSON : QUERY_STARSHIP,
              variables: { id },
            })
            const values: any = response.data[profile]
            const strength = values.height || values.hyperdriveRating
            cards.push({
              id,
              name: values.name,
              strength,
              color: randomColor({ luminosity: 'light' }),
            })
          }
        } catch (error) {}
      }

      // determine the game result
      const maxStrength = Math.max.apply(
        Math,
        cards.map((card) => (card.strength ? card.strength : 0))
      )

      const winners = cards.filter((card) => card.strength === maxStrength)
      const result = winners.length === totalPlayers ? null : winners[0].name

      // save in the session
      saveGameSession(result ? result : 'draw')

      // update state
      setState((ps) => ({
        ...ps,
        loading: false,
        data: cards,
        winner: result,
      }))
    },
    [data, profile, totalCount, totalPlayers]
  )

  useEffect(() => {
    if (data.length !== totalPlayers && totalCount > 0) {
      initNewGame()
    }
  }, [data.length, initNewGame, totalCount, totalPlayers])

  return {
    loading,
    error,
    data,
    initNewGame,
    winner,
  }
}
