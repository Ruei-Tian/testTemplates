<template>
  <div
    id="nav"
    class="kad-nav"
    :style="{
      '--bg-color': bgColor,
      '--text-color': textColor
    }"
    :data-node-id="nodeId"
  >
    <div class="kad-nav__container">
      <div class="kad-nav__inner">
        <h1 class="kad-nav__logo">
          <span v-text="h1"></span>
          <router-link
            class="kad-nav__logo-link"
            to="/"
          >
            <ImgBase
              :src="logo"
              alt="logo"
              class="kad-nav__logo-img"
            ></ImgBase>
          </router-link>
        </h1>
        <transition name="collapse">
          <nav
            v-show="state.shouldOpen"
            class="kad-nav__menu"
          >
            <ul
              class="kad-nav__menu--list"
              @click="state.isOpen = false"
            >
              <li
                v-for="(link, idx) in menu"
                :key="link.to"
                class="kad-nav__menu--item"
              >
                <a
                  :href="link.to"
                  class="kad-nav__menu--link active-underline"
                  :class="{active: activeArea === idx}"
                  @click.prevent="navigate(link.to)"
                >
                  {{ link.title }}
                  <span
                    v-if="link.caption"
                    class="kad-nav__menu--caption"
                  >{{ link.caption }}</span>
                </a>
              </li>
            </ul>
          </nav>
        </transition>
        <button
          class="kad-nav__trigger"
          :class="{ active: state.isOpen }"
          @click="state.isOpen = !state.isOpen"
        >
          <div class="icon-trigger">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </div>
          Trigger Menu
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, computed, watch, ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
// only for test templates
import useScreen from '../dependencies/useScreen'
import useGsap from '../dependencies/useGsap'
import ImgBase from '../dependencies/ImgBase.vue'

export default {
  name: 'KadNav',
  components: {
    ImgBase
  },
  props: {
    nodeId: {
      type: String,
      default: ''
    },
    h1: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    },
    menu: {
      type: Array,
      required: true
    },
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    textColor: {
      type: String,
      default: '#000000'
    }
  },
  setup (props) {
    // const screen = inject('screen')
    const screen = useScreen({ sm: true })
    const { scrollTo } = useGsap()
    const state = reactive({
      isOpen: false,
      shouldOpen: computed(() => !screen.lg || state.isOpen)
    })

    function navigate (to) {
      if (!to) return

      if (/^#/.test(to)) {
        scrollTo(to)
      } else {
        window.open(to, '_blank')
      }
    }

    const activeArea = ref(null)
    const checkActiveArea = () => {
      let isAnyAreaActive = false
      activeArea.value = props.menu.findIndex((item, idx) => {
        const targetArea = document.querySelector(item.to)
        let isAreaScrollIntoView = false
        if (targetArea) {
          const targetAreaPos = targetArea.getBoundingClientRect()
          const top = targetAreaPos.top
          const bottom = targetAreaPos.bottom
          isAreaScrollIntoView = top <= window.innerHeight * (2 / 3) && bottom > window.innerHeight * (1 / 3)
          if (isAreaScrollIntoView) {
            isAnyAreaActive = true
          }
        }

        return isAreaScrollIntoView
      })

      if (!isAnyAreaActive) {
        activeArea.value = null
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', checkActiveArea)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', checkActiveArea)
    })

    watch([
      () => screen.vw,
      () => screen.scrollTop
    ], () => {
      state.isOpen = false
    })

    watch(() => state.isOpen, (isOpen) => {
      if (isOpen) {
        document.body.style.setProperty('overflow', 'hidden')
      } else {
        document.body.style.removeProperty('overflow')
      }
    })

    return {
      state,
      navigate,
      activeArea
    }
  }
}

</script>
<style lang="scss">
.kad-nav {
  --text-size: 18px;
  --link-gap: .5em;

  // --container-width: #{$default-container-width};
  // --gap: #{$default-container-gap};
  --container-width: 1170px;
  --gap: 15px;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
  height: 80px;
  font-size: var(--text-size);
  font-weight: 700;
  background-color: var(--bg-color);
  box-shadow: 0 5px 5px -5px rgba(#000, .2);

  &__container {
    width: 100%;
    max-width: var(--container-width);
    height: 100%;
    margin: 0 auto;
    padding: 0 var(--gap);
  }

  &__inner {
    display: flex;
    height: 100%;
  }

  &__logo {
    align-self: center;
    min-width: 120px;
    height: 50%;

    &-link {
      display: block;
      height: 100%;

      picture,
      .kad-nav__logo-img img {
        width: auto;
        height: 100%;
      }
    }

    span {
      display: none;
    }
  }

  &__trigger {
    display: none;
    align-items: center;
    align-self: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-left: auto;
    font-size: 0;
    line-height: 0;
    color: var(--text-color);

    .icon-trigger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 24px;
    }

    .icon-bar {
      display: block;
      height: 4px;
      background-color: currentColor;
      transition: transform .2s ease, opacity .2s ease;
    }

    &.active {
      .icon-bar {
        &:first-child {
          transform: translateY(10px) rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0%;
          transform: translateX(10px);
        }

        &:last-child {
          transform: translateY(-10px) rotate(-45deg);
        }
      }
    }
  }

  &__menu {
    margin-left: auto;
    overflow: hidden;
    color: var(--text-color);

    &--list {
      display: flex;
      justify-content: center;
      height: 100%;
    }

    &--link {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: .3em;
      overflow: hidden;
      text-align: center;

      &.active-underline {
        &::after {
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 4px;
          background-color: currentColor;
          transition: transform .3s ease;
          transform: translateY(100%);
        }

        &.active,
        &:hover {
          &::after {
            transform: none;
          }
        }
      }
    }

    &--caption {
      font-size: .8em;
      font-weight: normal;
      line-height: normal;
    }

    @include screen(md, min) {
      &--list {
        align-items: center;
      }

      &--item + &--item {
        margin-left: var(--link-gap);
      }
    }
  }

  @include screen(lg) {
    --container-width: 320px;
    height: 60px;

    &__container {
      max-width: 100%;
    }

    &__menu {
      position: absolute;
      top: 60px;
      right: 0;
      bottom: 0;
      left: 0;
      height: calc(100vh - 60px);
      background-color: var(--bg-color);

      &--list {
        flex-direction: column;
      }

      &--link {
        padding: 1em;
      }
    }

    &__trigger {
      display: flex;
    }
  }
}
</style>
