<template>
  <div class="SearchBox">
    <button class="SearchBox__close" @click="$emit('close')">
      <svg-icon name="left-arrow" class="stroke-current w-sm h-sm" />
    </button>
    <div class="SearchBox__container">
      <input
        ref="input"
        v-model="q"
        type="search"
        class="SearchBox__input"
        aria-label="Search"
        placeholder="Search"
        @keydown.enter="search"
      />
      <div class="SearchBox__actions">
        <Spinner v-if="loading" class="w-md h-md" />
        <button v-if="q && !loading" class="SearchBox__clear" @click="q = null">
          <svg-icon name="cancel" class="stroke-current w-xs h-xs" />
        </button>
      </div>
    </div>
    <button class="SearchBox__submit" @click="search">
      <svg-icon
        name="magnify"
        class="stroke-current w-xs h-xs"
        aria-label="Search"
      />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SearchBox',
  data() {
    return {
      q: null,
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
    }),
  },
  methods: {
    async search() {
      const { q } = this

      // To avoid emty search box
      if (!q) return

      try {
        this.$store.commit('filters/SET_QUERY', q)

        await this.$store.dispatch('GET_ITEMS')

        this.$emit('close')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.SearchBox {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  padding: 15px;
  margin-inline: auto;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-grow: 1;
  z-index: 100;

  @media (min-width: 768px) {
    position: relative;
    max-width: 28rem;
    left: 0;
    transform: none;
  }

  &__container {
    position: relative;
    flex-grow: 1;
    border: 1px solid #ddd;
    border-right: 0;
  }

  &__input {
    width: 100%;
    font-size: 1rem;
    padding: 7px 10px;
    border: 0;

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }
  }

  &__close {
    padding: 7px 10px 7px 0;
    border: 0;
    background-color: #fff;
    cursor: pointer;

    @media (min-width: 768px) {
      display: none;
    }
  }

  &__actions {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
  }

  &__clear {
    background-color: transparent;
    border: 0;
    padding: 4px;
  }

  &__submit {
    padding: 7px 30px;
    border: 1px solid #ddd;
    background-color: #eee;
    cursor: pointer;
  }
}
</style>
