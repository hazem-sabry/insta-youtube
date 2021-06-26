export const state = () => ({
  token: '',
})

export const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },
}
