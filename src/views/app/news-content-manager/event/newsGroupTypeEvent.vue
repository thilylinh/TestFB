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
          <label class="font-weight-700">1. Tên loại nhóm tin</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input
            id="roomManagerEvent_txtTen"
            v-model="$v.form.name.$model"
            :state="!$v.form.name.$error"
            autocomplete="off"
            autofocus
            placeholder="Nhập tên loại nhóm tin ..."
          />
          <b-form-invalid-feedback v-if="!$v.form.name.required"
            >Không được bỏ trống
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.name.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">2. Mô tả</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <textarea
            rows="3"
            v-model="form.description"
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
import { mapGetters } from "vuex";
import NCoreButtonRun from "../../../../containers/ndev-core/components/NCoreButtonRun.vue";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import newsGroupTypeApi from "@/views/app/news-content-manager/api/newsGroupTypeApi";

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
      name: {
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
        description: "",
        name: ""
      }
    };
  },
  watch: {
    storeCrudUpdate: function(val) {
      if (val.id === this.idModal) {
        this.modalData = val;
        this.titleModal = val.title;
        if (val.data != null) {
          this.form.id = val.data.id;
          this.form.description = val.data.description;
          this.form.name = val.data.name;
        }
        this.$hideAllPageLoading()
      }
    }
  },
  methods: {
    resetStateModal() {
      this.form.description = "";
      this.form.name = "";
    },
    async subEvNewsGroupTypeBtnSave(isSave) {
      if (isSave === true) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$showProcessing()
          const iResult =
            this.modalData.type === "add"
              ? await NCoreHelper.v2executePOST(
                  this,
                  newsGroupTypeApi.NEWS_GROUP_TYPE_CREATE,
                  this.form
                )
              : await NCoreHelper.v2executePUT(
                  this,
                  newsGroupTypeApi.NEWS_GROUP_TYPE_UPDATE,
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
    }
  }
};
</script>
