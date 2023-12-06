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
          <b-table-simple hover small caption-top responsive bordered striped style="overflow-x: hidden;">
            <b-thead head-variant="dark">
              <b-tr style="font-size: 10px;" class="text-justify">
                <b-th class="text-justify">* LOẠI NHÓM TIN</b-th>
              </b-tr>
            </b-thead>
            <b-tbody style="font-size: 12px;">
              <n-core-skeleton :flag-group="2"/>
              <b-tr>
                <b-td class="text-center nFontBold nColorRed nHover selectCombobox"
                      @click="callNewsGroupType()">
                  {{ newsGroupTypeName }}
                </b-td>
              </b-tr>
              <b-tr :hidden="isHideNewsGroupType"
                    style="font-size: 10px; background-color: black!important;color: whitesmoke;"
                    class="text-justify">
                <b-th class="text-justify">* DANH SÁCH LOẠI NHÓM TIN</b-th>
              </b-tr>
              <b-tr :hidden="isHideNewsGroupType">
                <b-td>
                  <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                    <b-input :placeholder="$t('menu.search')"
                             autocomplete="off"
                             @input="val => searchChange(val)"/>
                  </div>
                </b-td>
              </b-tr>
              <b-tr :hidden="isHideNewsGroupType"
                    v-show="!$store.state.componentLoadingRunFunctionInModal"
                    v-for="(items, index) in newsGroupTypeData" :key="index">
                <b-td class="nHover selectCombobox"
                      @click="newsGroupTypeDataSelect(items)">
                  {{ index + 1 }}. {{ items.name }}
                </b-td>
              </b-tr>
              <b-tr :hidden="isHideNewsGroupType">
                <b-td>
                  <n-core-paging-modal :current-page="newsGroupTypePageNumber"
                                       :default-page-size="10"
                                       :total-items="newsGroupTypeTotalRecord"
                                       @handlePagingClick="newsGroupTypePagingClick"/>
                </b-td>
              </b-tr>
              <b-tr :hidden="!isHideNewsGroupType"
                    style="font-size: 10px; background-color: black!important;color: whitesmoke;"
                    class="text-justify">
                <b-th class="text-justify">* DANH SÁCH NHÓM TIN</b-th>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <!--          <b-button class="mb-1 form-control" variant="dark default">{{ newsGroupTypeName }}</b-button>-->
          <!--          <b-dropdown :text="newsGroupTypeName" size="xs" variant="dark" class="form-control NStatusDataView">-->
          <!--            <b-dropdown-item @click="changeValue(0, 'Tất cả')">1. Tất cả</b-dropdown-item>-->
          <!--            <b-dropdown-item @click="changeValue(1, 'Khóa')">2. Khóa</b-dropdown-item>-->
          <!--            <b-dropdown-item @click="changeValue(2, 'Chờ duyệt')">3. Chờ duyệt</b-dropdown-item>-->
          <!--            <b-dropdown-item @click="changeValue(3, 'Hoạt động')">4. Hoạt động</b-dropdown-item>-->
          <!--          </b-dropdown>-->
        </b-colxx>
        <b-colxx xxs="12"
                 :hidden="!isHideNewsGroupType"
                 v-show="!$store.state.componentLoadingRunFunctionInModal">
          <n-core-tree-select page-id="'NewsGroupComboboxOne_TreeViewPageId'"
                              ref="refNewsGroupComboboxOne_TreeView"
                              @handlerSubmitEvent="subEvNewsGroupComboboxOne_TreeView"/>
        </b-colxx>
      </b-row>

      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         :showBtnSave="newsGroupComboboxOneBtnSaveShow"
                         :btn-cancel="newsGroupComboboxOneBtnSaveTitleCancel"
                         ref="refNewsGroupComboboxOneBtnSave"
                         @submitEvent="subEvNewsGroupComboboxOneBtnSave"/>
    </b-form>
  </b-modal>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import newsGroupTypeApi from "@/views/app/news-content-manager/api/newsGroupTypeApi";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NPagination from "@/containers/ndev-manager/Page/NPagination";
import NCorePagingModal from "@/containers/ndev-core/components/NCorePagingModal";
import newsGroupApi from "@/views/app/news-content-manager/api/newsGroupApi";
import NCoreTreeSelect from "@/containers/ndev-core/components/NCoreTreeSelect";
import {mapActions} from "vuex";

