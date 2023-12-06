<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">Quản lý Github</h1>
          <div class="top-right-button-container">
            <n-button-default-add-new ref="refnewsGitHubButtonDefaultAddNew"
                                      @handlerSubmitEvent="subEvnewsGitHubButtonDefaultAddNew"/>
          </div>
          <piaf-breadcrumb/>
          <div class="mb-2">
            <n-button-default-display-option/>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                  <b-input :placeholder="$t('menu.search')"
                           autocomplete="off"
                           @input="val => searchChange(val)"/>
                </div>
                <n-core-statu-combobox-view @handlerSubmitEvent="subEvnewsGitHubStatusViewCombobox"/>
              </div>
              <n-pagination-page-size :from="from"
                                      :page-size-default="pageSize"
                                      :to="to"
                                      :total-record="totalRecord"
                                      @handleChangePageSize="handleChangePageSize"/>
            </b-collapse>
          </div>
          <div class="separator mb-2"/>
        </b-colxx>
      </b-row>
      <template>
        <n-core-skeleton :flag-group="3"/>
        <b-row v-show="!$store.state.componentLoading">
          <b-colxx xxs="12" class="NTable">
            <vuetable ref="refnewsGitHubTable"
                      :api-mode="false"
                      :data="dataPage"
                      :fields="fields"
                      :no-data-template="noDataTemplate"
                      :reactive-api-url="true"
                      class="table-divided order-with-arrow">
              <template slot="roomName" slot-scope="props">
                <span class="NTitleDataInTable">{{ props.rowData.name }}</span>
                <small v-if="props.rowData.description"
                       style="font-style: italic;color: blue;"
                ><br/>{{ props.rowData.description }}
                </small>
              </template>
              <template slot="roomStatus" slot-scope="props">
                <b-badge class="NBadge" pill :variant="props.rowData.statusColor">{{
                    props.rowData.statusName
                  }}
                </b-badge>
              </template>
              <template slot="actions" slot-scope="props">
                <n-core-action :data-id="props.rowData.id"
                               :data-name="props.rowData.name"
                               :data-action="props.rowData.actions"
                               @handlerSubmitEvent="subEvnewsGitHubAction"/>
              </template>
            </vuetable>
            <n-pagination :current-page="pageNumber"
                          :default-page-size="pageSize"
                          :total-items="totalRecord"
                          @handlePagingClick="handlePagingClick"/>
          </b-colxx>
        </b-row>
      </template>
    </b-colxx>
    <news-github-event ref="refnewsGitHubEvent"
                       @handleSubmitEvent="subEvnewsGitHubEvent"/>
    <n-core-modal-delete ref="refnewsGitHubDelete"
                         @handleSubmitEvent="subEvnewsGitHubDelete"/>
    <n-core-modal-question ref="refnewsGitHubQuestion"
                           @handleSubmitEvent="subEvnewsGitHubQuestion"/>
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
import NCoreModalQuestion from "@/containers/ndev-core/components/NCoreModalQuestion";
import NCoreAction from "@/containers/ndev-core/components/NCoreAction";
import NCoreStatuComboboxView from "@/containers/ndev-core/components/NCoreStatuComboboxView";
import NButtonDefaultAddNew from "@/containers/ndev-core/button_default/NButtonDefaultAddNew";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NButtonDefaultDisplayOption from "@/containers/ndev-core/button_default/NButtonDefaultDisplayOption";
import NewsGithubEvent from "@/views/app/news-content-manager/event/newsGithubEvent.vue";
import NewsGitHubApi from "@/views/app/news-content-manager/api/newsGitHubApi";

