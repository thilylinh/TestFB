<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">Truy vết người dùng</h1>
          <piaf-breadcrumb/>
          <div class="mb-2">
            <n-button-default-display-option/>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <n-button-default-search ref="refUserTypeManager_ButtonDefaultSearch"
                                         @handlerSubmitEvent="subEvUserTypeManager_ButtonDefaultSearch"/>
                <b-button class="nColorWhite" size="xs" variant="danger" @click="refreshData()">
                  <i class="iconsminds-repeat-3"></i> Làm mới dữ liệu
                </b-button>
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
                <br/>
                <b-badge class="NBadge" pill variant="danger">{{ props.rowData.userName }}</b-badge>
                <b-badge class="NBadge" pill variant="dark">{{ props.rowData.connectionId }}</b-badge>
              </template>
              <template slot="roomStatus" slot-scope="props">
                <b-badge class="NBadge" pill variant="success" v-if="props.rowData.isOnline">Online</b-badge>
                <b-badge class="NBadge" pill variant="dark" v-else-if="!props.rowData.isOnline">Offline</b-badge>
              </template>
              <template slot="timeConnectStart" slot-scope="props">
                {{ props.rowData.timeConnectStart | formatDateDDMMYYYYHHMM }}
              </template>
              <template slot="timeConnectEnd" slot-scope="props">
                {{ props.rowData.timeConnectEnd | formatDateDDMMYYYYHHMM }}
              </template>
              <template slot="actions" slot-scope="props">
                <b-dropdown variant="link"
                            boundary="viewport"
                            toggle-class="text-decoration-none"
                            class="NButton_DropDown"
                            no-caret>
                  <template v-slot:button-content>
                    <i class="simple-icon-options-vertical"
                       style="font-size: 20px;font-weight: bold;color: darkslategray;"/>
                  </template>
                  <b-dropdown-item @click="logOutSystem(props.rowData)">
                    <i class="simple-icon-plane"/>
                    <span class="content">Kích khỏi hệ thống</span>
                  </b-dropdown-item>
                </b-dropdown>

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
import userManagerApi from "@/views/app/system-manager/api/userManagerApi";

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
      pageId: "userTracingManagerPageId",
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
          name: "__slot:timeConnectStart",
          sortField: "name",
          title: "ĐĂNG NHẬP",
          titleClass: "center",
          dataClass: "center",
          width: "10%"
        },
        {
          name: "__slot:timeConnectEnd",
          sortField: "name",
          title: "ĐĂNG XUẤT",
          titleClass: "center",
          dataClass: "center",
          width: "10%"
        },
        {
          name: "__slot:roomName",
          sortField: "name",
          title: "TÊN NGƯỜI DÙNG",
          titleClass: "",
          dataClass: "list-item-heading",
          width: "65%"
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
    async refreshData() {
      await this.fetchData()
    },
    async fetchData() {
      this.$showLoading();
      const dataSend = {
        search: this.search,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      };
      const iResult = await NCoreHelper.v2executeGET(
          this,
          userManagerApi.USER_MANAGER_GET_PAGING_USER_TRACING,
          dataSend
      );
      this.dataPage = iResult.pageLists;
      this.items = iResult.pageLists;
      this.totalRecord = iResult.totalRecord;
      this.to = this.pageSize;
      this.$hideLoading();
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
    async logOutSystem(vData) {
      // let serverToken = localStorage.getItem(NCoreConfig.storageTokenKeyName)
      // serverToken = serverToken.replace('Bearer ', '')
      // const url = `${this.$serverfile}hubs/itphonuihub?access_token=${serverToken}`
      // this.connection = new signalR.HubConnectionBuilder() // Connect to a hub
      //     .withUrl(url, {
      //       transport: signalR.HttpTransportType.Websocket,
      //       'content-type': 'application/json',
      //     })
      //     .withAutomaticReconnect()
      //     .build()
      // this.connection.start().then(() => {
      //   this.connection
      //       .invoke("SendUserLogOut", vData.connectionId)
      //       .catch(function (err) {
      //         return console.error(err.toString());
      //       });
      // }).catch(function (err) {
      //   return console.error(err.toString());
      // });

    },
    connectionSignalR() {
      // try {
      //   let serverToken = localStorage.getItem(NCoreConfig.storageTokenKeyName)
      //   serverToken = serverToken.replace('Bearer ', '')
      //   const url = `${this.$serverfile}hubs/itphonuihub?access_token=${serverToken}`
      //   this.connection = new signalR.HubConnectionBuilder() // Connect to a hub
      //       .withUrl(url, {
      //         transport: signalR.HttpTransportType.Websocket,
      //         'content-type': 'application/json',
      //       })
      //       .withAutomaticReconnect()
      //       .build()
      //   this.connection.start().catch(function (err) {
      //     return console.error(err.toString());
      //   });
      // } catch (e) {
      // }
    },
  },
  computed: {},
  watch: {},
  created() {
    // this.connectionSignalR();
  },
  mounted() {
    this.fetchData();
  }
};
</script>
