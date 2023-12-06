<!--SẮP XẾP MENU-->
<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">Sắp xếp menu</h1>
          <div class="top-right-button-container">
          </div>
          <piaf-breadcrumb/>
          <div class="mb-2">
            <n-button-default-display-option/>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <n-button-default-search ref="refSubjectManagerButtonDefaultSearch"
                                         @handlerSubmitEvent="subEvSubjectManagerButtonDefaultSearch"/>
                <authority-manager-combobox :btn-show-all="'0'"
                                            :page-title="authorityManagerComboboxTitle"
                                            ref="refUserManager_authorityManagerCombobox"
                                            @submitEvent="subEvUserManager_authorityManagerCombobox"/>
              </div>
            </b-collapse>
          </div>
          <div class="separator mb-2"/>
        </b-colxx>
      </b-row>
    </b-colxx>
    <b-colxx xxs="12" class="NCard">
      <b-card>
        <b-row>
          <b-colxx xxs="12">
            <b-table-simple hover small caption-top responsive bordered striped>
              <b-thead head-variant="dark">
                <b-tr class="NFontTrTable">
                  <b-th class="center sttWidth" rowspan="2">#</b-th>
                  <b-th class="center" colspan="5">CHỨC NĂNG</b-th>
                  <b-th class="center" rowspan="2">TÊN CHỨC NĂNG</b-th>
                </b-tr>
                <b-tr class="NFontTrTable">
                  <b-th class="center" style="width: 100px;">LÊN</b-th>
                  <b-th class="center" style="width: 100px;">XUỐNG</b-th>
                  <b-th class="center" style="width: 100px;">XEM</b-th>
                  <b-th class="center" style="width: 100px;">XÓA</b-th>
                  <b-th class="center" style="width: 100px;">QUYỀN</b-th>
                </b-tr>
                <b-tr class="NFontTrTable">
                  <b-th class="center" colspan="2"
                        v-if="parentName !== ''">
                    <b-button class="nFontButton"
                              size="xs"
                              type="button"
                              variant="danger"
                              @click="backDefault()">
                      <span class="label"> <i class="simple-icon-direction"></i> Quay lại</span>
                    </b-button>
                  </b-th>
                  <b-th class="center" colspan="3">
                    <b-button class="nFontButton"
                              size="xs"
                              type="button"
                              variant="success"
                              @click="backDefault()">
                      <span class="label"> <i class="simple-icon-direction"></i> Thêm chức năng</span>
                    </b-button>
                  </b-th>
                  <b-th class="center" colspan="8">{{ parentName }}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <n-core-skeleton-table/>
                <b-tr v-show="!$store.state.componentLoading"
                      v-for="(items, index) in sortedPageData"
                      :key="index">
                  <b-td class="center">{{ index + 1 }}</b-td>
                  <b-td class="center">
                    <span v-if="items.position > 1"
                          class="nFontBold nColorBlue nHover selectCombobox">
                      <b-button class="nFontButton nButtonUpDown"
                                size="xs"
                                type="button"
                                variant="success"
                                @click="callUpDown(items, 1)">
                      <span class="label"> <i class="simple-icon-arrow-up-circle"></i></span>
                    </b-button>
                    </span>
                  </b-td>
                  <b-td class="center">
                    <span v-if="items.position < maxPosition">
                      <b-button class="nFontButton nButtonUpDown"
                                size="xs"
                                type="button"
                                variant="danger"
                                @click="callUpDown(items, 2)">
                      <span class="label"> <i class="simple-icon-arrow-down-circle"></i></span>
                    </b-button>
                    </span>
                  </b-td>
                  <b-td class="center">
                    <b-button class="nFontButton nButtonUpDown"
                              size="xs"
                              type="button"
                              variant="dark"
                              @click="callView(items)">
                      <span class="label"> <i class="simple-icon-eye"></i></span>
                    </b-button>
                  </b-td>
                  <b-td class="center">
                    <b-button class="nFontButton nButtonUpDown"
                              size="xs"
                              type="button"
                              variant="primary"
                              @click="deletedMenu(items)">
                      <span class="label"> <i class="simple-icon-trash"></i></span>
                    </b-button>
                  </b-td>
                  <b-td class="center">
                    <b-button class="nFontButton nButtonUpDown"
                              size="xs"
                              type="button"
                              variant="warning"
                              @click="changePermission(items)">
                      <span class="label"> <i class="simple-icon-layers"></i></span>
                    </b-button>
                  </b-td>
                  <b-td>
                    <b-input v-model="items.name" class="form-control"/>
                  </b-td>
                </b-tr>
                <b-tr v-show="!$store.state.componentLoading"
                      v-if="pageData.length > 0">
                  <b-td colspan="10" class="center">
                    <n-core-button-run :show-btn-save="'1'"
                                       :btn-cancel="'Hủy bỏ'"
                                       :btn-save-title="'Lưu sắp xếp'"
                                       @submitEvent="subEvSortMenu_BtnSave"/>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-colxx>
          <b-colxx xxs="12" v-if="pageData.length===0" class="center"><span v-html="emptyTable"></span></b-colxx>
        </b-row>
      </b-card>
    </b-colxx>
    <sort-menu-permission :send-param="sendAuthoritiesId"
                          ref="refSortMenuManager_Permission"
                          @handlerSubmitEvent="subEvSortMenuManager_Permission"/>
  </b-row>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NButtonDefaultDisplayOption from "@/containers/ndev-core/button_default/NButtonDefaultDisplayOption";
