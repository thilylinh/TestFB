export default {
  state: {
    storeSendLogOut: [],
    storeSendMessage: [],
    storeSendReceiveMessage: [],
  },
  getters: {
    storeSendLogOut: state => state.storeSendLogOut,
    storeSendMessage: state => state.storeSendMessage,
    storeSendReceiveMessage: state => state.storeSendReceiveMessage,
  },
  mutations: {
    setStoreSendLogOut(state, payload) {
      state.storeSendLogOut = payload;
    },
    setStoreSendMessage(state, payload) {
      state.storeSendMessage = payload;
    },
    setStoreSendReceiveMessage(state, payload) {
      state.storeSendReceiveMessage = payload;
    },
  },
  actions: {
    async callStoreSendLogOut({ commit }, dataSend) {
      commit("setStoreSendLogOut", dataSend);
    },
    async callStoreSendMessage({ commit }, dataSend) {
      commit("setStoreSendMessage", dataSend);
    },
    async callStoreSendReceiveMessage({ commit }, dataSend) {
      commit("setStoreSendReceiveMessage", dataSend);
    },
  }
};
