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
              <label class="font-weight-700">
                1. Tên hình ảnh <span class="nRequired">(*)</span>
              </label>
            </b-colxx>
            <b-colxx xxs="12">
              <b-form-input id="uploadEvent_txtName"
                            v-model="$v.form.name.$model"
                            :state="!$v.form.name.$error"
                            autocomplete="off"
                            autofocus
                            placeholder="Nhập tên hình ảnh ..."/>
              <b-form-invalid-feedback v-if="!$v.form.name.required">
                Không được bỏ trống
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.name.maxLength">
                Độ dài tối đa 500 kí tự
              </b-form-invalid-feedback>
            </b-colxx>
          </b-row>
          <b-row class="mt-2">
            <b-colxx xxs="12">
              <label class="font-weight-700">2. Đường dẫn <span class="nRequired">(*)</span> </label>
            </b-colxx>
            <b-colxx xxs="12">
              <b-form-input id="uploadEvent_txtName"
                            v-model="$v.form.link.$model"
                            :state="!$v.form.link.$error"
                            autocomplete="off"
                            placeholder="Nhập đường dẫn hình ảnh ..."/>
              <b-form-invalid-feedback v-if="!$v.form.link.required">
                Không được bỏ trống
              </b-form-invalid-feedback>
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
                         @submitEvent="subEvUploadImageFromDifferenceLink"/>
    </b-form>
  </b-modal>
</template>

<script>
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
//import libraryManagerApi from "@/views/app/library-manager/api/libraryManagerApi";

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
      link: {
        required,
      },
    },
  },
  computed: {},
  data() {
    return {
      pageId: "uploadImageFromDifferenceLinkPageIdv2023",
      pageTitle: "UPLOAD FILE TỪ LINK KHÁC",
      form: {
        id: "",
        name: "",
        parentId: "",
        link: "",
      },
    };
  },
  watch: {},
  methods: {
    async callOpenPage() {
      this.resetStateModal()
    },
    resetStateModal() {
      this.form.name = '';
      this.form.link = '';
    },
    async subEvUploadImageFromDifferenceLink(isSave) {
      if (isSave) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$showProcessing()
          const dataSend = {
            name: this.form.name,
            parentId: NCoreConfig.isGuidEmpty,
            fileType: 1,
            videoType: 0,
            link: this.form.link
          }
          const iResultUpload =
            await NCoreHelper.v2executePOST(
              this,
              //libraryManagerApi.LIBRARY_MANAGER_DETAIL_UPLOAD_DIFFERENCE,
              dataSend)
          if (iResultUpload) {
            NCoreHelper.v2alertMess(
              this,
              'Upload file: <span class="table_title_name">' + this.form.name + '</span> thành công',
              2);
            this.$emit('handlerSubmitEvent', iResultUpload)
          } else {
            NCoreHelper.v2alertMess(
              this,
              'Upload file: <span class="table_title_name">' + this.form.name + '</span> không thành công',
              3);
            this.$hideProcessing()
          }
        } else {
          this.form.name = '';
          this.form.link = '';
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageId, 0);
      }
    },
    async subEvUpLoadEvent_FolderCombobox(val) {
      this.form.folderId = val[0].id
      this.form.folderName = val[0].name
      NCoreHelper.v2modalShowHide(this, this.$refs.refUpLoadEvent_FolderCombobox.pageId, 0);
      this.$hideProcessing()
    }
  },
};
</script>
