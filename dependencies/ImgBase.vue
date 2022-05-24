<template>
  <picture class="kad-img-base">
    <source
      v-for="(url, media) in ImgUrl"
      :key="url"
      :srcset="url"
      :media="`(max-width: ${media}px)`"
    >
    <img
      class="kad-img-base__img"
      :src="ImgUrl.default"
      :alt="text"
      :title="text"
      draggable="false"
      crossorigin="anonymous"
      @error="imgErrorHandler"
    >
  </picture>
</template>

<script>
import { computed } from 'vue'
import imgPlaceHolder from '@/assets/img/placeholder_img.png'
import { getPreviewInfo } from '@/utils/common'
import { breakpoints } from '@/composables/useScreen'

export default {
  name: 'kad-img-base',
  props: {
    text: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    responsiveSrc: {
      type: Object,
      default: null
    }
  },
  setup (props) {
    const ImgUrl = computed(() => {
      const result = {}
      if (!props.responsiveSrc) {
        result.default = getImgUrl(props.src)
      } else {
        Object.entries(props.responsiveSrc).forEach(([media, url]) => {
          const key = media.split('src')[1] ? breakpoints[media.split('src')[1]] : 'default'
          if (url || key === 'default') {
            result[key] = getImgUrl(url)
          }
        })
      }

      return result
    })

    const getImgUrl = (src) => src ? getPreviewInfo(src).url : imgPlaceHolder

    const imgErrorHandler = (e) => {
      console.log(e)
      e.target.src = imgPlaceHolder
    }

    return {
      imgErrorHandler,
      ImgUrl
    }
  }
}

</script>

<style lang="scss" scoped>
.kad-img-base {
  display: flex;
  justify-content: center;

  img {
    width: 100%;
  }
}
</style>
