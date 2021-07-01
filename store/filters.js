export const state = () => ({
  filters: {
    order: 'relevance',
    maxResults: 10,
    query: null,
    type: 'video,playlist,channel',
    pageToken: null,
    publishedAfter: null,
  },
})

export const getters = {
  order: ({ state }) => state.filters.order,
  maxResults: ({ state }) => state.filters.maxResults,
  query: ({ state }) => state.filters.query,
  type: ({ state }) => state.filters.type,
  pageToken: ({ state }) => state.filters.pageToken,
  publishedAfter: ({ state }) => state.filters.publishedAfter,
}

export const mutations = {
  SET_TYPE(type) {
    if (type === null) {
      state.type = 'video,playlist,channel'
      return
    }

    state.type = type
  },
  SET_ORDER(order) {
    if (order === null) {
      state.order = 'relevance'
      return
    }

    state.order = order
  },
  SET_UPLOADED_DATE(date) {
    if (date === null) {
      state.publishedAfter = null
      return
    }
    state.publishedAfter = date
  },
}
