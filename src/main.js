import Vue from 'vue'
import App from './App'

// BootstrapVue add
import BootstrapVue from 'bootstrap-vue'
// Router & Store add
import router from './router'
import store from './store'
// Multi Language Add
import vi from './locales/vi.json'
import en from './locales/en.json'
// import es from './locales/es.json'
import VueI18n from 'vue-i18n'
// Notification Component Add
import Notifications from './components/Common/Notification'
// Breadcrumb Component Add
import Breadcrumb from './components/Common/Breadcrumb'
// RefreshButton Component Add
import RefreshButton from './components/Common/RefreshButton'
// Colxx Component Add
import Colxx from './components/Common/Colxx'
import {getCurrentLanguage} from './utils'
import VueLazyload from 'vue-lazyload'

const loadImage = require('@/assets/images/gif/loading.gif')
Vue.use(VueLazyload, {
  loading: loadImage,
  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
  listenEvents: ['scroll'],
})
Vue.use(BootstrapVue);
Vue.use(VueI18n);
const messages = {vi: vi, en: en};
const locale = getCurrentLanguage();
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'vi',
  messages
});
import CKEditor from '@ckeditor/ckeditor5-vue2'
Vue.use(CKEditor);
// Vue.use(VCalendar, {
//   componentPrefix: 'vc',
// });

Vue.config.productionTip = false

// Vue.use(VueHtml2pdf);
// Vue.use(youtube);
Vue.use(Notifications);

Vue.filter('formatDateDDMMYYYYHHMM', function (value) {
  if (value === '') return ''
  if (value === undefined) return ''
  if (value === '0001-01-01T00:00:00') return ''
  const date = new Date(value);

  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const optionsDate = { year: 'numeric',month: '2-digit',  day: '2-digit' };
  const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
  const [month, day, year] = formattedDate.split('/');
  return `${hour}:${minute} | ${day}/${month}/${year}`;
})
Vue.component('piaf-breadcrumb', Breadcrumb);
Vue.component('b-refresh-button', RefreshButton);
Vue.component('b-colxx', Colxx);

Vue.config.productionTip = false
Vue.prototype.$serverfile = process.env.VUE_APP_BASE_API

Vue.prototype.$showAllPageLoading = () => {
  document.getElementById('main-loading').style.display = 'block'
}
Vue.prototype.$hideAllPageLoading = () => {
  document.getElementById('main-loading').style.display = 'none'
}
Vue.prototype.$showLoading = () => {
  store.commit("UPDATE_COMPONENT_LOADING", true)
}
Vue.prototype.$hideLoading = () => {
  store.commit("UPDATE_COMPONENT_LOADING", false)
}
Vue.prototype.$showLoadingRunFunctionInModal = () => {
  store.commit("UPDATE_COMPONENT_RUN_FUNCTION_IN_MODAL", true)
}
Vue.prototype.$hideLoadingRunFunctionInModal = () => {
  store.commit("UPDATE_COMPONENT_RUN_FUNCTION_IN_MODAL", false)
}
Vue.prototype.$showProcessing = () => {
  store.commit("UPDATE_COMPONENT_PROCESSING", true)
}
Vue.prototype.$hideProcessing = () => {
  store.commit("UPDATE_COMPONENT_PROCESSING", false)
}
//======================================================================================================================
Vue.prototype.$serverfile = process.env.VUE_APP_BASE_API
//======================================================================================================================
export default new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
