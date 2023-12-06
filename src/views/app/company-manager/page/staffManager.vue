<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">{{ $t("Quản lý nhân viên") }}</h1>
          <div class="top-right-button-container">
            <b-button
              class="top-right-button"
              size="lg"
              variant="primary"
              @click="handler_open_modal(1)"
              ><i class="simple-icon-pencil" /> {{ $t("pages.add-new") }}
            </b-button>
          </div>
         
          <div class="mb-2">
            <b-button
              v-b-toggle.displayOptions
              class="pt-0 pl-0 d-inline-block d-md-none"
              variant="empty"
            >
              {{ $t("pages.display-options") }}
              <i class="simple-icon-arrow-down align-middle" />
            </b-button>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                  <b-input
                    :placeholder="$t('menu.search')"
                    autocomplete="off"
                    @input="(val) => searchChange(val)"
                  />
                </div>
                <room-manager-combobox
                  :titleSubject="'Phòng/Ban'"
                  :titleSelectAll="'Tất cả'"
                  :titleShowBtnAll="'1'"
                  @handlerSubmitEvent="subEvRoomManagerCombobox"
                />
              </div>
              <n-pagination-page-size
                :from="from"
                :page-size-default="pageSize"
                :to="to"
                :total-record="totalRecord"
                @handleChangePageSize="handleChangePageSize"
              />
            </b-collapse>
          </div>
          <div class="separator mb-2" />
        </b-colxx>
      </b-row>
      <template>
        <b-row v-show="$store.state.componentLoading" class="overflow-hidden">
          <b-colxx xxs="12">
            <b-skeleton-table
              :rows="5"
              :columns="4"
              :table-props="{ bordered: true, striped: true }"
            ></b-skeleton-table>
          </b-colxx>
        </b-row>
        <b-row v-show="!$store.state.componentLoading">
          <b-colxx xxs="12" class="NTable">
            <vuetable
              ref="projectManagerTableRef"
              :api-mode="false"
              :data="dataPage"
              :fields="fields"
              :no-data-template="noDataTemplate"
              :reactive-api-url="true"
              class="table-divided order-with-arrow"
            >
              <template slot="staffName" slot-scope="props">
                <span
                  style="
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                    font-weight: bold;
                  "
                  >{{ props.rowData.name }}</span
                >
                <small style="font-style: italic"
                  ><br />Địa chỉ:
                  <span style="color: blue; font-weight: bold">{{
                    props.rowData.address
                  }}</span></small
                >
                <small
                  v-if="props.rowData.description"
                  style="font-style: italic; color: blue"
                  ><br />{{ props.rowData.description }}</small
                >
              </template>
              <template slot="roomManagerName" slot-scope="props">{{
                props.rowData.roomManagerName
              }}</template>
              <template slot="comunication" slot-scope="props">
                <small style="font-style: italic">
                  <span style="color: blue; font-weight: bold">{{
                    props.rowData.phone
                  }}</span></small
                >
                <br />
                <small style="font-style: italic">
                  <span style="color: blue; font-weight: bold">{{
                    props.rowData.email
                  }}</span></small
                >
              </template>
              <template slot="authorityName" slot-scope="props">
                <small style="font-style: italic">
                  <span style="color: blue; font-weight: bold">{{
                    props.rowData.userName
                  }}</span></small
                >
                <br />
                <small style="font-style: italic">
                  <span style="color: blue; font-weight: bold">{{
                    props.rowData.authorityManagerName
                  }}</span></small
                >
              </template>
              <template slot="actions" slot-scope="props">
                <b-dropdown
                  variant="link"
                  boundary="viewport"
                  toggle-class="text-decoration-none"
                  class="NButton_DropDown"
                  no-caret
                >
                  <template v-slot:button-content>
                    <i
                      class="simple-icon-options-vertical"
                      style="font-size: 20px; font-weight: bold; color: darkslategray"
                    />
                  </template>
                  <b-dropdown-item @click="handler_open_modal(2, props.rowData)">
                    <i class="simple-icon-pencil" />
                    <span class="content">Cập nhật</span>
                  </b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item @click="handler_open_modal(3, props.rowData)">
                    <i class="simple-icon-trash" />
                    <span class="content">Xóa</span>
                  </b-dropdown-item>
                </b-dropdown>
              </template>
            </vuetable>
            <n-pagination
              :current-page="pageNumber"
              :default-page-size="pageSize"
              :total-items="totalRecord"
              @handlePagingClick="handlePagingClick"
            />
          </b-colxx>
        </b-row>
      </template>
    </b-colxx>
    <staff-manager-event
      ref="refStaffManagerEvent"
      @handleSubmitEvent="subEvStaffManagerEvent"
    />
    <n-core-modal-delete
      ref="refNCoreModalDeleteEvent"
      @handleSubmitEvent="subEvNCoreModalDeleteEvent"
    />
  </b-row>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import { mapActions } from "vuex";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import staffManagerApi from "../api/staffManagerApi";
