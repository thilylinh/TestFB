<!--Danh sách chức năng mặc định của hệ thống-->
<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">{{ $t("Quản lý chức năng hệ thống") }}</h1>
          <div class="top-right-button-container">
            <b-button class="top-right-button nFontButtonHeader mt-1"
                      size="lg"
                      variant="danger"
                      @click="handler_open_modal(1)">
              <i class="simple-icon-pencil"/> {{ $t("pages.add-new") }}
            </b-button>
          </div>
          <piaf-breadcrumb/>
          <div class="mb-2">
            <b-button v-b-toggle.displayOptions
                      class="pt-0 pl-0 d-inline-block d-md-none"
                      variant="empty">
              {{ $t("pages.display-options") }}
              <i class="simple-icon-arrow-down align-middle"/>
            </b-button>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <!-- <n-status-content-search
                  @handlerStatusSubmit="handlerStatusSubmit"
                /> -->
                <div class="search-sm d-inline-block float-md-left mr-1 align-top">
                  <b-input :placeholder="$t('menu.search')"
                           autocomplete="off"
                           @input="val => searchChange(val)"/>
                </div>
                <menu-version-combobox :btn-show-all="'0'"
                                          :page-title="menuVersionComboboxTitle"
                                          ref="refNewsGroup_menuVersionCombobox"
                                          @submitEvent="subEvNewsGroup_menuVersionCombobox"/>
              </div>
            </b-collapse>
          </div>
          <div class="separator mb-2"/>
        </b-colxx>
      </b-row>
    </b-colxx>
    <b-colxx xxs="12">
      <b-card>
        <b-row v-show="$store.state.componentLoading" class="overflow-hidden">
          <b-colxx xxs="12">
            <b-skeleton-table :rows="5"
                              :columns="4"
                              :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
          </b-colxx>
        </b-row>
        <b-row v-show="!$store.state.componentLoading">
          <b-colxx :hidden="hiddenNoData"
                   class="text-center"
                   xxs="12"
                   v-html="noDataTemplate"></b-colxx>
          <b-colxx :hidden="!hiddenNoData" xxs="12">
            <b-colxx class="mb-3" xxs="12">
              <b-button size="xs"
                        variant="outline-danger"
                        @click="openFullOrClose(1)">
                <i class="simple-icon-size-fullscreen"></i> Mở rộng tất cả
              </b-button>
              <b-button size="xs"
                        variant="outline-primary"
                        @click="openFullOrClose(2)">
                <i class="simple-icon-size-actual"></i> Thu gọn tất cả
              </b-button>
            </b-colxx>
            <v-jstree :data="dataTree"
                      allow-batch
                      multiple
                      whole-row
                      @item-click="itemClick">
              <template scope="_">
                <div style="display: inherit;">
                  <i v-if="!_.model.loading"
                     :class="_.vm.themeIconClasses"
                     role="presentation"></i>
                  {{ _.model.text }}
                  <span :id="_.model.text" :hidden="_.model.openedAction">
                    <b-badge pill
                             variant="success"
                             @click="handler_open_modal(2, _.model.id)">
                      {{ $t("badge.edit") }}</b-badge>
                    <b-badge pill
                             variant="danger"
                             @click="handler_open_modal(3, _.model)"
                    >{{ $t("badge.delete") }}</b-badge>
                  </span>
                </div>
              </template>
            </v-jstree>
          </b-colxx>
        </b-row>
      </b-card>
    </b-colxx>
    <menu-function-manager-event ref="refMenuFunctionManagerEvent"
                                 @handleSubmitEvent="subEvMenuFunctionManagerEvent"/>
    <n-core-modal-delete ref="refNCoreModalDeleteEvent"
                         @handleSubmitEvent="subEvNCoreModalDeleteEvent"/>
  </b-row>
</template>
<script>

import {mapActions, mapGetters} from "vuex";
import VJstree from "vue-jstree";
import NCoreConfig from "../../../../NCoreHelper/NCoreConfig";
import menuFunctionManagerApi from "../../api/menuFunctionManagerApi";
import NCoreHelper from "../../../../NCoreHelper/NCoreHelper";
import MenuFunctionManagerEvent from "../modal/menuFunctionManagerEvent.vue";
import NCoreModalDelete from "@/containers/ndev-core/components/NCoreModalDelete";
import MenuVersionCombobox from "@/views/app/system-manager/page/combobox/menuVersionCombobox.vue";

