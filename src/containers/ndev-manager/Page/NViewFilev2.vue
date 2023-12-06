<template>
  <b-modal :id="idModal"
           :hide-footer="true"
           :hide-header-close="false"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="xl"
           :title="titleProfile"
           @hidden="resetStateModal">
    <b-row class="mb-3">
      <b-col lg="12" md="12" sm="12" xs="12">
        <b-row class="mb-2 nFontButton font-weight-700" style="font-size: 18px;color: blue;">
          <b-col class="text-center mt-2" lg="12" md="12" sm="12" style="font-size: 22px;color: red" xs="12">
            {{ txtTenFile }}
          </b-col>
        </b-row>
        <b-row class="mb-2 mt-10 text-center">
          <!--          <b-col :hidden="hiddenNoData" class="text-center" lg="12" md="12" sm="12" style="margin: 0 auto;"
                           xs="12" v-html="noDataProfile"></b-col>-->
          <b-col class="text-center" lg="12" md="12" sm="12" xs="12">
            <n-pdf-viewer :send-url="fileUrl"/>
          </b-col>
          <b-col class="text-center" lg="12" md="12" sm="12" xs="12">
            <hr/>
            <b-button class="font-weight-700 nFontButton btn-multiple-state btn-shadow btn-dark"
                      size="xs"
                      type="button" variant="dark" @click="closeModal">
              Quay về
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>

import NPdfViewer from "./NPdfViewer";
import {mapActions, mapGetters} from "vuex";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";
import NDevApi from "../../../views/app/system-manager/api/NDevApi";

export default {
  components: {
    NPdfViewer
  },
  directives: {},
  props: {},
  mixins: [],
  validations: {},
  computed: {
    ...mapGetters(['stateDataSendView'])
  },
  data() {
    return {
      idModal: 'NViewFile2Id',
      type: 0,
      fileUrl: '',
      titleProfile: '',
      noDataProfile: '',
      dataProofFile: [],
      txtTenFile: '',
      hiddenPdf: true,
    }
  },
  watch: {
    stateDataSendView: async function (val) {
      if (this.idModal === val.id) {
        this.titleProfile = 'CHI TIẾT FILE'
        this.fileUrl = await NCoreHelper.excuteViewFile(this, NDevApi.NDEV_PROOFFILE_GET_BY_ID, val.proofFileId)
        // this.txtTenFile = val.fileName
        // this.fileUrl = this.$serverfile + "" + val.filePath
      }
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions(['callStoreLoadingPage']),
    closeModal() {
      this.$bvModal.hide(this.idModal)
    },
    resetStateModal() {
      this.fileUrl = ''
    }
  },
}
</script>
