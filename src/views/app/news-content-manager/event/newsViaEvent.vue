<template>
  <b-modal
    :id="idModal"
    :hide-footer="true"
    :hide-header-close="false"
    :title="titleModal"
    cancel-title="Hủy bỏ"
    cancel-variant="outline-primary"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="md"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">1. Tên via</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input
            id="roomManagerEvent_txtTen"
            v-model="$v.form.code.$model"
            :state="!$v.form.code.$error"
            autocomplete="off"
            autofocus
            placeholder="Nhập tên via ..."
          />
          <b-form-invalid-feedback v-if="!$v.form.code.required"
            >Không được bỏ trống
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.code.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">2. Id tài khoản quảng cáo</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input
            id="roomManagerEvent_txtIdTaiKhoan"
            v-model="$v.form.idTkQc.$model"
            :state="!$v.form.idTkQc.$error"
            autocomplete="off"
            placeholder="Nhập idTkQc ..."
          />
          <b-form-invalid-feedback v-if="!$v.form.idTkQc.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">3. Token</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input
            id="roomManagerEvent_txtToken"
            v-model="$v.form.token.$model"
            :state="!$v.form.token.$error"
            autocomplete="off"
            placeholder="Nhập token ..."
          />
          <b-form-invalid-feedback v-if="!$v.form.token.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">4. Người dùng</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <n-core-combobox ref="refNewsGroupEvent_ComboboxVia"
                           @handlerSubmitEvent="subEvNewsGroupEvent_ComboboxVia"/>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">5. Mô tả</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <textarea
            rows="3"
            v-model="form.content"
            class="form-control"
            id="roomManagerEvent_txtMota"
          />
        </b-col>
      </b-row>
      <n-core-button-run
        :btnSaveTitle="'Lưu dữ liệu'"
        :showBtnSave="'1'"
        ref="refNewsGroupTypeBtnSave"
        @submitEvent="subEvNewsGroupTypeBtnSave"
      />
    </b-form>
  </b-modal>
</template>

<script>
import { maxLength, required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import {mapActions, mapGetters} from "vuex";
import NCoreButtonRun from "../../../../containers/ndev-core/components/NCoreButtonRun.vue";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import newsViaApi from "@/views/app/news-content-manager/api/newsViaApi";
import NCoreCombobox from "@/containers/ndev-core/components/NCoreCombobox.vue";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import staffManagerApi from "@/views/app/company-manager/api/staffManagerApi";

export default {
  components: {
    NCoreCombobox,
    NCoreButtonRun
  },
  directives: {},
  props: {},
  mixins: [validationMixin],
  validations: {
    form: {
      content: "",
      token: {
        maxLength: maxLength(500)
      },
      idTkQc: {
        maxLength: maxLength(500)
      },
      staffId: "",
      code: {
        required,
        maxLength: maxLength(500)
      }
    }
  },
  computed: {
    ...mapGetters(["storeCrudUpdate"])
  },
  data() {
    return {
      idModal: "newsGroupTypeEventModalId",
      titleModal: "",
      modalData: [],
      form: {
        content: "",
        code: "",
        token: "",
        idTkQc: "",
        staffId: "",
      }
    };
  },
  watch: {
    storeCrudUpdate: async function (val) {
      
      if (val.id === this.idModal) {
        this.modalData = val;
        this.titleModal = val.title;
        if (val.data != null) {
          this.form.id = val.data.id;
          this.form.content = val.data.content;
          this.form.code = val.data.code;
          this.form.token = val.data.token;
          this.form.idTkQc = val.data.idTkQc;
          this.form.staffId = val.data.staffId;
        }
        console.log("123", val)
        //=====Lấy dữ liệu combobox NewsGroupType=====
        await this.callStoreSendCombobox({
          isShowTitleHeader: true,
          iMessage: '-- Chọn người dùng --',
          isNoHeader: false,
          api: staffManagerApi.USER_COMBOBOX,
          isAdd: val.type === "add",
          dataSend: val.staffId === NCoreConfig.isGuidEmpty ? null : val?.data?.staffId
        });
        this.$hideAllPageLoading()
      }
    }
  },
  methods: {
    ...mapActions(['callStoreSendCombobox']),
    resetStateModal() {
      this.form.content = "";
      this.form.code = "";
      this.form.idTkQc = "";
      this.form.token = "";
    },
    async subEvNewsGroupTypeBtnSave(isSave) {
      if (isSave === true) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$showProcessing()
          const iNewsGroupType = this.$refs.refNewsGroupEvent_ComboboxVia.dataSend
          this.form.staffId = iNewsGroupType === undefined ? NCoreConfig.isGuidEmpty : iNewsGroupType
    
          const iResult =
            this.modalData.type === "add"
              ? await NCoreHelper.v2executePOST(
                  this,
                  newsViaApi.NEWS_VIA_CREATE,
                  this.form
                )
              : await NCoreHelper.v2executePUT(
                  this,
                newsViaApi.NEWS_VIA_UPDATE,
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
            this.$emit("handleSubmitEvent", true);
            this.$refs.refNewsGroupTypeBtnSave.processing = false
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
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    },
    async subEvNewsGroupEvent_ComboboxVia(val) {
      console.log("Ssss", val)
      this.newsGroupTypeReciveFromCombobox = val
    },
  }
};
</script>
