<template>
  <b-modal
    :id="idModal"
    :hide-footer="true"
    :hide-header-close="false"
    cancel-title="Hủy bỏ"
    cancel-variant="outline-primary"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="md"
    :title="titleModal"
    @hidden="resetStateModal"
  >
    <b-row>
      <b-col class="text-right nModal_BootTrap" lg="12" md="12" sm="12" xs="12">
        <b-card>
          <div class="d-block d-md-inline-block pt-1">
            <div class="search-sm d-inline-block float-md-left mr-1 align-top">
              <b-input
                :placeholder="$t('menu.search')"
                autocomplete="off"
                class="form-control"
                @input="val => searchChange(val)"
              />
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col
        class="text-right nModal_BootTrap mt-2"
        lg="12"
        md="12"
        sm="12"
        xs="12"
      >
        <b-card class="no-header">
          <vuetable
            ref="ComboboxStaffManagerTableRef"
            :api-mode="false"
            :data="dataPage"
            :fields="fields"
            :no-data-template="noDataTemplate"
            :per-page="20"
            :reactive-api-url="true"
            class="table-divided order-with-arrow"
            table-height="400px"
          >
            <template slot="stt" slot-scope="props">
              {{ props.rowIndex + 1 }}
            </template>
            <template slot="cName" slot-scope="props">
              <b-row>
                <b-col
                  class="text-justify"
                  lg="12"
                  md="12"
                  sm="12"
                  xs="12"
                  @click="submitEvent(2, props.rowData)"
                >
                  {{ props.rowData.name }}
                </b-col>
              </b-row>
            </template>
          </vuetable>
        </b-card>
      </b-col>
      <b-col class="mt-2 text-center" lg="12" md="12" sm="12" xs="12">
        <b-button
          :disabled="processing"
          class="mb-2"
          size="sm"
          variant="primary"
          @click="submitEvent(3)"
          ><i class="iconsminds-arrow-refresh"></i> Quay về
        </b-button>
        <b-button
          v-if="titleShowBtnAll === '1'"
          :disabled="processing"
          class="mb-2"
          size="sm"
          variant="danger"
          @click="submitEvent(4)"
          ><i class="iconsminds-upgrade"></i> Chọn tất cả
        </b-button>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import NButtonRun from "../../../../containers/ndev-manager/Page/NButtonRun";
import NCoreConfig from "../../../NCoreHelper/NCoreConfig";
import { mapGetters } from "vuex";
import Vuetable from "vuetable-2/src/components/Vuetable";

export default {
  components: {
    NButtonRun,
    Vuetable
  },
  directives: {},
  props: {
    titleModal: {
      type: String,
      default: "DANH SÁCH NHÂN VIÊN"
    },
    titleShowBtnAll: {
      type: String,
      default: "1"
    }
  },
  mixins: [],
  validations: {},
  computed: {
    ...mapGetters(["storeStaffManager"])
  },
  data() {
    return {
      idModal: "ComboboxStaffManagerId",
      noDataTemplate: NCoreConfig.noDataTemplate,
      processing: false,
      dataPage: [],
      fields: [
        {
          name: "__slot:stt",
          title: "",
          titleClass: "center aligned text-center",
          dataClass: "center aligned text-center",
          width: "15%"
        },
        {
          name: "__slot:cName",
          title: "",
          titleClass: "center aligned text-justify",
          dataClass: "text-justify aligned selectCombobox",
          width: "85%"
        }
      ]
    };
  },
  watch: {
    storeStaffManager(val) {
      this.dataPage = val;
    }
  },
  mounted() {},
  methods: {
    resetStateModal() {
      this.search = "";
    },
    async submitEvent(isSave, data) {
      if (isSave === 4) {
        data = [];
        data.id = NCoreConfig.isGuidEmpty;
        data.name = "Tất cả";
      }
      if (isSave === 3) {
        this.$bvModal.hide(this.idModal);
      } else {
        this.$emit("submitEvent", isSave, data);
      }
      this.$emit("submitEvent", isSave, data);
    },
    searchChange(val) {
      this.$emit("submitEvent", 1, val);
    }
  }
};
</script>
<style>
.nModal_BootTrap .card .card-body {
  padding: 5px !important;
}
</style>
