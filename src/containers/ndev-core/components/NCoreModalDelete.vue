<template>
  <b-modal
    :id="idModal"
    :hide-footer="true"
    :hide-header="true"
    :hide-header-close="true"
    centered
    no-close-on-backdrop
    size="md"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-img-lazy src="/images/delete_image.jpg" style="width: 100%; height: 200px;"/>
        </b-col>
        <b-col class="nFontButton text-center" lg="12" md="12" sm="12"
               style="margin-top: 15px;font-size: 20px;font-weight: bold"
               xs="12">Bạn chắc chắn muốn xóa dữ liệu
        </b-col>
        <b-col class="nFontButton text-center" lg="12" md="12" sm="12"
               style="margin-top: 5px;font-size: 23px;font-weight: bold"
               xs="12">{{ returnUppercase(modalData.content) }}
        </b-col>
      </b-row>
      <n-core-button-run ref="refNCoreButtonRunModalDelete" :btn-save-title="'Đồng ý'" @submitEvent="submitEvent"/>
    </b-form>
  </b-modal>
</template>

<script>

import {mapGetters} from "vuex";
import NCoreButtonRun from "./NCoreButtonRun";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";

export default {
  components: {
    NCoreButtonRun
  },
  directives: {},
  props: {},
  computed: {
    ...mapGetters(['storeCrudDelete']),
  },
  watch: {
    storeCrudDelete(val) {
      this.modalData = val
      this.$hideAllPageLoading()
    }
  },
  data() {
    return {
      modalData: [],
      idModal: 'IdNCoreModalDelete',
      processing: false,
    }
  },
  methods: {
    resetStateModal() {
      this.processing = false
    },
    async submitEvent(val) {
      if (val) {
        this.$refs.refNCoreButtonRunModalDelete.processing = true
        this.$emit('handleSubmitEvent', this.modalData)
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    },
    returnUppercase(val) {
      if (val === undefined) return ''
      return val !== '' ? val.toUpperCase() : ''
    }
  },
}
</script>
