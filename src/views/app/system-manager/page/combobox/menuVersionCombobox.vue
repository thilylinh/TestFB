<template>
  <b-button class="nColorWhite" size="xs" variant="dark" @click="callModalDetail()">
    <i class="iconsminds-folder-cloud"></i> {{ pageTitle }}
    <menu-version-combobox-detail :page-title-modal="'DANH SÁCH PHIÊN BẢN'"
                                  :show-btn-all="btnShowAll"
                                  ref="refMenuVersionComboboxDetail"
                                  @submitEvent="subEvMenuVersionComboboxDetail"/>
  </b-button>
</template>

<script>
import {mapActions} from "vuex";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import MenuVersionComboboxDetail from "@/views/app/system-manager/page/combobox/menuVersionComboboxDetail.vue";

export default {
  components: {
    MenuVersionComboboxDetail
  },
  directives: {},
  props: {
    pageTitle: {
      type: String,
      default: "Phiên bản",
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
        id: this.$refs.refMenuVersionComboboxDetail.pageIdModal
      })
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refMenuVersionComboboxDetail.pageIdModal,
        1
      );
    },
    async subEvMenuVersionComboboxDetail(val) {
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
