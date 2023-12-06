<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="false"
           :title="pageTitle"
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
        <b-colxx xxs="12">
          <b-row>
            <b-colxx xxs="12">
              <label class="font-weight-700"> 1. Tên hình ảnh</label>
            </b-colxx>
            <b-colxx xxs="12">
              <b-form-input id="uploadEvent_txtName"
                            v-model="$v.form.name.$model"
                            :state="!$v.form.name.$error"
                            autocomplete="off"
                            autofocus
                            placeholder="Nhập tên hình ảnh ..."/>
            </b-colxx>
          </b-row>
          <b-row class="mt-2">
            <b-colxx xxs="12">
              <label class="font-weight-700">2. File đính kèm <span class="nRequired">(*)</span> </label>
            </b-colxx>
            <b-colxx xxs="12">
              <b-row>
                <b-col lg="12" md="12" sm="12" xs="12">
                  <b-button :class="{'font-weight-700 nFontButton btn-multiple-state btn-shadow': true,
                              'show-spinner': processing }" :disabled="processing"
                            size="xs"
                            type="button" variant="outline-info" @click="openUploadFile(1)">
                  <span class="spinner d-inline-block">
                                          <span class="bounce1"></span>
                                          <span class="bounce2"></span>
                                          <span class="bounce3"></span>
                                      </span>
                    <span class="icon success">
                                          <i class="simple-icon-check"></i>
                                      </span>
                    <span class="icon fail">
                                          <i class="simple-icon-exclamation"></i>
                                      </span>
                    <span class="label"><i class="simple-icon-paper-clip"></i>Chọn file</span>
                  </b-button>
                  <input id="fileImage" ref="fileImage" accept="image/png, image/gif, image/jpeg" class="d-none"
                         type="file" @change="addUploadFile(1)">
                </b-col>
                <b-col v-for="(items, index) in dataImage" :key="index"
                       class="mt-3 nFileMinhChung"
                       lg="12" md="12" sm="12" xs="12"
                       @click="deleteUploadFile(items, 1)">
                  <i class="simple-icon-trash font-weight-700" style="color: red"></i> {{ items.name }}
                </b-col>
              </b-row>
            </b-colxx>
            <b-colxx xxs="12" class="center">
              <b-img-lazy style="width: 150px;height: auto"
                          :src="form.link"/>
            </b-colxx>
          </b-row>
        </b-colxx>
      </b-row>

      <n-core-button-run :btnCancel="'Quay về'"
                         :btnSaveTitle="'Lưu'"
                         :showBtnSave="'1'"
                         @submitEvent="subEvUploadImageFromComputer"/>
    </b-form>
  </b-modal>
</template>

<script>
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import serverFileApi from "@/views/app/system-manager/api/serverFileApi";

export default {
  components: {
    NCoreButtonRun
  },
  directives: {},
  props: {},
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(500),
      },
    },
  },
  computed: {},
  data() {
    return {
      pageId: "uploadImageFromComputerPageIdv2023",
      pageTitle: "UPLOAD FILE TỪ MÁY TÍNH",
      modalData: [],
      processing: false,
      form: {
        id: "",
        name: "",
      },
      dataImage: []
    };
  },
  watch: {},
  methods: {
    async callOpenPage() {
      this.form.name = ''
      this.$refs.fileImage.value = null;
      this.dataImage = null
    },
    resetStateModal() {
      this.form.name = '';
      this.$refs.fileImage.value = null;
      this.dataImage = null
    },
    async subEvUploadImageFromComputer(isSave) {
      if (isSave) {
        this.$showProcessing()
        let countFile = this.$refs.fileImage.files.length
        let formData = new FormData();
        if (countFile === 0) {
          NCoreHelper.v2alertMess(this, 'Không có dữ liệu file đính kèm', 1)
          this.processing = false
          return
        } else {
          for (let i = 0; i < countFile; i++) {
            let file = this.$refs.fileImage.files[i];
            formData.append('files[' + i + ']', file);
          }
        }

        formData.append('Name', this.form.name);
        formData.append('ParentId', NCoreConfig.isGuidEmpty);
        formData.append('FileType', 1);
        formData.append('VideoType', 3);

        const iResultUpload =
          await NCoreHelper.v2uploadFile(
            this,
            serverFileApi.SERVER_FILE_UPLOAD_FILE,
            formData)

        if (iResultUpload.resultCommand) {
          const iResult = await NCoreHelper.v2executeGET(this, serverFileApi.SERVER_FILE_CALL_DE_QUY)
          if (iResult) {
            await this.deleteUploadFile(null, 1)
            NCoreHelper.v2alertMess(
              this,
              'Upload file thành công',
              2);
            this.$emit('handlerSubmitEvent', iResultUpload)
          }
        } else {
          NCoreHelper.v2alertMess(
            this,
            'Upload file không thành công',
            1);
          this.$hideProcessing()
        }

        this.processing = false
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageId, 0);
      }
    },
    async openUploadFile(val) {
      document.getElementById('fileImage').click()
    },
    async addUploadFile(val) {
      this.processing = true
      switch (val) {
        case 1: {
          this.dataImage = []
          for (let i = 0; i < this.$refs.fileImage.files.length; i++) {
            let file = this.$refs.fileImage.files[i];
            this.dataImage.push(file)
          }
          break
        }
        default: {
          break
        }
      }
      this.processing = false
    },
    async deleteUploadFile(val, type) {
      switch (type) {
        case 1: {
          // Hình ảnh
          this.dataImage = []
          this.$refs.fileImage.value = null;
          break
        }
        default: {
          break
        }
      }
    },
  },
};
</script>
