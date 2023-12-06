<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="false"
           :title="'CHỌN THỜI GIAN ĐĂNG BÀI'"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="md"
           @shown="callOpenModal()"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12" class="mt-2">
          <vc-date-picker locale="vi" v-model="date" mode="dateTime" is24hr hide-time-header="true"
                          class="form-control"/>
        </b-colxx>
        <b-colxx xxs="12"
                 style="font-weight: bold;font-family: Verdana;color: red;font-size: 25px;text-align: center;margin-top: 10px;">
          {{ date | formatDateDDMMYYYYHHMM }}
        </b-colxx>
      </b-row>

      <n-core-button-run :show-btn-save="'1'"
                         :btn-cancel="'Quay về'"
                         ref="refModalContentView_BtnSave"
                         @submitEvent="subEvModalContentView_BtnSave"/>
    </b-form>
  </b-modal>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import {mapGetters} from "vuex";
import newsContentApi from "@/views/app/news-content-manager/api/newsContentApi";
// import moment from "moment";


export default {
  components: {
    NCoreButtonRun
  },
  props: {},
  data() {
    return {
      pageId: 'ModalContentDateTime_Id',
      pageTitle: '',
      contentPage: '',
      newsId: '',
      date: '',//new Date('2023-10-20 17:45')
    };
  },
  mixins: [],
  validations: {},
  methods: {
    //==============================================PAGE================================================================
    async callOpenModal() {
      // const iDataReceive = this.$store.state.storeCrud.storeSendViewContent
      // if (iDataReceive.id === this.pageId) {
      //   if (iDataReceive.isNewsContent === true) {
      //     this.pageTitle = iDataReceive.name
      //     this.contentPage = iDataReceive.data
      //   } else {
      //     const vValue = await NCoreHelper.v2executeGETById(this, newsContentApi.NEWS_CONTENT_GET_BY_ID, iDataReceive.contentId)
      //     this.pageTitle = vValue.name
      //     this.contentPage = vValue.content
      //   }
      // }
      this.$hideAllPageLoading()
    },
    async resetStateModal() {
      this.contentPage = ''
    },
    //==================================================================================================================
    //==================================================SAVE-ALL========================================================
    async subEvModalContentView_BtnSave(val) {
      if (val) {
        const dataSend = {
          id: this.newsId,
          //time: (moment(String(this.date)).format('DD/MM/YYYY')) + ' ' + moment(String(this.date)).format('HH:mm')
        }
        await NCoreHelper.v2executePOST(this, newsContentApi.AUTO_TIME, dataSend)
        NCoreHelper.v2modalShowHide(this, this.pageId, 0)
        this.$emit('handleSubmitEvent', {
          id: this.newsId,
          time: this.date
        })
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageId, 0)
      }
    },
    //==================================================================================================================
  },
  computed: {
    ...mapGetters(['storeSendViewContent'])
  },
  watch: {},
  created() {
  },
  async mounted() {
  },
};
</script>
<style>
.vc-container {
  width: 100% !important;
}

.vc-date-time {
  text-align: center;
  margin: 0 auto !important;
}
</style>
