<template>
  <b-button class="nColorWhite" size="xs" variant="danger" @click="callModalDetail()">
    <i class="iconsminds-folder-cloud"></i> {{ pageTitle }}
    <news-group-combobox-detail ref="refNewsGroupCombobox_Detail"
                                @handlerSubmitEvent="subEvNewsGroupCombobox_Detail"/>
  </b-button>
</template>

<script>
import {mapActions} from "vuex";
import NewsGroupTypeComboboxDetail from "@/views/app/news-content-manager/combobox/newsGroupTypeComboboxDetail";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NewsGroupComboboxDetail from "@/views/app/news-content-manager/combobox/newsGroupComboboxDetail";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";

export default {
  components: {
    NewsGroupComboboxDetail,
    NewsGroupTypeComboboxDetail,
  },
  directives: {},
  props: {
    pageTitle: {
      type: String,
      default: "Nhóm tin",
    },
    btnShowAll: {
      type: String,
      default: "1",
    },
    pageData: {
      type: String,
      default: NCoreConfig.isGuidEmpty,
    }
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
        id: this.$refs.refNewsGroupCombobox_Detail.pageId,
        newsGroupTypeId: this.pageData
      })
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refNewsGroupCombobox_Detail.pageId,
        1
      );
      // if (this.pageData === NCoreConfig.isGuidEmpty) {
      //   NCoreHelper.v2alertMess(this, 'Vui lòng chọn <span class="nFontBold nColorBlue">loại nhóm tin</span> cần xem dữ liệu', 1)
      // } else {
      //   await this.callStoreSendComboboxNoData({
      //     id: this.$refs.refNewsGroupCombobox_Detail.pageId,
      //     newsGroupTypeId: this.pageData
      //   })
      //   NCoreHelper.v2modalShowHide(
      //       this,
      //       this.$refs.refNewsGroupCombobox_Detail.pageId,
      //       1
      //   );
      // }
    },
    async subEvNewsGroupCombobox_Detail(val) {
      //==> Có nhiều dữ liệu được chọn, duyệt dữ liệu và hiển thị tất cả
      this.$emit('handlerSubmitEvent', val)
      NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refNewsGroupCombobox_Detail.pageId,
          0
      );
    },
  },
};
</script>
<style>
.nModal_BootTrap .card .card-body {
  padding: 5px !important;
}
</style>
