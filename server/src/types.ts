import User from './models/User'

export type CreateSessionDTO = {
  email: string;
  password: string;
}

export type UsersStore = Map<string, User>

export type RefreshTokensStore = Map<string, string[]>

export type DecodedToken = {
  sub: string;
}