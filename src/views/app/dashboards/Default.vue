<template>
  <div>
    <b-row>
      <b-colxx xxs="12" class="center nFontBold nColorRed">
        CHÚC BẠN MỘT NGÀY LÀM VIỆC VUI VẺ
      </b-colxx>
    </b-row>
  </div>
</template>

<script>

import {mapActions} from "vuex";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreSkeletonTr from "@/containers/ndev-core/components/NCoreSkeletonTr";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";

export default {
  components: {NCoreSkeletonTr, 
   // HTChat
  },
  data() {
    return {
      notificationData: [],
      notificationId: '',
      notificationSendId: 'Default_NotificationViewPageId',
      emptyTemplate: NCoreConfig.tableNoDataTemplate
    };
  },
  async mounted() {
    this.$showLoadingRunFunctionInModal()
    setTimeout(await this.fetchNotification(), 500)
  },
  methods: {
    ...mapActions(['callStoreSendNotificationView']),
    async fetchNotification() {
      this.$hideLoadingRunFunctionInModal()
    },
    async viewFile(vData) {
      await this.callStoreSendNotificationView({
        notificationId: vData.id,
        isUser: false
      })
      NCoreHelper.v2modalShowHide(this, 'notificationViewPageIdModal', 1)
    }
  }
};
</script>
<style>
.nTextNotification .card .card-body {
  padding: 7px !important;
  text-align: justify;
}

.nTextNotificationData:hover {
  font-weight: bold;
  color: blue;
  cursor: pointer;
}

/*
 *  STYLE 15
 */
.van_ban_thong_bao {
  max-height: calc(100vh - 320px);
  overflow: auto;
  overflow-y: auto;
}

#van_ban_thong_bao::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: snow;
  border-radius: 10px;
}

#van_ban_thong_bao::-webkit-scrollbar {
  width: 2px;
  background-color: snow;
}

#van_ban_thong_bao::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: snow;
}
</style>
