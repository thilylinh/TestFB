<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">Quản lý người dùng</h1>
          <div class="top-right-button-container">
            <n-button-default-add-new ref="refUserManager_ButtonDefaultAddNew"
                                      @handlerSubmitEvent="subEvUserManager_ButtonDefaultAddNew"/>
          </div>
          <piaf-breadcrumb/>
          <div class="mb-2">
            <n-button-default-display-option/>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <n-button-default-search ref="refUserManager_ButtonDefaultSearch"
                                         @handlerSubmitEvent="subEvUserManager_ButtonDefaultSearch"/>
<!--                <user-type-manager-combobox :btn-show-all="'0'"-->
<!--                                            :page-title="userTypeManagerComboboxTitle"-->
<!--                                            ref="refUserManager_userTypeManagerCombobox"-->
<!--                                            @submitEvent="subEvUserManager_userTypeManagerCombobox"/>-->
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
            <vuetable ref="projectManagerTableRef"
                      :api-mode="false"
                      :data="dataPage"
                      :fields="fields"
                      :no-data-template="noDataTemplate"
                      :reactive-api-url="true"
                      class="table-divided order-with-arrow">
              <template slot="staffName" slot-scope="props">
                <span style="
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                    font-weight: bold;
                  ">
                  {{ props.rowData.name }}
                </span>
                <small style="font-style: italic">
                  <br/>
                  Địa chỉ:
                  <span style="color: blue; font-weight: bold">
                    {{ props.rowData.address }}
                  </span>
                </small>
                <small v-if="props.rowData.description"
                       style="font-style: italic; color: blue">
                  <br/>
                  {{ props.rowData.description }}
                </small>
              </template>
              <template slot="roomManagerName" slot-scope="props">
                <small style="font-style: italic">
                  <span style="color: blue; font-weight: bold">
                    {{ props.rowData.roomManagerName }}
                  </span>
                </small>
                <br/>
                <small style="font-style: italic">
                  <span style="color: red; font-weight: bold">
                    {{ props.rowData.ownerCreated | formatDateDDMMYYYYHHMM}}
                  </span>
                </small>
              </template>
              <template slot="comunication" slot-scope="props">
                <small style="font-style: italic">
                  <span style="color: blue; font-weight: bold">
                    {{ props.rowData.phone }}
                  </span>
                </small>
                <br/>
                <small style="font-style: italic">
                  <span style="color: red; font-weight: bold">
                    {{ props.rowData.email }}
                  </span>
                </small>
              </template>
              <template slot="authorityName" slot-scope="props">
                <small style="font-style: italic">
                  <span style="color: blue; font-weight: bold">
                    {{ props.rowData.userName }}
                  </span>
                </small>
                <br/>
                <small style="font-style: italic">
                  <span style="color: red; font-weight: bold">
                    {{ props.rowData.authorityManagerName }}
                  </span>
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
                               @handlerSubmitEvent="subEvUserManagerAction"/>
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
    <user-manager-event ref="refUserManager_Event"
                        @handlerSubmitEvent="subEvUserManager_Event"/>
    <n-core-modal-delete ref="refUserManager_Delete"
                         @handleSubmitEvent="subEvUserManager_Delete"/>
    <n-core-modal-question ref="refUserManager_Question"
                           @handleSubmitEvent="subEvUserManager_Question"/>
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
import NCoreSkeletonTable from "@/containers/ndev-core/components/NCoreSkeletonTable";
import NButtonDefaultSearch from "@/containers/ndev-core/button_default/NButtonDefaultSearch";
import UserTypeManagerCombobox from "@/views/app/system-manager/combobox/userTypeManagerCombobox";
import UserTypeManagerComboboxDetail from "@/views/app/system-manager/combobox/userTypeManagerComboboxDetail";
import NButtonDefaultAddNew from "@/containers/ndev-core/button_default/NButtonDefaultAddNew";
import UserManagerEvent from "@/views/app/system-manager/event/userManagerEvent";
import NButtonDefaultDisplayOption from "@/containers/ndev-core/button_default/NButtonDefaultDisplayOption";
import NCoreAction from "@/containers/ndev-core/components/NCoreAction";
import userManagerApi from "@/views/app/system-manager/api/userManagerApi";
//import subjectTypeManagerApi from "@/views/app/study-manager/api/subjectTypeManagerApi";
import NCoreModalQuestion from "@/containers/ndev-core/components/NCoreModalQuestion";

