export interface ITokenProvider {
  generateToken(userId: string): string
}