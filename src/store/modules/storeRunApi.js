import NCoreHelper from "../../views/NCoreHelper/NCoreHelper";

export default {
  state: {
    storeTreeview: [],
    storeCloseLoadingNCoreModalDelete: [],
    storeCloseLoadingNCoreModalUploadEvent: []
  },
  getters: {
    storeTreeview: state => state.storeTreeview,
    storeCloseLoadingNCoreModalDelete: state => state.storeCloseLoadingNCoreModalDelete,
    storeCloseLoadingNCoreModalUploadEvent: state => state.storeCloseLoadingNCoreModalUploadEvent
  },
  mutations: {
    setStoreTreeview(state, payload) {
      state.storeTreeview = payload;
    },
    setStoreCloseLoadingNCoreModalDelete(state, payload) {
      state.storeCloseLoadingNCoreModalDelete = payload;
    },
    setStoreCloseLoadingNCoreModalUploadEvent(state, payload) {
      state.storeCloseLoadingNCoreModalUploadEvent = payload;
    }
  },
  actions: {
    async callStoreTreeview({ commit }, dataSend) {
      commit("setStoreTreeview", await NCoreHelper.v2executeGET(this, dataSend.api, dataSend));
    },
    async callStoreCloseLoadingNCoreModalDelete({ commit }, payload) {
      commit("setStoreCloseLoadingNCoreModalDelete", payload);
    },
    async callStoreCloseLoadingNCoreModalUploadEvent({ commit }, payload) {
      commit("setStoreCloseLoadingNCoreModalUploadEvent", payload);
    }
  }
};
