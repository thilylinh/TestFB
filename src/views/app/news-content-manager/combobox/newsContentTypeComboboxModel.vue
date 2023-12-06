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
    @shown="callOpenPage()"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12">
          <b-table-simple hover small caption-top responsive bordered striped style="overflow-x: hidden;">
            <b-thead head-variant="dark" style="font-size: 10px;">
              <b-tr class="text-justify">
                <b-th class="text-center sttWidth">#</b-th>
                <b-th class="text-center">TÊN LOẠI NỘI DUNG</b-th>
              </b-tr>
            </b-thead>
            <b-tbody style="font-size: 12px;">
              <n-core-skeleton :flag-group="1"/>
              <b-tr :hidden="isNoData" class="text-center">
                <b-td colspan="3" v-html="noDataTemplate"></b-td>
              </b-tr>
              <b-tr :hidden="!isNoData"
                    v-show="!$store.state.componentLoadingRunFunctionInModal"
                    v-for="(items, index) in pageData" :key="index">
                <b-td class="sttWidth center">{{ index + 1 }}</b-td>
                <b-td class="nHover selectCombobox"
                      @click="newsContentTypeComboboxModelSelect(items)">
                  {{ items.name }}
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-colxx>
      </b-row>
      <n-core-button-run :show-btn-save="'0'"
                         ref="refNewsContentTypeComboboxModelBtnSave"
                         @submitEvent="subEvNewsContentTypeComboboxModelBtnSave"/>
    </b-form>
  </b-modal>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import newsContentApi from "@/views/app/news-content-manager/api/newsContentApi";

export default {
  components: {
    NCoreSkeleton,
    NCoreButtonRun
  },
  props: {},
  data() {
    return {
      pageId: 'newsContentTypeComboboxModelId',
      pageTitle: 'DANH SÁCH LOẠI NỘI DUNG',
      pageData: [],
      isNoData: true,
      noDataTemplate: NCoreConfig.noDataTemplate,
    };
  },
  mixins: [],
  validations: {},
  methods: {
    async callOpenPage() {
      this.$showLoadingRunFunctionInModal()
      if (this.pageData.length === 0) {
        this.pageData = []
        this.pageData = await NCoreHelper.v2executeGET(this, newsContentApi.NEWS_CONTENT_GET_COMBOBOX_NEWS_CONTENT_TYPE)
        this.isNoData = this.pageData.length > 0
      }
      this.$hideLoadingRunFunctionInModal()
    },
    async resetStateModal() {
    },
    async newsContentTypeComboboxModelSelect(val) {
      this.$showProcessing()
      this.$emit('handlerSubmitEvent', {
        id: val.id,
        name: val.name,
        isAddNew: true,
        data: null
      })
    },
    //=======================BTN-SAVE========================================
    async subEvNewsContentTypeComboboxModelBtnSave(val) {
      if (val) {
      }
      NCoreHelper.v2modalShowHide(this, this.pageId, 0)
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
