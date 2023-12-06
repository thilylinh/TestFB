<template>
  <b-row style="margin-top: -20px">
    <b-col xs="12" sm="12" md="12" lg="12" class="text-center">
      <news-group-type-combobox :btn-show-all="'0'"
                                :page-title="newsGroupTypeComboboxTitle"
                                ref="refNewsContent_NewsGroupTypeCombobox"
                                @submitEvent="subEvNewsContent_NewsGroupTypeCombobox"/>
      <news-group-combobox :btn-show-all="'0'"
                           :page-title="newsGroupComboboxTitle"
                           :page-data="newsGroupTypeCombobox"
                           ref="refNewsContent_NewsGroupCombobox"
                           @handlerSubmitEvent="subEvNewsContent_NewsGroupCombobox"/>
    </b-col>
    <b-col xs="12" sm="12" md="12" lg="12" class="mt-2">
      <b-table-simple small caption-top responsive bordered>
        <b-thead head-variant="dark">
          <b-tr style="font-size: 10px;">
            <b-th class="sttWidth center">#</b-th>
            <b-th class="center">TÊN BÀI VIẾT</b-th>
          </b-tr>
        </b-thead>
        <b-tbody style="font-size: 12px;">
          <n-core-skeleton-tr/>
          <b-tr v-for="(items, index) in contentData"
                :key="index"
                v-if="contentData.length > 0">
            <b-td class="center">{{ index + 1 }}</b-td>
            <b-td class="NHover selectCombobox" @click="choseLink(items)">
              <span class="nFontBold nColorBlue">{{items.name}}</span>
              <br/>
              <small class="nFontBold">{{items.author}} - {{items.dateTimeStart | formatDateDDMMYYYY}} - {{ items.newsGroupName}}</small>
              <br/>
              <small style="font-style: italic;color: red">{{ items.summary }}</small>
            </b-td>
          </b-tr>
          <b-tr v-if="contentData.length <= 0">
            <b-td class="text-center" colspan="2">
              <span v-html="emptyTableTemplate"></span>
            </b-td>
          </b-tr>
          <b-tr v-else-if="contentData.length > 0">
            <b-td colspan="2">
              <n-core-paging-modal :current-page="newsGroupTypePageNumber"
                                   :default-page-size="4"
                                   :total-items="newsGroupTypeTotalRecord"
                                   @handlePagingClick="newsGroupTypePagingClick"/>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-col>
  </b-row>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import newsContentApi from "@/views/app/news-content-manager/api/newsContentApi";
import NewsGroupTypeCombobox from "./newsGroupTypeCombobox.vue";
import NewsGroupCombobox from "./newsGroupCombobox.vue";
import NCoreSkeletonTr from "../../../../containers/ndev-core/components/NCoreSkeletonTr.vue";
import NCorePagingModal from "../../../../containers/ndev-core/components/NCorePagingModal.vue";

export default {
  components: {
    NCorePagingModal,
    NCoreSkeletonTr,
    NewsGroupCombobox,
    NewsGroupTypeCombobox,
    NCoreSkeleton,
    NCoreButtonRun
  },
  props: {},
  data() {
    return {
      emptyTableTemplate: NCoreConfig.tableNoDataTemplate,
      newsGroupTypeCombobox: NCoreConfig.isGuidEmpty,
      newsGroupTypeComboboxTitle: 'Loại nhóm tin: -- Chọn loại nhóm tin --',
      newsGroupCombobox: [],
      newsGroupComboboxTitle: 'Nhóm tin: -- Chọn loại nhóm tin --',
      contentData: [],
      newsGroupTypeTotalRecord: 0,
      newsGroupTypePageNumber: 1,
      newsGroupTypeSearch: '',
    };
  },
  mixins: [],
  validations: {},
  methods: {
    async subEvNewsContent_NewsGroupTypeCombobox(val) {
      this.newsGroupTypeCombobox = val.id
      this.newsGroupTypeComboboxTitle = 'Loại nhóm tin: -- ' + val.name + ' --'
      await this.fetchData(true)
    },
    async subEvNewsContent_NewsGroupCombobox(val) {
      this.newsGroupCombobox = []
      let sendName = ''
      for (let i = 0; i < val.length; i++) {
        if (sendName === '') {
          sendName = val[i].name
        } else {
          sendName = sendName + ', ' + val[i].name
        }
        this.newsGroupCombobox.push(val[i].id)
      }
      this.newsGroupComboboxTitle = 'Loại nhóm tin: -- ' + sendName + ' --'
      await this.fetchData(true)
    },
    async fetchData() {
      this.$showLoadingRunFunctionInModal()
      const iResult = await NCoreHelper.v2executeGET(
          this,
          newsContentApi.COMBOBOX_NEWS_CONTENT,
          {
            search: this.newsGroupTypeSearch,
            pageSize: 4,
            pageNumber: this.newsGroupTypePageNumber,
            newsGroupTypeId: this.newsGroupTypeCombobox,
            newsGroupId: JSON.stringify(this.newsGroupCombobox)
          }
      );
      this.contentData = iResult.pageLists;
      this.newsGroupTypeTotalRecord = iResult.totalRecord;
      this.$hideLoadingRunFunctionInModal();
    },
    async newsGroupTypePagingClick(pageNumber) {
      this.newsGroupTypePageNumber = pageNumber;
      await this.fetchData();
    },
    choseLink(data) {
      this.$emit('handlerSubmitEvent', data)
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  async mounted() {
  },
};
</script>
