import { useEffect } from "react"
import { GetStaticProps } from "next"
import { Flex, Box, Text } from "@chakra-ui/react"
import Router from 'next/router'
import Image from 'next/image'
import { parseCookies } from 'nookies'

import { HomeHeader } from '../components/HomePage/HomeHeader'
import { IntroBanner } from '../components/HomePage/IntroBanner'
import { InfoCoins } from '../components/HomePage/InfoCoins'

import { MotionBox, MotionStack } from '../components/animations/GlobalAnimations'

export default function HomePage() {
  useEffect(() => {
    const { ['@dashgo.token']: token } = parseCookies()

    if(token) {
      Router.push('/dashboard')
    }
  }, [])

  return (
    <MotionBox initial='initial' animate='animate' exit={{ opacity: 0 }} layout>
      <HomeHeader />

      <IntroBanner />

      <InfoCoins />
    </MotionBox>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
