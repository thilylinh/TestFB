<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="false"
           :title="titleModal"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="lg"
           @shown="callOpenPage"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">1. Tên thông báo</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <b-form-input id="notificationManagerEvent_txtTen"
                        v-model="$v.form.name.$model"
                        :state="!$v.form.name.$error"
                        autocomplete="off"
                        autofocus
                        placeholder="Nhập tên thông báo ..."/>
          <b-form-invalid-feedback v-if="!$v.form.name.required">
            Không được bỏ trống
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.name.maxLength">
            Độ dài tối đa 500 kí tự
          </b-form-invalid-feedback>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">2. Nội dung thông báo</label>
        </b-col>
        <b-col lg="12" md="12" sm="12" xs="12">
          <textarea rows="3"
                    v-model="form.content"
                    class="form-control"
                    id="notificationManagerEvent_txtMota"/>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">3. Cấu hình</label>
        </b-col>
        <b-col class="mt-1" lg="6" md="6" sm="6" xs="12">
          <b-form-checkbox v-model="form.isSendAll"
                           unchecked-value="not_accepted"
                           value="accepted"
                           @input="isTrueChange(items)">
            <span class="nHover selectCombobox">Gửi cho tất cả thành viên</span>
          </b-form-checkbox>
        </b-col>
        <b-col class="mt-1" lg="6" md="6" sm="6" xs="12">
          <b-form-checkbox v-model="form.isSendAll"
                           unchecked-value="accepted"
                           value="not_accepted"
                           @input="isTrueChange(items)">
            <span class="nHover selectCombobox">Gửi cho thành viên cụ thể</span>
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row class="mt-1" v-if="this.form.isSendAll==='not_accepted'">
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <b-table-simple hover small caption-top responsive bordered striped>
            <b-thead head-variant="dark">
              <b-tr style="font-size: 8px;">
                <b-th class="center" style="width: 50px;">STT</b-th>
                <b-th class="center">HỌ VÀ TÊN</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td colspan="2">
                  <b-button class="nFontButton" size="xs" type="button"
                            variant="success" @click="addAnswer()">
                    <span class="label"><i class="iconsminds-gears"></i> Thêm người dùng</span>
                  </b-button>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <b-form-checkbox v-model="form.isRun"
                           unchecked-value="not_accepted"
                           value="accepted"
                           @input="isTrueChange(items)">
            <span class="nHover selectCombobox">Chạy thông báo trên tiêu đề</span>
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <b-form-checkbox v-model="form.isRun"
                           unchecked-value="not_accepted"
                           value="accepted"
                           @input="isTrueChange(items)">
            <span class="nHover selectCombobox">Hiển thị trên trang chủ</span>
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col class="mt-1" lg="6" md="6" sm="6" xs="12">
          <b-form-checkbox v-model="form.isLimitedTime"
                           unchecked-value="not_accepted"
                           value="accepted"
                           @input="isTrueChange(items)">
            <span class="nHover selectCombobox">Giới hạn thời gian chạy</span>
          </b-form-checkbox>
        </b-col>
        <b-col class="mt-1" lg="6" md="6" sm="6" xs="12" v-if="this.form.isLimitedTime === 'accepted'">
          <b-row>
            <b-col lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">1. Thời gian bắt đầu</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <b-input-group>
                <b-input-group-prepend>
                  <b-button variant="primary" @click="callDateTimePickerModal()">
                    <i class="simple-icon-calendar"/>
                  </b-button>
                </b-input-group-prepend>
                <b-form-input v-model="form.dateStart"
                              v-mask="'99 - 99 - 9999 99:99'"
                              type="text"/>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">2. Thời gian kết thúc</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <b-input-group>
                <b-input-group-prepend>
                  <b-button variant="primary" @click="callDateTimePickerModal()">
                    <i class="simple-icon-calendar"/>
                  </b-button>
                </b-input-group-prepend>
                <b-form-input v-model="form.dateEnd"
                              v-mask="'99 - 99 - 9999 99:99'"
                              type="text"/>
              </b-input-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
          <label class="font-weight-700">4. File đính kèm</label>
        </b-col>
        <b-colxx xxs="12">
          <n-attack-file :local-store-name-send="'AttackFile_File'"
                         :flag-send="flagSendFile"
                         ref="refNotificationManagerEvent_AttackFile"/>
        </b-colxx>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         :showBtnSave="'1'"
                         ref="refNewsGroupTypeBtnSave"
                         @submitEvent="subEvNewsGroupTypeBtnSave"/>
    </b-form>
  </b-modal>
