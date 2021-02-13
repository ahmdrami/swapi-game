import { GameSessionModel } from '../models'

const SESSION_KEY = 'GAME_HISTORY'

export const saveGameSession = (result: string) => {
  const hasSession = sessionStorage.getItem(SESSION_KEY)

  let data: GameSessionModel[]

  if (hasSession) {
    data = JSON.parse(hasSession)
    data.push({ result, game: data.length + 1 })
  } else {
    data = [{ result, game: 1 }]
  }

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data))
}

export const retrieveSession = (): GameSessionModel[] => {
  const hasSession = sessionStorage.getItem(SESSION_KEY)
  let data: GameSessionModel[] = []
  if (hasSession) {
    data = JSON.parse(hasSession)
  }
  return data
}