import NButtonDefaultSearch from "@/containers/ndev-core/button_default/NButtonDefaultSearch";
import NButtonDefaultChoose from "@/containers/ndev-core/button_default/NButtonDefaultChoose";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import AuthorityManagerCombobox from "@/views/app/system-manager/combobox/authorityManagerCombobox";
import sortMenuManagerApi from "@/views/app/system-manager/api/sortMenuManagerApi";
import NCoreSkeletonTr from "@/containers/ndev-core/components/NCoreSkeletonTr";
import NCoreSkeletonTable from "@/containers/ndev-core/components/NCoreSkeletonTable";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreButtonRun2 from "@/containers/ndev-core/components/NCoreButtonRun2";
import helperApi from "@/views/app/system-manager/api/helperApi";
//import subjectTypeManagerApi from "@/views/app/study-manager/api/subjectTypeManagerApi";
import SortMenuPermission from "@/views/app/system-manager/modal/sortMenuPermission";

export default {
  components: {
    SortMenuPermission,
    NCoreButtonRun2,
    NCoreButtonRun,
    NCoreSkeletonTable,
    NCoreSkeletonTr,
    AuthorityManagerCombobox,
    NButtonDefaultChoose,
    NButtonDefaultSearch,
    NButtonDefaultDisplayOption,
  },
  data() {
    return {
      PageId: "companyViewPageId",
      pageData: [],
      maxPosition: 0,
      isChangeSort: false,
      parentName: '',
      sendAuthoritiesId: '',
      emptyTable: NCoreConfig.noDataTemplate,
      parentMenuId: NCoreConfig.isGuidEmpty,
      authorityManagerCombobox: NCoreConfig.isGuidEmpty,
      authorityManagerComboboxTitle: 'Quyền sử dụng: --Chọn quyền sử dụng --',
    };
  },
  methods: {
    async fetchData() {
      this.$showLoading();
      this.pageData = []
      this.pageData = await NCoreHelper.v2executeGET(this, sortMenuManagerApi.GET_PAGING, {
        menuId: this.authorityManagerCombobox,
        parentId: this.parentMenuId
      })
      this.maxPosition = this.pageData.length > 0
        ? Math.max(...this.pageData.map(o => o.position))
        : 0
      for (let i = 0; i < this.pageData.length; i++) {
        if (this.pageData[i].name === '' || this.pageData[i].name === null) {
          this.pageData[i].name = this.pageData[i].rootName
        }
      }
      this.$hideLoading();
    },
    async callView(vData) {
      this.parentMenuId = vData.menuId
      this.parentName = vData.name.toUpperCase()
      await this.fetchData(true);
    },
    async deletedMenu(vData) {
      NCoreHelper.v2alertMessSweet_Question(this,
        'Bạn chắc chắn muốn xóa menu ' + vData.name.toUpperCase() + ' ?', 1)
        .then(async (result) => {
          if (result.isConfirmed) {
            this.$showAllPageLoading()
            let model = [];
            model.push(vData.id);
            const iResult = await NCoreHelper.v2executePOST(
              this,
              sortMenuManagerApi.DELETE,
              {
                models: model
              }
            );
            if (iResult) {
              await this.fetchData();
              NCoreHelper.v2alertMess(this, "Xóa dữ liệu thành công", 1);
            } else {
              NCoreHelper.v2alertMess(this, "", 3);
            }
            this.$hideAllPageLoading()
          }
        })
    },
    async subEvSubjectManagerButtonDefaultSearch(vData) {
      this.search = vData;
      this.pageNumber = 1;
      await this.fetchData(true);
    },
    async subEvUserManager_authorityManagerCombobox(val) {
      this.authorityManagerCombobox = val.id
      this.parentMenuId = NCoreConfig.isGuidEmpty
      this.authorityManagerComboboxTitle = 'Quyền sử dụng: -- ' + val.name + ' --'
      await this.fetchData(true)
    },
    async callUpDown(vData, flag) {
      this.isChangeSort = true
      this.pageData = NCoreHelper.returnSortWithPosition(vData, flag, this.pageData)
    },
    async subEvSortMenu_BtnSave(isSave) {
      if (isSave) {
        this.$showProcessing()
        const iResult = await NCoreHelper.v2executePUT(this, sortMenuManagerApi.UPDATE, {
          models: this.pageData
        })
        if (iResult) {
          NCoreHelper.v2alertMess(this, 'Sắp xếp menu thành công', 2)
          this.isChangeSort = false
          await this.fetchData()
        } else {
          NCoreHelper.v2alertMess(this, '', 3)
          this.$hideProcessing()
        }
      } else {
        this.isChangeSort = false
        await this.fetchData()
      }
    },
    async backDefault() {
      this.parentMenuId = NCoreConfig.isGuidEmpty
      await this.fetchData(true);
    },
    async changePermission(vData) {
      this.sendAuthoritiesId = vData.id
      NCoreHelper.v2modalShowHide(this, this.$refs.refSortMenuManager_Permission.pageIdModal, 1)
    },
    async subEvSortMenuManager_Permission(vData) {
      await this.fetchData()
      NCoreHelper.v2modalShowHide(this, this.$refs.refSortMenuManager_Permission.pageIdModal, 0)
    }
  },
  computed: {
    sortedPageData: function () {
      function compare(a, b) {
        if (a.position < b.position)
          return -1;
        if (a.position > b.position)
          return 1;
        return 0;
      }

      return this.pageData.sort(compare);
    }
  },
  watch: {},
  async created() {
  },
  async mounted() {
    //await this.fetchData();
  },
  beforeUpdate() {
  }
};
</script>
