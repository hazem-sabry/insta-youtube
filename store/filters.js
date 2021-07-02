export const state = () => ({
  filters: {
    order: 'relevance',
    maxResults: 15,
    query: null,
    type: 'video,playlist,channel',
    nextPageToken: null,
    publishedAfter: null,
    fields: 'items,nextPageToken,pageInfo',
  },
})

export const getters = {
  order: (state) => state.filters.order,
  maxResults: (state) => state.filters.maxResults,
  query: (state) => state.filters.query,
  type: (state) => state.filters.type,
  nextPageToken: (state) => state.filters.nextPageToken,
  publishedAfter: (state) => state.filters.publishedAfter,
  fields: (state) => state.filters.fields,
}

export const mutations = {
  SET_QUERY(state, query) {
    state.filters.query = query
  },
  SET_TYPE(state, type) {
    if (type === 'null') {
      state.filters.type = 'video,playlist,channel'
      return
    }

    state.filters.type = type
  },
  SET_ORDER(state, order) {
    if (order === 'null') {
      state.filters.order = 'relevance'
      return
    }

    state.filters.order = order
  },
  SET_UPLOADED_DATE(state, date) {
    if (date === 'null') {
      state.filters.publishedAfter = null
      return
    }
    state.filters.publishedAfter = date
  },
  SET_NEXT_PAGE_TOKEN(state, token) {
    if (token === 'null') {
      state.filters.nextPageToken = null
      return
    }
    state.filters.nextPageToken = token
  },
}