</template>

<script>
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {mapActions, mapGetters} from "vuex";
import NCoreButtonRun from "../../../../containers/ndev-core/components/NCoreButtonRun.vue";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import notificationManagerApi from "@/views/app/system-manager/api/notificationManagerApi";
import NAttackFile from "@/containers/ndev-manager/Page/NAttackFile";

export default {
  components: {
    NAttackFile,
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
      pageId: "notificationManagerPageId",
      titleModal: "",
      modalData: [],
      flagSendFile: '0',
      form: {
        content: "",
        name: "",
        isSendAll: NCoreConfig.checkedValue,
        isRun: NCoreConfig.checkedValue,
        isShowMain: NCoreConfig.checkedValue,
        isLimitedTime: NCoreConfig.uncheckedValue,
        dateStart: this.returnDeadLine(),
        dateEnd: this.returnDeadLine()
      },
      config: {
        events: {
          initialized: function () {
          }
        },
        placeholderText: 'Nhập nội dung thông báo ...',
        charCounterCount: true
      },
    };
  },
  watch: {},
  methods: {
    ...mapActions(['callStoreSendAttackFile']),
    callOpenPage() {
      const iDataReceive = this.$store.state.storeCrud.storeCrudUpdate
      if (iDataReceive.id === this.pageId) {
        this.modalData = iDataReceive;

        if (iDataReceive.type === 'add') {
          this.form.id = NCoreHelper.CreateGuid()
        }

        this.flagSendFile = '1'
      }
    },
    resetStateModal() {
      this.flagSendFile = '0'
    },
    returnDeadLine() {
      return NCoreHelper.returnDeadLine()
    },
    async subEvNewsGroupTypeBtnSave(isSave) {
      if (isSave === true) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$showProcessing()
          let dataSend = {
            id: this.form.id,
            name: this.form.name,
            content: this.form.content,
            isSendAll: this.form.isSendAll === NCoreConfig.checkedValue,
            isRun: this.form.isRun === NCoreConfig.checkedValue,
            isShowMain: this.form.isShowMain === NCoreConfig.checkedValue,
            dateStart: this.form.dateStart,
            dateEnd: this.form.dateEnd,
            isLimitedTime: this.form.isLimitedTime === NCoreConfig.checkedValue,
            fileAttackModel: this.$refs.refNotificationManagerEvent_AttackFile.return_PageData()
          }
          const iResult =
            this.modalData.type === "add"
              ? await NCoreHelper.v2executePOST(
                this,
                notificationManagerApi.NOTIFICATION_MANAGER_CREATE,
                dataSend
              )
              : await NCoreHelper.v2executePUT(
                this,
                notificationManagerApi.NOTIFICATION_MANAGER_UPDATE,
                dataSend
              );
          if (iResult) {
            //=======================================================XÓA DỮ LIỆU LOCAL==================================
            localStorage.setItem('AttackFile_File', null)
            //==========================================================================================================
            NCoreHelper.v2alertMess(
              this,
              NCoreHelper.returnMessage(
                this.modalData.type === "add" ? 1 : 2,
                true,
                this.modalData.funcName
              ),
                iResult ? 2: 3
            );
            this.$emit("handlerSubmitEvent", true);
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
        NCoreHelper.v2modalShowHide(this, this.pageId, 0);
      }
    }
  }
};
</script>
