<template>
  <nav class="navbar fixed-top">
    <div class="d-flex align-items-center navbar-left">
      <a class="menu-button d-none d-md-block" href="#"
        @click.prevent.stop="changeSideMenuStatus({ step: menuClickCount + 1, classNames: menuType, selectedMenuHasSubItems })">
        <menu-icon />
      </a>
      <a class="menu-button-mobile d-xs-block d-sm-block d-md-none" href="#"
        @click.prevent.stop="changeSideMenuForMobile(menuType)">
        <mobile-menu-icon />
      </a>
    </div>
    <router-link :to="adminRoot" class="navbar-logo">
      <b-row class="header_title">
        <b-col xs="12" sm="12" md="12" lg="12" class="tieu_de_01">HỆ THỐNG QUẢN TRỊ WEBSITE</b-col>
        <!-- <b-col xs="12" sm="12" md="12" lg="12" class="tieu_de_02">{{ topnav_title02 }}</b-col> -->
      </b-row>
      <b-row class="header_title_mobile">
        <b-col xs="12" sm="12" md="12" lg="12" class="tieu_de_01">HỆ THỐNG QUẢN TRỊ</b-col>
        <b-col xs="12" sm="12" md="12" lg="12" class="tieu_de_02">WEBSITE</b-col>
        <!-- <b-col xs="12" sm="12" md="12" lg="12" class="tieu_de_03">{{ topnav_mobile_title03 }}</b-col> -->
      </b-row>
    </router-link>

    <div class="navbar-right">
      <!--      <div class="d-none d-md-inline-block align-middle mr-3">-->
      <!--        <switches id="tool-mode-switch"-->
      <!--                  v-model="isDarkActive"-->
      <!--                  class="vue-switcher-small"-->
      <!--                  color="primary"-->
      <!--                  theme="custom"/>-->
      <!--        <b-tooltip placement="left" target="tool-mode-switch" title="Dark Mode"></b-tooltip>-->
      <!--      </div>-->
      <div class="header-icons d-inline-block align-middle">
        <!--        <div class="position-relative d-none d-sm-inline-block">-->
        <!--          <b-dropdown-->
        <!--            menu-class="position-absolute mt-3 iconMenuDropdown"-->
        <!--            no-caret-->
        <!--            right-->
        <!--            size="sm"-->
        <!--            toggle-class="header-icon"-->
        <!--            variant="empty"-->
        <!--          >-->
        <!--            <template slot="button-content">-->
        <!--              <i class="simple-icon-grid"/>-->
        <!--            </template>-->
        <!--            <div>-->
        <!--              <router-link :to="`${adminRoot}/dashboards/default`" class="icon-menu-item">-->
        <!--                <i class="iconsminds-shop-4 d-block"/>-->
        <!--                {{ $t('menu.dashboards') }}-->
        <!--              </router-link>-->
        <!--              <router-link :to="`${adminRoot}/ui`" class="icon-menu-item">-->
        <!--                <i class="iconsminds-pantone d-block"/>-->
        <!--                {{ $t('menu.ui') }}-->
        <!--              </router-link>-->
        <!--              <router-link :to="`${adminRoot}/ui/components/charts`" class="icon-menu-item">-->
        <!--                <i class="iconsminds-bar-chart-4 d-block"/>-->
        <!--                {{ $t('menu.charts') }}-->
        <!--              </router-link>-->
        <!--              <router-link :to="`${adminRoot}/applications/chat`" class="icon-menu-item">-->
        <!--                <i class="iconsminds-speach-bubble d-block"/>-->
        <!--                {{ $t('menu.chat') }}-->
        <!--              </router-link>-->
        <!--              <router-link :to="`${adminRoot}/applications/survey`" class="icon-menu-item">-->
        <!--                <i class="iconsminds-formula d-block"/>-->
        <!--                {{ $t('menu.survey') }}-->
        <!--              </router-link>-->
        <!--              <router-link :to="`${adminRoot}/applications/todo`" class="icon-menu-item">-->
        <!--                <i class="iconsminds-check d-block"/>-->
        <!--                {{ $t('menu.todo') }}-->
        <!--              </router-link>-->
        <!--            </div>-->
        <!--          </b-dropdown>-->
        <!--        </div>-->

        <div class="position-relative d-inline-block">
          <b-dropdown menu-class="position-absolute mt-3 notificationDropdown" no-caret right size="sm"
            toggle-class="header-icon notificationButton" variant="empty">
            <template slot="button-content">
              <i class="simple-icon-bell" />
              <span class="count nColorRed nFontBold">{{ notificationCount }}</span>
            </template>
            <div v-for="(items, index) in notificationUser" :key="index" class="d-flex flex-row mb-3 pb-3 border-bottom">
              <n-img-default-base64 />
              <div class="pl-3 pr-2 NTopNav nHover selectCombobox" @click="openNotificationView(items)">
                <p class="font-weight-medium mb-1 title active" v-if="items.isRead === false">
                  {{ items.name }}
                </p>
                <p class="font-weight-medium mb-1 title" v-else-if="items.isRead === true">
                  {{ items.name }}
                </p>
                <p class="text-muted mb-0 text-small date">{{ items.dateSend | formatDateNotification }}</p>
              </div>
            </div>
          </b-dropdown>
        </div>
        <div class="position-relative d-none d-sm-inline-block">
          <div class="btn-group">
            <b-button class="header-icon btn-sm" variant="empty" @click="toggleFullScreen">
              <i
                :class="{ 'd-inline-block': true, 'simple-icon-size-actual': fullScreen, 'simple-icon-size-fullscreen': !fullScreen }" />
            </b-button>
          </div>
        </div>
      </div>
      <div class="user d-inline-block">
        <b-dropdown class="dropdown-menu-right" menu-class="mt-3" no-caret right toggle-class="p-0" variant="empty">
          <template slot="button-content">
            <span class="name mr-1 font-weight-bold">
              Xin chào: <span style="color: red">{{ currentUser?.title }}</span>
            </span>
            <span>
              <img :alt="currentUser?.title" :src="returnAvatar(currentUser?.avatar)" />
            </span>
          </template>
          <b-dropdown-item @click="openModelChangePassword()">
            <i class="simple-icon-key" /> Đổi mật khẩu
          </b-dropdown-item>
          <!--          <b-dropdown-item>Features</b-dropdown-item>-->
          <!--          <b-dropdown-item>History</b-dropdown-item>-->
          <!--          <b-dropdown-item>Support</b-dropdown-item>-->
          <b-dropdown-divider />
          <b-dropdown-item @click="logout">
            <i class="simple-icon-logout" /> Đăng xuất
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <notification-view :data-send="notificationId" ref="refTopNav_NotificationView" />
  </nav>
