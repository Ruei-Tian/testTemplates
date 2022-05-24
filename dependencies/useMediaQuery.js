import { ref, onBeforeUnmount } from 'vue'

export default function useMediaQuery (query, options = {}) {
  const mediaQuery = window.matchMedia(query)
  const matches = ref(mediaQuery.matches)

  const handler = (event) => {
    matches.value = event.matches
  }

  if ('addEventListener' in mediaQuery) {
    mediaQuery.addEventListener('change', handler)
  } else {
    mediaQuery.addListener(handler)
  }

  onBeforeUnmount(() => {
    if ('removeEventListener' in mediaQuery) {
      mediaQuery.removeEventListener('change', handler)
    } else {
      mediaQuery.removeListener(handler)
    }
  })

  return matches
}
