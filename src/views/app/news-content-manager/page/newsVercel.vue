<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">Quản lý Vercel</h1>
          <piaf-breadcrumb/>
          <div class="separator mb-2"/>
        </b-colxx>
      </b-row>
      <template>
        <n-core-skeleton :flag-group="3"/>
        <BCard>
          <b-row v-show="!$store.state.componentLoading">
            <b-colxx xxs="12">
              <b-row>
                <b-colxx xxs="12" sm="3">
                  <b-row>
                    <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
                      <label class="font-weight-700">1. Github gốc</label>
                    </b-col>
                    <b-col lg="12" md="12" sm="12" xs="12">
                      <n-core-combobox ref="refNewsGroupEvent_ComboboxVia"
                                       @handlerSubmitEvent="subEvNewsGroupEvent_ComboboxVia"/>
                    </b-col>
                  </b-row>
                </b-colxx>
                <b-colxx xxs="12" sm="3">
                  <b-row>
                    <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
                      <label class="font-weight-700">2. Github mới</label>
                    </b-col>
                    <b-col lg="12" md="12" sm="12" xs="12">
                      <b-form-input id="menuFunctionManagerEvent_txtDomainVercel"
                                    autocomplete="off"
                                    placeholder="Nhập tên github mới ..."/>
                    </b-col>
                  </b-row>
                </b-colxx>
                <b-colxx xxs="12" sm="3">
                  <b-row>
                    <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
                      <label class="font-weight-700">3. Hành động</label>
                    </b-col>
                    <b-col lg="12" md="12" sm="12" xs="12">
                      <b-button class="nFontButton btn-multiple-state btn-shadow"
                                size="xs"
                                type="button"
                                variant="danger"
                                @click="callSelectAll(1)">
                        <span class="label">Tạo GitHub</span>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-colxx>
              </b-row>
              <b-row>
                <b-colxx xxs="12" sm="6">
                  <b-row>
                    <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
                      <label class="font-weight-700">4. Hậu tố Vercel</label>
                    </b-col>
                    <b-col lg="12" md="12" sm="12" xs="12">
                      <b-form-input id="menuFunctionManagerEvent_txtDomainVercelNew"
                                    autocomplete="off"
                                    placeholder="Nhập tên vercel ..."
                                    v-model="hauToVercel"
                                    @input="createVercelNew()"/>
                    </b-col>
                  </b-row>
                </b-colxx>
                <b-colxx xxs="12" sm="3">
                  <b-row>
                    <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
                      <label class="font-weight-700">5. Hành động</label>
                    </b-col>
                    <b-col lg="12" md="12" sm="12" xs="12">
                      <b-button class="nFontButton btn-multiple-state btn-shadow"
                                size="xs"
                                type="button"
                                variant="danger"
                                @click="callSelectAll(1)">
                        <span class="label">Tạo Vercel</span>
                      </b-button>
                    </b-col>
                  </b-row>
                </b-colxx>
              </b-row>
            </b-colxx>
            <b-colxx xxs="12" class="NTable" style="margin-top: 10px;">
              <b-table-simple hover small caption-top responsive bordered striped>
                <b-thead head-variant="dark">
                  <b-tr style="font-size: 10px;" class="text-justify">
                    <b-th class="text-center sttWidth">STT</b-th>
                    <b-th class="text-center sttWidth"></b-th>
                    <b-th class="text-center">NHÓM TIN</b-th>
                    <b-th class="text-center">VERCEL CŨ</b-th>
                    <b-th class="text-center">VERCEL MỚI</b-th>
                    <b-th class="text-center">HÀNH ĐỘNG</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody style="font-size: 12px;">
                  <n-core-skeleton-tr/>
                  <b-tr>
                    <b-td colspan="3">
                      <b-button class="nFontButton btn-multiple-state btn-shadow"
                                size="xs"
                                type="button"
                                variant="danger"
                                v-if="isAll === true"
                                @click="callSelectAll(1)">
                        <span class="label">Chọn tất cả</span>
                      </b-button>
                      <b-button class="nFontButton btn-multiple-state btn-shadow"
                                size="xs"
                                type="button"
                                variant="success"
                                v-if="isAll === false"
                                @click="callSelectAll(0)">
                        <span class="label">Tạo nhiều vercel</span>
                      </b-button>
                      <b-button class="nFontButton btn-multiple-state btn-shadow"
                                size="xs"
                                type="button"
                                variant="dark"
                                v-if="isAll === false"
                                @click="callSelectAll(0)">
                        <span class="label">Bỏ chọn tất cả</span>
                      </b-button>
                    </b-td>
                  </b-tr>
                  <b-tr v-show="!$store.state.componentLoadingRunFunctionInModal"
                        v-for="(items, index) in dataPage" :key="index">
                    <b-td class="center sttWidth">{{ index + 1 }}</b-td>
                    <b-td class="center sttWidth">
                      <b-form-checkbox v-model="items.checked"
                                       unchecked-value="not_accepted"
                                       value="accepted">
                        <span class="nHover selectCombobox"></span>
                      </b-form-checkbox>
                    </b-td>
                    <b-td class="text-justify">
                      <span v-if="items.number === 0">{{ items.name }}</span>
                      <span v-else-if="items.number > 0" style="margin-left: 15px;">{{ items.name }}</span>
                    </b-td>
                    <b-td class="text-justify">
                      {{ items.domain }}
                    </b-td>
                    <b-td class="text-justify">
                      {{ items.domainVercelNew }}
                    </b-td>
                    <b-td class="text-center">
                      <b-badge class="NBadge nHover"
                               pill
                               variant="danger"
                               @click="postNewFace(props.rowData)">Tạo Vercel
                      </b-badge>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-colxx>
          </b-row>
        </BCard>
      </template>
    </b-colxx>
  </b-row>
