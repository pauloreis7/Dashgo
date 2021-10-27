import { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from 'next/router'

import { api } from '../services/apiClient'

type User = {
  id: string,
  name: string,
  email: string,
  created_at: string,
  updated_at: string
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, '@dashgo.token')
  destroyCookie(undefined, '@dashgo.refreshToken')

  authChannel.postMessage('signOut')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default: 
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { '@dashgo.token': token } = parseCookies()

    if(token) {
      api.get('/users/me').then(response => {

        const { id, name, email, created_at, updated_at } = response.data

        setUser({ id, name, email, created_at, updated_at })
      })
      .catch((err) => {
        setUser(null)

        signOut()
      })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      })
  
      const { user, token, refreshToken } = response.data

      setCookie(undefined, '@dashgo.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, '@dashgo.refreshToken', refreshToken.id, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser(user)

      api.defaults.headers['Authorization'] = `Bearer ${token}`
      
      Router.push('/dashboard')
    } catch (err) {
      const errorMessage = err.response?.data.message 
      ?? `Erro interno de servidor, tente novamente mais tarde! (${err.message})`

      throw new Error(errorMessage)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)