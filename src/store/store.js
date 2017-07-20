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
      let array = response.body.data
      array.sort(function(a, b){
          if(a.POS_PEMADAM < b.POS_PEMADAM) return -1;
          if(a.POS_PEMADAM > b.POS_PEMADAM) return 1;
          return 0;
      })
      commit('setPosPemadam', array)
    }, () => {
      commit('setLoading', false)
    }, null)
  }
}
