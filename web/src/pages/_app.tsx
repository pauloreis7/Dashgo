import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'

import { theme } from '../styles/theme'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { AuthProvider } from '../contexts/AuthContext'
import { makeServer } from '../services/miragejs'
import { queryClient } from '../services/queryClient'

// if(process.env.NODE_ENV === 'development') {
//   makeServer()
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <AuthProvider>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
