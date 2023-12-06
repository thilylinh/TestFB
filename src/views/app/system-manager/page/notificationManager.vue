<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">Quản lý thông báo</h1>
          <div class="top-right-button-container">
            <n-button-default-add-new ref="refNotificationManagerButtonDefaultAddNew"
                                      @handlerSubmitEvent="subEvNotificationManagerButtonDefaultAddNew"/>
          </div>
          <piaf-breadcrumb/>
          <div class="mb-2">
            <n-button-default-display-option/>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <n-button-default-search ref="refNotificationManager_Search"
                                         @handlerSubmitEvent="subEvNotificationManager_Search"/>
                <n-core-statu-combobox-view @handlerSubmitEvent="subEvNotificationManagerStatusViewCombobox"/>
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
        <n-core-skeleton-table/>
        <b-row v-show="!$store.state.componentLoading">
          <b-colxx xxs="12" class="NCard">
            <b-card>
              <b-table-simple small caption-top responsive bordered>
                <b-thead head-variant="dark">
                  <b-tr style="font-size: 10px;">
                    <b-th class="sttWidth center" rowspan="2">ACT</b-th>
                    <b-th class="sttWidth center" colspan="2">GỬI THÔNG BÁO</b-th>
                    <b-th class="sttWidth center" colspan="2">CẤU HÌNH</b-th>
                    <b-th class="sttWidth center" rowspan="2" style="width: 120px">THỜI GIAN<br/>GIỚI HẠN</b-th>
                    <b-th class="sttWidth center" rowspan="2" style="width: 80px">FILE<br/>ĐÍNH KÈM</b-th>
                    <b-th class="sttWidth center" rowspan="2" style="width: 100px">TRẠNG THÁI</b-th>
                    <b-th class="center" rowspan="2">NỘI DUNG THÔNG BÁO</b-th>
                  </b-tr>
                  <b-tr style="font-size: 10px;">
                    <b-th class="center" style="width: 60px;">TẤT CẢ</b-th>
                    <b-th class="center" style="width: 70px;">CÁ NHÂN</b-th>
                    <b-th class="center" style="width: 80px;">GIỚI HẠN<br/> THỜI GIAN</b-th>
                    <b-th class="center" style="width: 80px;">CHẠY SLIDE</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="(items, index) in dataPage"
                        :key="index"
                        v-if="dataPage.length > 0">
                    <b-td class="center">
                      <n-core-action :data-id="items.id"
                                     :data-name="items.name"
                                     :data-action="items.actions"
                                     @handlerSubmitEvent="subEvNotificationManagerAction"/>
                    </b-td>
                    <b-td class="center">
                      <span v-if="items.isSendAll === true" class="nFontBold nColorBlue">x</span>
                      <span v-if="items.isSendAll === false"></span>
                    </b-td>
                    <b-td class="center">
                      <span v-if="items.isSendAll === true"></span>
                      <span v-if="items.isSendAll === false && items.totalUser > 0"
                            class="nFontBold nColorRed">{{ items.totalUser }}</span>
                    </b-td>
                    <b-td class="center">
                      <span v-if="items.isLimitedTime === true" class="nFontBold nColorBlue">x</span>
                      <span v-if="items.isLimitedTime === false"></span>
                    </b-td>
                    <b-td class="center">
                      <span v-if="items.isRun === true" class="nFontBold nColorBlue">x</span>
                      <span v-if="items.isRun === false"></span>
                    </b-td>
                    <b-td class="center">
                      <span v-if="items.isLimitedTime === true">
                        <small>{{ items.dateStart | formatDateDDMMYYYYHHMM }}</small>
                        <br/>
                        <small>{{ items.dateEnd | formatDateDDMMYYYYHHMM }}</small>
                      </span>
                    </b-td>
                    <b-td class="center">
                      <span v-if="items.totalFile > 0" class="nFontBold nColorRed">{{ items.totalFile }}</span>
                    </b-td>
                    <b-td class="center">
                      <b-badge class="NBadge" pill :variant="items.statusColor">
                        {{ items.statusName }}
                      </b-badge>
                    </b-td>
                    <b-td class="text-justify nHover selectCombobox">
                      <span class="nFontTitleTable">{{ items.name }}</span>
                      <span v-if="items.content !== ''">
                        <br/>
                        <small class="font-italic nColorBlue">{{ items.content }}</small>
                      </span>
                    </b-td>
                  </b-tr>
                  <b-tr v-else-if="dataPage.length === 0">
                    <b-td colspan="10" class="center" v-html="noDataTemplate"></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-card>
          </b-colxx>
          <b-colxx xxs="12" class="NTable">
            <n-pagination :current-page="pageNumber"
                          :default-page-size="pageSize"
                          :total-items="totalRecord"
                          @handlePagingClick="handlePagingClick"/>
          </b-colxx>
        </b-row>
      </template>
    </b-colxx>
    <notification-manager-event ref="refNotificationManagerEvent"
                                @handlerSubmitEvent="subEvNotificationManagerEvent"/>
    <n-core-modal-delete ref="refNotificationManagerDelete"
                         @handleSubmitEvent="subEvNotificationManagerDelete"/>
    <n-core-modal-question ref="refNotificationManagerQuestion"
                           @handleSubmitEvent="subEvNotificationManagerQuestion"/>
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
import NButtonDefaultSearch from "@/containers/ndev-core/button_default/NButtonDefaultSearch";
import NCoreSkeletonTable from "@/containers/ndev-core/components/NCoreSkeletonTable";
import NButtonDefaultDisplayOption from "@/containers/ndev-core/button_default/NButtonDefaultDisplayOption";
import NotificationManagerEvent from "@/views/app/system-manager/event/notificationManagerEvent";
import notificationManagerApi from "@/views/app/system-manager/api/notificationManagerApi";

