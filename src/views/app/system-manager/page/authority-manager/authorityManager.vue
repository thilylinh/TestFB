<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">{{ $t("Quản lý phân quyền sử dụng") }}</h1>
          <div class="top-right-button-container">
            <b-button
                class="top-right-button"
                size="lg"
                variant="primary"
                @click="handler_open_modal(1)"
            ><i class="simple-icon-pencil"/> {{ $t("pages.add-new") }}
            </b-button>
          </div>
          <piaf-breadcrumb/>
          <div class="mb-2">
            <b-button
                v-b-toggle.displayOptions
                class="pt-0 pl-0 d-inline-block d-md-none"
                variant="empty"
            >
              {{ $t("pages.display-options") }}
              <i class="simple-icon-arrow-down align-middle"/>
            </b-button>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <div
                    class="search-sm d-inline-block float-md-left mr-1 align-top"
                >
                  <b-input
                      :placeholder="$t('menu.search')"
                      autocomplete="off"
                      @input="val => searchChange(val)"
                  />
                </div>
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
          <div class="separator mb-2"/>
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
              <template slot="roomName" slot-scope="props">
                <span>{{ props.rowData.name }}</span>
                <small
                    v-if="props.rowData.description"
                    style="font-style: italic;color: blue;"
                ><br/>{{ props.rowData.description }}</small
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
                        style="font-size: 20px;font-weight: bold;color: darkslategray;"
                    />
                  </template>
                  <b-dropdown-item
                      @click="handler_open_modal(2, props.rowData)"
                  >
                    <i class="simple-icon-pencil"/>
                    <span class="content">Cập nhật</span>
                  </b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item
                      @click="handler_open_modal(3, props.rowData)"
                  >
                    <i class="simple-icon-trash"/>
                    <span class="content">Xóa</span>
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
    <authority-manager-event ref="refAuthorityManagerEvent"
                             @handleSubmitEvent="subEvAuthorityManagerEvent"/>
    <n-core-modal-delete ref="refNCoreModalDeleteEvent"
                         @handleSubmitEvent="subEvNCoreModalDeleteEvent"/>
  </b-row>
</template>
<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import {mapActions} from "vuex";
import NCoreConfig from "../../../../NCoreHelper/NCoreConfig";
import NCoreHelper from "../../../../NCoreHelper/NCoreHelper";
import NPagination from "../../../../../containers/ndev-manager/Page/NPagination";
import NPaginationPageSize from "../../../../../containers/ndev-manager/Page/NPaginationPageSize";
import NCoreModalDelete from "../../../../../containers/ndev-core/components/NCoreModalDelete";
import AuthorityManagerEvent from "../modal/authorityManagerEvent";
import authorityManagerApi from "../../api/authorityManagerApi";

export default {
  components: {
    AuthorityManagerEvent,
    NCoreModalDelete,
    NPaginationPageSize,
    NPagination,
    vuetable: Vuetable
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
          width: "2%"
        },
        {
          name: "__slot:roomName",
          sortField: "name",
          title: "TÊN QUYỀN SỬ DỤNG",
          titleClass: "",
          dataClass: "list-item-heading",
          width: "90%"
        }
      ]
    };
  },
  methods: {
    ...mapActions([
      "callStoreCrudUpdate",
      "callStoreCrudDelete",
      "callStoreCloseLoadingNCoreModalDelete"
    ]),
    async fetchData() {
      this.$showLoading();
      const dataSend = {
        search: this.search,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      };
      const iResult = await NCoreHelper.v2executeGET(
          this,
          authorityManagerApi.AUTHORITIES_MANAGER_GET_PAGING,
          dataSend
      );
      if (iResult) {
        this.dataPage = iResult.pageLists;
        this.items = iResult.pageLists;
        this.totalRecord = iResult.totalRecord;
        this.to = this.pageSize;
      } else {
        NCoreHelper.v2alertMess(this, '', 3)
      }
      this.$hideLoading();
    },
    async handler_open_modal(flag, data) {
      const valueAuthority = await NCoreHelper.v2checkAuthorities('AuthorityManager')
      switch (flag) {
        case 1: {
          if ((valueAuthority & NCoreConfig.authority_Add) !== 0) {
            this.$showAllPageLoading()
            await this.callStoreCrudUpdate({
              id: this.$refs.refAuthorityManagerEvent.idModal,
              title: "Thêm mới quyền sử dụng",
              type: "add",
              funcName: "quyền sử dụng",
              authorityName: '',
              dataAuthorities: await NCoreHelper.v2executeGET(this, authorityManagerApi.AUTHORITY_MANAGER_GET_FEATURE_BY_AUTHORITIES, {
                authorities: '0'
              }),
              data: null
            });
            NCoreHelper.v2modalShowHide(
                this,
                this.$refs.refAuthorityManagerEvent.idModal,
                1
            );
          } else {
            NCoreHelper.v2alertMess(this, NCoreConfig.localErrMessAuthority, 1)
          }
          break;
        }
        case 2: {
          if ((valueAuthority & NCoreConfig.authority_Edit) !== 0) {
            this.$showAllPageLoading();
            await this.callStoreCrudUpdate({
              id: this.$refs.refAuthorityManagerEvent.idModal,
              title: "Cập nhật quyền sử dụng",
              type: "update",
              funcName: "quyền sử dụng",
              authorityName: data.name,
              data: await NCoreHelper.v2executeGETById(
                  this,
                  authorityManagerApi.AUTHORITIES_MANAGER_GET_BY_ID,
                  data.id
              ),
              dataAuthorities: await NCoreHelper.v2executeGET(this,
                  authorityManagerApi.AUTHORITY_MANAGER_GET_FEATURE_BY_AUTHORITIES,
                  {
                    authorities: data.id
                  })
            });
            NCoreHelper.v2modalShowHide(
                this,
                this.$refs.refAuthorityManagerEvent.idModal,
                1
            );
          } else {
            NCoreHelper.v2alertMess(this, NCoreConfig.localErrMessAuthority, 1)
          }
          break;
        }
        case 3: {
          if ((valueAuthority & NCoreConfig.authority_Delete) !== 0) {
            await this.callStoreCrudDelete({
              content: data.name,
              id: data.id
            });
            NCoreHelper.v2modalShowHide(
                this,
                this.$refs.refNCoreModalDeleteEvent.idModal,
                1
            );
          } else {
            NCoreHelper.v2alertMess(this, NCoreConfig.localErrMessAuthority, 1)
          }
          break;
        }
        default: {
          break;
        }
      }
    },
    async subEvAuthorityManagerEvent(val) {
      if (val === true) {
        await this.fetchData();
      }
      NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refAuthorityManagerEvent.idModal,
          0
      );
    },
    async subEvNCoreModalDeleteEvent(val) {
      let model = [];
      model.push(val.id);
      const iResult = await NCoreHelper.v2executePOST(
          this,
          authorityManagerApi.AUTHORITIES_MANAGER_DELETE,
          {
            models: model
          }
      );
      if (iResult) {
        await this.fetchData();
        NCoreHelper.v2alertMess(this, "Xóa dữ liệu thành công", 1);
        NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNCoreModalDeleteEvent.idModal,
            0
        );
      } else {
        NCoreHelper.v2alertMess(this, "", 3);
      }
      await this.callStoreCloseLoadingNCoreModalDelete(false);
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
