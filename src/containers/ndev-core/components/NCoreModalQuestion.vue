<template>
  <b-modal :id="idModal"
           :hide-footer="true"
           :hide-header="true"
           :hide-header-close="true"
           centered
           no-close-on-backdrop
           size="md"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-img-lazy src="/images/question_image.jpg" style="width: 100%; height: 300px"/>
        </b-col>
        <b-col class="nFontButton text-center"
               lg="12"
               md="12"
               sm="12"
               style="margin-top: 15px; font-size: 20px; font-weight: bold;color: red;"
               xs="12">{{ titleOne }}
        </b-col>
        <b-col class="nFontButton text-center"
               lg="12"
               md="12"
               sm="12"
               style="margin-top: 5px; font-size: 23px; font-weight: bold;color: blue;"
               xs="12">{{ titleTwo }}
        </b-col>
      </b-row>
      <n-core-button-run ref="refNCoreButtonRunModalQuestion"
                         :btn-save-title="'Đồng ý'"
                         @submitEvent="submitEvent"
      />
    </b-form>
  </b-modal>
</template>

<script>
import {mapGetters} from "vuex";
import NCoreButtonRun from "./NCoreButtonRun";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";
import helperApi from "@/views/app/system-manager/api/helperApi";

export default {
  components: {
    NCoreButtonRun,
  },
  directives: {},
  props: {},
  computed: {
    ...mapGetters(["storeCrudQuestion"]),
  },
  watch: {
    storeCrudQuestion(val) {
      this.modalData = val;
      this.titleOne = val.titleOne;
      this.titleTwo = val.titleTwo;
      this.flagKey = val.flagKey;
      this.$hideAllPageLoading();
    },
  },
  data() {
    return {
      modalData: [],
      idModal: "NCoreModalQuestionIdModal",
      titleOne: "",
      titleTwo: "",
    };
  },
  methods: {
    resetStateModal() {
      this.processing = false;
    },
    async submitEvent(val) {
      if (val) {
        this.$showProcessing()
        switch (this.modalData.flagKey) {
          case 201: {
            // Mở khóa dữ liệu
            await this.actionLockAndUnLockData('Mở khóa')
            break
          }
          case 202: {
            // Khóa dữ liệu
            await this.actionLockAndUnLockData('Khóa')
            break
          }
          default: {
            // Trả về dữ lIệu truyền
            this.$emit("handleSubmitEvent", {
              result: true,
              message: '',
              data: this.modalData
            });
            break
          }
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    },
    async actionLockAndUnLockData(message) {
      const dataSend = {
        id: this.modalData.contentId,
        flagKey: this.modalData.flagKey,
        tableId: this.modalData.tableId
      }
      const iResult = await NCoreHelper.v2executePUT(this, helperApi.HELPER_UPDATE_STATUS, dataSend)
      if (iResult) {
        this.$emit("handleSubmitEvent", {
          result: true,
          message: message + ' dữ liệu <span class=\"nFontBold nColorBlue\">' + this.modalData.titleTwo + '</span> thành công'
        });
      } else {
        NCoreHelper.v2alertMess(this, '', 3)
        this.$hideProcessing()
      }
    },
    returnUppercase(val) {
      if (val === undefined) return "";
      return val !== "" ? val.toUpperCase() : "";
    },
  },
};
</script>