export default {
  components: {
    NButtonDefaultDisplayOption,
    NCoreSkeletonTable,
    NButtonDefaultAddNew,
    NCoreStatuComboboxView,
    NCoreAction,
    NCoreModalQuestion,
    NotificationManagerEvent,
    NCoreModalDelete,
    NPaginationPageSize,
    NPagination,
    vuetable: Vuetable
  },
  data() {
    return {
      PageId: "NotificationManagerPageId",
      noDataTemplate: NCoreConfig.noDataTemplate,
      pageNumber: 1,
      pageSize: 8,
      search: "",
      statusId: 0,
      from: 1,
      to: 0,
      totalRecord: 0,
      dataPage: [],
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
        notificationManagerApi.NOTIFICATION_MANAGER_GET_PAGING,
        dataSend
      );
      this.dataPage = iResult.pageLists;
      this.items = iResult.pageLists;
      this.totalRecord = iResult.totalRecord;
      this.to = this.pageSize;
      this.$hideLoading();
    },
    async subEvNotificationManagerStatusViewCombobox(val) {
      this.statusId = val
      this.pageNumber = 1
      await this.fetchData()
    },
    async subEvNotificationManagerButtonDefaultAddNew() {
      const valueAuthority = await NCoreHelper.v2checkAuthorities('NotificationManager')
      if ((valueAuthority & NCoreConfig.authority_Add) !== 0) {
        await this.callStoreCrudUpdate({
          id: this.$refs.refNotificationManagerEvent.pageId,
          title: "Thêm mới thông báo",
          type: "add",
          funcName: "thông báo",
          data: null
        });
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refNotificationManagerEvent.pageId,
          1
        );
      } else {
        NCoreHelper.v2alertMess(this, NCoreConfig.localErrMessAuthority, 1)
      }
    },
    async subEvNotificationManagerEvent(val) {
      if (val === true) {
        await this.fetchData();
      }
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refNotificationManagerEvent.pageId,
        0
      );
      this.$hideProcessing()
    },
    async subEvNotificationManagerDelete(val) {
      let model = [];
      model.push(val.id);
      const iResult = await NCoreHelper.v2executePOST(
        this,
        notificationManagerApi.NEWS_GROUP_TYPE_DELETE,
        {
          models: model
        }
      );
      if (iResult) {
        await this.fetchData();
        NCoreHelper.v2alertMess(this, "Xóa dữ liệu thành công", 1);
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refNotificationManagerDelete.idModal,
          0
        );
      } else {
        NCoreHelper.v2alertMess(this, "", 3);
      }
      this.$hideProcessing()
    },
    async subEvNotificationManagerQuestion(val) {
      if (val.result) {
        await this.fetchData()
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refNotificationManagerQuestion.idModal,
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
    subEvNotificationManager_Search(val) {
      this.search = val;
      this.pageNumber = 1;
      this.fetchData();
    },
    async subEvNotificationManagerAction(val) {
      switch (val.id) {
        // Mở khóa
        case 201: {
          await this.callStoreCrudQuestion({
            id: this.$refs.refNotificationManagerQuestion.idModal,
            tableId: 13,
            contentId: val.dataContentId,
            flagKey: val.id,
            titleOne: 'BẠN CHẮC CHẮN MUỐN MỞ KHÓA DỮ LIỆU',
            titleTwo: val.dataContentName
          })
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNotificationManagerQuestion.idModal,
            1
          );
          break
        }
        // Khóa
        case 202: {
          await this.callStoreCrudQuestion({
            id: this.$refs.refNotificationManagerQuestion.idModal,
            tableId: 13,
            contentId: val.dataContentId,
            flagKey: val.id,
            titleOne: 'BẠN CHẮC CHẮN MUỐN KHÓA DỮ LIỆU',
            titleTwo: val.dataContentName
          })
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNotificationManagerQuestion.idModal,
            1
          );
          break
        }
        // Cập nhật
        case 101: {
          this.$showAllPageLoading();
          await this.callStoreCrudUpdate({
            id: this.$refs.refNotificationManagerEvent.pageId,
            title: "Cập nhật thông báo",
            type: "update",
            funcName: "thông báo",
            data: await NCoreHelper.v2executeGETById(
              this,
              notificationManagerApi.NEWS_GROUP_TYPE_GET_BY_ID,
              val.dataContentId
            )
          });
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNotificationManagerEvent.pageId,
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
            this.$refs.refNotificationManagerDelete.idModal,
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
