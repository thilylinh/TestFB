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
          <b-row v-show="$store.state.componentLoading" class="overflow-hidden">
            <b-colxx xxs="12">
              <b-skeleton-table
                :rows="5"
                :columns="4"
                :table-props="{ bordered: true, striped: true }"
              ></b-skeleton-table>
            </b-colxx>
          </b-row>
          <b-row v-show="!$store.state.componentLoading">
            <b-colxx xxs="12" class="NTable">
              <vuetable
                ref="StaffManagerComboboxWithProcessingStreamTableRef"
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
                      @click="selectStaff(props.rowData)"
                    >
                      {{ props.rowData.name }}
                    </b-col>
                  </b-row>
                </template>
              </vuetable>
            </b-colxx>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <n-core-button-run
      :btnSaveTitle="'Lưu lựa chọn'"
      :showBtnSave="'0'"
      ref="refNCoreButtonRunStaffManagerComboboxWithProcessingStream"
      @submitEvent="subEvNCoreButtonRunStaffManagerComboboxWithProcessingStream"
    />
  </b-modal>
</template>

<script>
import {mapGetters} from "vuex";
import Vuetable from "vuetable-2/src/components/Vuetable";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";

export default {
  components: {
    NCoreButtonRun,
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
    ...mapGetters(["storeCrudUpdateWorkManagerEvent"])
  },
  data() {
    return {
      idModal: "StaffManagerComboboxWithProcessingStreamIdModal",
      noDataTemplate: NCoreConfig.noDataTemplate,
      modalData: [],
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
    storeCrudUpdateWorkManagerEvent(val) {
      if (this.idModal === val.id) {
        this.modalData = val
        this.dataPage = val.dataStaffProcessingStream
      }
    }
  },
  mounted() {
  },
  methods: {
    resetStateModal() {
      this.search = "";
    },
    selectStaff(data) {
      this.$showProcessing()
      this.$emit("handleSubmitEvent", {
        processingStreamStaff: data.id,
        processingStreamStaffName: data.name,
      });
    },
    searchChange(val) {
      this.$emit("handleSubmitEvent", 1, val);
    },
    subEvNCoreButtonRunStaffManagerComboboxWithProcessingStream() {
      NCoreHelper.v2modalShowHide(this, this.idModal, 0)
    }
  }
};
</script>
<style>
.nModal_BootTrap .card .card-body {
  padding: 5px !important;
}
</style>
