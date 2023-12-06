<template>
  <b-modal
    :id="idModal"
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
               xs="12">{{ modalData.content }}
        </b-col>
      </b-row>
      <n-button-run :btn-save-title="'Đồng ý'" @submitEvent="submitEvent"/>
    </b-form>
  </b-modal>
</template>

<script>

import NButtonRun from "./NButtonRun";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";
import {mapGetters} from "vuex";

export default {
  components: {
    NButtonRun
  },
  directives: {},
  props: {},
  computed: {
    ...mapGetters(['storeCrudDelete']),
  },
  watch: {
    storeCrudDelete(val) {
      this.modalData = val.data
    }
  },
  data() {
    return {
      modalData: [],
      idModal: 'idNCoreModalDelete'
    }
  },
  methods: {
    resetStateModal() {
    },
    async submitEvent(val) {
      if (val) {
        this.$emit('handleSubmitEvent', true)
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    }
  },
}
</script>
