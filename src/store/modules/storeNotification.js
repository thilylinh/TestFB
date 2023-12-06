export default {
  state: {
    storeSendNotification: ""
  },
  getters: {
    storeSendNotification: state => state.storeSendNotification
  },
  mutations: {
    setStoreSendNotification(state, payload) {
      state.storeSendNotification = payload;
    }
  },
  actions: {
    async callStoreSendNotification({ commit }, payload) {
      commit("setStoreSendNotification", payload);
    }
  }
};
