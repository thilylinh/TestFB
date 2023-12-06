<template>
  <b-modal :id="idModal"
           :hide-footer="true"
           :hide-header-close="true"
           :title="titleModal"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="md"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">1. Tên nhóm tin <span class="nRequired">(*)</span> </label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input id="menuFunctionManagerEvent_txtHoTen"
                        v-model="$v.form.name.$model"
                        :state="!$v.form.name.$error"
                        autocomplete="off"
                        autofocus
                        placeholder="Nhập tên nhóm tin ..."/>
          <b-form-invalid-feedback v-if="!$v.form.name.required"
          >Không được bỏ trống
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.name.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <!--      <b-row>-->
      <!--        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">-->
      <!--          <label class="font-weight-700">2. Loại nhóm tin</label>-->
      <!--        </b-col>-->
      <!--        <b-col lg="12" md="12" sm="12" xs="12">-->
      <!--          <n-core-combobox ref="refNewsGroupEvent_ComboboxVia"-->
      <!--                           @handlerSubmitEvent="subEvNewsGroupEvent_ComboboxVia"          />-->
      <!--        </b-col>-->
      <!--      </b-row>-->
      <!--      <n-core-skeleton :flag-group="5"></n-core-skeleton>-->
      <b-row>
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">2. Nhóm tin cha</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <n-core-tree-select :data-combobox="comboboxFather"
                              ref="refNewsGroupEvent_TreeViewNewsGroup"
                              @handlerSubmitEvent="subEvNewsGroupEvent_TreeViewNewsGroup"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">3. Domain </label>
          <span style="float: right; margin-top: 5px;">
            <b-badge class="NBadge nHover"
                     pill
                     variant="danger"
                     @click="changeDomainVercel"> Đổi Domain
                </b-badge>
          </span>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input id="menuFunctionManagerEvent_txtDomain"
                        v-model="$v.form.domain.$model"
                        :state="!$v.form.domain.$error"
                        autocomplete="off"
                        placeholder="Nhập domain ..."/>
          <b-form-invalid-feedback v-if="!$v.form.domain.required"
          >Không được bỏ trống
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.domain.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <!--      <b-row>-->
      <!--        <b-col lg="12" md="12" sm="12" xs="12">-->
      <!--          <label class="font-weight-700">4. Tiền tố Vercel <span class="nRequired">(*)</span> </label>-->
      <!--        </b-col>-->
      <!--        <b-col lg="12" md="12" sm="12" xs="12">-->
      <!--          <b-form-input id="menuFunctionManagerEvent_txtDomainVercel"-->
      <!--                        v-model="$v.form.domainVercel.$model"-->
      <!--                        :state="!$v.form.domainVercel.$error"-->
      <!--                        autocomplete="off"-->
      <!--                        placeholder="Nhập domain Vercel ..."/>-->
      <!--          <b-form-invalid-feedback v-if="!$v.form.domain.required"-->
      <!--          >Không được bỏ trống-->
      <!--          </b-form-invalid-feedback>-->
      <!--          <b-form-invalid-feedback v-else-if="!$v.form.domain.maxLength">-->
      <!--            Độ dài tối đa 500 kí tự-->
      <!--          </b-form-invalid-feedback>-->
      <!--        </b-col>-->
      <!--      </b-row>-->
      <b-row>
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">5. Id Via</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <n-core-combobox ref="refNewsGroupEvent_ComboboxVia"
                           @handlerSubmitEvent="subEvNewsGroupEvent_ComboboxVia"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">6. IdPage </label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input id="menuFunctionManagerEvent_txtlinkTree"
                        v-model="$v.form.linkTree.$model"
                        :state="!$v.form.linkTree.$error"
                        autocomplete="off"
                        placeholder="Nhập Id page ..."/>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-checkbox v-model="showMain"
                           unchecked-value="not_accepted"
                           value="accepted">
            <span class="nHover selectCombobox">Tự động thay đổi domain khi đăng bài</span>
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">7. Người quản lý</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <n-core-combobox2 ref="refNguoiQuanLy"
                            @handlerSubmitEvent="subEvNguoiQuanLy"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">8. Ghi chú</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <textarea rows="5" class="form-control" v-model="form.description"/>
        </b-col>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         :showBtnSave="'1'"
                         @submitEvent="subEvNewsGroupEvent"/>
    </b-form>
  </b-modal>
</template>

<script>
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {mapActions, mapGetters} from "vuex";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import newsGroupApi from "@/views/app/news-content-manager/api/newsGroupApi";
import NCoreCombobox from "@/containers/ndev-core/components/NCoreCombobox";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NCoreTreeSelect from "@/containers/ndev-core/components/NCoreTreeSelect";
import newsViaApi from "@/views/app/news-content-manager/api/newsViaApi";
import staffManagerApi from "@/views/app/company-manager/api/staffManagerApi";
import NCoreCombobox2 from "@/containers/ndev-core/components/NCoreCombobox2.vue";

