export const state = () => ({
  listItems: [],
  resultsPerPage: null,
  totalResults: null,
})

export const getters = {
  items: (state) => state.listItems,
  results: (state) => state.resultsPerPage,
  total: (state) => state.totalResults,
}

export const mutations = {
  SET_ITEMS(state, items) {
    // eslint-disable-next-line no-console
    console.log(items)
    if (!items.length) {
      state.listItems = []
      return
    }

    state.listItems = items
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
}
