import {getCurrentUser, setCurrentUser} from '../../utils'
import {axiosApiInstance} from "../../views/NCoreHelper/axiosApiInstance";
import NCoreConfig from "../../views/NCoreHelper/NCoreConfig";

export default {
  state: {
    currentUser: getCurrentUser(),
    // isAuthGuardActive ? getCurrentUser() : currentUser,
    loginError: null,
    processing: false,
    forgotMailSuccess: null,
    resetPasswordSuccess: null
  },
  getters: {
    currentUser: state => state.currentUser,
    processing: state => state.processing,
    loginError: state => state.loginError,
    forgotMailSuccess: state => state.forgotMailSuccess,
    resetPasswordSuccess: state => state.resetPasswordSuccess,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
      state.processing = false
      state.loginError = null
    },
    setLogout(state) {
      state.currentUser = null
      state.processing = false
      state.loginError = null
    },
    setProcessing(state, payload) {
      state.processing = payload
      state.loginError = null
    },
    setError(state, payload) {
      state.loginError = payload
      state.currentUser = null
      state.processing = false
    },
    setForgotMailSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.forgotMailSuccess = true
    },
    setResetPasswordSuccess(state) {
      state.loginError = null
      state.currentUser = null
      state.processing = false
      state.resetPasswordSuccess = true
    },
    clearError(state) {
      state.loginError = null
    }
  },
  actions: {
    login({commit}, payload) {
      commit('clearError')
      commit('setProcessing', true)
      axiosApiInstance.post(NCoreConfig.loginEndpoint, payload)
        .then(async response => {
          const token = response.data?.accesstoken || ''
            if (token) {
              const iPortal = {
                // portal: response.data.portal.portal,
                // company: response.data.portal.company,
                // companyName: response.data.portal.companyName,
                menuRole: response.data.menuRoles,
                // authority: response.data.portal.authority,
                // host: payload.urlPage
              }
              localStorage.setItem(NCoreConfig.storageTokenKeyName, `Bearer ${token}`)
              localStorage.setItem(NCoreConfig.storageRefreshTokenKeyName, response.data?.refreshToken)
              localStorage.setItem(NCoreConfig.projectData, JSON.stringify(iPortal))
            }
            // const item = {uid: user.user.uid, ...currentUser}
            const item = {
              uid: response.data.userFile.userId,
              img: response.data.userFile.avatar ? response.data.userFile.avatar : '/assets/img/profiles/l-3.jpg',
              title: response.data.userFile.fullName,
              ...response.data.userFile
            }
            setCurrentUser(item)
            commit('setUser', item)
        })
        .catch(error => {
          setCurrentUser(null);
          try {
            if (error.response.status === 500) {
              commit('setError', 'Lỗi chưa xử lý từ server - 500')
            } else {
              const iRes = error.response.data
              if (iRes !== null || true) {
                localStorage.setItem(NCoreConfig.localErrMess,
                  error.response.data?.errors[0] === undefined
                    ? commit('setError', error.response.data?.title)
                    : commit('setError', error.response.data?.errors[0]))
              } else {
                //commit('setError', error.message)
              }
            }
          } catch (e) {
            //commit('setError', 'Mất kết nối máy chủ')
          }

          setTimeout(() => {
            commit('clearError')
          }, 3000)
        })
    },
    forgotPassword({commit}, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(
          user => {
            commit('clearError')
            commit('setForgotMailSuccess')
          },
          err => {
            commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    resetPassword({commit}, payload) {
      commit('clearError')
      commit('setProcessing', true)
      firebase
        .auth()
        .confirmPasswordReset(payload.resetPasswordCode, payload.newPassword)
        .then(
          user => {
            commit('clearError')
            commit('setResetPasswordSuccess')
          },
          err => {
            // commit('setError', err.message)
            setTimeout(() => {
              commit('clearError')
            }, 3000)
          }
        )
    },
    signOut({commit}) {
      localStorage.setItem(NCoreConfig.storageTokenKeyName, '')
      localStorage.setItem(NCoreConfig.storageRefreshTokenKeyName, '')
      setCurrentUser(null);
      commit('setLogout')
      // firebase
      //   .auth()
      //   .signOut()
      //   .then(() => {
      //     setCurrentUser(null);
      //     commit('setLogout')
      //   }, _error => {
      //   })
    }
  }
}
