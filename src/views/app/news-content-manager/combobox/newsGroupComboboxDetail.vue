<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="false"
           :title="pageTitle"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="md"
           @shown="callOpenModal"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12">
          <n-core-tree-view-child ref="refNewsGroupComboboxDetail_TreeviewChild"/>
        </b-colxx>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu lựa chọn'"
                         :showBtnSave="'1'"
                         btn-cancel="Hủy bỏ"
                         ref="refNewsGroupComboboxDetail_BtnSave"
                         @submitEvent="subEvNewsGroupComboboxDetail_BtnSave"/>
    </b-form>
  </b-modal>
</template>
<script>

import {mapActions} from "vuex";
import NCoreCombobox from "../../../../containers/ndev-core/components/NCoreCombobox";
import NCoreTreeViewChild from "../../../../containers/ndev-core/components/NCoreTreeViewChild";
import NCoreButtonRun from "../../../../containers/ndev-core/components/NCoreButtonRun";
import newsGroupApi from "../api/newsGroupApi";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";

export default {
  components: {
    NCoreButtonRun,
    NCoreTreeViewChild,
    NCoreCombobox
  },
  props: {},
  data() {
    return {
      pageId: 'newsGroupComboboxDetailPageId',
      pageTitle: 'DANH SÁCH NHÓM TIN',
    };
  },
  mixins: [],
  validations: {},
  computed: {},
  watch: {},
  created() {
  },
  async mounted() {
  },
  methods: {
    ...mapActions(['callStoreSendTreeViewChild']),
    async callOpenModal() {
      const iDataReceive = this.$store.state.storeCrud.storeSendComboboxNoData
      if (iDataReceive.id === this.pageId) {
        const iResult =
            // => Trả dữ liệu qua cây thư mục
            await this.callStoreSendTreeViewChild({
              data: await NCoreHelper.v2executeGET(this, newsGroupApi.NEWS_GROUP_TREE_VIEW, {
                newsGroupTypeId: iDataReceive.newsGroupTypeId
              }),
              newsGroupRelationshipData: []
            })
      }
    },
    async resetStateModal() {
      this.$hideProcessing()
    },
    async subEvNewsGroupTreeViewCombobox_NewsGroupType(val) {
      // => Gọi danh sách nhóm tin theo loại nhóm tin
      const iResult = await NCoreHelper.v2executeGET(this, newsGroupApi.NEWS_GROUP_TREE_VIEW, {
        newsGroupTypeId: val.id
      })
      // => Trả dữ liệu qua cây thư mục
      await this.callStoreSendTreeViewChild({
        data: iResult,
        newsGroupRelationshipData: this.newsGroupRelationshipData
      })
    },
    async subEvNewsGroupComboboxDetail_BtnSave(val) {
      if (val) {
        this.$showProcessing()
        // => lấy dữ liệu các nội dung được chọn từ treeView
        const iSelect = this.$refs.refNewsGroupComboboxDetail_TreeviewChild.handler_selectList()
        this.$emit('handlerSubmitEvent', iSelect)
      } else {
        NCoreHelper.v2modalShowHide(
            this,
            this.pageId,
            0
        );
      }
    }
  },
};
</script>
