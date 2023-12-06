<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="false"
           :title="titleModal"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="lg"
           @shown="callOpenPage"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col xs="12" sm="6" md="7">
          <div class="col_right" style="width: 100%">
            <b-row>
              <b-col lg="12" md="12" sm="12" xs="12">
                <label class="font-weight-700">I. Thông tin chung</label>
              </b-col>
              <b-col lg="12" md="12" sm="12" xs="12" style="left: 15px">
                <b-row class="col_right_items">
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <label class="font-weight-700">1. Tên người dùng</label>
                  </b-col>
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <b-form-input id="userManagerEvent_txtTen"
                                  v-model="$v.form.name.$model"
                                  :state="!$v.form.name.$error"
                                  autocomplete="off"
                                  autofocus
                                  placeholder="Nhập tên người dùng ..."/>
                    <b-form-invalid-feedback v-if="!$v.form.name.required">
                      Không được bỏ trống
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-else-if="!$v.form.name.maxLength">
                      Độ dài tối đa 500 kí tự
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
                <b-row class="col_right_items">
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <label class="font-weight-700">2. Mã người dùng</label>
                  </b-col>
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <b-form-input id="userManagerEvent_txtMaNguoiDung"
                                  v-model="$v.form.userCode.$model"
                                  :state="!$v.form.userCode.$error"
                                  autocomplete="off"
                                  placeholder="Nhập mã người dùng ..."/>
                    <b-form-invalid-feedback v-if="!$v.form.userCode.maxLength">
                      Độ dài tối đa 50 kí tự
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
                <b-row class="col_right_items">
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <label class="font-weight-700">3. Điện thoại</label>
                  </b-col>
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <b-form-input id="userManagerEvent_txtDienThoai"
                                  v-model="$v.form.phone.$model"
                                  :state="!$v.form.phone.$error"
                                  autocomplete="off"
                                  placeholder="Nhập số điện thoại ..."/>
                    <b-form-invalid-feedback v-if="!$v.form.phone.maxLength">
                      Độ dài tối đa 50 kí tự
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
                <b-row class="col_right_items">
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <label class="font-weight-700">4. Email</label>
                  </b-col>
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <b-form-input id="userManagerEvent_txtEmail"
                                  v-model="$v.form.email.$model"
                                  :state="!$v.form.email.$error"
                                  autocomplete="off"
                                  placeholder="Nhập email ..."/>
                    <b-form-invalid-feedback v-if="!$v.form.email.email">
                      Email không đúng định dạng
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
                <b-row class="col_right_items">
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <label class="font-weight-700">5. Địa chỉ</label>
                  </b-col>
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <b-form-input id="userManagerEvent_txtDiaChi"
                                  v-model="$v.form.address.$model"
                                  :state="!$v.form.address.$error"
                                  autocomplete="off"
                                  placeholder="Nhập địa chỉ ..."/>
                  </b-col>
                </b-row>
              </b-col>
              <b-col lg="12" md="12" sm="12" xs="12" class="mt-2">
                <label class="font-weight-700">II. Thông tin đăng nhập</label>
              </b-col>
              <b-col lg="12" md="12" sm="12" xs="12" style="left: 15px">
                <b-row class="col_right_items">
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <label class="font-weight-700">1. Tên đăng nhập</label>
                  </b-col>
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <b-form-input id="userManagerEvent_txtUserName"
                                  v-model="$v.form.userName.$model"
                                  :state="!$v.form.userName.$error"
                                  autocomplete="off"
                                  :disabled="disabledUserName"
                                  placeholder="Nhập tên đăng nhập ..."/>
                    <b-form-invalid-feedback v-if="!$v.form.userName.required">
                      Không được bỏ trống
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.form.userName.maxLength">
                      Độ dài tối đa 16 kí tự
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
                <b-row class="col_right_items mt-1" :hidden="hiddenPassword">
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <label class="font-weight-700">2. Mật khẩu</label>
                  </b-col>
                  <b-col lg="12" md="12" sm="12" xs="12">
                    <b-form-input id="userManagerEvent_txtPassWord"
                                  v-model="$v.form.passWord.$model"
                                  :state="!$v.form.passWord.$error"
                                  autocomplete="off"
                                  placeholder="Nhập mật khẩu ..."
                                  type="password"/>
                    <b-form-invalid-feedback v-if="!$v.form.passWord.maxLength">
                      Độ dài tối đa 16 kí tự
                    </b-form-invalid-feedback>
                  </b-col>
                  <b-col
                      xxs="12"
                      style="font-weight: bold;
                        color: blue;
                        font-style: italic;
                        font-size: 11px;">
                    * Mật khẩu mặc định là <span style="color: red">123456</span>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <b-col xs="12" sm="6" md="5" class="col_left">
          <b-row>
            <b-col lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">III. Ảnh đại diện</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <user-manager-avatar ref="refUserManagerEvent_Avatar"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">III. Thông tin quản trị</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12" style="left: 15px">
              <b-row class="col_right_items">
