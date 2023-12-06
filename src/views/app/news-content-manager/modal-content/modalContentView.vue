<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="false"
           :title="pageTitle"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="s"
           @shown="callOpenModal()"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <div v-html="contentPage"/>
      <n-core-button-run :show-btn-save="'0'"
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

export default {
  components: {
    NCoreButtonRun
  },
  props: {},
  data() {
    return {
      pageId: 'ModalContentView_Id',
      pageTitle: '',
      contentPage: '',
    };
  },
  mixins: [],
  validations: {},
  methods: {
    //==============================================PAGE================================================================
    async callOpenModal() {
      const iDataReceive = this.$store.state.storeCrud.storeSendViewContent
      if (iDataReceive.id === this.pageId) {
        if (iDataReceive.isNewsContent === true) {
          this.pageTitle = iDataReceive.name
          this.contentPage = iDataReceive.data
        } else {
          const vValue = await NCoreHelper.v2executeGETById(this, newsContentApi.NEWS_CONTENT_GET_BY_ID, iDataReceive.contentId)
          this.pageTitle = vValue.name
          this.contentPage = vValue.content
        }
      }
      this.$hideAllPageLoading()
    },
    async resetStateModal() {
      this.contentPage = ''
    },
    //==================================================================================================================
    //==================================================SAVE-ALL========================================================
    async subEvModalContentView_BtnSave() {
      NCoreHelper.v2modalShowHide(this, this.pageId, 0)
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
