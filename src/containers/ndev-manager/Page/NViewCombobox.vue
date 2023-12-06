<template>
  <b-button class="nColorWhite" size="xs" :variant="dataCombobox.color" @click="callModalDetail()">
    <i :class="dataCombobox.icons"></i> {{ dataCombobox.title }}
    <n-view-combobox-detail :send-param="dataCombobox"
                            :send-api="nViewCombobox_Api"
                            :send-show-paging="nViewCombobox_ShowPaging"
                            :send-page-id="nViewCombobox_PageId"
                            :send-key-id="nViewCombobox_KeyId"
                            ref="refNViewComboboxDetail"
                            @handlerSubmitEvent="subEvNViewComboboxDetail"/>
  </b-button>
</template>

<script>
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NViewComboboxDetail from "@/containers/ndev-manager/Page/NViewComboboxDetail";

export default {
  components: {
    NViewComboboxDetail
  },
  directives: {},
  props: ['sendParam'],
  mixins: [],
  validations: {},
  computed: {},
  data() {
    return {
      dataCombobox: [],
      nViewCombobox_Api: '',
      nViewCombobox_KeyId: '',
      nViewCombobox_ShowPaging: 0,
      nViewCombobox_PageId: ""
    };
  },
  watch: {
    sendParam: {
      handler: function (vValue) {
        this.dataCombobox = vValue
        if (vValue.callNumber === 0) {
          this.nViewCombobox_Api = vValue.detailApi
          this.nViewCombobox_ShowPaging = vValue.detailShowPaging
          this.nViewCombobox_PageId = vValue.detailPageId
          this.nViewCombobox_KeyId = vValue.detailKeyId
        }
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    async callModalDetail() {
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refNViewComboboxDetail.pageId,
        1
      );
    },
    async subEvNViewComboboxDetail(val) {
      val.comboboxPageId = this.nViewCombobox_PageId
      this.$emit('handlerSubmitEvent', val)
    },
  },
};
</script>
<style>
.nModal_BootTrap .card .card-body {
  padding: 5px !important;
}
</style>
