<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="true"
           :title="'GHI CHÚ/MÔ TẢ'"
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
          <textarea rows="5"
                    class="form-control"
                    v-model="pageDescription"/>
        </b-col>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu thay đổi'"
                         :showBtnSave="'1'"
                         @submitEvent="subEvUpdateImageDescription"/>
    </b-form>
  </b-modal>
</template>

<script>
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
  computed: {},
  data() {
    return {
      pageId: "updateImageDescriptionPageId",
      pageTitle: "",
      pageDescription: '',
    };
  },
  watch: {},
  methods: {
    async callOpenPage() {
      this.pageDescription = this.nameFile
    },
    resetStateModal() {
      this.pageDescription = "";
    },
    async subEvUpdateImageDescription(isSave) {
      if (isSave === true) {
        if (this.pageDescription === '') {
          NCoreHelper.v2alertMess(this, 'Không có dữ liệu ghi chú/mô tả', 1)
        } else {
          this.$showProcessing()
          this.$emit('handlerSubmitEvent', {
            value: this.pageDescription
          })
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageId, 0);
      }
    },
  },
};
</script>