</template>
<script>

import Vuetable from "vuetable-2/src/components/Vuetable";
import {mapActions} from "vuex";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import NCoreConfig from "../../../NCoreHelper/NCoreConfig";
import NPagination from "../../../../containers/ndev-manager/Page/NPagination";
import NPaginationPageSize from "../../../../containers/ndev-manager/Page/NPaginationPageSize";
import NCoreModalDelete from "../../../../containers/ndev-core/components/NCoreModalDelete";
import NewsGroupTypeEvent from "@/views/app/news-content-manager/event/newsGroupTypeEvent";
import newsGroupTypeApi from "@/views/app/news-content-manager/api/newsGroupTypeApi";
import NCoreModalQuestion from "@/containers/ndev-core/components/NCoreModalQuestion";
import NCoreAction from "@/containers/ndev-core/components/NCoreAction";
import NCoreStatuComboboxView from "@/containers/ndev-core/components/NCoreStatuComboboxView";
import NButtonDefaultAddNew from "@/containers/ndev-core/button_default/NButtonDefaultAddNew";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NButtonDefaultDisplayOption from "@/containers/ndev-core/button_default/NButtonDefaultDisplayOption";
import NCoreSkeletonTr from "@/containers/ndev-core/components/NCoreSkeletonTr.vue";
import newsGroupApi from "@/views/app/news-content-manager/api/newsGroupApi";
import NCoreCombobox from "@/containers/ndev-core/components/NCoreCombobox.vue";
import newsViaApi from "@/views/app/news-content-manager/api/newsViaApi";
import newsGitHubApi from "@/views/app/news-content-manager/api/newsGitHubApi";

export default {
  components: {
    NCoreCombobox,
    NCoreSkeletonTr,
    NButtonDefaultDisplayOption,
    NCoreSkeleton,
    NButtonDefaultAddNew,
    NCoreStatuComboboxView,
    NCoreAction,
    NCoreModalQuestion,
    NewsGroupTypeEvent,
    NCoreModalDelete,
    NPaginationPageSize,
    NPagination,
    vuetable: Vuetable
  },
  data() {
    return {
      PageId: "newsVercelId",
      noDataTemplate: NCoreConfig.noDataTemplate,
      dataPage: [],
      isAll: true,
      hauToVercel: ''
    };
  },
  methods: {
    ...mapActions([
      "callStoreCrudUpdate",
      "callStoreCrudDelete",
      "callStoreCrudQuestion",
      "callStoreSendCombobox"
    ]),
    async fetchData() {
      this.$showLoading();
      await this.callStoreSendCombobox({
        isShowTitleHeader: true,
        iMessage: '-- Chọn gitHub --',
        isNoHeader: false,
        api: newsGitHubApi.NewsGithub_COMBOBOX,
        isAdd: false,
        dataSend: null
      });
      const iResult = await NCoreHelper.v2executeGET(
        this,
        newsGroupApi.NEWS_GROUP_LIST_VERCEL
      );
      this.dataPage = iResult
      this.$hideLoading();
    },
    async subEvNewsGroupTypeStatusViewCombobox(val) {
      this.statusId = val
      this.pageNumber = 1
      await this.fetchData()
    },
    callSelectAll(flag) {
      const value = flag === 1 ? NCoreConfig.checkedValue : NCoreConfig.uncheckedValue
      for (let i = 0; i < this.dataPage.length; i++) {
        this.dataPage[i].checked = value
      }
      this.isAll = flag !== 1;
    },
    createVercelNew() {
      for (let i = 0; i < this.dataPage.length; i++) {
        this.dataPage[i].domainVercelNew = (this.dataPage[i].domainVercel === null ? "" : this.dataPage[i].domainVercel) + "" + this.hauToVercel + ".vercel.app"
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
    this.fetchData();
  }
};
</script>
