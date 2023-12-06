<template>
  <b-modal
    :id="idModal"
    :hide-footer="true"
    :hide-header-close="false"
    cancel-title="Hủy bỏ"
    cancel-variant="outline-primary"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="xl"
    :title="titleProfile"
    @hidden="resetStateModal"
  >
    <b-row class="mb-3">
      <b-col lg="12" md="12" sm="12" xs="12">
        <b-row class="mb-2 nFontButton font-weight-700" style="font-size: 18px;color: blue;">
          <b-col class="text-center mt-2" lg="12" md="12" sm="12" style="font-size: 22px;color: red" xs="12">
            {{ txtTenFile }}
          </b-col>
        </b-row>
        <b-row class="mb-2 mt-10 text-center">
          <b-col :hidden="hiddenNoData" class="text-center" lg="12" md="12" sm="12" style="margin: 0 auto;"
                 xs="12" v-html="noDataProfile"></b-col>
          <b-col :hidden="hiddenPdf" class="text-center" lg="12" md="12" sm="12" xs="12">
            <n-pdf-viewer :send-url="fileUrl"/>
          </b-col>
          <b-col class="text-center" lg="12" md="12" sm="12" xs="12">
            <hr />
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
import NCoreConfig from "../../../views/NCoreHelper/NCoreConfig";

export default {
  components: {
    NPdfViewer
  },
  directives: {},
  props: {},
  mixins: [],
  validations: {},
  computed: {
    ...mapGetters(['storeOpenProofFile'])
  },
  data() {
    return {
      idModal: 'delegationProfileId',
      type: 0,
      fileUrl: '',
      titleProfile: '',
      noDataProfile: '',
      dataProofFile: [],
      txtTenFile: '',
      hiddenPdf: true,
      hiddenNoData: false,
      hiddenBienPhapGiaiPhapMinhChung: false,
    }
  },
  watch: {
    storeOpenProofFile(val) {
      this.dataProofFile = val
      this.openUploadBienPhapGiaiPhap(val.type, 0)
    }
  },
  mounted() {
    this.noDataProfile = NCoreConfig.noDataTemplate
  },
  methods: {
    ...mapActions(['callStoreLoadingPage']),
    closeModal() {
      this.$bvModal.hide(this.idModal)
    },
    async openUploadBienPhapGiaiPhap(val, valChild) {
      // Gọi API lấy dữ liệu
      let cutName = this.dataProofFile.fileName.split('.')
      // Xử lý tên
      this.hiddenBienPhapGiaiPhapMinhChung = true
      this.titleProfile = this.dataProofFile.name.toUpperCase()
      this.fileUrl = ''
      switch (cutName[cutName.length - 1]) {
        case 'pdf': {
          this.fileUrl = await NCoreHelper.excuteViewFile(this, this.dataProofFile.apiLink, this.dataProofFile.proofFile)
          break
        }
        case 'doc':
        case 'docx': {
          break
        }
        default: {
          break
        }
      }
      switch (cutName[cutName.length - 1]) {
        case 'pdf': {
          if (this.fileUrl) {
            this.hiddenNoData = true
            this.hiddenPdf = false
          }
          break
        }
        default: {
          break
        }
      }
    }
  },
}
</script>
