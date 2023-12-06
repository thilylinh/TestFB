import NCoreHelper from "../../views/NCoreHelper/NCoreHelper";
import authorityManagerApi from "../../views/app/system-manager/api/authorityManagerApi";
import userTypeManagerApi from "@/views/app/system-manager/api/userTypeManagerApi";
import positionManagerApi from "@/views/app/system-manager/api/positionManagerApi";
import missionManagerApi from "@/views/app/system-manager/api/missionManagerApi";
import trainingSystemManagerApi from "@/views/app/system-manager/api/trainingSystemManagerApi";
import formsOfTrainingManagerApi from "@/views/app/system-manager/api/formsOfTrainingManagerApi";

export default {
  state: {
    storeRoomManager: [],
    storeAuthorityManager: [],
    storeStaffManager: [],
    storeStaffManagerAuthor: [],
    storeFolderCombobox: [],
    storeViewFile: [],
    storeSendNotificationView: [],
    storeImageResizeCombobox: [],
    storeComboboxUserTypeManager: [],
    storeComboboxAuthorityManager: [],
    storeComboboxSubjectTypeManager: [],
    storeComboboxPositionManager: [],
    storeComboboxMissionManager: [],
    storeComboboxTrainingSystemManager: [],
    storeComboboxFormsOfTrainingManager: [],
    storeComboboxSchoolYearManager: [],
  },
  getters: {
    storeRoomManager: state => state.storeRoomManager,
    storeAuthorityManager: state => state.storeAuthorityManager,
    storeStaffManager: state => state.storeStaffManager,
    storeStaffManagerAuthor: state => state.storeStaffManagerAuthor,
    storeFolderCombobox: state => state.storeFolderCombobox,
    storeViewFile: state => state.storeViewFile,
    storeSendNotificationView: state => state.storeSendNotificationView,
    storeSendExportPdf: state => state.storeSendExportPdf,
    storeImageResizeCombobox: state => state.storeImageResizeCombobox,
    storeComboboxUserTypeManager: state => state.storeComboboxUserTypeManager,
    storeComboboxAuthorityManager: state => state.storeComboboxAuthorityManager,
    storeComboboxSubjectTypeManager: state => state.storeComboboxSubjectTypeManager,
    storeComboboxPositionManager: state => state.storeComboboxPositionManager,
    storeComboboxMissionManager: state => state.storeComboboxMissionManager,
    storeComboboxTrainingSystemManager: state => state.storeComboboxTrainingSystemManager,
    storeComboboxFormsOfTrainingManager: state => state.storeComboboxFormsOfTrainingManager,
    storeComboboxSchoolYearManager: state => state.storeComboboxSchoolYearManager,
  },
  mutations: {
    setStoreRoomManager(state, payload) {
      state.storeRoomManager = payload;
    },
    setStoreAuthorityManager(state, payload) {
      state.storeAuthorityManager = payload;
    },
    setStoreStaffManager(state, payload) {
      state.storeStaffManager = payload;
    },
    setStoreStaffManagerAuthor(state, payload) {
      state.storeStaffManagerAuthor = payload;
    },
    setStoreFolderCombobox(state, payload) {
      state.storeFolderCombobox = payload;
    },
    setStoreViewFile(state, payload) {
      state.storeViewFile = payload;
    },
    setStoreSendNotificationView(state, payload) {
      state.storeSendNotificationView = payload;
    },
    setStoreSendExportPdf(state, payload) {
      state.storeSendExportPdf = payload;
    },
    setStoreImageResizeCombobox(state, payload) {
      state.storeImageResizeCombobox = payload;
    },
    setStoreComboboxUserTypeManager(state, payload) {
      state.storeComboboxUserTypeManager = payload;
    },
    setStoreComboboxAuthorityManager(state, payload) {
      state.storeComboboxAuthorityManager = payload;
    },
    // setStoreComboboxSubjectTypeManager(state, payload) {
    //   state.storeComboboxSubjectTypeManager = payload;
    // },
    setStoreComboboxPositionManager(state, payload) {
      state.storeComboboxPositionManager = payload;
    },
    setStoreComboboxMissionManager(state, payload) {
      state.storeComboboxMissionManager = payload;
    },
    setStoreComboboxTrainingSystemManager(state, payload) {
      state.storeComboboxTrainingSystemManager = payload;
    },
    setStoreComboboxFormsOfTrainingManager(state, payload) {
      state.storeComboboxFormsOfTrainingManager = payload;
    },
    setStoreComboboxSchoolYearManager(state, payload) {
      state.storeComboboxSchoolYearManager = payload;
    }
  },
  actions: {
    // async callStoreRoomManager({commit}, dataSend) {
    //   commit("setStoreRoomManager", {
    //     data: await NCoreHelper.v2executeGET(
    //       this,
    //       roomManagerApi.ROOM_MANAGER_COMBOBOX,
    //       dataSend
    //     ),
    //     type: dataSend.type
    //   });
    // },
    async callStoreAuthorityManager({commit}, dataSend) {
      commit("setStoreAuthorityManager", {
        data: await NCoreHelper.v2executeGET(
          this,
          authorityManagerApi.AUTHORITY_MANAGER_COMBOBOX,
          dataSend
        ),
        type: dataSend.type
      });
    },
    async callStoreStaffManager({commit}, dataSend) {
      commit("setStoreStaffManager", {
        data: await NCoreHelper.v2executeGET(
          this,
          //staffManagerApi.STAFF_MANAGER_COMBOBOX,
          dataSend
        ),
        type: dataSend.type
      });
    },
    async callStoreStaffManagerAuthor({commit}, payload) {
      commit("setStoreStaffManagerAuthor", payload);
    },
    async callStoreFolderCombobox({commit}, payload) {
      commit("setStoreFolderCombobox", payload);
    },
    async callStoreViewFile({commit}, payload) {
      commit("setStoreViewFile", payload);
    },
    async callStoreSendNotificationView({commit}, payload) {
      commit("setStoreSendNotificationView", payload);
    },
    async callStoreSendExportPdf({commit}, payload) {
      commit("setStoreSendExportPdf", payload);
    },
    async callStoreImageResizeCombobox({commit}, payload) {
      commit("setStoreImageResizeCombobox", payload);
    },
    async callStoreComboboxUserTypeManager({commit}, payload) {
      const vData = await NCoreHelper.v2executeGET(this, userTypeManagerApi.USER_TYPE_MANAGER_COMBOBOX)
      commit("setStoreComboboxUserTypeManager", {
        isAdd: payload.isAdd,
        dataSend: payload.dataSend,
        isShowTitleHeader: payload.isShowTitleHeader,
        data: NCoreHelper.gerenalStatusCombobox(vData, payload.isShowTitleHeader, payload.message, payload.isNoHeader)
      });
    },
    async callStoreComboboxAuthorityManager({commit}, payload) {
      const vData = await NCoreHelper.v2executeGET(this, authorityManagerApi.AUTHORITY_MANAGER_COMBOBOX, {
        projectId: payload.projectId
      })
      commit("setStoreComboboxAuthorityManager", {
        isAdd: payload.isAdd,
        dataSend: payload.dataSend,
        isShowTitleHeader: payload.isShowTitleHeader,
        data: NCoreHelper.gerenalStatusCombobox(vData, payload.isShowTitleHeader, payload.message, payload.isNoHeader)
      });
    },
    // async callStoreComboboxSubjectTypeManager({commit}, payload) {
    //   let url = ''
    //   switch (payload.groupId) {
    //     case 1: {
    //       // SubjectType
    //       url = ''
    //       break
    //     }
    //     case 2: {
    //       // SportSubjectType
    //       // url = sportSubjectTypeManagerApi.COMBOBOX
    //       break
    //     }
    //   }
    //   const vData = await NCoreHelper.v2executeGET(this, url)
    //   commit("setStoreComboboxSubjectTypeManager", {
    //     isAdd: payload.isAdd,
    //     dataSend: payload.dataSend,
    //     isShowTitleHeader: payload.isShowTitleHeader,
    //     data: NCoreHelper.gerenalStatusCombobox(vData, payload.isShowTitleHeader, payload.message, payload.isNoHeader)
    //   });
    // },
    async callStoreComboboxPositionManager({commit}, payload) {
      const vData = await NCoreHelper.v2executeGET(this, positionManagerApi.COMBOBOX, {
        projectId: payload.projectId
      })
      commit("setStoreComboboxPositionManager", {
        isAdd: payload.isAdd,
        dataSend: payload.dataSend,
        isShowTitleHeader: payload.isShowTitleHeader,
        data: NCoreHelper.gerenalStatusCombobox(vData, payload.isShowTitleHeader, payload.message, payload.isNoHeader)
      });
    },
    async callStoreComboboxMissionManager({commit}, payload) {
      const vData = await NCoreHelper.v2executeGET(this, missionManagerApi.COMBOBOX, {
        projectId: payload.projectId
      })
      commit("setStoreComboboxMissionManager", {
        isAdd: payload.isAdd,
        dataSend: payload.dataSend,
        isShowTitleHeader: payload.isShowTitleHeader,
        data: NCoreHelper.gerenalStatusCombobox(vData, payload.isShowTitleHeader, payload.message, payload.isNoHeader)
      });
    },
    async callStoreComboboxTrainingSystemManager({commit}, payload) {
      const vData = await NCoreHelper.v2executeGET(this, trainingSystemManagerApi.COMBOBOX, {
        projectId: payload.projectId
      })
      commit("setStoreComboboxTrainingSystemManager", {
        isAdd: payload.isAdd,
        dataSend: payload.dataSend,
        isShowTitleHeader: payload.isShowTitleHeader,
        data: NCoreHelper.gerenalStatusCombobox(vData, payload.isShowTitleHeader, payload.message, payload.isNoHeader)
      });
    },
    async callStoreComboboxFormsOfTrainingManager({commit}, payload) {
      const vData = await NCoreHelper.v2executeGET(this, formsOfTrainingManagerApi.COMBOBOX, {
        projectId: payload.projectId
      })
      commit("setStoreComboboxFormsOfTrainingManager", {
        isAdd: payload.isAdd,
        dataSend: payload.dataSend,
        isShowTitleHeader: payload.isShowTitleHeader,
        data: NCoreHelper.gerenalStatusCombobox(vData, payload.isShowTitleHeader, payload.message, payload.isNoHeader)
      });
    },
  }
};
