<template>
  <b-modal
    :id="pageId"
    :hide-footer="true"
    :hide-header="true"
    :hide-header-close="false"
    centered
    no-close-on-backdrop
    size="md"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <VueCtkDateTimePicker v-model="dateTimeData"
                                buttonColor="green"
                                color="coral"
                                format="DD - MM - YYYY HH:mm"
                                :inline="true"/>
        </b-col>
        <b-col class="nFontButton font-weight-700 text-center" lg="12" md="12" sm="12"
               style="color: red;font-size: 25px;"
               xs="12">
          {{ dateTimeData }}
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <n-core-button-run :btn-save-title="'Lưu lựa chọn'"
                             ref="refNCoreButtonRunNDatePicker"
                             @submitEvent="submitEvent"/>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>
<script>

import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "./NCoreButtonRun";

export default {
  components: {NCoreButtonRun},
  props: {
    // sendData: '',
  },
  mounted() {
  },
  data() {
    return {
      pageId: 'NDatePickerId',
      dateTimeData: '',
    };
  },
  created() {
  },
  watch: {
    // sendData: function (val) {
    //   this.dateTimeData = val
    // }
  },
  methods: {
    handleChange() {
      alert(this.startDate)
    },
    resetStateModal() {
      this.dateTimeData = ''
      this.$hideProcessing()
    },
    submitEvent(val) {
      this.$showProcessing()
      if (val) {
        if (this.dateTimeData === '') {
          NCoreHelper.v2alertMess(this, 'Vui lòng chọn thời gian', 1)
          this.$hideProcessing()
        } else {
          this.$emit('handleSubmitEvent', this.dateTimeData)
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageId, 0)
        this.$hideProcessing()
      }
    }
  }
};
</script>

