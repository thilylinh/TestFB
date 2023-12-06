<template>
  <b-modal
    :id="pageId"
    :hide-footer="true"
    :hide-header-close="false"
    :title="pageTitle"
    cancel-title="Hủy bỏ"
    cancel-variant="outline-primary"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="md"
    @shown="callOpenPage(true)"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12">
          <b-table-simple hover small caption-top responsive bordered striped style="overflow-x: hidden;">
            <b-thead head-variant="dark" style="font-size: 10px;">
              <b-tr class="text-justify">
                <b-th class="text-center sttWidth">#</b-th>
                <b-th class="text-center sttWidth">
                  <b-form-checkbox v-model="isSelectAll"
                                   unchecked-value="not_accepted"
                                   value="accepted"
                                   title="Chọn tất cả"
                                   @input="selectAllChange">
                  </b-form-checkbox>
                </b-th>
                <b-th class="text-center">TÊN TỪ KHÓA SEO</b-th>
              </b-tr>
            </b-thead>
            <b-tbody style="font-size: 12px;">
              <n-core-skeleton :flag-group="1"/>
              <b-tr>
                <b-td colspan="3">
                  <n-button-default-search ref="refNewsSeoKeyWordPagingModelButtonDefaultSearch"
                                           @handlerSubmitEvent="subEvNewsSeoKeyWordPagingModelButtonDefaultSearch"/>
                </b-td>
              </b-tr>
              <b-tr :hidden="isNoData" class="text-center">
                <b-td colspan="3" v-html="noDataTemplate"></b-td>
              </b-tr>
              <b-tr :hidden="!isNoData"
                    v-show="!$store.state.componentLoadingRunFunctionInModal"
                    v-for="(items, index) in pageData" :key="index">
                <b-td class="sttWidth center">{{ index + 1 }}</b-td>
                <b-td class="sttWidth center">
                  <b-form-checkbox v-model="items.checked"
                                   unchecked-value="not_accepted"
                                   value="accepted">
                    <span class="nHover selectCombobox"></span>
                  </b-form-checkbox>
                </b-td>
                <b-td class="nHover selectCombobox"
                      @click="newsSeoKeyWordPagingModelSelect(items)">
                  {{ items.name }}
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-colxx>
        <b-colxx xxs="12" :hidden="!isNoData">
          <n-core-paging-modal :current-page="pageNumber"
                               :default-page-size="pageSize"
                               :total-items="pageTotalRecord"
                               @handlePagingClick="newsSeoKeyWordPagingModelPagingClick()"/>
        </b-colxx>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         ref="refNewsSeoKeyWordPagingModelBtnSave"
                         @submitEvent="subEvNewsSeoKeyWordPagingModelBtnSave"/>
    </b-form>
  </b-modal>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NPagination from "@/containers/ndev-manager/Page/NPagination";
import NCorePagingModal from "@/containers/ndev-core/components/NCorePagingModal";
import NCoreTreeSelect from "@/containers/ndev-core/components/NCoreTreeSelect";
import {mapActions} from "vuex";
import newsSeoKeyWordApi from "../api/newsSeoKeyWordApi";
import NButtonDefaultSearch from "../../../../containers/ndev-core/button_default/NButtonDefaultSearch";

export default {
  components: {
    NButtonDefaultSearch,
    NCoreTreeSelect,
    NCorePagingModal,
    NPagination,
    NCoreSkeleton,
    NCoreButtonRun
  },
  props: {},
  data() {
    return {
      pageId: 'newsSeoKeyWordPagingModelId',
      pageTitle: 'DANH SÁCH TỪ KHÓA SEO',
      pageSearch: '',
      pageSize: 8,
      pageNumber: 1,
      pageData: [],
      pageTotalRecord: 0,
      isNoData: true,
      noDataTemplate: NCoreConfig.noDataTemplate,
      isSelectAll: NCoreConfig.uncheckedValue
    };
  },
  mixins: [],
  validations: {},
  methods: {
    ...mapActions(['callStoreSendTreeViewSelect']),
    async callOpenPage() {
      this.$showLoadingRunFunctionInModal()
      this.pageData = []
      const iResult = await NCoreHelper.v2executeGET(this, newsSeoKeyWordApi.NEWS_SEO_KEYWORD_GET_PAGING_MODAL, {
        search: this.pageSearch,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        statusId: NCoreConfig.projectActiveData
      })
      this.pageData = iResult.pageLists
      this.pageTotalRecord = iResult.totalRecord
      this.isNoData = this.pageData.length > 0
      this.$hideLoadingRunFunctionInModal()
    },
    async resetStateModal() {
      await this.subEvnewsSeoKeyWordPagingModelBtnSave(false)
    },
    async subEvNewsSeoKeyWordPagingModelButtonDefaultSearch(val) {
      this.pageSearch = val
      this.pageNumber = 1
      await this.callOpenPage(false)
    },
    async newsSeoKeyWordPagingModelPagingClick(pageNumber) {
      this.pageNumber = pageNumber;
      await this.callOpenPage(false);
    },
    async newsSeoKeyWordPagingModelSelect(data) {
      const iValue = this.pageData.find(o => o.id === data.id)
      iValue.checked = iValue.checked === NCoreConfig.uncheckedValue ? NCoreConfig.checkedValue : NCoreConfig.uncheckedValue
    },
    //=======================BTN-SAVE========================================
    async subEvNewsSeoKeyWordPagingModelBtnSave(val) {
      if (val) {
        this.$showProcessing()
        let iResult = []
        for (let i = 0; i < this.pageData.length; i++) {
          if (this.pageData[i].checked === NCoreConfig.checkedValue) iResult.push(this.pageData[i].name)
        }
        this.$emit('handlerSubmitEvent', iResult)
      }
      NCoreHelper.v2modalShowHide(this, this.pageId, 0)
    },
    //=======================================================================
    //==============================FUNCTION=================================
    async selectAllChange() {
      for (let i = 0; i < this.pageData.length; i++) {
        this.pageData[i].checked = this.isSelectAll
      }
    },
    //=======================================================================
  },
  computed: {},
  watch: {},
  created() {
  },
  async mounted() {
  },
};
</script>
