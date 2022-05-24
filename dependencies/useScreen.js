import { reactive, onBeforeUnmount } from 'vue'
import useMediaQuery from './useMediaQuery'

export const breakpoints = {
  xs: 360,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1366,
  xxl: 1680
}

export default function useScreen ({
  xxl = false,
  xl = false,
  lg = true,
  md = true,
  sm = false,
  xs = false,
  viewport = true,
  scroll = true
} = {}) {
  const screen = reactive({
    xxl: xxl && useMediaQuery(`(max-width: ${breakpoints.xxl}px)`),
    xl: xl && useMediaQuery(`(max-width: ${breakpoints.xl}px)`),
    lg: lg && useMediaQuery(`(max-width: ${breakpoints.lg}px)`),
    md: md && useMediaQuery(`(max-width: ${breakpoints.md}px)`),
    sm: sm && useMediaQuery(`(max-width: ${breakpoints.sm}px)`),
    xs: xs && useMediaQuery(`(max-width: ${breakpoints.xs}px)`),
    vw: window.innerWidth || 0,
    vh: window.innerHeight || 0,
    scrollTop: 0
  })

  scroll && window.addEventListener('scroll', onScroll)
  viewport && window.addEventListener('resize', onResize)

  onBeforeUnmount(() => {
    scroll && window.removeEventListener('scroll', onScroll)
    viewport && window.removeEventListener('resize', onResize)
  })

  function onScroll () {
    screen.scrollTop = window.pageYOffset
  }

  function onResize () {
    screen.vw = window.innerWidth
    screen.vh = window.innerHeight
  }

  return screen
}