</template>

<script>
import notifications from "../../data/notifications";

import { mapActions, mapGetters, mapMutations } from "vuex";
import { MenuIcon, MobileMenuIcon } from "../../components/Svg";
import { adminRoot, buyUrl, localeOptions, menuHiddenBreakpoint, searchPath } from "../../constants/config";
import { getDirection, getThemeColor, setDirection, setThemeColor } from "../../utils";
import NCoreHelper from "../../views/NCoreHelper/NCoreHelper";
import NCoreConfig from "../../views/NCoreHelper/NCoreConfig";
import NImgDefaultBase64 from "@/containers/ndev-manager/Page/NImgDefaultBase64";
import notificationManagerApi from "@/views/app/system-manager/api/notificationManagerApi";
import NotificationView from "@/views/app/system-manager/modal/notificationView";

export default {
  components: {
    NotificationView,
    NImgDefaultBase64,
    "menu-icon": MenuIcon,
    "mobile-menu-icon": MobileMenuIcon,
  },
  data() {
    return {
      searchKeyword: "",
      isMobileSearch: false,
      isSearchOver: false,
      fullScreen: false,
      menuHiddenBreakpoint,
      searchPath,
      adminRoot,
      localeOptions,
      buyUrl,
      notifications,
      isDarkActive: false,
      idModalChangePassWord: 'idModelChangePassword',
      notificationUser: [],
      notificationId: '',
      notificationCount: 0,
    };
  },
  methods: {
    ...mapMutations(["changeSideMenuStatus", "changeSideMenuForMobile"]),
    ...mapActions(["setLang", "signOut", "callStoreSendNotificationView"]),

    openModelChangePassword() {
      this.$router.push({ name: 'system-manager-account-info' })
    },

    search() {
      this.$router.push(`${this.searchPath}?search=${this.searchKeyword}`);
      this.searchKeyword = "";
    },
    searchClick() {
      if (window.innerWidth < this.menuHiddenBreakpoint) {
        if (!this.isMobileSearch) {
          this.isMobileSearch = true;
        } else {
          this.search();
          this.isMobileSearch = false;
        }
      } else {
        this.search();
      }
    },
    handleDocumentforMobileSearch() {
      if (!this.isSearchOver) {
        this.isMobileSearch = false;
        this.searchKeyword = "";
      }
    },
    changeLocale(locale, direction) {
      const currentDirection = getDirection().direction;
      if (direction !== currentDirection) {
        setDirection(direction);
      }

      this.setLang(locale);
    },
    async logout() {
      const iUserData = JSON.parse(localStorage.getItem(NCoreConfig.userData))
      const iResult = await NCoreHelper.v2executePOST(this, 'Login/log-out', {
        identifiers: iUserData.uid
      }, 'Đăng xuất thành công')
      if (iResult) {
        const iUser = localStorage.getItem(NCoreConfig.storageUserName)
        const iPass = localStorage.getItem(NCoreConfig.storagePassWord)
        localStorage.clear()
        this.signOut().then(() => {
          this.$router.push("/user/login");
        });
      }
    },
    async callLogOut() {
      const iUserData = JSON.parse(localStorage.getItem(NCoreConfig.userData))
      const iResult = await NCoreHelper.v2executePOST(this, 'Login/log-out', {
        identifiers: iUserData.uid
      }, 'Đăng xuất thành công')
      if (iResult) {
        const iUser = localStorage.getItem(NCoreConfig.storageUserName)
        const iPass = localStorage.getItem(NCoreConfig.storagePassWord)
        localStorage.clear()
        this.signOut().then(() => {
          this.$router.push("/user/login");
        });
      }
    },
    toggleFullScreen() {
      const isInFullScreen = this.isInFullScreen();

      var docElm = document.documentElement;
      if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      this.fullScreen = !isInFullScreen;
    },
    isInFullScreen() {
      return (
        (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement &&
          document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement &&
          document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)
      );
    },
    returnAvatar(link) {
      if (link === '') return '/images/avatar.png'
      return link
    },
    async callNotification() {
      // this.notificationUser = await NCoreHelper.v2executeGET(this, notificationManagerApi.NOTIFICATION_MANAGER_WIDTH_USER)
      // this.notificationCount = this.notificationUser.filter(x => x.isRead === false).length
    },
    async openNotificationView(vData) {
      //this.notificationId = vData.id
      if (vData.isRead === false) {
        vData.isRead = true
        this.notificationCount = parseInt(this.notificationCount) - 1
        this.$forceUpdate()
      }
      await this.callStoreSendNotificationView({
        notificationId: vData.id,
        isUser: true
      })
      NCoreHelper.v2modalShowHide(this, this.$refs.refTopNav_NotificationView.pageIdModal, 1)
    }
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      menuType: "getMenuType",
      menuClickCount: "getMenuClickCount",
      selectedMenuHasSubItems: "getSelectedMenuHasSubItems",
      storeSendLogOut: "storeSendLogOut"
    })
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleDocumentforMobileSearch);
  },
  created() {
    const color = getThemeColor();
    this.isDarkActive = color.indexOf("dark") > -1;
    setTimeout(this.callNotification(), 3000)
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.$router.go(this.$route.path);
      }
    },
    isDarkActive(val) {
      let color = getThemeColor();
      let isChange = false;
      if (val && color.indexOf("light") > -1) {
        isChange = true;
        color = color.replace("light", "dark");
      } else if (!val && color.indexOf("dark") > -1) {
        isChange = true;
        color = color.replace("dark", "light");
      }
      if (isChange) {
        setThemeColor(color);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    },
    isMobileSearch(val) {
      if (val) {
        document.addEventListener("click", this.handleDocumentforMobileSearch);
      } else {
        document.removeEventListener("click", this.handleDocumentforMobileSearch
        );
      }
    },
    storeSendLogOut: {
      handler: function (vData) {
        if (vData.isCallLogout === true) {
          this.callLogOut()
        }
      },
      deep: true
    }
  },
  async mounted() {
    // this.$nextTick(async function () {
    //   // Gọi api lấy dữ liệu ban đầu
    //   const iResult = JSON.parse(localStorage.getItem(NCoreConfig.localSystem))
    //   this.topnav_title01 = iResult.homeOne,
    //     this.topnav_title02 = iResult.homeTwo,
    //     this.topnav_mobile_title01 = iResult.homeMobileOne,
    //     this.topnav_mobile_title02 = iResult.homeMobileTwo,
    //     this.topnav_mobile_title03 = iResult.homeMobileThree
    // })
  },
};
</script>
