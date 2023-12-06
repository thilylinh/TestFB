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
           size="lg"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col xs="12" sm="6">
          <b-row>
            <b-col lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">1. Tên chức năng</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <b-form-input id="menuFunctionManagerEvent_txtHoTen"
                            v-model="$v.form.name.$model"
                            :state="!$v.form.name.$error"
                            autocomplete="off"
                            autofocus
                            placeholder="Nhập tên chức năng ..."/>
              <b-form-invalid-feedback v-if="!$v.form.name.required">
                Không được bỏ trống
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.name.maxLength">
                Độ dài tối đa 500 kí tự
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">2. Nhóm chức năng cha</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <treeselect v-model="treeComboboxSelected"
                          :always-open="false"
                          :append-to-body="false"
                          :clear-on-select="true"
                          :clearable="true"
                          :close-on-select="true"
                          :disabled="false"
                          :limit="3"
                          :load-options="loadOptions"
                          :max-height="200"
                          :multiple="false"
                          :noChildrenText="'Không có dữ liệu nhóm chức năng cha'"
                          :open-on-click="true"
                          :open-on-focus="true"
                          :options="menuFatherCombobox"
                          :placeholder="'Chọn nhóm chức năng cha'"
                          :searchable="true"
                          :valueFormat="valueFormat"
                          name="treeComboboxMenuFather"
                          v-on:select="treeComboboxMenuFatherChange"/>
              <!--          <treeselect-value :value="value" />-->
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">3. Mã code nhóm cha</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <b-form-input id="menuFunctionManagerEvent_txtHoTen"
                            v-model="$v.form.code.$model"
                            :state="!$v.form.code.$error"
                            autocomplete="off"
                            placeholder="Nhập mã code nhóm cha ..."/>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">4. Icon</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <b-input-group>
                <b-form-input id="menuFunctionManagerEvent_txtICon"
                              v-model="$v.form.managerICon.$model"
                              :state="!$v.form.managerICon.$error"
                              autocomplete="off"
                              disabled
                              placeholder="Chọn icon ..."/>
                <b-form-invalid-feedback v-if="!$v.form.managerICon.required"
                >Không được bỏ trống
                </b-form-invalid-feedback>
                <b-input-group-append>
                  <b-button variant="outline-secondary" @click="iconSelect()">Chọn</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
              <b-row>
                <b-col lg="6" md="6" sm="6" xs="12">
                  <b-row>
                    <b-col lg="12" md="12" sm="12" xs="12">
                      <label class="font-weight-700">5. Vị trí nhóm cha</label>
                    </b-col>
                    <b-col lg="12" md="12" sm="12" xs="12">
                      <!-- <cleave id="txtMenuGroupId"
                              v-model="form.menuGroupId"
                              :options="options.number"
                              :raw="false"
                              autocomplete="off"
                              class="form-control text-center"
                              placeholder="0"/> -->
                    </b-col>
                  </b-row>
                </b-col>
                <b-col lg="6" md="6" sm="6" xs="12">
                  <b-row>
                    <b-col lg="12" md="12" sm="12" xs="12">
                      <label class="font-weight-700">6. Vị trí hiển thị</label>
                    </b-col>
                    <b-col lg="12" md="12" sm="12" xs="12">
                      <!-- <cleave id="txtposition"
                              v-model="form.position"
                              :options="options.number"
                              :raw="false"
                              autocomplete="off"
                              class="form-control text-center"
                              placeholder="0"/> -->
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">7. Đường dẫn (Router)</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <b-form-input id="menuFunctionManagerEvent_txtRouter"
                            v-model="$v.form.router.$model"
                            :state="!$v.form.router.$error"
                            autocomplete="off"
                            placeholder="Nhập đường dẫn ..."/>
              <b-form-invalid-feedback v-if="!$v.form.router.required">
                Không được bỏ trống
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">8. Version</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <b-form-input id="menuFunctionManagerEvent_txtVersion"
                            v-model="$v.form.version.$model"
                            :state="!$v.form.version.$error"
                            autocomplete="off"
                            placeholder="Nhập phiên bản sử dụng ..."/>
              <b-form-invalid-feedback v-if="!$v.form.version.required">
                Không được bỏ trống
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-col>
        <b-col xs="12" sm="6">
          <b-row>
            <b-col lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">9. Giá trị quyền</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <b-button :hidden="!isCheckAll"
                        class="mb-2"
                        size="xs"
                        variant="outline-success"
                        @click="checkAll('accepted')">
                <i class="simple-icon-check"></i> Chọn tất cả
              </b-button>
              <b-button :hidden="isCheckAll"
                        class="mb-2"
                        size="xs"
                        variant="outline-dark"
                        @click="checkAll('not_accepted')">
                <i class="simple-icon-puzzle"></i> Bỏ chọn tất cả
              </b-button>
            </b-col>
            <b-colxx xxs="12" v-for="(items, index) in permissionDefaultData"
                     :key="index"
                     class="mt-2 font-weight-700">
              <b-form-checkbox v-model="items.checked"
                               unchecked-value="not_accepted"
                               value="accepted"
                               @change="permissionDefaultChange(items)">
                <span class="nHover selectCombobox">{{ items.name }}</span>
              </b-form-checkbox>
            </b-colxx>
          </b-row>
        </b-col>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         :showBtnSave="'1'"
                         @submitEvent="subEvNCoreButtonRun"/>
      <icon-modal ref="refIconModal" @submitIcon="subEvIconModal"/>
    </b-form>
  </b-modal>