export default {
  components: {
    NCoreTreeSelect,
    NCorePagingModal,
    NPagination,
    NCoreSkeleton,
    NCoreButtonRun
  },
  props: {},
  data() {
    return {
      pageId: 'newsGroupComboboxOneId',
      pageTitle: 'DANH SÁCH NHÓM TIN',
      newsGroupTypeName: '-- Chọn loại nhóm tin --',
      newsGroupTypeData: [],
      newsGroupTypeTotalRecord: '',
      newsGroupTypePageNumber: 1,
      newsGroupTypeSearch: '',
      newsGroupComboboxOneBtnSaveShow: '1',
      newsGroupComboboxOneBtnSaveTitleCancel: 'Hủy bỏ',
      newsGroupComboboxOneBtnSaveFlag: 0,
      isHideNewsGroupType: true,
      treeViewNewsGroupReceivedCombobox: [],
    };
  },
  mixins: [],
  validations: {},
  methods: {
    ...mapActions(['callStoreSendTreeViewSelect']),
    async resetStateModal() {
      await this.subEvNewsGroupComboboxOneBtnSave(false)
    },
    async callNewsGroupType() {
      this.$showLoadingRunFunctionInModal()
      this.newsGroupTypeData = []
      const iResult = await NCoreHelper.v2executeGET(this, newsGroupTypeApi.NEWS_GROUP_TYPE_GET_PAGING, {
        search: this.newsGroupTypeSearch,
        pageSize: 10,
        pageNumber: this.newsGroupTypePageNumber,
        statusId: NCoreConfig.projectActiveData
      })
      this.newsGroupTypeData = iResult.pageLists;
      this.newsGroupTypeTotalRecord = iResult.totalRecord;
      this.newsGroupComboboxOneBtnSaveShow = '0'
      this.newsGroupComboboxOneBtnSaveTitleCancel = 'Quay về'
      this.newsGroupComboboxOneBtnSaveFlag = 1 //=> Chuyển trạng thái về trang loại nhóm tin
      this.isHideNewsGroupType = false //=> Hiển thị dữ liệu trang loại nhóm tin
      this.$hideLoadingRunFunctionInModal()
    },
    async newsGroupTypeDataSelect(data) {
      this.newsGroupTypeName = '-- ' + data.name + ' --'
      //====Lấy dữ liệu danh sách nhóm tin theo loại nhóm tin=====
      //==========================================================
      await this.callTreeViewSelect(
        await NCoreHelper.v2executeGET(this, newsGroupApi.NEWS_GROUP_TREE_VIEW, {
          newsGroupTypeId: data.id
        }), null)
      await this.subEvNewsGroupComboboxOneBtnSave(false)
    },
    async callTreeViewSelect(vData, vDataSelect) {
      await this.callStoreSendTreeViewSelect({
        id: this.$refs.refNewsGroupComboboxOne_TreeView.pageId,
        data: vData,
        dataSelect: vDataSelect,
        noChildrenText: 'Không có dữ liệu menu con',
        messageNoChoice: 'Chọn dữ liệu menu cha'
      });
    },
    async subEvNewsGroupComboboxOne_TreeView(val) {
      this.treeViewNewsGroupReceivedCombobox = val
    },
    async subEvNewsGroupComboboxOneBtnSave(val) {
      if (val) {

      } else {
        if (this.newsGroupComboboxOneBtnSaveFlag === 0) {
          NCoreHelper.v2modalShowHide(this, this.pageId, 0);
        } else {
          // Đang ở trang danh sách loại nhóm tin
          this.newsGroupComboboxOneBtnSaveFlag = 0
          this.newsGroupComboboxOneBtnSaveShow = '1'
          this.newsGroupComboboxOneBtnSaveTitleCancel = 'Hủy bỏ'
          this.isHideNewsGroupType = true //=> Ẩn dữ liệu trang loại nhóm tin
        }
      }
    },
    async newsGroupTypePagingClick(pageNumber) {
      this.newsGroupTypePageNumber = pageNumber;
      await this.callNewsGroupType();
    },
  },
  computed: {},
  watch: {},
  created() {
  },
  async mounted() {

  },
};
</script>
