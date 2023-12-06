<template>
  <b-modal
    :id="idModal"
    :hide-footer="true"
    :hide-header-close="false"
    :title="titleModal"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="md"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12">
          <label class="font-weight-700">
            1. Tên dữ liệu <span class="nRequired">(*)</span>
          </label>
        </b-colxx>
        <b-colxx xxs="12" class="mt-1">
          <b-form-input
            id="NCoreModalUploadEvent_txtName"
            v-model="$v.formModalUpload.name.$model"
            :state="!$v.formModalUpload.name.$error"
            autocomplete="off"
            autofocus
            placeholder="Nhập tên dữ liệu ..."
          />
          <b-form-invalid-feedback v-if="!$v.formModalUpload.name.required"
          >Không được bỏ trống
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.formModalUpload.name.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-colxx>
      </b-row>
      <b-row class="mt-1">
        <b-colxx xxs="12">
          <label class="font-weight-700">
            2. Đường dẫn <span class="nRequired">(*)</span>
          </label>
        </b-colxx>
        <b-colxx xxs="12" class="mt-1">
          <b-form-input
            id="NCoreModalUploadEvent_txtLink"
            v-model="$v.formModalUpload.link.$model"
            :state="!$v.formModalUpload.link.$error"
            autocomplete="off"
            placeholder="Nhập đường dẫn dữ liệu ..."
          />
          <b-form-invalid-feedback v-if="!$v.formModalUpload.link.required">Không được bỏ trống
          </b-form-invalid-feedback>
        </b-colxx>
      </b-row>
      <b-row class="mt-1">
        <b-colxx xxs="12">
          <label class="font-weight-700">
            3. Mô tả
          </label>
        </b-colxx>
        <b-colxx xxs="12" class="mt-1">
          <textarea
            rows="3"
            v-model="$v.formModalUpload.description.$model"
            :state="!$v.formModalUpload.description.$error"
            class="form-control"
            id="customerManagerEvent_txtMota"
          />
        </b-colxx>
      </b-row>
      <b-row class="mt-1" :hidden="isHiddenVideoType">
        <b-colxx xxs="12">
          <label class="font-weight-700">
            4. Loại video
          </label>
        </b-colxx>
        <b-colxx xxs="12" class="mt-1">
          <b-row>
            <b-col xs="12" sm="6" md="6">
              <b-form-checkbox
                v-model="isVideoType"
                unchecked-value="not_accepted"
                value="accepted"
              >
                <span class="nHover selectCombobox">Youtube</span>
              </b-form-checkbox>
            </b-col>
            <b-col xs="12" sm="6" md="6">
              <b-form-checkbox
                v-model="isVideoType"
                unchecked-value="accepted"
                value="not_accepted"
              >
                <span class="nHover selectCombobox">Google drive</span>
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-colxx>
      </b-row>
      <n-core-button-run
        ref="refNCoreButtonRunModalUploadEvent"
        :btn-save-title="'Lưu dữ liệu'"
        :show-btn-save="'1'"
        @submitEvent="submitEvent"
      />
    </b-form>
  </b-modal>
</template>

<script>
import NCoreButtonRun from "./NCoreButtonRun";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {mapGetters} from "vuex";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";

export default {
  components: {
    NCoreButtonRun,
  },
  mixins: [validationMixin],
  directives: {},
  props: {},
  computed: {
    ...mapGetters(['storeCrudUploadEvent'])
  },
  watch: {
    storeCrudUploadEvent: function (val) {
      if (this.idModal === val.id) {
        if (val.type === 'add') this.form = NCoreHelper.CreateGuid()
        this.modalData = val
        this.isHiddenVideoType = val.flagGroup !== 3;
      }
    },
  },
  data() {
    return {
      modalData: [],
      idModal: "NCoreModalUploadEventId",
      titleModal: "XỬ LÝ LINK NGOÀI HỆ THỐNG",
      formModalUpload: {
        id: '',
        name: '',
        link: '',
        description: '',
      },
      isVideoType: NCoreConfig.checkedValue,
      isHiddenVideoType: true
    };
  },
  validations: {
    formModalUpload: {
      id: "",
      description: "",
      name: {
        required,
        maxLength: maxLength(500)
      },
      link: {
        required
      },
    }
  },
  methods: {
    resetStateModal() {
      this.processFile = false;
      this.formModalUpload.id = ''
      this.formModalUpload.name = ''
      this.formModalUpload.link = ''
      this.formModalUpload.description = ''
    },
    async submitEvent(val) {
      if (val) {
        this.$v.$touch();
        this.$v.formModalUpload.$touch();
        if (!this.$v.formModalUpload.$anyError) {
          this.$showProcessing()
          this.$emit("handleSubmitEvent", {
            id: this.formModalUpload.id,
            name: this.formModalUpload.name,
            linkUrl: this.formModalUpload.link,
            description: this.formModalUpload.description,
            flagGroup: this.modalData.flagGroup,
            videoType: this.modalData.flagGroup === 3 ? this.isVideoType === NCoreConfig.checkedValue ? 1 : 2 : 0,
            type: this.modalData.type
          });
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    },
  },
};
</script>
