export const state = () => ({
  listItems: [],
  relatedVideos: [],
  channelVideos: [],
  resultsPerPage: null,
  totalResults: null,
  isSearching: false,
})

export const getters = {
  items: (state) => state.listItems,
  videos: (state) => state.relatedVideos,
  channelVideos: (state) => state.channelVideos,
  results: (state) => state.resultsPerPage,
  total: (state) => state.totalResults,
  searching: (state) => state.isSearching,
}

export const mutations = {
  SET_ITEMS(state, items) {
    if (!items.length) {
      state.listItems = []
      return
    }

    state.listItems = items
  },
  SET_RELATED_VIDEOS(state, items) {
    if (!items.length) {
      state.relatedVideos = []
      return
    }

    state.relatedVideos = items
  },
  SET_CHANNEL_VIDEOS(state, items) {
    if (!items.length) {
      state.channelVideos = []
      return
    }

    state.channelVideos = items
  },
  SET_RESULTS_PER_PAGE(state, count) {
    if (!count) {
      state.resultsPerPage = null
      return
    }

    state.resultsPerPage = count
  },
  SET_TOTAL(state, count) {
    if (!count) {
      state.totalResults = null
      return
    }

    state.totalResults = count
  },
  SET_SEARCHING_STATE(state, status) {
    state.isSearching = status
  },
}
