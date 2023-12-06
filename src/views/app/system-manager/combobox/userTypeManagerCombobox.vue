<template>
  <b-button class="nColorWhite" size="xs" variant="dark" @click="callModalDetail()">
    <i class="iconsminds-folder-cloud"></i> {{ pageTitle }}
    <user-type-manager-combobox-detail :page-title-modal="'DANH SÁCH KIỂU NGƯỜI DÙNG'"
                                       :show-btn-all="btnShowAll"
                                       ref="refUserTypeManagerComboboxDetail"
                                       @submitEvent="subEvUserTypeManagerComboboxDetail"/>
  </b-button>
</template>

<script>
import {mapActions} from "vuex";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import UserTypeManagerComboboxDetail from "@/views/app/system-manager/combobox/userTypeManagerComboboxDetail";

export default {
  components: {
    UserTypeManagerComboboxDetail
  },
  directives: {},
  props: {
    pageTitle: {
      type: String,
      default: "Kiểu người dùng",
    },
    btnShowAll: {
      type: String,
      default: "1",
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
