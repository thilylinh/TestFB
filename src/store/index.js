import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import survey from './modules/survey'
import storeNotification from './modules/storeNotification'
import storeRunApi from './modules/storeRunApi'
import storeCrud from './modules/storeCrud'
import storeCombobox from './modules/storeCombobox'
import storeSystem from './modules/storeSystem'
import { setCurrentLanguage } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    componentLoading: false,
    componentLoadingRunFunctionInModal: false,
    componentProcessing: false,
  },
  mutations: {
    UPDATE_COMPONENT_LOADING(state, val) {
      state.componentLoading = val
    },
    UPDATE_COMPONENT_RUN_FUNCTION_IN_MODAL(state, val) {
      state.componentLoadingRunFunctionInModal = val
    },
    UPDATE_COMPONENT_PROCESSING(state, val) {
      state.componentProcessing = val
    },
    changeLang (state, payload) {
      app.$i18n.locale = payload
      setCurrentLanguage(payload);
    },
  },
  actions: {
    setLang ({ commit }, payload) {
      commit('changeLang', payload)
    }
  },
  modules: {
    menu,
    user,
    survey,
    storeNotification,
    storeRunApi,
    storeCrud,
    storeCombobox,
    storeSystem
  }
})