export default {
  components: {
    MenuVersionCombobox,
    NCoreModalDelete,
    VJstree,
    MenuFunctionManagerEvent
  },
  data() {
    return {
      PageId: "menuFunctionManagerId",
      titlePage: "QUẢN LÝ CHỨC NĂNG HỆ THỐNG",
      noDataTemplate: NCoreConfig.noDataTemplate,
      hiddenNoData: false,
      isLoad: false,
      dataTree: [],
      searchText: "",
      editingItem: {},
      editingNode: null,
      itemEvents: {
        // mouseover: function () {
        //   console.log('mouseover')
        // },
        // contextmenu: function () {
        //   console.log(arguments[2])
        //   arguments[2].preventDefault()
        //   console.log('contextmenu')
        // }
      },
      treeSelectOld: "",
      treeSelectItem: "",
      menuVersionCombobox: NCoreConfig.isGuidEmpty,
      menuVersionComboboxTitle: 'Phiên bản: -- Chọn phiên bản --',
    };
  },
  methods: {
    ...mapActions([
      "callStoreTreeview",
      "callStoreCrudUpdate",
      "callStoreCrudDelete"
    ]),
    async handler_open_modal(flag, data) {
      switch (flag) {
        case 1: {
          await this.callStoreCrudUpdate({
            id: this.$refs.refMenuFunctionManagerEvent.idModal,
            title: "Thêm mới chức năng hệ thống",
            type: "add",
            funcName: "chức năng hệ thống",
            data: null
          });
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refMenuFunctionManagerEvent.idModal,
            1
          );
          break;
        }
        case 2: {
          const iResult = await NCoreHelper.v2executeGETById(
            this,
            menuFunctionManagerApi.MANAGER_MENU_FUNCTION_GET_BY_ID,
            this.treeSelectItem.id
          );
          // xử lý dữ liệu
          let dataSend = [];
          dataSend = iResult;
          await this.callStoreCrudUpdate({
            id: this.$refs.refMenuFunctionManagerEvent.idModal,
            title: "Cập nhật chức năng hệ thống",
            type: "edit",
            mesSuccess: "Cập nhật chức năng hệ thống thành công",
            perValue: dataSend.permissionValue,
            data: dataSend
          });
          this.$bvModal.show(this.$refs.refMenuFunctionManagerEvent.idModal);
          break;
        }
        case 3: {
          await this.callStoreCrudDelete({
            content: data.label,
            id: data.id
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
    setOpenedAction(data) {
      if (data.children != null) {
        if (data.id === this.treeSelectOld) {
          data.openedAction = true;
        } else {
          for (let i = 0; i < data.children.length; i++) {
            this.setOpenedAction(data.children[i]);
          }
        }
      } else {
        if (data.id === this.treeSelectOld) {
          data.openedAction = true;
        }
      }
    },
    itemClick(node) {
      this.treeSelectItem = node.model;
      if (this.treeSelectOld !== "") {
        for (let i = 0; i < this.dataTree.length; i++) {
          this.setOpenedAction(this.dataTree[i]);
        }
      }
      node.model.openedAction = false;
      this.treeSelectOld = node.model.id;
    },
    async fetchData(version) {
      this.$showLoading();
      await this.callStoreTreeview({
        search: this.search,
        id: this.PageId,
        version,
        api: menuFunctionManagerApi.MANAGER_MENU_FUNCTION_TREEVIEW
      });
    },
    searchChange(val) {
      this.search = val;
      this.pageNumber = 1;
      this.fetchData();
    },
    openFullOrClose(val) {
      NCoreHelper.openFullOrCloseTreeView(val, this.dataTree);
    },
    subEvMenuFunctionManagerEvent() {
      this.fetchData();
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refMenuFunctionManagerEvent.idModal,
        0
      );
    },
    async subEvNCoreModalDeleteEvent(val) {
      let model = [];
      model.push(val.id);
      const iResult = await NCoreHelper.v2executePOST(
        this,
        menuFunctionManagerApi.MANAGER_MENU_FUNCTION_DELETE,
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
    },
    async subEvNewsGroup_menuVersionCombobox(val) {
      this.menuVersionCombobox = val.id
      this.menuVersionComboboxTitle = 'Phiên bản: -- ' + val.name + ' --'
      await this.fetchData(val.id)
    },
  },
  computed: {
    ...mapGetters(["storeTreeview"])
  },
  watch: {
    storeTreeview: function (val) {
      if (val != null) {
        this.dataTree = val;
        this.hiddenNoData = true;
      } else {
        this.hiddenNoData = false;
      }
      this.$hideLoading();
    }
  },
  async created() {
  },
  async mounted() {
    // this.$nextTick(async function() {
    //   // Kiểm tra xem có dữ liệu dự án đang muốn quản lý hay không ?
    //   const iProjectId = localStorage.getItem(NCoreConfig.localProjectId);
    //   if (iProjectId === null) {
    //     NCoreHelper.alertMess(this, "Không có dữ liệu dự án cần tra cứu", 1);
    //     await this.$router.push({
    //       name: "project-manager-list"
    //     });
    //   }
    // });
    // await this.fetchData();
  },
  beforeUpdate() {
  }
};
</script>
