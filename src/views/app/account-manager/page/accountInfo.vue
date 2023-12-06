<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">{{ $t('Thông tin tài khoản') }}</h1>
          <div class="top-right-button-container">
          </div>
          <piaf-breadcrumb/>
          <div class="mb-2"></div>
          <div class="separator mb-2"/>
        </b-colxx>
      </b-row>
      <b-row>
        <b-col class="nAccountInfo" lg="4" md="5" sm="6" xs="12">
          <b-card>
            <b-card-body>
              <b-row>
                <b-col class="nFontButton font-weight-700" lg="12" md="12" sm="12" xs="12">
                  *. Ảnh đại diện
                </b-col>
                <b-col class="nFontButton font-weight-700 text-center" lg="12" md="12" sm="12" style="color: red;"
                       xs="12">
                  <b-img-lazy :src="imgLink" style="width: 100%; height: 300px;object-fit: contain;"/>
                </b-col>
              </b-row>
              <b-row class="nBorderTop">
                <b-col class="text-center mt-3" lg="12" md="12" sm="12" xs="12">
                  <b-button :class="{'nFontButton btn-multiple-state btn-shadow': true,
                    'show-spinner': processing }" :disabled="processing" size="xs" type="button"
                            variant="dark" @click="funcImage(1)">
                            <span class="spinner d-inline-block">
                                <span class="bounce1"></span>
                                <span class="bounce2"></span>
                                <span class="bounce3"></span>
                            </span>
                    <span class="icon success">
                                <i class="simple-icon-check"></i>
                            </span>
                    <span class="icon fail">
                                <i class="simple-icon-exclamation"></i>
                            </span>
                    <span class="label">Xóa ảnh đại diện</span>
                  </b-button>
                  <b-button :class="{'nFontButton btn-multiple-state btn-shadow': true,
                    'show-spinner': processing }" :disabled="processing" size="xs" type="button"
                            variant="danger" @click="funcImage(2)">
                            <span class="spinner d-inline-block">
                                <span class="bounce1"></span>
                                <span class="bounce2"></span>
                                <span class="bounce3"></span>
                            </span>
                    <span class="icon success">
                                <i class="simple-icon-check"></i>
                            </span>
                    <span class="icon fail">
                                <i class="simple-icon-exclamation"></i>
                            </span>
                    <span class="label">Đổi ảnh đại diện</span>
                  </b-button>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col class="nAccountInfo" lg="4" md="5" sm="6" xs="12">
          <b-card>
            <b-card-body>
              <b-row>
                <b-col class="nFontButton font-weight-700" lg="12" md="12" sm="12" xs="12">
                  1. Mã định danh
                </b-col>
                <b-col class="nFontButton font-weight-700 text-center" lg="12" md="12" sm="12" style="color: red;"
                       xs="12">
                  {{ userData.uid }}
                </b-col>
              </b-row>
              <b-row>
                <b-col class="mt-2 nFontButton font-weight-700" lg="12" md="12" sm="12" xs="12">
                  2. Tên tài khoản
                </b-col>
                <b-col class="nFontButton font-weight-700 text-center" lg="12" md="12" sm="12" style="color: red;"
                       xs="12">
                  {{ userData.fullName }}
                </b-col>
              </b-row>
              <b-row>
                <b-col class="mt-1 nFontButton font-weight-700" lg="12" md="12" sm="12" xs="12">
                  <label>3. Mật khẩu cũ</label>
                </b-col>
                <b-col lg="12" md="12" sm="12" xs="12">
                  <b-form-input id="ChangePasswordtxtPassOld" v-model.trim="$v.form.passOld.$model"
                                :state="!$v.form.passOld.$error" autocomplete="off" placeholder="Nhập mật khẩu cũ ..."
                                autofocus class="center" type="password"/>
                  <b-form-invalid-feedback v-if="!$v.form.passOld.required">Không được bỏ trống
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.passOld.minLength || !$v.form.passOld.maxLength">
                    Mật khẩu phải từ 4 - 16 ký tự
                  </b-form-invalid-feedback>
                </b-col>
                <b-col class="mt-2 nFontButton font-weight-700" lg="12" md="12" sm="12" xs="12">
                  <label>4. Mật khẩu mới</label>
                </b-col>
                <b-col lg="12" md="12" sm="12" xs="12">
                  <b-form-input id="ChangePasswordtxtPassNew" v-model.trim="$v.form.passNew.$model"
                                :state="!$v.form.passNew.$error" autocomplete="off" placeholder="Nhập mật khẩu mới ..."
                                class="center" type="password"/>
                  <b-form-invalid-feedback v-if="!$v.form.passNew.required">Không được bỏ trống
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.passNew.minLength || !$v.form.passNew.maxLength">
                    Mật khẩu phải từ 4 - 16 ký tự
                  </b-form-invalid-feedback>
                </b-col>
                <b-col class="mt-2 nFontButton font-weight-700" lg="12" md="12" sm="12" xs="12">
                  <label>5. Nhập lại mật khẩu mới</label>
                </b-col>
                <b-col lg="12" md="12" sm="12" xs="12">
                  <b-form-input id="ChangePasswordtxtPassNewRe" v-model.trim="$v.form.passNewRe.$model"
                                :state="!$v.form.passNewRe.$error" autocomplete="off"
                                placeholder="Nhập lại mật khẩu mới ..." class="center" type="password"/>
                  <b-form-invalid-feedback v-if="!$v.form.passNewRe.required">Không được bỏ trống
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.passNewRe.minLength || !$v.form.passNewRe.maxLength">
                    Mật khẩu phải từ 4 - 16 ký tự
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
              <b-row class="nBorderTop">
                <b-col class="text-center mt-3" lg="12" md="12" sm="12" xs="12">
                  <b-button :class="{'nFontButton btn-multiple-state btn-shadow': true,
                    'show-spinner': processing }" :disabled="processing" size="xs" type="button"
                            variant="danger" @click="submitEvent(true)">
                            <span class="spinner d-inline-block">
                                <span class="bounce1"></span>
                                <span class="bounce2"></span>
                                <span class="bounce3"></span>
                            </span>
                    <span class="icon success">
                                <i class="simple-icon-check"></i>
                            </span>
                    <span class="icon fail">
                                <i class="simple-icon-exclamation"></i>
                            </span>
                    <span class="label">Đổi mật khẩu</span>
                  </b-button>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col lg="4" md="5" sm="6" xs="12"></b-col>
      </b-row>
    </b-colxx>
    <n-core-modal-delete
      ref="refNCoreModalDeleteEvent"
      @handleSubmitEvent="subEvNCoreModalDeleteEvent"
    />
    <avatar-manager-modal ref="refAvatarManagerModal" @handlerSubmitEvent="subEvAvatarManagerModal"/>
  </b-row>