<!--                <b-col lg="12" md="12" sm="12" xs="12">-->
<!--                  <label class="font-weight-700">1. Kiểu người dùng</label>-->
<!--                </b-col>-->
<!--                <b-col lg="12" md="12" sm="12" xs="12">-->
<!--                  <n-core-combobox-v3 :combobox-send="userTypeManagerCombobox"-->
<!--                                      ref="refUserManagerEvent_UserTypeManagerCombobox"-->
<!--                                      @handlerSubmitEvent="subEvUserManagerEvent_UserTypeManagerCombobox"/>-->
<!--                </b-col>-->
<!--              </b-row>-->
<!--              <b-row class="col_right_items mt-1">-->
                <b-col lg="12" md="12" sm="12" xs="12">
                  <label class="font-weight-700">*. Quyền sử dụng</label>
                </b-col>
                <b-col lg="12" md="12" sm="12" xs="12">
                  <n-core-combobox-v3 :combobox-send="authorityManagerCombobox"
                                      ref="refUserManagerEvent_AuthorityManagerCombobox"
                                      @handlerSubmitEvent="subEvUserManagerEvent_AuthorityManagerCombobox"/>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">IV. Ghi chú</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <textarea rows="5"
                    v-model="form.description"
                    class="form-control"
                    id="userManagerEvent_txtMota"
                    placeholder="Ghi chú ..."/>
        </b-col>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         :showBtnSave="'1'"
                         ref="refUserManagerEvent_BtnSave"
                         @submitEvent="subEvUserManagerEvent_BtnSave"/>
    </b-form>
  </b-modal>
</template>

<script>
import {maxLength, required, email} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {mapActions, mapGetters} from "vuex";
import NCoreButtonRun from "../../../../containers/ndev-core/components/NCoreButtonRun.vue";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import UserManagerAvatar from "@/views/app/system-manager/modal-content/userManagerAvatar";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NCoreComboboxV3 from "@/containers/ndev-core/components/NCoreComboboxV3";
import userManagerApi from "@/views/app/system-manager/api/userManagerApi";

