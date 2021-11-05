import { useEffect } from "react"
import { GetStaticProps } from "next"
import { Box } from "@chakra-ui/react"
import Router from 'next/router'
import { parseCookies } from 'nookies'

import { HomeHeader } from '../components/Header/HomeHeader'

import { 
  MotionBox, 
  MotionFlex, 
  stagger
} from '../components/animations/GlobalAnimations'
import { fadeInUpHome } from '../components/animations/HomepageAnimations'

export default function HomePage() {
  useEffect(() => {
    const { ['@dashgo.token']: token } = parseCookies()

    if(token) {
      Router.push('/dashboard')
    }
  }, [])

  return (
    <MotionBox initial='initial' animate='animate' exit={{ opacity: 0 }}>
      <MotionBox variants={stagger} >
        <HomeHeader />

        <MotionFlex variants={fadeInUpHome} >

          <Box h="150vh">

          </Box>
        </MotionFlex>
      </MotionBox>
    </MotionBox>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

// sideBar - X
// page transitions - X
// scroll - 
// image 3d - 