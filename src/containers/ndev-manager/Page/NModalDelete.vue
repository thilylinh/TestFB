<template>
  <b-modal
    :id="ModalDeleteId"
    :hide-footer="true"
    :hide-header="true"
    :hide-header-close="true"
    centered
    no-close-on-backdrop
    size="sm"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-img-lazy src="/assets/img/avatar/question.png" style="width: 100%; height: 150px;"/>
        </b-col>
        <b-col class="nFontButton text-center" lg="12" md="12" sm="12"
               style="margin-top: 15px;font-size: 20px;font-weight: bold"
               xs="12">{{ modalContent }}
        </b-col>
      </b-row>
      <n-button-run :btn-save-title="'Đồng ý'" :processing="processing" @submitEvent="submitEvent"/>
    </b-form>
  </b-modal>
</template>

<script>

import NButtonRun from "./NButtonRun";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";
import NCoreConfig from "../../../views/NCoreHelper/NCoreConfig";

export default {
  components: {
    NButtonRun
  },
  directives: {},
  props: {
    ModalDeleteId: {
      type: String,
      default: '',
    },
    ModalDeleteContent: {
      type: String,
      default: '',
    },
    ModalDeleteApi: {
      type: String,
      default: '',
    },
    ModalDeleteKeyDelete: {
      type: Array,
      default: [],
    },
    ModalDeleteMes: {
      type: String,
      default: '',
    },
    ModalDeleteType: {
      type: Number,
      default: 0,
    },
    ModalDeleteStatus: {
      type: Number,
      default: 3,
    },
    ModalDeleteTable: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    ModalDeleteContent: {
      deep: true,
      handler(val) {
        this.modalContent =val
      }
    }
  },
  data() {
    return {
      modalContent: this.ModalDeleteContent,
      processing: false,
    }
  },
  methods: {
    resetStateModal() {
      this.processing = false
    },
    async submitEvent(val) {
      if (val) {
        let iResult = false
        this.processing = true
        const iPortal = JSON.parse(localStorage.getItem(NCoreConfig.projectData))
        switch (this.ModalDeleteType) {
          case 1: {
            // Xóa dữ liệu
            iResult = await NCoreHelper.excuteDELETE(this, this.ModalDeleteApi, {model: JSON.stringify(this.ModalDeleteKeyDelete)}, this.ModalDeleteMes)
            break
          }
          case 2: {
            // Cập nhật trạng thái
            const modelSend = {
              model: JSON.stringify(this.ModalDeleteKeyDelete),
              projectId: iPortal.portal,
              createdBy: '',
              statusId: this.ModalDeleteStatus,
              table: this.ModalDeleteTable
            }
            const iMes = this.ModalDeleteType === 1
              ? 'Khóa dữ liệu thành công'
              : 'Mở khóa dữ liệu thành công';
            iResult = await NCoreHelper.excutePOST(this, this.ModalDeleteApi, modelSend, iMes)
            break
          }
          case 3: {
            // Xóa dữ liệu theo project, company
            iResult = await NCoreHelper.excuteDELETE(this, this.ModalDeleteApi, {
              model: JSON.stringify(this.ModalDeleteKeyDelete),
              companyId: iPortal.company,
              projectId: iPortal.portal
            }, this.ModalDeleteMes)
            break
          }
          case 4: {
            // Xóa dữ liệu hồ sơ đoàn chi tiết
            iResult = await NCoreHelper.excuteDELETE(this, this.ModalDeleteApi, {id: this.ModalDeleteKeyDelete}, this.ModalDeleteMes)
            break
          }
          default: {
            // Xóa dữ liệu
            iResult = await NCoreHelper.excuteDELETE(this, this.ModalDeleteApi, {model: JSON.stringify(this.ModalDeleteKeyDelete)}, this.ModalDeleteMes)
            break
          }
        }

        if (iResult) {
          this.processing = false
          this.$emit('submitEvent', true)
        }
      } else {
        this.$emit('submitEvent', false)
      }
    }
  },
}
</script>
