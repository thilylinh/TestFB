import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";

export default {
  state: {
    storeCrudCreate: [],
    storeCrudUpdate: [],
    storeCrudDelete: [],
    storeCrudQuestion: [],
    storeCrudUploadEvent: [],
    storeCrudUpdateFileEvent: [],
    storeCrudUpdateWorkManagerEvent: [],
    storeSendCombobox: [],
    storeSendCombobox2: [],
    storeSendComboboxV2022: [],
    storeSendComboboxNoData: [],
    storeSendTreeView: [],
    storeSendTreeViewChild: [],
    storeSendTreeViewSelect: [],
    storeSendTreeViewSelectV2022: [],
    storeSendNewsContent: [],
    storeSendLibrary: [],
    storeSendLibraryModal: [],
    storeSendImageAvatar: [],
    storeSendViewContent: [],
    storeSendAttackFile: [],
    storeSendRegisterEvent: [],
    storeSendViewImage: [],
    storeSendDraw: [],
    storeSendViolateContent: [],
  },
  getters: {
    storeCrudCreate: state => state.storeCrudCreate,
    storeCrudUpdate: state => state.storeCrudUpdate,
    storeCrudDelete: state => state.storeCrudDelete,
    storeCrudQuestion: state => state.storeCrudQuestion,
    storeCrudUploadEvent: state => state.storeCrudUploadEvent,
    storeCrudUpdateFileEvent: state => state.storeCrudUpdateFileEvent,
    storeCrudUpdateWorkManagerEvent: state => state.storeCrudUpdateWorkManagerEvent,
    storeSendCombobox: state => state.storeSendCombobox,
    storeSendComboboxV2022: state => state.storeSendComboboxV2022,
    storeSendCombobox2: state => state.storeSendCombobox2,
    storeSendComboboxNoData: state => state.storeSendComboboxNoData,
    storeSendTreeView: state => state.storeSendTreeView,
    storeSendTreeViewChild: state => state.storeSendTreeViewChild,
    storeSendTreeViewSelect: state => state.storeSendTreeViewSelect,
    storeSendTreeViewSelectV2022: state => state.storeSendTreeViewSelectV2022,
    storeSendNewsContent: state => state.storeSendNewsContent,
    storeSendLibrary: state => state.storeSendLibrary,
    storeSendLibraryModal: state => state.storeSendLibraryModal,
    storeSendImageAvatar: state => state.storeSendImageAvatar,
    storeSendViewContent: state => state.storeSendViewContent,
    storeSendAttackFile: state => state.storeSendAttackFile,
    storeSendRegisterEvent: state => state.storeSendRegisterEvent,
    storeSendViewImage: state => state.storeSendViewImage,
    storeSendDraw: state => state.storeSendDraw,
    storeSendViolateContent: state => state.storeSendViolateContent,
  },
  mutations: {
    setStoreCrudCreate(state, payload) {
      state.storeCrudCreate = payload;
    },
    setStoreCrudUpdate(state, payload) {
      state.storeCrudUpdate = payload;
    },
    setStoreCrudDelete(state, payload) {
      state.storeCrudDelete = payload;
    },
    setStoreCrudQuestion(state, payload) {
      state.storeCrudQuestion = payload;
    },
    setStoreCrudUploadEvent(state, payload) {
      state.storeCrudUploadEvent = payload;
    },
    setStoreCrudUpdateFileEvent(state, payload) {
      state.storeCrudUpdateFileEvent = payload;
    },
    setStoreCrudUpdateWorkManagerEvent(state, payload) {
      state.storeCrudUpdateWorkManagerEvent = payload;
    },
    setStoreSendCombobox(state, payload) {
      state.storeSendCombobox = payload;
    },
    setStoreSendComboboxV2022(state, payload) {
      state.storeSendComboboxV2022 = payload;
    },
    setStoreSendCombobox2(state, payload) {
      state.storeSendCombobox2 = payload;
    },
    setStoreSendComboboxNoData(state, payload) {
      state.storeSendComboboxNoData = payload;
    },
    setStoreSendTreeView(state, payload) {
      state.storeSendTreeView = payload;
    },
    setStoreSendTreeViewChild(state, payload) {
      state.storeSendTreeViewChild = payload;
    },
    setStoreSendTreeViewSelect(state, payload) {
      state.storeSendTreeViewSelect = payload;
    },
    setStoreSendTreeViewSelectV2022(state, payload) {
      state.storeSendTreeViewSelectV2022 = payload;
    },
    setStoreSendNewsContent(state, payload) {
      state.storeSendNewsContent = payload;
    },
    setStoreSendLibrary(state, payload) {
      state.storeSendLibrary = payload;
    },
    setStoreSendLibraryModal(state, payload) {
      state.storeSendLibraryModal = payload;
    },
    setStoreSendImageAvatar(state, payload) {
      state.storeSendImageAvatar = payload;
    },
    setStoreSendViewContent(state, payload) {
      state.storeSendViewContent = payload;
    },
    setStoreSendAttackFile(state, payload) {
      state.storeSendAttackFile = payload;
    },
    setStoreSendRegisterEvent(state, payload) {
      state.storeSendRegisterEvent = payload;
    },
    setStoreSendViewImage(state, payload) {
      state.storeSendViewImage = payload;
    },
    setStoreSendDraw(state, payload) {
      state.storeSendDraw = payload;
    },
    setStoreSendViolateContent(state, payload) {
      state.storeSendViolateContent = payload;
    }
  },
  actions: {
    async callStoreCrudCreate({commit}, payload) {
      commit("setStoreCrudCreate", payload);
    },
    async callStoreCrudUpdate({commit}, payload) {
      commit("setStoreCrudUpdate", payload);
    },
    async callStoreCrudDelete({commit}, payload) {
      commit("setStoreCrudDelete", payload);
    },
    async callStoreCrudQuestion({commit}, payload) {
      commit("setStoreCrudQuestion", payload);
    },
    async callStoreCrudUploadEvent({commit}, payload) {
      commit("setStoreCrudUploadEvent", payload);
    },
    async callStoreCrudUpdateFileEvent({commit}, payload) {
      commit("setStoreCrudUpdateFileEvent", payload);
    },
    async callStoreCrudUpdateWorkManagerEvent({commit}, payload) {
      commit("setStoreCrudUpdateWorkManagerEvent", payload);
    },
    async callStoreSendCombobox({commit}, payload) {
      commit("setStoreSendCombobox", {
        data: NCoreHelper.gerenalStatusCombobox(
          await NCoreHelper.v2executeGET(
            this,
            payload.api
          ),
          payload.isShowTitleHeader,
          payload.iMessage,
          payload.isNoHeader
        ),
        isShowTitleHeader: payload.isShowTitleHeader,
        isAdd: payload.isAdd,
        dataSend: payload.dataSend
      });
    },
    async callStoreSendComboboxV2022({commit}, payload) {
      commit("setStoreSendComboboxV2022", {
        data: NCoreHelper.gerenalStatusCombobox(
          await NCoreHelper.v2executeGET(
            this,
            payload.api
          ),
          payload.isShowTitleHeader,
          payload.iMessage,
          payload.isNoHeader
        ),
        isShowTitleHeader: payload.isShowTitleHeader,
        isAdd: payload.isAdd,
        dataSend: payload.dataSend
      });
    },
    async callStoreSendCombobox2({commit}, payload) {
      commit("setStoreSendCombobox2", {
        data: NCoreHelper.gerenalStatusCombobox(
          await NCoreHelper.v2executeGET(
            this,
            payload.api
          ),
          payload.isShowTitleHeader,
          payload.iMessage,
          payload.isNoHeader
        ),
        isShowTitleHeader: payload.isShowTitleHeader,
        isAdd: payload.isAdd,
        dataSend: payload.dataSend
      });
    },
    async callStoreSendComboboxNoData({commit}, payload) {
      commit("setStoreSendComboboxNoData", payload);
    },
    async callStoreSendTreeView({commit}, payload) {
      commit("setStoreSendTreeView", payload);
    },
    async callStoreSendTreeViewChild({commit}, payload) {
      commit("setStoreSendTreeViewChild", payload);
    },
    async callStoreSendTreeViewSelect({commit}, payload) {
      commit("setStoreSendTreeViewSelect", payload);
    },
    async callStoreSendTreeViewSelectV2022({commit}, payload) {
      commit("setStoreSendTreeViewSelectV2022", payload);
    },
    async callStoreSendNewsContent({commit}, payload) {
      commit("setStoreSendNewsContent", payload);
    },
    async callStoreSendLibrary({commit}, payload) {
      commit("setStoreSendLibrary", payload);
    },
    async callStoreSendLibraryModal({commit}, payload) {
      commit("setStoreSendLibraryModal", payload);
    },
    async callStoreSendImageAvatar({commit}, payload) {
      commit("setStoreSendImageAvatar", payload);
    },
    async callStoreSendViewContent({commit}, payload) {
      commit("setStoreSendViewContent", payload);
    },
    async callStoreSendAttackFile({commit}, payload) {
      commit("setStoreSendAttackFile", payload);
    },
    async callStoreSendRegisterEvent({commit}, payload) {
      commit("setStoreSendRegisterEvent", payload);
    },
    async callStoreSendViewImage({commit}, payload) {
      commit("setStoreSendViewImage", payload);
    },
    async callStoreSendDraw({commit}, payload) {
      commit("setStoreSendDraw", payload);
    },
    async callStoreSendViolateContent({commit}, payload) {
      commit("setStoreSendViolateContent", payload);
    }
  }
};
