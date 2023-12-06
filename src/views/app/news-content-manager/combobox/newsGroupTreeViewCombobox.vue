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
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12">
          <label class="font-weight-700">*. Loại nhóm tin</label>
        </b-colxx>
        <b-colxx xxs="12">
          <n-core-combobox ref="refNewsGroupTreeViewCombobox_NewsGroupType"
                           @handlerSubmitEvent="subEvNewsGroupTreeViewCombobox_NewsGroupType"/>
        </b-colxx>
        <b-colxx xxs="12" class="mt-2">
          <label class="font-weight-700">*. Danh sách nhóm tin</label>
        </b-colxx>
        <b-colxx xxs="12">
          <n-core-tree-view-child ref="refTreeViewChildNewsGroupTreeViewCombobox"/>
        </b-colxx>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         :showBtnSave="'1'"
                         btn-cancel="Hủy bỏ"
                         ref="refNewsGroupTreeViewComboboxBtnSave"
                         @submitEvent="subEvNewsGroupTreeViewComboboxBtnSave"/>
    </b-form>
  </b-modal>
</template>
<script>

import {mapActions, mapGetters} from "vuex";
import NCoreCombobox from "../../../../containers/ndev-core/components/NCoreCombobox";
import NCoreTreeViewChild from "../../../../containers/ndev-core/components/NCoreTreeViewChild";
import NCoreButtonRun from "../../../../containers/ndev-core/components/NCoreButtonRun";
import newsGroupTypeApi from "../api/newsGroupTypeApi";
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
      pageId: 'newsGroupTreeViewComboboxPageId',
      pageTitle: 'DANH SÁCH NHÓM TIN',
      nCoreTreeViewPageId: 'newsGroupTreeViewComboboxTreeViewPageId',
      newsGroupRelationshipData: [],
    };
  },
  mixins: [],
  validations: {},
  computed: {
    ...mapGetters(['storeSendComboboxNoData'])
  },
  watch: {
    storeSendComboboxNoData: async function (val) {
      if (this.pageId === val.id) {
        //=====Lấy dữ liệu combobox NewsGroupType=====
        await this.callStoreSendCombobox({
          isShowTitleHeader: true,
          iMessage: '-- Chọn loại nhóm tin --',
          isNoHeader: false,
          api: newsGroupTypeApi.NEWS_GROUP_TYPE_COMBOBOX,
          isAdd: true,
          dataSend: ''
        });
        //====Dữ liệu nhóm tin đang lựa chọn========
        this.newsGroupRelationshipData = val.newsGroupRelationshipData
      }
    }
  },
  created() {
  },
  async mounted() {
  },
  methods: {
    ...mapActions(['callStoreSendTreeViewSelect', 'callStoreSendCombobox', 'callStoreSendTreeViewChild']),
    async resetStateModal() {
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
    async subEvNewsGroupTreeViewComboboxBtnSave(val) {
      if (val) {
        this.$showProcessing()
        // => lấy dữ liệu các nội dung được chọn từ treeView
        const iSelect = this.$refs.refTreeViewChildNewsGroupTreeViewCombobox.handler_selectList()
        if (iSelect.length === 0) {
          NCoreHelper.v2alertMess(this, 'Bạn chưa chọn dữ liệu nhóm tin', 2)
          this.$hideProcessing()
        } else {
          // Xử lý dữ liệu // => Trả dữ liệu
          this.$emit('handlerSubmitEvent', iSelect)
        }
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