export default {
  components: {
    NewsGithubEvent,
    NButtonDefaultDisplayOption,
    NCoreSkeleton,
    NButtonDefaultAddNew,
    NCoreStatuComboboxView,
    NCoreAction,
    NCoreModalQuestion,
    NCoreModalDelete,
    NPaginationPageSize,
    NPagination,
    vuetable: Vuetable
  },
  data() {
    return {
      PageId: "newsGitHubId",
      noDataTemplate: NCoreConfig.noDataTemplate,
      pageNumber: 1,
      pageSize: 8,
      search: "",
      statusId: 0,
      from: 1,
      to: 0,
      totalRecord: 0,
      dataPage: [],
      fields: [
        {
          name: "__slot:actions",
          title: "ACT",
          titleClass: "center aligned text-right",
          dataClass: "center aligned text-right",
          width: "2%"
        },
        {
          name: "__slot:roomStatus",
          sortField: "name",
          title: "TRẠNG THÁI",
          titleClass: "center",
          dataClass: "center",
          width: "10%"
        },
        {
          name: "__slot:roomName",
          sortField: "name",
          title: "TÊN GITHUB",
          titleClass: "",
          dataClass: "list-item-heading",
          width: "85%"
        },
      ]
    };
  },
  methods: {
    ...mapActions([
      "callStoreCrudUpdate",
      "callStoreCrudDelete",
      "callStoreCrudQuestion"
    ]),
    async fetchData() {
      this.$showLoading();
      const dataSend = {
        search: this.search,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        statusId: this.statusId
      };
      const iResult = await NCoreHelper.v2executeGET(
        this,
        NewsGitHubApi.NewsGithub_GET_PAGING,
        dataSend
      );
      this.dataPage = iResult.pageLists;
      this.items = iResult.pageLists;
      this.totalRecord = iResult.totalRecord;
      this.to = this.pageSize;
      this.$hideLoading();
    },
    async subEvnewsGitHubStatusViewCombobox(val) {
      this.statusId = val
      this.pageNumber = 1
      await this.fetchData()
    },
    async subEvnewsGitHubButtonDefaultAddNew() {
      const valueAuthority = await NCoreHelper.v2checkAuthorities('NewsGithub')
      if ((valueAuthority & NCoreConfig.authority_Add) !== 0) {
        await this.callStoreCrudUpdate({
          id: this.$refs.refnewsGitHubEvent.idModal,
          title: "Thêm mới Github",
          type: "add",
          funcName: "Github",
          data: null
        });
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refnewsGitHubEvent.idModal,
          1
        );
      } else {
        NCoreHelper.v2alertMess(this, NCoreConfig.localErrMessAuthority, 1)
      }
    },
    async subEvnewsGitHubEvent(val) {
      if (val === true) {
        await this.fetchData();
      }
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refnewsGitHubEvent.idModal,
        0
      );
      this.$hideProcessing()
    },
    async subEvnewsGitHubDelete(val) {
      let model = [];
      model.push(val.id);
      const iResult = await NCoreHelper.v2executePOST(
        this,
        NewsGitHubApi.NewsGithub_DELETE,
        {
          models: model
        }
      );
      if (iResult) {
        await this.fetchData();
        NCoreHelper.v2alertMess(this, "Xóa dữ liệu thành công", 1);
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refnewsGitHubDelete.idModal,
          0
        );
      } else {
        NCoreHelper.v2alertMess(this, "", 3);
      }
      this.$hideProcessing()
    },
    async subEvnewsGitHubQuestion(val) {
      if (val.result) {
        await this.fetchData()
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refnewsGitHubQuestion.idModal,
          0
        );
        NCoreHelper.v2alertMess(this, val.message, 1)
        this.$hideProcessing()
      }
    },
    handlePagingClick(pageNumber, pageSize) {
      this.pageNumber = pageNumber;
      this.pageSize = pageSize;
      this.fetchData();
    },
    handleChangePageSize(val) {
      this.pageSize = val;
      this.fetchData();
    },
    searchChange(val) {
      this.search = val;
      this.pageNumber = 1;
      this.fetchData();
    },
    async subEvnewsGitHubAction(val) {
      switch (val.id) {
        // Mở khóa
        case 201: {
          await this.callStoreCrudQuestion({
            id: this.$refs.refnewsGitHubQuestion.idModal,
            tableId: 3,
            contentId: val.dataContentId,
            flagKey: val.id,
            titleOne: 'BẠN CHẮC CHẮN MUỐN MỞ KHÓA DỮ LIỆU',
            titleTwo: val.dataContentName
          })
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refnewsGitHubQuestion.idModal,
            1
          );
          break
        }
        // Khóa
        case 202: {
          await this.callStoreCrudQuestion({
            id: this.$refs.refnewsGitHubQuestion.idModal,
            tableId: 3,
            contentId: val.dataContentId,
            flagKey: val.id,
            titleOne: 'BẠN CHẮC CHẮN MUỐN KHÓA DỮ LIỆU',
            titleTwo: val.dataContentName
          })
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refnewsGitHubQuestion.idModal,
            1
          );
          break
        }
        // Cập nhật
        case 101: {
          this.$showAllPageLoading();
          await this.callStoreCrudUpdate({
            id: this.$refs.refnewsGitHubEvent.idModal,
            title: "Cập nhật Github",
            type: "update",
            funcName: "Github",
            data: await NCoreHelper.v2executeGETById(
              this,
              NewsGitHubApi.NewsGithub_GET_BY_ID,
              val.dataContentId
            )
          });
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refnewsGitHubEvent.idModal,
            1
          );
          break
        }
        //Xóa
        case 102: {
          await this.callStoreCrudDelete({
            content: val.dataContentName,
            id: val.dataContentId
          });
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refnewsGitHubDelete.idModal,
            1
          );
          break
        }
        default:
          break
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
