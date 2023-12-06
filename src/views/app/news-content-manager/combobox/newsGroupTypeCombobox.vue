<template>
  <b-button class="nColorWhite" size="xs" variant="dark" @click="callModalDetail()">
    <i class="iconsminds-folder-cloud"></i> {{ pageTitle }}
    <news-group-type-combobox-detail :page-title-modal="'DANH SÁCH LOẠI NHÓM TIN'"
                                     :show-btn-all="btnShowAll"
                                     ref="refNewsGroupTypeComboboxDetail"
                                     @submitEvent="subEvNewsGroupTypeComboboxDetail"/>
  </b-button>
</template>

<script>
import {mapActions} from "vuex";
import NewsGroupTypeComboboxDetail from "@/views/app/news-content-manager/combobox/newsGroupTypeComboboxDetail";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";

export default {
  components: {
    NewsGroupTypeComboboxDetail,
  },
  directives: {},
  props: {
    pageTitle: {
      type: String,
      default: "Loại nhóm tin",
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
        id: this.$refs.refNewsGroupTypeComboboxDetail.pageIdModal
      })
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refNewsGroupTypeComboboxDetail.pageIdModal,
        1
      );
    },
    async subEvNewsGroupTypeComboboxDetail(val) {
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
