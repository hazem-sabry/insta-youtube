export const state = () => ({
  env: {
    API_URL: null,
    APP_URL: null,
  },
})

export const mutations = {
  FILL_ENV(state) {
    Object.keys(state.env).forEach((key) => {
      state.env[key] = process.env[key]
    })
  },
}

export const actions = {
  nuxtServerInit({ commit }) {
    commit('FILL_ENV')
  },
}