export default {
  components: {
    NCoreComboboxV3,
    UserManagerAvatar,
    NCoreButtonRun,
    "v-select": vSelect,
  },
  directives: {},
  props: {},
  mixins: [validationMixin],
  validations: {
    form: {
      description: "",
      address: "",
      userTypeManagerId: "",
      authorityManagerId: "",
      name: {
        required,
        maxLength: maxLength(500),
      },
      phone: {
        maxLength: maxLength(50),
      },
      userCode: {
        maxLength: maxLength(50),
      },
      email: {
        email,
      },
      userName: {
        required,
        maxLength: maxLength(16),
      },
      passWord: {
        maxLength: maxLength(16),
      },
    },
  },
  computed: {
    ...mapGetters(["storeCrudUpdate", "storeComboboxUserTypeManager", "storeComboboxAuthorityManager"]),
  },
  watch: {
    storeComboboxUserTypeManager: {
      handler: function (vData) {
        this.userTypeManagerCombobox = vData
      },
      deep: true
    },
    storeComboboxAuthorityManager: {
      handler: function (vData) {
        this.authorityManagerCombobox = vData
      },
      deep: true
    }
  },
  data() {
    return {
      pageId: "userManagerEventPageIdModal",
      titleModal: "",
      modalData: [],
      form: {
        description: "",
        address: "",
        name: "",
        phone: "",
        email: "",
        userName: "",
        passWord: "",
        authorityManagerId: "",
        userTypeManagerId: "",
        userCode: "",
      },
      userTypeManagerCombobox: [],
      userTypeManagerComboboxRecive: [],
      authorityManagerCombobox: [],
      authorityManagerComboboxRecive: [],
      hiddenPassword: false,
      disabledUserName: false,
      sourceImage: '',
    };
  },
  methods: {
    ...mapActions([
      "callStoreSendImageAvatar",
      "callStoreComboboxUserTypeManager",
      "callStoreComboboxAuthorityManager"
    ]),
    async callOpenPage() {
      const iDataReceive = this.$store.state.storeCrud.storeCrudUpdate
      if (iDataReceive.id === this.pageId) {
        this.modalData = iDataReceive;
        this.titleModal = iDataReceive.title;
        this.hiddenPassword = iDataReceive.hiddenPassword;
        this.disabledUserName = iDataReceive.hiddenPassword;
        if (iDataReceive.type === 'add') {
          await this.callStoreSendImageAvatar({
            id: NCoreConfig.isGuidEmpty
          })
          // await this.callUserTypeManagerCombobox(true, '')
          await this.callAuthorityManagerCombobox(true, '')
        } else {
          this.form.id = iDataReceive.data.id;
          this.form.description = iDataReceive.data.description;
          this.form.name = iDataReceive.data.name;
          this.form.address = iDataReceive.data.address;
          this.form.phone = iDataReceive.data.phone;
          this.form.email = iDataReceive.data.email;
          this.form.userName = iDataReceive.data.userName;
          this.form.userCode = iDataReceive.data.userCode;
          this.userTypeManagerComboboxRecive = {
            id: iDataReceive.data.userTypeManagerId
          }
          this.authorityManagerComboboxRecive = {
            id: iDataReceive.data.authorityManagerId
          }
          await this.callStoreSendImageAvatar({
            id: iDataReceive.data.avatarId
          })
          // await this.callUserTypeManagerCombobox(false, iDataReceive.data.userTypeManagerId)
          await this.callAuthorityManagerCombobox(false, iDataReceive.data.authorityManagerId)
        }
      }
      this.$hideAllPageLoading()
    },
    resetStateModal() {
      this.form.description = "";
      this.form.name = "";
      this.form.address = "";
      this.form.phone = "";
      this.form.email = "";
      this.form.userName = "";
      this.form.userCode = "";
      this.$hideProcessing()
    },
    async subEvUserManagerEvent_BtnSave(isSave) {
      if (isSave === true) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$showProcessing()
          this.form.avatarId = this.$refs.refUserManagerEvent_Avatar.returnValue().id
          this.form.authorityManagerId = this.authorityManagerComboboxRecive.id
          this.form.userTypeManagerId = this.userTypeManagerComboboxRecive.id
          const iResult =
              this.modalData.type === "add"
                  ? await NCoreHelper.v2executePOST(
                      this,
                      userManagerApi.USER_MANAGER_CREATE,
                      this.form
                  )
                  : await NCoreHelper.v2executePUT(
                      this,
                      userManagerApi.USER_MANAGER_UPDATE,
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
                iResult ? 2: 3
            );
            this.$emit("handlerSubmitEvent", true);
          } else {
            NCoreHelper.v2alertMess(
                this,
                NCoreHelper.returnMessage(
                    this.modalData.type === "add" ? 1 : 2,
                    false,
                    this.modalData.funcName
                ),
                iResult ? 1 : 3
            )
            this.$hideProcessing()
          }
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageId, 0);
      }
    },
    async callUserTypeManagerCombobox(isAdd, contentId) {
      await this.callStoreComboboxUserTypeManager({
        isAdd: isAdd,
        dataSend: contentId,
        isShowTitleHeader: false,
        message: '',
        isNoHeader: true
      });
    },
    async callAuthorityManagerCombobox(isAdd, contentId) {
      await this.callStoreComboboxAuthorityManager({
        isAdd: isAdd,
        dataSend: contentId,
        isShowTitleHeader: false,
        message: '',
        isNoHeader: true
      });
    },
    subEvUserManagerEvent_UserTypeManagerCombobox(vData) {
      this.userTypeManagerComboboxRecive = vData
    },
    subEvUserManagerEvent_AuthorityManagerCombobox(vData) {
      this.authorityManagerComboboxRecive = vData
    }
  },
};
</script>
