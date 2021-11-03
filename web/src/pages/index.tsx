import { useEffect } from "react"
import { GetStaticProps } from "next"
import Link from "next/link"
import Router from 'next/router'
import { parseCookies } from 'nookies'

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
        <MotionFlex variants={fadeInUpHome} >
          <h1>HomePage</h1>
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

// sideBar 
// page transitions
// scroll
// image 3d