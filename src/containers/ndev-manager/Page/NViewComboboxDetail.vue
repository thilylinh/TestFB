<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="true"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="md"
           :title="pageTitleModal"
           @shown="callOpenPage"
           @hidden="resetStateModal">
    <b-row>
      <b-colxx class="nModal_BootTrap" xxs="12">
        <b-card class="no-header">
          <b-table-simple hover small caption-top responsive bordered striped style="overflow-x: hidden;">
            <b-thead head-variant="dark">
              <b-tr style="font-size: 10px;" class="text-justify">
                <b-th class="text-center sttWidth">STT</b-th>
                <b-th class="text-center">TÊN {{ tileHeaderTable.toUpperCase() }}</b-th>
              </b-tr>
            </b-thead>
            <b-tbody style="font-size: 12px;">
              <n-core-skeleton-tr/>
              <b-tr>
                <b-td colspan="2">
                  <n-button-default-search ref="refNViewComboboxDetail_Search"
                                           @handlerSubmitEvent="subEvNViewComboboxDetail_Search"/>
                </b-td>
              </b-tr>
              <b-tr v-show="!$store.state.componentLoadingRunFunctionInModal"
                    v-for="(items, index) in nViewComboboxData" :key="index">
                <b-td class="center sttWidth">{{ index + 1 }}</b-td>
                <b-td class="nHover selectCombobox text-justify"
                      @click="nViewComboboxDataSelect(items)">
                  {{ items.name }}
                </b-td>
              </b-tr>
              <b-tr v-if="dataCombobox.detailShowPaging === 1">
                <b-td colspan="2">
                  <n-core-paging-modal :current-page="nViewComboboxPageNumber"
                                       :default-page-size="10"
                                       :total-items="nViewComboboxTotalRecord"
                                       @handlePagingClick="nViewComboboxPagingClick"/>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-card>
      </b-colxx>
      <b-col xs="12" sm="12" md="12" lg="12" class="center">
        <n-core-button-select-all :show-btn-all="dataCombobox.detailShowBtnAll"
                                  ref="refNViewComboboxDetail_BtnSave"
                                  @submitEvent="subEvNViewComboboxDetail_BtnSave"/>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NCoreButtonSelectAll from "@/containers/ndev-core/components/NCoreButtonSelectAll";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCorePagingModal from "@/containers/ndev-core/components/NCorePagingModal";
import NButtonDefaultSearch from "@/containers/ndev-core/button_default/NButtonDefaultSearch";
import NCoreSkeletonTr from "@/containers/ndev-core/components/NCoreSkeletonTr";