</template>

<script>
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {mapActions, mapGetters} from "vuex";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import Cleave from "vue-cleave-component";
import NCoreButtonRun from "../../../../../containers/ndev-core/components/NCoreButtonRun.vue";
import NCoreHelper from "../../../../NCoreHelper/NCoreHelper";
import menuFunctionManagerApi from "../../api/menuFunctionManagerApi";
import IconModal from "./iconModal.vue";
import NCoreConfig from "../../../../NCoreHelper/NCoreConfig";

export default {
  components: {
    Treeselect,
    //Cleave,
    NCoreButtonRun,
    IconModal,
  },
  directives: {},
  props: {
    valueFormat: {
      type: String,
      default: "id",
    },
  },
  mixins: [validationMixin],
  validations: {
    form: {
      managerICon: "",
      name: {
        required,
        maxLength: maxLength(500),
      },
      version: {
        required,
        maxLength: maxLength(50),
      },
      menuGroupId: {},
      position: {},
      router: {
        required,
      },
      parentId: "",
      permissionValue: {},
      code: {},
    },
  },
  computed: {
    ...mapGetters(["storeCrudUpdate", "storeTreeview"]),
  },
  data() {
    return {
      idModal: "MenuFunctionManagerEventModalId",
      titleModal: "",
      menuFatherCombobox: [],
      treeComboboxSelected: null,
      permissionDefaultData: [], // Danh sách các quyền hệ thống
      permissionDefaultSelected: [], // Danh sách các quyền đang chọn
      permissionDefaultValue: 0, // Tổng giá trị của các quyền
      modalData: [],
      form: {
        managerICon: "",
        name: "",
        menuGroupId: "",
        position: "",
        router: "",
        version: "",
        parentId: "",
        permissionValue: "",
        code: "",
      },
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: "thousand",
        },
      },
      // processing: false,
      isCheckAll: true,
    };
  },
  watch: {
    storeTreeview: function (val) {
      this.menuFatherCombobox = [];
      this.menuFatherCombobox = val;
      this.treeComboboxSelected = null;
      this.form.menuGroupId = Math.max(...val.map((o) => o.menuGroupId)) + 1;
      this.form.position = Math.max(...val.map((o) => o.position)) + 1;
      if (this.permissionDefaultData.length === 0) {
        this.callPermissionDefault(0);
      }
    },
    storeCrudUpdate: function (val) {
      if (val.id === this.idModal) {
        this.modalData = val;
        this.titleModal = val.title;
        this.permissionDefaultValue = val.perValue;
        if (val.data != null) {
          this.form.id = val.data.id;
          this.form.managerICon = val.data.managerICon;
          this.form.name = val.data.name;
          this.form.menuGroupId = val.data.menuGroupId;
          this.form.position = val.data.position;
          this.form.router = val.data.router;
          this.form.parentId = val.data.parentId;
          this.form.permissionValue = val.data.permissionValue;
          this.form.code = val.data.code;
          this.treeComboboxSelected =
            val.data.parentId === NCoreConfig.isGuidEmpty
              ? null
              : val.data.parentId.toLowerCase();
          this.callPermissionDefault(val.data.permissionValue);
        } else {
          this.callPermissionDefault(0);
        }
      }
    },
  },
  methods: {
    ...mapActions(["callStoreTreeview"]),
    async loadOptions({action, parentNode, callback}) {
      await this.callStoreTreeview({
        search: this.search,
        id: this.idModal,
        api: menuFunctionManagerApi.MANAGER_MENU_FUNCTION_TREEVIEW,
      });
    },
    iconSelect() {
      NCoreHelper.v2modalShowHide(this, this.$refs.refIconModal.idModal, 1);
    },
    subEvIconModal(val) {
      this.form.managerICon = val;
      NCoreHelper.v2modalShowHide(this, this.$refs.refIconModal.idModal, 0);
    },
    async callPermissionDefault(iValue) {
      this.permissionDefaultData = [];
      this.permissionDefaultData = await NCoreHelper.v2executeGET(
        this,
        menuFunctionManagerApi.MANAGER_PERMISSION_DEFAULT,
        {
          value: iValue, //this.modalData.perValue
        }
      );
    },
    checkAll(val) {
      this.permissionDefaultSelected = [];
      this.permissionDefaultValue = 0;
      for (let i = 0; i < this.permissionDefaultData.length; i++) {
        this.permissionDefaultData[i].checked = val; //'accepted'
        this.isCheckAll = val !== "accepted";
        if (val === "accepted") {
          this.permissionDefaultSelected.push(this.permissionDefaultData[i].name);
          this.permissionDefaultValue += this.permissionDefaultData[i].value;
        }
      }
    },
    permissionDefaultChange(data) {
      if (data.checked === "accepted") {
        this.permissionDefaultSelected.push(data.name);
        this.permissionDefaultValue += data.value;
      } else {
        let selectTemp = [];
        this.permissionDefaultValue -= data.value;
        for (let i = 0; i < this.permissionDefaultSelected.length; i++) {
          if (this.permissionDefaultSelected[i] !== data.name) {
            selectTemp.push(this.permissionDefaultSelected[i]);
          }
        }
        this.permissionDefaultSelected = [];
        this.permissionDefaultSelected = selectTemp;
      }
      this.isCheckAll =
        this.permissionDefaultData.length !== this.permissionDefaultSelected.length;
    },
    treeComboboxMenuFatherChange(node, instanceId) {
      if (node.children != null) {
        // node cha
        this.form.menuGroupId = node.menuGroupId + 1;
        this.form.position = Math.max(...node.children.map((o) => o.position)) + 1;
      } else {
        this.form.menuGroupId = node.menuGroupId + 1;
        this.form.position = node.position + 1;
      }
    },
    resetStateModal() {
      // this.processing = false;
      this.form.managerICon = "";
      this.form.name = "";
      this.form.menuGroupId = "";
      this.form.position = "";
      this.form.router = "";
      this.form.parentId = "";
      this.form.permissionValue = "";
      this.form.code = "";
    },
    async subEvNCoreButtonRun(isSave) {
      //this.form.projectId = localStorage.getItem(NCoreConfig.localProjectId);
      this.form.permissionValue = this.permissionDefaultValue;
      this.form.menuGroupId = parseFloat(this.form.menuGroupId.replace(/,/g, ""));
      this.form.position = parseFloat(this.form.position.replace(/,/g, ""));
      if (this.treeComboboxSelected === null) {
        this.form.parentId = NCoreConfig.isGuidEmpty;
      } else {
        if (this.treeComboboxSelected === undefined) {
          this.form.parentId = NCoreConfig.isGuidEmpty;
        } else {
          this.form.parentId = this.treeComboboxSelected;
        }
      }
      if (isSave === true) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          const iResult =
            this.modalData.type === "add"
              ? await NCoreHelper.v2executePOST(
                this,
                menuFunctionManagerApi.MANAGER_MENU_FUNCTION_CREATE,
                this.form
              )
              : await NCoreHelper.v2executePUT(
                this,
                menuFunctionManagerApi.MANAGER_MENU_FUNCTION_UPDATE,
                this.form
              );
          if (iResult) {
            NCoreHelper.v2alertMess(
              this,
              NCoreHelper.returnMessage(
                this.modalData.type === "add" ? 1 : 2,
                true,
                this.modalData.funcName
              ),
              iResult ? 1 : 3
            );
            this.$emit("handleSubmitEvent", true);
          } else {
            NCoreHelper.returnMessage(
              this.modalData.type === "add" ? 1 : 2,
              false,
              this.modalData.funcName
            );
          }
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    },
  },
};
</script>
