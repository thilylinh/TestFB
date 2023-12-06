<template>
  <b-modal
    :id="idModal"
    :hide-footer="true"
    :hide-header-close="true"
    cancel-title="Hủy bỏ"
    cancel-variant="outline-primary"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="xs"
    :title="'CẬP NHẬT ẢNH ĐẠI DIỆN'"
    @hidden="resetStateModal"
  >
    <b-row>
      <b-colxx xxs="12" class="text-center nModal_BootTrap" style="margin: 0 auto;">
        <b-card class="no-header" style="height: 410px;margin: 0 auto;">
          <b-row>
            <b-colxx xxs="12">
              <avatar-manager width="300px" height="300px" ref="refAvatarManager"/>
            </b-colxx>
            <b-colxx xxs="12" class="mt-1" style="font-weight: bold;color: red;font-family: Verdana;">
              * Kích thước chuẩn là 300x300
            </b-colxx>
            <b-colxx xxs="12" class="mt-1 center">
              <n-core-button-run
                :btnSaveTitle="'Lưu dữ liệu'"
                :showBtnSave="'1'"
                ref="refNCoreButtonRun"
                @submitEvent="subEvNCoreButtonRun"
              />
            </b-colxx>
          </b-row>
        </b-card>
      </b-colxx>
    </b-row>
  </b-modal>
</template>

<script>
import AvatarManager from "./avatarManager";
import NCoreButtonRun from "../../../../containers/ndev-core/components/NCoreButtonRun";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import NCoreConfig from "../../../NCoreHelper/NCoreConfig";

export default {
  components: {
    NCoreButtonRun,
    AvatarManager
  },
  directives: {},
  props: {},
  mixins: [],
  validations: {},
  computed: {},
  data() {
    return {
      idModal: "avatarManagerModalId",
      processing: false,
    };
  },
  watch: {},
  mounted() {
  },
  methods: {
    resetStateModal() {
      this.$refs.refNCoreButtonRun.processing = false
    },
    async subEvNCoreButtonRun(isSave) {
      if (isSave === true) {
        this.$refs.refNCoreButtonRun.processing = true
        this.$emit('handlerSubmitEvent', {
          id: JSON.parse(localStorage.getItem(NCoreConfig.userData)).uid,
          base64: this.$refs.refAvatarManager.toBase64()
        })
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    }
  },
};
</script>
<style>
.nModal_BootTrap .card .card-body {
  padding: 5px !important;
}
</style>
