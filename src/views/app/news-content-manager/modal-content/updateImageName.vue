<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="true"
           :title="'CẬP NHẬT TÊN ẢNH'"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="md"
           @shown="callOpenPage"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">1. Tên ảnh <span class="nRequired">(*)</span> </label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input id="folderEvent_txtName"
                        v-model="$v.form.name.$model"
                        :state="!$v.form.name.$error"
                        autocomplete="off"
                        autofocus
                        placeholder="Nhập tên dữ liệu ..."/>
          <b-form-invalid-feedback v-if="!$v.form.name.required">
            Không được bỏ trống
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.name.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu thay đổi'"
                         :showBtnSave="'1'"
                         @submitEvent="subEvAddHyperLink"/>
    </b-form>
  </b-modal>
</template>

<script>
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";

export default {
  components: {
    NCoreButtonRun
  },
  directives: {},
  props: {
    nameFile: ''
  },
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(500),
      },
    },
  },
  computed: {},
  data() {
    return {
      pageId: "updateImageNamePageId",
      pageTitle: "",
      form: {
        name: "",
      },
    };
  },
  watch: {},
  methods: {
    async callOpenPage() {
      this.form.name = this.nameFile
    },
    resetStateModal() {
      this.form.name = "";
    },
    async subEvAddHyperLink(isSave) {
      if (isSave === true) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$showProcessing()
          this.$emit('handlerSubmitEvent', {
            name: this.form.name
          })
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageId, 0);
      }
    },
  },
};
</script>
