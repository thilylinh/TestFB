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
            id="NCoreModalFileEvent_txtName"
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
      <n-core-button-run
        ref="refNCoreButtonRunModalFileEvent"
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

export default {
  components: {
    NCoreButtonRun,
  },
  mixins: [validationMixin],
  directives: {},
  props: {},
  computed: {
    ...mapGetters(['storeCrudUpdateFileEvent'])
  },
  watch: {
    storeCrudUpdateFileEvent: function (val) {
      if (this.idModal === val.id) {
        this.formModalUpload.id = val.data.id
        this.formModalUpload.name = val.data.name
      }
    }
  },
  data() {
    return {
      modalData: [],
      idModal: "NCoreModalFileEventId",
      titleModal: "XỬ LÝ LINK NGOÀI HỆ THỐNG",
      processFile: false,
      formModalUpload: {
        id: '',
        name: '',
      },
    };
  },
  validations: {
    formModalUpload: {
      id: "",
      name: {
        required,
        maxLength: maxLength(500)
      },
    }
  },
  methods: {
    resetStateModal() {
      this.processFile = false;
      this.formModalUpload.id = ''
      this.formModalUpload.name = ''
      this.$hideProcessing()
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
          });
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    },
  },
};
</script>
