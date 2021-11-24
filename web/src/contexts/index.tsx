import { ReactNode } from 'react'

import { SidebarDrawerProvider } from './SidebarDrawerContext'
import { AuthProvider } from './AuthContext'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <AuthProvider>
        <SidebarDrawerProvider>
          {children}
        </SidebarDrawerProvider>
    </AuthProvider>
  )
}