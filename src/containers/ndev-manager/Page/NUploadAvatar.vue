<template>
  <b-row>
    <b-col lg="12" md="12" sm="12" xs="12">
      <label class="font-weight-700">{{ title }}</label>
    </b-col>
<!--    <b-col v-if="imageModel.filePath === ''" lg="12" md="12" sm="12" xs="12">-->
<!--      <b-img-lazy class="nImg" src="/assets/img/avatar/avatar.png"/>-->
<!--    </b-col>-->
<!--    <b-col v-else-if="imageModel.filePath !== ''" lg="12" md="12" sm="12" xs="12">-->
    <b-col lg="12" md="12" sm="12" xs="12">
      <img :src="filePath" class="nImg" alt="" loading="lazy"/>
    </b-col>
    <b-col class="text-center mt-2" lg="12" md="12" sm="12" xs="12">
      <b-button :class="{'nFontButton btn-multiple-state btn-shadow': true,
                    'show-spinner': processing }" :disabled="processing" :hidden="isDeleteImageAvatar" size="xs"
                style="color: whitesmoke;font-weight: bold;"
                variant="success" @click="openUpload">
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
        <span class="label">Chọn ảnh</span>
      </b-button>
      <b-button :hidden="!isDeleteImageAvatar" class="mb-2 nFontButton" size="xs"
                style="color: whitesmoke;font-weight: bold;"
                variant="danger" @click="removeFile()">
        Xóa ảnh
      </b-button>
      <input :id="fileUploadId" class="d-none" type="file" @change="addImage">
    </b-col>
  </b-row>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";
import ndevApi from "../Api/ndevApi";

export default {
  components: {
    "v-select": vSelect
  },
  props: {
    title: {
      type: String,
      default: 'Ảnh đại diện'
    },
    fileUploadId: {
      type: String,
      default: 'file-upload-input'
    },
    sendType:'',
    sendPath:'',
  },
  watch:{
    sendType: function (val) {

      if(this.sendType === 'add'){
        this.filePath = '/assets/img/avatar/avatar.png'
      }else{
        this.filePath = this.sendPath
      }
    },
  },
  data() {
    return {
      isDeleteImageAvatar: false,
      filePath: '/assets/img/avatar/avatar.png',
      processing: false,
    };
  },
  methods: {
    openUpload() {
      document.getElementById(this.fileUploadId).click()
    },
    async addImage(e) {
      this.processing = true
      const tmpFiles = e.target.files || e.dataTransfer.files
      if (!tmpFiles.length) {
        return
      }
      const file = tmpFiles[0]
      const model = {
        files: file,
        isSecure: false,
      }
      const response = await NCoreHelper.uploadFile(this, ndevApi.UPLOAD_AVATAR, model)
      this.filePath = NCoreHelper.GetThumbnail(false, response.fileExtend, response.filePath, '128x128', this.$serverfile)
      this.isDeleteImageAvatar = true
      this.processing = false
      this.$emit('submitAvatar', response.id)
    },
    removeFile(index) {
      this.isDeleteImageAvatar = false
      this.filePath = ''
    },
  }
};
</script>

