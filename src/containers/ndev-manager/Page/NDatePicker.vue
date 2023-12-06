<template>
  <b-modal
    :id="NDatePickerId"
    :hide-footer="true"
    :hide-header="true"
    :hide-header-close="true"
    centered
    no-close-on-backdrop
    size="md"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <VueCtkDateTimePicker v-model="dateTimeData"
                                buttonColor="green" color="coral"
                                format="DD - MM - YYYY"
                                inline="true"
          />
        </b-col>
        <b-col class="nFontButton font-weight-700 text-center" lg="12" md="12" sm="12"
               style="color: red;font-size: 25px;"
               xs="12">
          {{ dateTimeData }}
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <n-button-run :btn-save-title="'Lưu lựa chọn'" :processing="nDatePickerProcessing"
                        @submitEvent="submitEvent"/>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>
<script>

import NButtonRun from "./NButtonRun";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";

export default {
  components: {NButtonRun},
  props: {
    sendData: '',
    NDatePickerId: '',
  },
  mounted() {
  },
  data() {
    return {
      dateTimeData: '',
      nDatePickerProcessing: false,
    };
  },
  created() {
  },
  watch: {
    sendData: function (val) {
      this.dateTimeData = val
    }
  },
  methods: {
    handleChange() {
      alert(this.startDate)
    },
    resetStateModal() {
      this.dateTimeData = ''
      this.nDatePickerProcessing = false
    },
    submitEvent(val) {
      if (val) {
        if (this.dateTimeData === '') {
          NCoreHelper.alertMess(this, 'Vui lòng chọn thời gian', 1)
          this.nDatePickerProcessing = false
        } else {
          this.nDatePickerProcessing = true
          this.$emit('submitEvent', this.dateTimeData)
        }
      } else {
        this.$emit('submitEvent', this.dateTimeData)
      }
    }
  }
};
</script>

