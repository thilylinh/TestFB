<template>
  <b-button class="nColorWhite" size="xs" variant="dark" @click="callModalDetail()">
    <i class="iconsminds-folder-cloud"></i> {{ pageTitle }}
    <news-author-combobox-detail :page-title-modal="'TÁC GIẢ'"
                                     :show-btn-all="btnShowAll"
                                     ref="refNewsGroupTypeComboboxDetail"
                                     @submitEvent="subEvNewsGroupTypeComboboxDetail"/>
  </b-button>
</template>

<script>
import {mapActions} from "vuex";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NewsAuthorComboboxDetail from "@/views/app/news-content-manager/combobox/newsAuthorComboboxDetail.vue";

export default {
  components: {
    NewsAuthorComboboxDetail,
  },
  directives: {},
  props: {
    pageTitle: {
      type: String,
      default: "Tác giả",
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
