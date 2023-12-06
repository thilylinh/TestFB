<template>
  <b-modal :id="idModal"
           :hide-footer="true"
           :hide-header-close="false"
           :title="titleModal"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="md"
           @shown="callOpenModal"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">1. Từ khóa gốc</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input id="subjectTypeManagerEvent_txtTen"
                        v-model="$v.form.root.$model"
                        :state="!$v.form.root.$error"
                        autocomplete="off"
                        autofocus
                        placeholder="từ khóa gốc"/>
          <b-form-invalid-feedback v-if="!$v.form.root.required">
            Không được bỏ trống
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.root.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">2. Từ khóa thay thế</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input id="subjectTypeManagerEvent_txtTenThayThe"
                        v-model="$v.form.replace.$model"
                        :state="!$v.form.replace.$error"
                        autocomplete="off"
                        placeholder="từ khóa thay thế"/>
          <b-form-invalid-feedback v-if="!$v.form.replace.required">
            Không được bỏ trống
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.replace.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">3. Mô tả/Ghi chú</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <textarea rows="3"
                    v-model="form.description"
                    class="form-control"
                    id="subjectTypeManagerEvent_txtMota"/>
        </b-col>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         :showBtnSave="'1'"
                         ref="refSubjectTypeManagerBtnSave"
                         @submitEvent="subEvSubjectTypeManagerBtnSave"/>
    </b-form>
  </b-modal>
</template>

<script>
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {mapGetters} from "vuex";
import NCoreButtonRun from "../../../../containers/ndev-core/components/NCoreButtonRun.vue";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import minusWordApi from "@/views/app/study-manager/api/minusWordApi";

export default {
  components: {
    NCoreButtonRun
  },
  directives: {},
  props: {},
  mixins: [validationMixin],
  validations: {
    form: {
      description: "",
      root: {
        required,
        maxLength: maxLength(500)
      },
      replace: {
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
      idModal: "minusWordEventModalId",
      titleModal: "",
      modalData: [],
      form: {
        description: "",
        root: "",
        replace: "",
      }
    };
  },
  watch: {},
  methods: {
    callOpenModal() {
      const iDataReceive = this.$store.state.storeCrud.storeCrudUpdate
      if (iDataReceive.id === this.idModal) {
        this.modalData = iDataReceive;
        this.titleModal = iDataReceive.title;

        if (iDataReceive.data != null) {
          this.form.id = iDataReceive.data.id;
          this.form.description = iDataReceive.data.description;
          this.form.root = iDataReceive.data.root;
          this.form.replace = iDataReceive.data.replace;
        }
        this.$hideAllPageLoading()
      }
    },
    resetStateModal() {
      this.form.description = "";
      this.form.root = "";
      this.form.replace = "";
    },
    async subEvSubjectTypeManagerBtnSave(isSave) {
      if (isSave === true) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$showProcessing()
          let apiAdd = minusWordApi.CREATE
          let apiUpdate = minusWordApi.UPDATE
          const iResult =
              this.modalData.type === "add"
                  ? await NCoreHelper.v2executePOST(
                      this,
                      apiAdd,
                      this.form
                  )
                  : await NCoreHelper.v2executePUT(
                      this,
                      apiUpdate,
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
            this.$refs.refSubjectTypeManagerBtnSave.processing = false
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
    }
  }
};
</script>
