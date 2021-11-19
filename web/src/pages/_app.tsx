import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { AnimatePresence } from 'framer-motion'
import { ReactQueryDevtools } from 'react-query/devtools'

import { theme } from '../styles/theme'
import { AppProvider } from '../contexts'
import { queryClient } from '../services/queryClient'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <AppProvider>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>
        </AppProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
