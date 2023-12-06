<template>
  <b-row class="h-100">
    <b-colxx class="mx-auto my-auto" md="10" xxs="12">
      <b-card class="auth-card" no-body>
        <b-row class="khungLogin">
          <b-colxx xxs="12" class="text-center nFontButton font-weight-700 tieude_chao_login tieude_chao_1">
            HỆ THỐNG QUẢN TRỊ WEBSITE
          </b-colxx>
          <b-col class="mt-0 mb-3" lg="12" md="12" sm="12" xs="12">
            <b-row class="khungviendangnhap">
              <b-col lg="5" md="5" sm="4" xs="12">
                <!-- <b-img-lazy class="logoDangNhap logoDangNhap_thienHa"
                            loading="lazy"
                            v-lazy="'/images/logo/logo_inthienha.png'"></b-img-lazy> -->
              </b-col>
              <b-col lg="7" md="7" sm="8" xs="12">
                <b-row class="khungdangnhap">
                  <b-colxx xxs="12" class="text-center nFontButton font-weight-700 tieudeDangNhap">
                    ĐĂNG NHẬP HỆ THỐNG
                  </b-colxx>
                  <b-colxx xxs="12" class="text-center mt-2">
                    <div class="dangnhap">
                      <b-form class="av-tooltip tooltip-label-bottom" @submit.prevent="formSubmit">
                        <b-form-group :label="$t('user.account')" class="has-float-label mb-4">
                          <b-form-input v-model="$v.form.email.$model" :state="!$v.form.email.$error" autocomplete="off"
                            autofocus type="text" />
                          <b-form-invalid-feedback v-if="!$v.form.email.required">
                            Tên đăng nhập không được bỏ trống
                          </b-form-invalid-feedback>
                          <b-form-invalid-feedback v-else-if="!$v.form.email.minLength">
                            Tên đăng nhập phải từ 4 ký tự trở lên
                          </b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
                          <b-form-input v-model="$v.form.password.$model" :state="!$v.form.password.$error"
                            type="password" />
                          <b-form-invalid-feedback v-if="!$v.form.password.required">
                            Mật khẩu không được để trống
                          </b-form-invalid-feedback>
                          <b-form-invalid-feedback
                            v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength">
                            Mật khẩu phải từ 4 - 16 ký tự
                          </b-form-invalid-feedback>
                        </b-form-group>
                        <div class="d-flex justify-content-between align-items-center">
                          <!--              <router-link to="/user/forgot-password">{{ $t('user.forgot-password-question') }}</router-link>-->
                          <b-form-group>
                            <b-form-checkbox id="remember-me" v-model="form.rememberMe" name="checkbox-1">
                              Nhớ tài khoản
                            </b-form-checkbox>
                          </b-form-group>
                          <b-button :class="{
                            'btn-multiple-state btn-shadow': true,
                            'show-spinner': processing,
                            'show-success': !processing && loginError === false,
                            'show-fail': !processing && loginError,
                          }"
                            :disabled="processing" size="lg" type="submit" variant="primary">
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
                            <span class="label">{{ $t("user.login-button") }}</span>
                          </b-button>
                        </div>
                        <b-form-group class="has-float-label mt-2">
                          <hr />
                        </b-form-group>
                        <!-- <b-form-group class="has-float-label text-center" style="margin-top: -25px">
                          <a href="https://itphonui.com" style="font-weight: bold; color: red" target="_blank">
                            ITPhoNui
                          </a>
                        </b-form-group> -->
                      </b-form>
                    </div>
                  </b-colxx>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </b-colxx>
  </b-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { adminRoot } from "../../constants/config";
import NCoreConfig from "../NCoreHelper/NCoreConfig";
import NCoreHelper from "../NCoreHelper/NCoreHelper";

const { required, maxLength, minLength } = require("vuelidate/lib/validators");

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        rememberMe: "",
      },
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4),
      },
      email: {
        required,
        minLength: minLength(4),
      },
    },
  },
  computed: {
    ...mapGetters(["currentUser", "processing", "loginError"]),
  },
  created() {
    // Đã đăng nhập chuyển về trang quản trị
    if (localStorage.getItem(NCoreConfig.storageTokenKeyName)) {
      // ===> Chuyển về trang chủ ======
      this.$router.push({ name: NCoreConfig.dashboardDefault });
    } else {
      // Lấy thông tin tài khoản - mật khẩu
      const iUserName = localStorage.getItem(NCoreConfig.storageUserName);
      if (iUserName) {
        this.form.email = iUserName;
        this.form.password = localStorage.getItem(NCoreConfig.storagePassWord);
      }
    }
  },
  methods: {
    ...mapActions(["login"]),
    formSubmit() {
      this.$v.$touch();
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.login({
          userName: this.form.email,
          password: this.form.password,
          urlPage: location.host,
        });
        if (this.form.rememberMe) {
          localStorage.setItem(NCoreConfig.storageUserName, this.form.email);
          localStorage.setItem(NCoreConfig.storagePassWord, this.form.password);
        }
      }
    },
  },
  watch: {
    currentUser(val) {
      if (val && val.uid && val.uid.length > 0) {
        setTimeout(() => {
          this.$router.push(adminRoot);
        }, 200);
      }
    },
    loginError(val) {
      if (val != null) {
        NCoreHelper.v2alertMess(this, val, 1);
      }
    },
  },
};
</script>
<style>
.khungLogin {
  background: url("https://kinhnghiemdayhoc.net/wp-content/uploads/2020/09/hinh-slide-1.jpg");
  background-size: cover;
  border-radius: 30px;
}
</style>
