<template>
  <b-button class="nColorWhite" size="xs" variant="success" @click="callStaffManager()">
    <i class="iconsminds-folder-cloud"></i> {{ StaffManagerName }}
    <staff-manager-combobox-modal
      :title-modal="titleStaffManagerModal"
      :title-show-btn-all="titleShowBtnAll"
      ref="refStaffManagerModalCombobox"
      @submitEvent="submitStaffManagerCombobox"
    />
  </b-button>
</template>

<script>
import NButtonRun from "../../../../containers/ndev-manager/Page/NButtonRun";
import NCoreConfig from "../../../NCoreHelper/NCoreConfig";
import {mapActions, mapGetters} from "vuex";
import Vuetable from "vuetable-2/src/components/Vuetable";
import StaffManagerComboboxModal from "./staff-manager-combobox-modal.vue";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";

const iPortal = JSON.parse(localStorage.getItem(NCoreConfig.projectData));
export default {
  components: {
    StaffManagerComboboxModal,
    NButtonRun,
    Vuetable,
  },
  directives: {},
  props: {
    titleStaffManager: {
      type: String,
      default: "Nhân viên",
    },
    titleSelectAll: {
      type: String,
      default: "Tất cả",
    },
    titleShowBtnAll: {
      type: String,
      default: "1",
    },
  },
  mixins: [],
  validations: {},
  computed: {
    ...mapGetters(["storeStaffManager"]),
  },
  data() {
    return {
      processing: false,
      StaffManagerName: "",
      StaffManagerId: "",
      search: "",
      titleStaffManagerModal: "",
    };
  },
  watch: {},
  mounted() {
    this.$nextTick(async () => {
      // Call token để kiểm tra xem tài khoản đang đăng nhập có quyền xem tất cả nhân viên hay không ?
      const valueAuthority = await NCoreHelper.v2checkAuthorities('WorkManager');
      if ((valueAuthority & NCoreConfig.authority_ViewAll) !== 0) {
        // Có quyền xem
        this.StaffManagerName = this.titleStaffManager + ": -- " + this.titleSelectAll + " --";
        this.StaffManagerId = NCoreConfig.isGuidEmpty;
      } else {
        // Không có quyền xem
        this.StaffManagerName = this.titleStaffManager + ": -- " + await NCoreHelper.v2checkAuthorities('StaffName') + " --";
        this.StaffManagerId = await NCoreHelper.v2checkAuthorities('StaffId');
      }

      this.titleStaffManagerModal = "DANH SÁCH " + this.titleStaffManager.toUpperCase();
    });
  },
  methods: {
    ...mapActions(["callStoreStaffManager"]),
    callStaffManager() {
      this.callStoreStaffManager({
        search: this.search,
      });
      this.$bvModal.show(this.$refs.refStaffManagerModalCombobox.idModal);
    },
    submitStaffManagerCombobox(type, data) {
      switch (type) {
        case 1: {
          // Search
          this.search = data;
          this.callStaffManager();
          break;
        }
        case 2: {
          this.StaffManagerId = data.id;
          this.StaffManagerName = this.titleStaffManager + ": --" + data.name + " --";
          this.search = "";
          this.$emit("submitStaffManagerCombobox", data.id);
          break;
        }
        default: {
          this.StaffManagerId = data.id;
          this.StaffManagerName = this.titleStaffManager + ": --" + data.name + " --";
          this.search = "";
          this.$emit("submitStaffManagerCombobox", data.id);
          break;
        }
      }
      if (type > 1) {
        this.$bvModal.hide(this.$refs.refStaffManagerModalCombobox.idModal);
      }
    },
  },
};
</script>
<style>
.nModal_BootTrap .card .card-body {
  padding: 5px !important;
}
</style>