</template>

<script>

import {validationMixin} from "vuelidate";
import {maxLength, minLength, required} from "vuelidate/lib/validators";
import NCoreConfig from "../../../NCoreHelper/NCoreConfig";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import {mapActions} from "vuex";
import NCoreModalDelete from "../../../../containers/ndev-core/components/NCoreModalDelete";
import AvatarManagerModal from "../modal/avatarManagerModal";
import accountInfoApi from "../../system-manager/api/accountInfoApi";
import accountManagerApi from "@/views/app/account-manager/api/accountManagerApi";

export default {
  components: {AvatarManagerModal, NCoreModalDelete},
  mixins: [validationMixin],
  validations: {
    form: {
      passOld: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      passNew: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      passNewRe: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      userId: {},
    }
  },
  data() {
    return {
      form: {
        passOld: '',
        passNew: '',
        passNewRe: '',
        userId: '',
      },
      userData: [],
      imgLink: '',
      processing: false,
    };
  },
  methods: {
    ...mapActions(['callStoreCrudDelete', 'callStoreCloseLoadingNCoreModalDelete']),
    resetStateModal() {
      this.form.passOld = ''
      this.form.passNew = ''
      this.form.passNewRe = ''
    },
    async submitEvent() {
      this.$v.$touch();
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.processing = true
        this.form.userId = this.userData.userId
        const iResult = await NCoreHelper.v2executePOST(this, accountManagerApi.ACCOUNT_MANAGER_CHANGE_PASSWORD, this.form);
        if (iResult === false) {
          this.processing = false
          NCoreHelper.v2alertMess(this, '', 3)
        } else {
          this.resetStateModal()
          this.processing = false
          NCoreHelper.v2alertMess(this, 'Đổi mật khẩu thành công', 1)
        }
      }
    },
    async funcImage(flag) {
      if (flag === 1) {
        await this.callStoreCrudDelete({
          content: 'ảnh đại diện',
          id: this.userData.uid
        });
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refNCoreModalDeleteEvent.idModal,
          1
        );
      } else {
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refAvatarManagerModal.idModal,
          1
        );
      }
    },
    async subEvNCoreModalDeleteEvent(val) {
      // Gọi server xóa ảnh đại diện
      let dataSend = {
        id: this.userData.uid,
        isDeleteAvatar: 1,
        base64: ''
      }
      const iResult = NCoreHelper.v2executePOST(this, accountInfoApi.ACCOUNT_INFO_UPLOAD_AVATAR, dataSend)
      if (iResult) {
        this.imgLink = NCoreConfig.avatarDefault;
        NCoreHelper.v2alertMess(this, "Xóa ảnh đại diện thành công", 1);
        await this.callStoreCloseLoadingNCoreModalDelete(false);
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refNCoreModalDeleteEvent.idModal,
          0
        );
      } else {
        NCoreHelper.v2alertMess(this, '', 3)
      }
    },
    async subEvAvatarManagerModal(val) {
      let dataSend = {
        id: val.id,
        isDeleteAvatar: 2,
      }
      if (val.base64 === NCoreConfig.base64Default) {
        dataSend.base64 = '';
      } else {
        dataSend.base64 = val.base64;
      }
      const iResult = await NCoreHelper.v2executePOST(this, accountInfoApi.ACCOUNT_INFO_UPLOAD_AVATAR, dataSend)
      if (iResult) {
        this.imgLink = dataSend.base64 === '' ? NCoreConfig.avatarDefault : dataSend.base64;
        NCoreHelper.v2alertMess(this, iResult, 1);

        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refAvatarManagerModal.idModal,
          0
        );
      } else {
        NCoreHelper.v2alertMess(this, '', 3)
      }
      await this.callStoreCloseLoadingNCoreModalDelete(false);
    },
  },
  computed: {},
  watch: {},
  mounted() {
    this.userData = JSON.parse(localStorage.getItem(NCoreConfig.userData))
    this.imgLink = this.userData.avatar === '' ? '/images/avatar.png' : this.userData.avatar;
  }
};
</script>
