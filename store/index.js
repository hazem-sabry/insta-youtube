import { GET_SEARCH } from '@/api/endpoints'
import { mapSearchItem } from '@/utils/maps'

export const state = () => ({
  env: {
    API_URL: null,
    API_KEY: null,
  },
  isLoading: false,
})

export const getters = {
  loading: (state) => state.isLoading,
}

export const mutations = {
  FILL_ENV(state) {
    Object.keys(state.env).forEach((key) => {
      state.env[key] = process.env[key]
    })
  },
  LOADING_STATE(state, data) {
    state.isLoading = data
  },
}

export const actions = {
  nuxtServerInit({ commit }) {
    commit('FILL_ENV')
  },
  async GET_ITEMS({ getters, commit }) {
    const q = getters['filters/query']
    const type = getters['filters/type']
    const maxResults = getters['filters/maxResults']
    const order = getters['filters/order']
    const publishedAfter = getters['filters/publishedAfter']
    const fields = getters['filters/fields']

    commit('LOADING_STATE', true)
    commit('listing/SET_SEARCHING_STATE', true)

    const payload = {
      q,
      type,
      maxResults,
      fields,
      order,
      publishedAfter,
    }

    Object.keys(payload).forEach((key) => {
      if (!payload[key]) delete payload[key]
    })

    try {
      const { items, nextPageToken, pageInfo, error } = await this.$api(
        GET_SEARCH,
        payload
      )

      if (error) {
        throw new Error(error.message)
      }

      commit('filters/SET_QUERY', q)
      commit('listing/SET_ITEMS', items.map(mapSearchItem))
      commit('filters/SET_NEXT_PAGE_TOKEN', nextPageToken)
      commit('listing/SET_RESULTS_PER_PAGE', pageInfo.resultsPerPage)
      commit('listing/SET_TOTAL', pageInfo.totalResults.toLocaleString())
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      commit('LOADING_STATE', false)
    }
  },
  async LOAD_MORE({ getters, commit }) {
    const q = getters['filters/query']
    const type = getters['filters/type']
    const maxResults = getters['filters/maxResults']
    const order = getters['filters/order']
    const publishedAfter = getters['filters/publishedAfter']
    const pageToken = getters['filters/nextPageToken']
    const fields = getters['filters/fields']
    const preFetchedItems = getters['listing/items']

    commit('LOADING_STATE', true)
    commit('listing/SET_SEARCHING_STATE', true)

    const payload = {
      q,
      type,
      maxResults,
      fields,
      order,
      publishedAfter,
      pageToken,
    }

    Object.keys(payload).forEach((key) => {
      if (!payload[key]) delete payload[key]
    })

    try {
      const { items, nextPageToken, pageInfo, error } = await this.$api(
        GET_SEARCH,
        payload
      )

      if (error) {
        throw new Error(error.message)
      }

      commit('listing/SET_ITEMS', [
        ...preFetchedItems,
        ...items.map(mapSearchItem),
      ])
      commit('filters/SET_NEXT_PAGE_TOKEN', nextPageToken)
      commit('listing/SET_RESULTS_PER_PAGE', pageInfo.resultsPerPage)
      commit('listing/SET_TOTAL', pageInfo.totalResults.toLocaleString())
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    } finally {
      commit('LOADING_STATE', false)
    }
  },
}
