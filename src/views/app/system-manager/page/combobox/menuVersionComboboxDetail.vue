<template>
  <b-modal :id="pageIdModal"
           :hide-footer="true"
           :hide-header-close="true"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="md"
           :title="pageTitleModal"
           @hidden="resetStateModal">
    <b-row>
      <b-colxx class="nModal_BootTrap" xxs="12">
        <b-card class="no-header">
          <b-table-simple hover small caption-top responsive bordered striped style="overflow-x: hidden;">
            <b-thead head-variant="dark">
              <b-tr style="font-size: 10px;" class="text-justify">
                <b-th class="text-center sttWidth">STT</b-th>
                <b-th class="text-center">TÊN PHIÊN BẢN</b-th>
              </b-tr>
            </b-thead>
            <b-tbody style="font-size: 12px;">
              <n-core-skeleton :flag-group="2"/>
              <b-tr>
                <b-td colspan="2">
                  <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                    <b-input :placeholder="$t('menu.search')"
                             autocomplete="off"
                             @input="val => searchChange(val)"/>
                  </div>
                </b-td>
              </b-tr>
              <b-tr v-show="!$store.state.componentLoading"
                    v-for="(items, index) in newsGroupTypeData" :key="index">
                <b-td class="center sttWidth">{{ index + 1 }}</b-td>
                <b-td class="nHover selectCombobox text-justify"
                      @click="newsGroupTypeDataSelect(items)">
                  {{ items.name }}
                </b-td>
              </b-tr>
              <b-tr>
                <b-td colspan="2">
                  <n-core-paging-modal :current-page="newsGroupTypePageNumber"
                                       :default-page-size="10"
                                       :total-items="newsGroupTypeTotalRecord"
                                       @handlePagingClick="newsGroupTypePagingClick"/>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-card>
      </b-colxx>
      <b-colxx xxs="12" class="center">
        <n-core-button-select-all :show-btn-all="showBtnAll"
                                  ref="refNewsGroupTypeComboboxDetailBtnSave"
                                  @submitEvent="subEvNewsGroupTypeComboboxDetailBtnSave"/>
      </b-colxx>
    </b-row>
  </b-modal>
</template>

<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NCoreButtonSelectAll from "@/containers/ndev-core/components/NCoreButtonSelectAll";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCorePagingModal from "@/containers/ndev-core/components/NCorePagingModal";
import newsGroupTypeApi from "@/views/app/news-content-manager/api/newsGroupTypeApi";
import {mapGetters} from "vuex";
import menuFunctionManagerApi from "@/views/app/system-manager/api/menuFunctionManagerApi";

export default {
  components: {
    NCorePagingModal,
    NCoreButtonSelectAll,
    NCoreSkeleton,
    Vuetable,
  },
  directives: {},
  props: {
    showBtnAll: {
      type: String,
      default: "1",
    },
    pageTitleModal: {
      type: String,
      default: "",
    }
  },
  mixins: [],
  validations: {},
  computed: {
    ...mapGetters(['storeSendComboboxNoData'])
  },
  data() {
    return {
      pageIdModal: "menuVersionComboboxDetailIdModal",
      newsGroupTypeData: [],
      newsGroupTypeTotalRecord: 0,
      newsGroupTypePageNumber: 1,
      newsGroupTypeSearch: '',
    };
  },
  watch: {
    storeSendComboboxNoData: async function (val) {
      if (this.pageIdModal === val.id) {
        if (this.newsGroupTypeData.length === 0) {
          await this.callNewsGroupType()
        }
      }
    }
  },
  mounted() {
    // await this.callNewsGroupType()
  },
  methods: {
    resetStateModal() {
      this.search = "";
    },
    async subEvNewsGroupTypeComboboxDetailBtnSave(val) {
      if (val) {
        // Chọn tất cả
        this.$emit("submitEvent", {
          id: 0,
          name: 'Tất cả'
        });
      }
      NCoreHelper.v2modalShowHide(this, this.pageIdModal, 0)
    },
    async callNewsGroupType() {
      this.$showLoading()
      this.newsGroupTypeData = []
      this.newsGroupTypeData = await NCoreHelper.v2executeGET(this, menuFunctionManagerApi.MANAGER_MENU_FUNCTION_GET_VERSION)

      this.$hideLoading()
    },
    async newsGroupTypeDataSelect(data) {
      this.$emit("submitEvent", {
        id: data.id,
        name: data.name
      });
      await this.subEvNewsGroupTypeComboboxDetailBtnSave(false)
    },
    async newsGroupTypePagingClick(pageNumber) {
      this.newsGroupTypePageNumber = pageNumber;
      await this.callNewsGroupType();
    },
    searchChange(val) {
      this.$emit("submitEvent", 1, val);
    },
  },
}
;
</script>
