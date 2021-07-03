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
import { mapSearchItem } from '@/utils/maps'
import { GET_SEARCH } from '@/api/endpoints'

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
      query: 'filters/query',
      type: 'filters/type',
      maxResults: 'filters/maxResults',
      order: 'filters/order',
      publishedAfter: 'filters/publishedAfter',
      fields: 'filters/fields',
      items: 'listing/items',
    }),
  },
  methods: {
    async search() {
      const { q, type, maxResults, fields } = this
      if (!q) return

      try {
        this.$store.commit('LOADING_STATE', true)
        this.$nuxt.$loading.start()

        const { items, nextPageToken, pageInfo, error } = await this.$api(
          GET_SEARCH,
          {
            q,
            type,
            maxResults,
            fields,
          }
        )

        if (error) {
          throw new Error(error.message)
        }

        this.$store.commit('filters/SET_QUERY', q)
        this.$store.commit('listing/SET_ITEMS', items.map(mapSearchItem))
        this.$store.commit('filters/SET_NEXT_PAGE_TOKEN', nextPageToken)
        this.$store.commit(
          'listing/SET_RESULTS_PER_PAGE',
          pageInfo.resultsPerPage
        )
        this.$store.commit(
          'listing/SET_TOTAL',
          pageInfo.totalResults.toLocaleString()
        )
        this.$emit('close')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      } finally {
        this.$store.commit('LOADING_STATE', false)
        this.$nuxt.$loading.finish()
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
