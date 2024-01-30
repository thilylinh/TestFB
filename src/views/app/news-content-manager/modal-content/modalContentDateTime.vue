<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="false"
           :title="'CHỌN THỜI GIAN ĐĂNG BÀI'"
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
        <b-col xxs="12" class="mt-2">
          <!-- <vc-date-picker locale="vi" v-model="date" mode="dateTime" is24hr hide-time-header="true"
                          class="form-control"/> -->
          <b-form-group class="mb-3 time-picker-group">
            <b-input-group class="mb-50">
              <b-form-input
                id="timepicker-start-time"
                v-model="time"
                type="text"
                placeholder="HH:mm"
                @input="timeChange"
              ></b-form-input>
              <b-input-group-append>
                <b-form-timepicker
                  :value="time"
                  button-only
                  right
                  locale="vi"
                  now-button
                  label-now-button="Current"
                  no-close-button
                  :show-seconds="false"
                  @input="pickerTime"
                ></b-form-timepicker>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <datepicker
            :bootstrap-styling="true"
            :placeholder="$t('form-components.date')"
            v-model="day"
            format="dd/MM/yyyy"
          ></datepicker>
        </b-col>
      </b-row>

      <n-core-button-run :show-btn-save="'1'"
                         :btn-cancel="'Quay về'"
                         ref="refModalContentView_BtnSave"
                         @submitEvent="subEvModalContentView_BtnSave"/>
    </b-form>
  </b-modal>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import {mapGetters} from "vuex";
import newsContentApi from "@/views/app/news-content-manager/api/newsContentApi";
import Datepicker from "vuejs-datepicker";
// import moment from "moment";


export default {
  components: {
    NCoreButtonRun,
    Datepicker
  },
  props: {},
  data() {
    return {
      pageId: 'ModalContentDateTime_Id',
      pageTitle: '',
      contentPage: '',
      newsId: '',
      date: '',//new Date('2023-10-20 17:45')
      time: '',
      day: '',
      disableSave: false,
    };
  },
  mixins: [],
  validations: {},
  methods: {
    //==============================================PAGE================================================================
    async callOpenModal() {
      const nativeDate = this.date ? new Date(this.date) : new Date();
      const hour = nativeDate.getHours().toString().padStart(2, '0');
      const minute = nativeDate.getMinutes().toString().padStart(2, '0');
      this.time = `${hour}:${minute}`
      const formattedDate = nativeDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      const [day, month, year] = formattedDate.split('/');
      this.day = `${day}/${month}/${year}`

      this.$hideAllPageLoading()
    },
    async resetStateModal() {
      this.contentPage = ''
    },
    //==================================================================================================================
    //==================================================SAVE-ALL========================================================
    async subEvModalContentView_BtnSave(val) {
      if(this.disableSave) return
      if (val) {
        const nativeDate = new Date(this.day);
        const formattedDate = nativeDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
        const [month, day, year] = formattedDate.split('/');
        const timeFormat = `${year}-${month}-${day}T${this.time}:00`
        const dataSend = {
          id: this.newsId,
          time: timeFormat
        }
        await NCoreHelper.v2executePOST(this, newsContentApi.AUTO_TIME, dataSend)
        NCoreHelper.v2modalShowHide(this, this.pageId, 0)
        this.$emit('handleSubmitEvent', {
          id: this.newsId,
          time: timeFormat
        })
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageId, 0)
      }
    },

    timeChange(val) {
      const rex = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$/
      this.disableSave = !rex.test(val)
    },
    pickerTime(val) {
      let formatTime = val
      if (val?.split(':')?.length > 2) {
        formatTime = val.replace(':00', '')
      }
      this.time = formatTime
    },
    //==================================================================================================================
  },
  computed: {
    ...mapGetters(['storeSendViewContent'])
  },
  watch: {},
  created() {
  },
  async mounted() {
  },
};
</script>
<style>
.vc-container {
  width: 100% !important;
}

.vc-date-time {
  text-align: center;
  margin: 0 auto !important;
}
.time-picker-group {
  .btn {
    border-radius: unset;
  }
}
</style>
