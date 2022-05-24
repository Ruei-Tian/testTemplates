import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

const useGsap = () => {
  const scrollTo = (anchor, option = {}) => {
    const { offset = 0, duration = 1 } = option
    const navHeight = document.getElementById('nav') ? document.getElementById('nav').offsetHeight : 0

    return gsap.to(window, {
      scrollTo: {
        y: anchor,
        offsetY: () => navHeight + offset
      },
      duration: duration,
      ease: 'expo.inOut'
    })
  }

  return {
    scrollTo
  }
}

export default useGsap
