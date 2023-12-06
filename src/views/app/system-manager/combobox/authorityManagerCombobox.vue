<template>
  <b-button class="nColorWhite" size="xs" variant="primary" @click="callModalDetail()">
    <i class="iconsminds-folder-cloud"></i> {{ pageTitle }}
    <authority-manager-combobox-detail :page-title-modal="'DANH SÁCH QUYỀN SW DỤNG'"
                                       ref="refUserTypeManagerComboboxDetail"
                                       @submitEvent="subEvUserTypeManagerComboboxDetail"/>
  </b-button>
</template>

<script>
import {mapActions} from "vuex";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import AuthorityManagerComboboxDetail from "@/views/app/system-manager/combobox/authorityManagerComboboxDetail";

export default {
  components: {
    AuthorityManagerComboboxDetail,
  },
  directives: {},
  props: {
    pageTitle: {
      type: String,
      default: "Quyền sử dụng",
    },
  },
  mixins: [],
  validations: {},
  computed: {},
  data() {
    return {};
  },
  watch: {},
  mounted() {
  },
  methods: {
    ...mapActions(["callStoreSendComboboxNoData"]),
    async callModalDetail() {
      await this.callStoreSendComboboxNoData({
        id: this.$refs.refUserTypeManagerComboboxDetail.pageIdModal
      })
      NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refUserTypeManagerComboboxDetail.pageIdModal,
          1
      );
    },
    async subEvUserTypeManagerComboboxDetail(val) {
      this.$emit('submitEvent', val)
    },
  },
};
</script>
<style>
.nModal_BootTrap .card .card-body {
  padding: 5px !important;
}
</style>