import NCoreConfig from "../../../NCoreHelper/NCoreConfig";
import NPagination from "../../../../containers/ndev-manager/Page/NPagination";
import NPaginationPageSize from "../../../../containers/ndev-manager/Page/NPaginationPageSize";
import NCoreModalDelete from "../../../../containers/ndev-core/components/NCoreModalDelete";
import StaffManagerEvent from "../event/staffManagerEvent.vue";
import RoomManagerCombobox from "../combobox/room-combobox/roomManagerCombobox.vue";

export default {
  components: {
    NCoreModalDelete,
    NPaginationPageSize,
    NPagination,
    vuetable: Vuetable,
    StaffManagerEvent,
    RoomManagerCombobox,
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
          title: "TÊN NHÂN VIÊN",
          titleClass: "",
          dataClass: "list-item-heading",
          width: "40%",
        },
        {
          name: "__slot:roomManagerName",
          sortField: "name",
          title: "PHÒNG BAN",
          titleClass: " text-center",
          dataClass: "list-item-heading text-center",
          width: "20%",
        },
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
          width: "20%",
        },
      ],
      roomManagerId: "",
      isCallNow: true, // đang gọi dữ liệu
    };
  },
  methods: {
    ...mapActions([
      "callStoreCrudUpdate",
      "callStoreCrudDelete",
      "callStoreCloseLoadingNCoreModalDelete",
    ]),
    async fetchData() {
      if (this.isCallNow) {
        this.$showLoading();
        this.isCallNow = false;
        const iRoomManagerId =
          this.roomManagerId === "" ? NCoreConfig.isGuidEmpty : this.roomManagerId;
        const dataSend = {
          search: this.search,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
          roomManagerId: iRoomManagerId,
        };
        const iResult = await NCoreHelper.v2executeGET(
          this,
          staffManagerApi.STAFF_MANAGER_GET_PAGING,
          dataSend
        );
        this.dataPage = iResult.pageLists;
        this.items = iResult.pageLists;
        this.totalRecord = iResult.totalRecord;
        this.to = this.pageSize;
        this.isCallNow = true;
        this.$hideLoading();
      }
    },
    async handler_open_modal(flag, data) {
      switch (flag) {
        case 1: {
          await this.callStoreCrudUpdate({
            id: this.$refs.refStaffManagerEvent.idModal,
            title: "Thêm mới nhân viên",
            type: "add",
            funcName: "nhân viên",
            hiddenPassword: false,
            data: null,
          });
          NCoreHelper.v2modalShowHide(this, this.$refs.refStaffManagerEvent.idModal, 1);
          break;
        }
        case 2: {
          this.$showAllPageLoading();
          await this.callStoreCrudUpdate({
            id: this.$refs.refStaffManagerEvent.idModal,
            title: "Cập nhật nhân viên",
            type: "update",
            funcName: "nhân viên",
            hiddenPassword: true,
            data: await NCoreHelper.v2executeGETById(
              this,
              staffManagerApi.STAFF_MANAGER_GET_BY_ID,
              data.id
            ),
          });
          NCoreHelper.v2modalShowHide(this, this.$refs.refStaffManagerEvent.idModal, 1);
          break;
        }
        case 3: {
          await this.callStoreCrudDelete({
            content: data.name,
            id: data.id,
          });
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNCoreModalDeleteEvent.idModal,
            1
          );
          break;
        }
        default: {
          break;
        }
      }
    },
    async subEvStaffManagerEvent(val) {
      if (val === true) {
        await this.fetchData();
      }
      NCoreHelper.v2modalShowHide(this, this.$refs.refStaffManagerEvent.idModal, 0);
    },
    async subEvNCoreModalDeleteEvent(val) {
      let model = [];
      model.push(val.id);
      const iResult = await NCoreHelper.v2executePOST(
        this,
        staffManagerApi.STAFF_MANAGER_DELETE,
        {
          models: model,
        }
      );
      if (iResult) {
        await this.fetchData();
        NCoreHelper.v2alertMess(this, "Xóa dữ liệu thành công", 1);
        NCoreHelper.v2modalShowHide(this, this.$refs.refNCoreModalDeleteEvent.idModal, 0);
      } else {
        NCoreHelper.v2alertMess(this, "", 3);
      }
      await this.callStoreCloseLoadingNCoreModalDelete(false);
    },
    async subEvRoomManagerCombobox(val) {
      this.roomManagerId = val === "-1" ? NCoreConfig.isGuidEmpty : val;
      await this.fetchData();
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
    async searchChange(val) {
      this.search = val;
      this.pageNumber = 1;
      await this.fetchData();
    },
  },
  computed: {},
  watch: {},
  created() {},
  async mounted() {
    await this.fetchData();
  },
};
</script>