export default {
  components: {
    NCoreModalQuestion,
    NCoreAction,
    NButtonDefaultDisplayOption,
    UserManagerEvent,
    NButtonDefaultAddNew,
    UserTypeManagerComboboxDetail,
    UserTypeManagerCombobox,
    NButtonDefaultSearch,
    NCoreSkeletonTable,
    NCoreModalDelete,
    NPaginationPageSize,
    NPagination,
    vuetable: Vuetable,
  },
  data() {
    return {
      noDataTemplate: NCoreConfig.noDataTemplate,
      pageNumber: 1,
      pageSize: 8,
      search: "",
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
          width: "2%",
        },
        {
          name: "__slot:staffName",
          sortField: "name",
          title: "HỌ VÀ TÊN",
          titleClass: "",
          dataClass: "list-item-heading",
          width: "40%",
        },
        // {
        //   name: "__slot:roomManagerName",
        //   sortField: "name",
        //   title: "KIỂU NGƯỜI DÙNG",
        //   titleClass: " text-center",
        //   dataClass: "list-item-heading text-center",
        //   width: "15%",
        // },
        {
          name: "__slot:comunication",
          sortField: "name",
          title: "LIÊN LẠC",
          titleClass: " text-center",
          dataClass: "list-item-heading text-center",
          width: "20%",
        },
        {
          name: "__slot:authorityName",
          sortField: "name",
          title: "QUYỀN SỬ DỤNG",
          titleClass: " text-center",
          dataClass: "list-item-heading text-center",
          width: "15%",
        },
        {
          name: "__slot:roomStatus",
          sortField: "name",
          title: "TRẠNG THÁI",
          titleClass: "center",
          dataClass: "center",
          width: "10%"
        },
      ],
      userTypeManagerCombobox: NCoreConfig.isGuidEmpty,
      userTypeManagerComboboxTitle: 'Kiểu người dùng: -- Tất cả --',
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
        roomManagerId: this.userTypeManagerCombobox,
      };
      const iResult = await NCoreHelper.v2executeGET(
          this,
          userManagerApi.USER_MANAGER_GET_PAGING,
          dataSend
      );
      this.dataPage = iResult.pageLists;
      this.items = iResult.pageLists;
      this.totalRecord = iResult.totalRecord;
      this.to = this.pageSize;
      this.$hideLoading();
    },
    async subEvUserManager_ButtonDefaultAddNew() {
      this.$showAllPageLoading()
      const valueAuthority = await NCoreHelper.v2checkAuthorities('UserManager')
      if ((valueAuthority & NCoreConfig.authority_Add) !== 0) {
        await this.callStoreCrudUpdate({
          id: this.$refs.refUserManager_Event.pageId,
          title: "Thêm mới người dùng",
          type: "add",
          funcName: "người dùng",
          userTypeManagerId: this.userTypeManagerCombobox,
          hiddenPassword: false,
          data: null
        });
        NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refUserManager_Event.pageId,
            1
        );
      } else {
        NCoreHelper.v2alertMess(this, NCoreConfig.localErrMessAuthority, 1)
      }
    },
    async handlePagingClick(pageNumber, pageSize) {
      this.pageNumber = pageNumber;
      this.pageSize = pageSize;
      await this.fetchData();
    },
    async handleChangePageSize(val) {
      this.pageSize = val;
      await this.fetchData();
    },
    async subEvUserManager_ButtonDefaultSearch(val) {
      this.search = val;
      this.pageNumber = 1;
      await this.fetchData();
    },
    async subEvUserManager_userTypeManagerCombobox(val) {
      this.userTypeManagerCombobox = val.id
      this.userTypeManagerComboboxTitle = 'Kiểu người dùng: -- ' + val.name + ' --'
      await this.fetchData(true)
    },
    async subEvUserManagerAction(val) {
      switch (val.id) {
          // Mở khóa
        case 201: {
          await this.callStoreCrudQuestion({
            id: this.$refs.refUserManager_Question.idModal,
            tableId: 12,
            contentId: val.dataContentId,
            flagKey: val.id,
            titleOne: 'BẠN CHẮC CHẮN MUỐN MỞ KHÓA DỮ LIỆU',
            titleTwo: val.dataContentName
          })
          NCoreHelper.v2modalShowHide(
              this,
              this.$refs.refUserManager_Question.idModal,
              1
          );
          break
        }
          // Khóa
        case 202: {
          await this.callStoreCrudQuestion({
            id: this.$refs.refUserManager_Question.idModal,
            tableId: 12,
            contentId: val.dataContentId,
            flagKey: val.id,
            titleOne: 'BẠN CHẮC CHẮN MUỐN KHÓA DỮ LIỆU',
            titleTwo: val.dataContentName
          })
          NCoreHelper.v2modalShowHide(
              this,
              this.$refs.refUserManager_Question.idModal,
              1
          );
          break
        }
          // Cập nhật
        case 101: {
          this.$showAllPageLoading();
          await this.callStoreCrudUpdate({
            id: this.$refs.refUserManager_Event.pageId,
            title: "Cập nhật người dùng",
            type: "update",
            funcName: "người dùng",
            hiddenPassword: true,
            data: await NCoreHelper.v2executeGETById(
                this,
                userManagerApi.USER_MANAGER_GET_BY_ID,
                val.dataContentId
            )
          });
          NCoreHelper.v2modalShowHide(
              this,
              this.$refs.refUserManager_Event.pageId,
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
              this.$refs.refUserManager_Delete.idModal,
              1
          );
          break
        }
        default:
          break
      }
    },
    async subEvUserManager_Delete(val) {
      let model = [];
      model.push(val.id);
      const iResult = await NCoreHelper.v2executePOST(
          this,
          userManagerApi.USER_MANAGER_DELETE,
          {
            models: model
          }
      );
      if (iResult) {
        await this.fetchData();
        NCoreHelper.v2alertMess(this, "Xóa dữ liệu thành công", 1);
        NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refUserManager_Delete.idModal,
            0
        );
      } else {
        NCoreHelper.v2alertMess(this, "", 3);
      }
      this.$hideProcessing()
    },
    async subEvUserManager_Question(val) {
      if (val.result) {
        await this.fetchData()
        NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refUserManager_Question.idModal,
            0
        );
        NCoreHelper.v2alertMess(this, val.message, 1)
        this.$hideProcessing()
      }
    },
    async subEvUserManager_Event(val) {
      await this.fetchData();
      NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refUserManager_Event.pageId,
          0
      );
      this.$hideProcessing()
    },
  },
  computed: {},
  watch: {},
  created() {
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>
