<template>
  <header class="Header">
    <div class="Header__wrapper container">
      <nuxt-link to="/" class="Header__logo">
        <svg-icon name="logo" class="Header__icon Header__icon--colorful" />
        <svg-icon name="logo-white" class="Header__icon" />
        <b>YouTube</b>
        <span>{{ query | limitChars }}</span>
      </nuxt-link>
      <QuickSearch
        v-if="search"
        class="Header__search"
        @close="search = false"
      />
      <button class="Header__toggle" @click="search = !search">
        <svg-icon name="magnify-white" class="w-sm h-sm" />
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import QuickSearch from '@/components/TheHeader/QuickSearch'

export default {
  name: 'Header',
  components: {
    QuickSearch,
  },
  data() {
    return {
      search: false,
    }
  },
  computed: {
    ...mapGetters({
      query: 'filters/query',
    }),
  },
}
</script>

<style lang="scss">
.Header {
  background-color: $base-color;
  box-shadow: 4px 4px 15px #eee;

  @media (min-width: 768px) {
    background-color: #fff;
  }

  &__wrapper {
    padding: 10px;
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  &__logo {
    display: flex;
    align-items: center;
    b {
      display: none;
      font-size: 1.2rem;

      @media (min-width: 768px) {
        display: block;
      }
    }
    span {
      font-size: 1.2rem;
      color: #fff;

      @media (min-width: 768px) {
        display: none;
      }
    }
  }

  &__icon {
    width: 50px;
    height: 40px;

    &--colorful {
      display: none;
    }

    @media (min-width: 768px) {
      display: none;

      &--colorful {
        display: block;
      }
    }
  }

  &__toggle {
    cursor: pointer;
    background-color: transparent;
    border: 0;

    @media (min-width: 768px) {
      display: none;
    }
  }
}
</style>
