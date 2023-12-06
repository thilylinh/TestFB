<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">Quản lý môn thi đấu</h1>
          <div class="top-right-button-container">
            <n-button-default-add-new ref="refSubjectTypeManagerButtonDefaultAddNew"
                                      @handlerSubmitEvent="subEvSubjectTypeManagerButtonDefaultAddNew"/>
          </div>
          <piaf-breadcrumb/>
          <div class="mb-2">
            <n-button-default-display-option/>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <n-button-default-search ref="refUserTypeManager_ButtonDefaultSearch"
                                         @handlerSubmitEvent="subEvUserTypeManager_ButtonDefaultSearch"/>
                <n-core-statu-combobox-view @handlerSubmitEvent="subEvSubjectTypeManagerStatusViewCombobox"/>
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
        <n-core-skeleton-table />
        <b-row v-show="!$store.state.componentLoading">
          <b-colxx xxs="12" class="NTable">
            <vuetable ref="refSubjectTypeManagerTable"
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
                               @handlerSubmitEvent="subEvSubjectTypeManagerAction"/>
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
    <subject-type-manager-event ref="refSubjectTypeManagerEvent"
                                @handleSubmitEvent="subEvSubjectTypeManagerEvent"/>
    <n-core-modal-delete ref="refSubjectTypeManagerDelete"
                         @handleSubmitEvent="subEvSubjectTypeManagerDelete"/>
    <n-core-modal-question ref="refSubjectTypeManagerQuestion"
                           @handleSubmitEvent="subEvSubjectTypeManagerQuestion"/>
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
import NButtonDefaultSearch from "@/containers/ndev-core/button_default/NButtonDefaultSearch";
import NCoreSkeletonTable from "@/containers/ndev-core/components/NCoreSkeletonTable";

export default {
  components: {
    NCoreSkeletonTable,
    NButtonDefaultSearch,
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
      pageId: "sportSubjectTypeManagerPageId",
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
          title: "TÊN MÔN THI ĐẤU",
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
        //sportSubjectTypeManagerApi.GET_PAGING,
        dataSend
      );
      this.dataPage = iResult.pageLists;
      this.items = iResult.pageLists;
      this.totalRecord = iResult.totalRecord;
      this.to = this.pageSize;
      this.$hideLoading();
    },
    async subEvSubjectTypeManagerStatusViewCombobox(val) {
      this.statusId = val
      this.pageNumber = 1
      await this.fetchData()
    },
    async subEvSubjectTypeManagerButtonDefaultAddNew() {
      const valueAuthority = await NCoreHelper.v2checkAuthorities('SportSubjectTypeManager')
      if ((valueAuthority & NCoreConfig.authority_Add) !== 0) {
        await this.callStoreCrudUpdate({
          id: this.$refs.refSubjectTypeManagerEvent.idModal,
          title: "Thêm mới môn thi đấu",
          type: "add",
          funcName: "môn thi đấu",
          groupTable: 4,
          data: null
        });
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refSubjectTypeManagerEvent.idModal,
          1
        );
      } else {
        NCoreHelper.v2alertMess(this, NCoreConfig.localErrMessAuthority, 1)
      }
    },
    async subEvSubjectTypeManagerEvent(val) {
      if (val === true) {
        await this.fetchData();
      }
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refSubjectTypeManagerEvent.idModal,
        0
      );
      this.$hideProcessing()
    },
    async subEvSubjectTypeManagerDelete(val) {
      let model = [];
      model.push(val.id);
      const iResult = await NCoreHelper.v2executePOST(
        this,
        //subjectTypeManagerApi.SUBJECT_TYPE_MANAGER_DELETE,
        {
          models: model
        }
      );
      if (iResult) {
        await this.fetchData();
        NCoreHelper.v2alertMess(this, "Xóa dữ liệu thành công", 1);
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refSubjectTypeManagerDelete.idModal,
          0
        );
      } else {
        NCoreHelper.v2alertMess(this, "", 3);
      }
      this.$hideProcessing()
    },
    async subEvSubjectTypeManagerQuestion(val) {
      if (val.result) {
        await this.fetchData()
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refSubjectTypeManagerQuestion.idModal,
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
    subEvUserTypeManager_ButtonDefaultSearch(val) {
      this.search = val;
      this.pageNumber = 1;
      this.fetchData();
    },
    async subEvSubjectTypeManagerAction(val) {
      switch (val.id) {
        // Mở khóa
        case 201: {
          await this.callStoreCrudQuestion({
            id: this.$refs.refSubjectTypeManagerQuestion.idModal,
            tableId: 11,
            contentId: val.dataContentId,
            flagKey: val.id,
            titleOne: 'BẠN CHẮC CHẮN MUỐN MỞ KHÓA DỮ LIỆU',
            titleTwo: val.dataContentName
          })
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refSubjectTypeManagerQuestion.idModal,
            1
          );
          break
        }
        // Khóa
        case 202: {
          await this.callStoreCrudQuestion({
            id: this.$refs.refSubjectTypeManagerQuestion.idModal,
            tableId: 11,
            contentId: val.dataContentId,
            flagKey: val.id,
            titleOne: 'BẠN CHẮC CHẮN MUỐN KHÓA DỮ LIỆU',
            titleTwo: val.dataContentName
          })
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refSubjectTypeManagerQuestion.idModal,
            1
          );
          break
        }
        // Cập nhật
        case 101: {
          this.$showAllPageLoading();
          await this.callStoreCrudUpdate({
            id: this.$refs.refSubjectTypeManagerEvent.idModal,
            title: "Cập nhật môn thi đấu",
            type: "update",
            funcName: "môn thi đấu",
            groupTable: 4,
            data: await NCoreHelper.v2executeGETById(
              this,
              //subjectTypeManagerApi.SUBJECT_TYPE_MANAGER_GET_BY_ID,
              val.dataContentId
            )
          });
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refSubjectTypeManagerEvent.idModal,
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
            this.$refs.refSubjectTypeManagerDelete.idModal,
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