export default {
  components: {
    NCoreSkeletonTr,
    NButtonDefaultSearch,
    NCorePagingModal,
    NCoreButtonSelectAll,
    NCoreSkeleton,
  },
  directives: {},
  props: ['sendParam', 'sendApi', 'sendShowPaging', 'sendPageId', 'sendKeyId'],
  mixins: [],
  validations: {},
  computed: {},
  data() {
    return {
      pageId: "nViewComboboxDetailPageId",
      nViewComboboxData: [],
      nViewComboboxTotalRecord: 0,
      nViewComboboxPageNumber: 1,
      newsGroupTypeSearch: '',
      pageTitleModal: '',
      tileHeaderTable: '',
      dataCombobox: [],
      dataApi: '',
      dataShowPaging: 0,
      dataSelectAll: 0,
      dataKeyId: '',
    };
  },
  watch: {
    sendParam: {
      handler: function (vData) {
        this.pageTitleModal = "DANH SÁCH " + vData.detailTitle
        this.tileHeaderTable = vData.detailTitle
        this.dataCombobox = vData
      },
      deep: true
    },
    sendApi: {
      handler: function (vData) {
        this.dataApi = vData
      },
      deep: true
    },
    sendShowPaging: {
      handler: function (vData) {
        this.dataShowPaging = vData
      },
      deep: true
    },
    sendPageId: {
      handler: function (vData) {
        this.pageId = vData
      },
      deep: true
    },
    sendKeyId: {
      handler: function (vData) {
        this.dataKeyId = vData
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    async callOpenPage() {
      this.nViewComboboxData = []
      switch (this.dataCombobox.detailIsUseData) {
        case 1: {
          for (let i = 0; i < this.dataCombobox.detailPageData.length; i++) {
            if (this.dataCombobox.detailPageData[i] === 1000) {
              this.nViewComboboxData.push({
                id: this.dataCombobox.detailPageData[i],
                name: 'Lượt đấu chung kết'
              })
            } else {
              this.nViewComboboxData.push({
                id: this.dataCombobox.detailPageData[i],
                name: 'Lượt đấu ' + this.dataCombobox.detailPageData[i]
              })
            }
          }
          break
        }
        case 2: {
          // Trả về dữ liệu tất cả là kiểu Guid.Empty
          this.dataSelectAll = NCoreConfig.isGuidEmpty
          await this.callComboboxDetailData()
          break
        }
        case 4: {
          // Truy vấn dữ liệu theo KeyID
          await this.callComboboxDetailDataByKey_viewDegree()
          break
        }
        default: {
          await this.callComboboxDetailData()
          break
        }
      }
    },
    resetStateModal() {
      this.nViewComboboxData = []
      this.nViewComboboxTotalRecord = 0
      this.nViewComboboxPageNumber = 1
      this.newsGroupTypeSearch = ''
    },
    async subEvNViewComboboxDetail_BtnSave(val) {
      if (val) {
        // Chọn tất cả
        this.$emit("handlerSubmitEvent", {
          id: this.dataSelectAll,
          name: 'Tất cả'
        });
      }
      NCoreHelper.v2modalShowHide(this, this.pageId, 0)
    },
    async callComboboxDetailData() {
      if (this.dataApi === '') {
        NCoreHelper.v2alertMess(this, 'Đường dẫn dữ liệu không hợp lệ', 2)
      } else {
        this.$showLoadingRunFunctionInModal()
        this.nViewComboboxData = []
        if (this.dataShowPaging === 1) {
          const iResult = await NCoreHelper.v2executeGET(this, this.dataApi, {
            search: this.newsGroupTypeSearch,
            pageSize: 10,
            pageNumber: this.nViewComboboxPageNumber,
            statusId: NCoreConfig.projectActiveData
          })
          this.nViewComboboxData = iResult.pageLists;
          this.nViewComboboxTotalRecord = iResult.totalRecord;
        } else {
          this.nViewComboboxData = await NCoreHelper.v2executeGET(this, this.dataApi)
        }
        this.$forceUpdate()
        this.$hideLoadingRunFunctionInModal()
      }
    },
    async callComboboxDetailDataByKey_viewDegree() {
      if (this.dataApi === '') {
        NCoreHelper.v2alertMess(this, 'Đường dẫn dữ liệu không hợp lệ', 2)
      } else {
        this.$showLoadingRunFunctionInModal()
        this.nViewComboboxData = []
        this.nViewComboboxData = await NCoreHelper.v2executeGET(this, this.dataApi,{
          viewDegree: this.dataKeyId
        })
        this.$forceUpdate()
        this.$hideLoadingRunFunctionInModal()
      }
    },
    async nViewComboboxDataSelect(data) {
      this.$emit("handlerSubmitEvent", {
        id: data.id,
        name: data.name
      });
      await this.subEvNViewComboboxDetail_BtnSave(false)
    },
    async nViewComboboxPagingClick(pageNumber) {
      this.nViewComboboxPageNumber = pageNumber;
      await this.callComboboxDetailData();
    },
    async subEvNViewComboboxDetail_Search(val) {
      this.nViewComboboxPageNumber = 1
      this.newsGroupTypeSearch = val
      await this.callComboboxDetailData()
      // this.$emit("handlerSubmitEvent", 1, val);
    },
  },
};
</script>
