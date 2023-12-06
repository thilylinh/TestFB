<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="false"
           :title="pageTitle"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="lg"
           @shown="callOpenPage"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <n-core-skeleton-table/>
      <b-row v-show="!$store.state.componentLoading">
        <b-colxx xxs="12" v-if="fileType === 0" class="center">
          <span v-html="emptyTemplate"></span>
        </b-colxx>
        <b-colxx xxs="12" v-else-if="fileType === 1">
          <n-core-view-pdf :send-url="sendUrl"/>
        </b-colxx>
      </b-row>
      <b-row>
        <b-col xs="12" sm="12" md="12" lg="12" class="text-center mt-2 mb-2">
          <b-button :disabled="$store.state.componentProcessing"
                    size="xs"
                    variant="outline-dark"
                    @click="btnCancel">
            <i class="iconsminds-undo"></i> Quay về
          </b-button>
          <b-button :class="{'nFontButton btn-multiple-state btn-shadow': true,
                    'show-spinner': $store.state.componentProcessing }"
                    :disabled="$store.state.componentLoading"
                    size="xs"
                    type="button"
                    variant="danger"
                    @click="btnDownload">
                            <span class="spinner d-inline-block">
                                <span class="bounce1"></span>
                                <span class="bounce2"></span>
                                <span class="bounce3"></span>
                            </span>
            <span class="icon success">
                                <i class="simple-icon-check"></i>
                            </span>
            <span class="icon fail">
                                <i class="simple-icon-exclamation"></i>
                            </span>
            <span class="label"><i class="simple-icon-cloud-download"></i> Tải file</span>
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import NCoreButtonRun from "./NCoreButtonRun";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";
import NCoreModalUploadEvent from "@/containers/ndev-core/components/NCoreModalUploadEvent";
import {mapActions, mapGetters} from "vuex";
import NCoreViewPdf from "@/containers/ndev-core/components/NCoreViewPdf";
import NCoreSkeletonTable from "@/containers/ndev-core/components/NCoreSkeletonTable";
import serverFileApi from "@/views/app/system-manager/api/serverFileApi";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";

export default {
  components: {
    NCoreSkeletonTable,
    NCoreViewPdf,
    NCoreModalUploadEvent,
    NCoreButtonRun,
  },
  directives: {},
  props: {},
  computed: {
    ...mapGetters(['storeViewFile'])
  },
  watch: {},
  data() {
    return {
      modalData: [],
      pageId: "NCoreViewFileModalPageId",
      pageTitle: '',
      emptyTemplate: NCoreConfig.tableNoDataTemplate,
      sendUrl: '',
      fileType: 1,
    };
  },
  methods: {
    async callOpenPage() {
      const iDataReceive = this.$store.state.storeCombobox.storeViewFile
      this.modalData = iDataReceive
      this.fileType = NCoreHelper.returnFileExtension(iDataReceive.name)
      this.pageTitle = iDataReceive.name
      this.sendUrl = await NCoreHelper.excuteViewFile(this, serverFileApi.SERVER_FILE_VIEW_FILE, iDataReceive.id)
      this.$hideLoading()
      this.$hideAllPageLoading()
    },
    resetStateModal() {
      this.sendUrl = ''
      this.fileType = 0
    },
    btnCancel() {
      NCoreHelper.v2modalShowHide(this, this.pageId, 0);
    },
    btnDownload() {
      // NCoreHelper.v2executeDownloadFile(this,serverFileApi.SERVER_FILE_VIEW_FILE, iDataReceive.id)
      // const url = window.URL.createObjectURL(new Blob([this.sendUrl]))
      const link = document.createElement('a')
      link.href = this.sendUrl
      link.setAttribute('download', this.modalData.name) // or any other extension
      document.body.appendChild(link)
      link.click()
    },
  },
};
</script>
