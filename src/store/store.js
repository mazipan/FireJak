import api from 'src/api'

export const state = {
  isShowSidebar: false,
  loading: false,
  posPemadam: []
}

export const getters = {
  isShowSidebar: (state) => {
    return state.isShowSidebar
  },
  isLoading: (state) => {
    return state.loading
  },
  posPemadam: (state) => {
    return state.posPemadam
  }
}

export const mutations = {
  setShowSidebar (state, value) {
    state.isShowSidebar = value
  },
  setLoading (state, value) {
    state.loading = value
  },
  setPosPemadam (state, value) {
    state.posPemadam = value
  }
}

export const actions = {
  getPosPemadam ({commit}) {
    commit('setLoading', true)
    api.getPosPemadam((response) => {
      commit('setLoading', false)
      commit('setPosPemadam', response.body.data)
    }, () => {
      commit('setLoading', false)
    }, null)
  }
}
