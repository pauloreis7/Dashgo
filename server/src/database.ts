import { RefreshTokensStore, UsersStore } from "./types"
import { v4 as uuid } from 'uuid'

export const users: UsersStore = new Map()

export const tokens: RefreshTokensStore = new Map()

export function seedUserStore() {
  users.set('pauloreis@gmail.com', {
    id: '1234567123456',
    name: 'Paulo Reis',
    email: 'pauloreis@gmail.com',
    password: '123456',
    created_at: new Date(),
    updated_at: new Date()
  })

  users.set('estagiario@gmail.com', {
    id: '569876543',
    name: 'Estagiario 123',
    email: 'estagiario@gmail.com',
    password: '123456',
    created_at: new Date(),
    updated_at: new Date()
  })
}

export function createRefreshToken(email: string) {
  const currentUserTokens = tokens.get(email) ?? []
  const refreshToken = uuid()

  tokens.set(email, [...currentUserTokens, refreshToken])

  return refreshToken;
}

export function checkRefreshTokenIsValid(email: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(email) ?? []

  return storedRefreshTokens.some(token => token === refreshToken)
}

export function invalidateRefreshToken(email: string, refreshToken: string) {
  const storedRefreshTokens = tokens.get(email) ?? []

  tokens.set(email, storedRefreshTokens.filter(token => token !== refreshToken));
}