export default {
  components: {
    NCoreCombobox2,
    NCoreTreeSelect,
    NCoreSkeleton,
    NCoreCombobox,
    NCoreButtonRun
  },
  directives: {},
  props: {},
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(500),
      },
      staffId: "",
      newsGroupId: {},
      description: '',
      domain: '',
      idViaQc: '',
      agreeVia: '',
      linkTree: '',
      domainVercel: '',
    },
  },
  computed: {
    ...mapGetters(["storeCrudUpdate"]),
  },
  data() {
    return {
      idModal: "newsGroupEventIdModal",
      titleModal: "",
      newsGroupTypeName: '',
      comboboxFather: [],
      modalData: [],
      ComboboxViaData: [],
      agreeViaCheckbox: '',
      showMain: '',
      form: {
        id: "",
        name: "",
        newsGroupId: "",
        description: "",
        domain: "",
        idViaQc: '',
        agreeVia: '',
        linkTree: '',
        staffId: "",
        isShowMain: '',
        domainVercel: ''
      },
      newsGroupTypeReciveFromCombobox: [],
      nguoiQuanLyReciveFromCombobox: [],
      treeViewNewsGroupReceivedCombobox: []
    };
  },
  watch: {
    storeCrudUpdate: async function (val) {
      if (val.id === this.idModal) {
        this.modalData = val;
        this.comboboxFather = val.newsGroupCombobox;
        this.titleModal = val.title

        if (val.type === "add") {
          // Thêm mới
          this.treeComboboxSelected = null
          this.agreeViaCheckbox = NCoreConfig.uncheckedValue
          this.showMain = NCoreConfig.uncheckedValue
        } else {
          // Cập nhật
          this.treeComboboxSelected =
            val.data.parentId === NCoreConfig.isGuidEmpty
              ? null
              : val.data.parentId.toLowerCase();
        }
        if (val.data != null) {
          this.form.id = val.data.id;
          this.form.name = val.data.name;
          this.form.newsGroupId = val.data.parentId;
          this.form.description = val.data.description;
          this.form.domain = val.data.domain;
          this.form.idViaQc = val.data.idViaQc;
          this.form.agreeVia = val.data.agreeVia;
          this.form.linkTree = val.data.linkTree;
          this.form.staffId = val.data.staffId;
          this.form.domainVercel = val.data.domainVercel;
          this.agreeViaCheckbox = val.data.agreeVia ? NCoreConfig.checkedValue : NCoreConfig.uncheckedValue;
          this.showMain = val.data.agreeVia ? NCoreConfig.checkedValue : NCoreConfig.uncheckedValue;
          this.treeViewNewsGroupReceivedCombobox = {
            dataContentId: this.form.newsGroupId
          }
        }
        // console.log(val.data)
        //=====Lấy dữ liệu combobox NewsGroupType=====
        await this.callStoreSendCombobox({
          isShowTitleHeader: true,
          iMessage: '-- Chọn vi a --',
          isNoHeader: false,
          api: newsViaApi.NEWS_VIA_COMBOBOX,
          isAdd: val.type === "add",
          dataSend: val.data !== null ? val.data.idViaQc === NCoreConfig.isGuidEmpty ? null : val.data.idViaQc : null
        });

        //=====Lấy dữ liệu combobox NewsGroupType=====
        await this.callStoreSendCombobox2({
          isShowTitleHeader: true,
          iMessage: '-- Chọn người dùng --',
          isNoHeader: false,
          api: staffManagerApi.USER_COMBOBOX,
          isAdd: val.type === "add",
          dataSend: val.data !== null ? val.data.staffId === NCoreConfig.isGuidEmpty ? null : val.data.staffId : null,
        });
        //==========Lấy dữ liệu cây thư mục==========
        await this.callTreeViewSelect(val.newsGroupCombobox,
          val.type === "add"
            ? null
            : (val.data.parentId === NCoreConfig.isGuidEmpty ? null : val.data.parentId))
      }
      this.$hideAllPageLoading()
    },
  },
  methods: {
    ...mapActions(['callStoreSendCombobox', 'callStoreSendCombobox2', 'callStoreSendTreeViewSelect']),
    resetStateModal() {
      this.form.managerICon = "";
      this.form.name = "";
      this.form.menuGroupId = "";
      this.form.position = "";
      this.form.router = "";
      this.form.parentId = "";
      this.form.permissionValue = "";
      this.form.domain = "";
      this.form.code = "";
      this.form.staffId = "";
      this.form.domainVercel = "";
    },
    async subEvNewsGroupEvent(isSave) {
      if (this.treeViewNewsGroupReceivedCombobox === null ||
        this.treeViewNewsGroupReceivedCombobox === undefined ||
        this.treeViewNewsGroupReceivedCombobox.length === 0) {
        this.form.newsGroupId = NCoreConfig.isGuidEmpty;
      } else {
        this.form.newsGroupId = this.treeViewNewsGroupReceivedCombobox.dataContentId;
      }
      if (isSave === true) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$showProcessing()

          const iNewsGroupType = this.$refs.refNewsGroupEvent_ComboboxVia.dataSend
          const iNguoiQuanLy = this.$refs.refNguoiQuanLy.dataSend

          const dataSend = {
            name: this.form.name,
            description: this.form.description,
            parentId: this.form.newsGroupId,
            domain: this.form.domain,
            position: 0,
            idViaQc: iNewsGroupType === null ? NCoreConfig.isGuidEmpty : (iNewsGroupType === undefined ? NCoreConfig.isGuidEmpty : iNewsGroupType),
            staffId: iNguoiQuanLy === null ? NCoreConfig.isGuidEmpty : (iNguoiQuanLy === undefined ? NCoreConfig.isGuidEmpty : iNguoiQuanLy),
            agreeVia: this.showMain === NCoreConfig.checkedValue,
            isShowMain: this.showMain === NCoreConfig.checkedValue,
            linkTree: this.form.linkTree,
            domainVercel: this.form.domainVercel
          }

          if (this.modalData.type !== "add") {
            dataSend.id = this.modalData.data.id
          }
          const iResult =
            this.modalData.type === "add"
              ? await NCoreHelper.v2executePOST(
                this,
                newsGroupApi.NEWS_GROUP_CREATE,
                dataSend)
              : await NCoreHelper.v2executePUT(
                this,
                newsGroupApi.NEWS_GROUP_UPDATE,
                dataSend);
          if (iResult) {
            NCoreHelper.v2alertMess(
              this,
              NCoreHelper.returnMessage(
                this.modalData.type === "add" ? 1 : 2,
                true,
                this.modalData.funcName),
              iResult ? 2 : 3
            );

            // if (this.newsGroupTypeReciveFromCombobox.length > 0) {
            //   this.$emit("handleSubmitEvent", {
            //     result: true,
            //     newsGroupTypeModal: this.newsGroupTypeReciveFromCombobox
            //   });
            // } else {
            //   const iDataSend = this.$refs.refNewsGroupEvent_ComboboxVia.dataSend
            //   this.$emit("handleSubmitEvent", {
            //     result: true,
            //     newsGroupTypeModal: {
            //       id: iDataSend,
            //       name: this.$refs.refNewsGroupEvent_ComboboxVia.dataCombobox.find(x => x.id === iDataSend).title
            //     }
            //   });
            // }
            this.$emit("handleSubmitEvent", {
              result: true,
              newsGroupTypeModal: {
                id: NCoreConfig.isGuidEmpty,
                name: 'Nhóm dữ liệu chung'
              }
            });
            this.$hideProcessing()
          } else {
            NCoreHelper.v2alertMess(
              this,
              NCoreHelper.returnMessage(
                this.modalData.type === "add" ? 1 : 2,
                false,
                this.modalData.funcName
              ),
              iResult ? 1 : 3
            );
            this.$hideProcessing()
          }
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    },
    async changeDomainVercel() {
      const result = await NCoreHelper.v2executeGET(this, newsGroupApi.NEWS_GROUP_CHANGE_DOMAIN);
      this.form.domain = result
    },
    async subEvNewsGroupEvent_ComboboxVia(val) {
      this.$showLoadingRunFunctionInModal()
      this.newsGroupTypeReciveFromCombobox = val
      this.$hideLoadingRunFunctionInModal()
    },
    async callTreeViewSelect(vData, vDataSelect) {
      await this.callStoreSendTreeViewSelect({
        id: this.$refs.refNewsGroupEvent_TreeViewNewsGroup.pageId,
        data: vData,
        dataSelect: vDataSelect,
        noChildrenText: 'Không có dữ liệu nhóm tin con',
        messageNoChoice: 'Chọn dữ liệu nhóm tin cha'
      });
    },
    async subEvNewsGroupEvent_TreeViewNewsGroup(val) {
      this.treeViewNewsGroupReceivedCombobox = val
    },
    async subEvNguoiQuanLy(val) {
      this.$showLoadingRunFunctionInModal()
      this.newsGroupTypeReciveFromCombobox = val
      this.$hideLoadingRunFunctionInModal()
    },
  },
};
</script>
