<template>
  <b-row>
    <b-col xs="12" sm="12" md="12" lg="12" class="mt-1">
      <b-img-lazy :src="sourceLink" style="width: 100%; height: 300px;object-fit: contain;" />
    </b-col>
    <b-col xs="12" sm="12" md="12" lg="12" class="mt-2 center">
      <b-button class="nFontButton btn-multiple-state btn-shadow" size="xs" type="button" variant="dark"
        @click="callActionButton(4)">
        <span class="label">Xóa ảnh đại diện</span>
      </b-button>
      <input id="addImageFromComputer" ref="addImageFromComputer" accept="image/png, image/gif, image/jpeg" class="d-none"
        type="file" @change="callUploadFromComputerUploadFile()">
      <b-dropdown id="ddown2" :text="'Đổi ảnh đại diện'" class="nFontButton mr-1 nButtonDropdown" split size="xs"
        @click="callUploadFromComputer" variant="danger">
        <!-- <b-dropdown-group header="*. Dữ liệu hình ảnh từ thư viện">
          <b-dropdown-item-button @click="callActionButton(1)">
            1. Chọn từ thư viện
          </b-dropdown-item-button>
        </b-dropdown-group> -->
        <b-dropdown-group header="*. Dữ liệu hình ảnh từ máy tính">
          <b-dropdown-item-button @click="callActionButton(3)">
            1. Từ đường dẫn khác
          </b-dropdown-item-button>
        </b-dropdown-group>
      </b-dropdown>
    </b-col>
    <!-- <library-manager-modal ref="refModalContentAvatar_LibraryManagerModal"
      :library-modal-id="'ModalContentAvatar_LibraryManagerModalPageId'"
      @handlerSubmitEventModalContentImage="subEvModalContentAvatar_LibraryManagerModal" /> -->
    <!-- <upload-image-from-computer ref="refModalContentAvatar_UpdateImageFromComputer"
      @handlerSubmitEvent="subEvModalContentAvatar_UpdateImageFromComputer" /> -->
    <upload-image-from-difference-link ref="refModalContentAvatar_UpdateImageFromDifferenceComputer"
      @handlerSubmitEvent="subEvModalContentAvatar_UpdateImageDifferenceFromComputer" />
  </b-row>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import { mapActions, mapGetters } from "vuex";
//import LibraryManagerModal from "@/views/app/library-manager/page/libraryManagerModal";
import UploadImageFromComputer from "@/views/app/news-content-manager/modal-content/uploadImageFromComputer";
import serverFileApi from "@/views/app/system-manager/api/serverFileApi";
import UploadImageFromDifferenceLink
  from "@/views/app/news-content-manager/modal-content/uploadImageFromDifferenceLink";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";

export default {
  components: {
    UploadImageFromDifferenceLink,
    UploadImageFromComputer,
    // LibraryManagerModal,
    NCoreSkeleton,
    NCoreButtonRun
  },
  props: {
    dataImage: {}
  },
  data() {
    return {
      pageId: 'modalContentImageId',
      pageTitle: 'LOẠI NỘI DUNG: HÌNH ẢNH',
      pageData: [],
      sourceId: '',
      sourceLink: '',
      sourceTitle: '',
      sourceDescription: '',
      uploadFromComputerUploadFileData: [],
    };
  },
  mixins: [],
  validations: {},
  methods: {
    ...mapActions(['callStoreSendLibraryModal']),
    handleInit() {
      console.log('dataImage', this.dataImage)
      this.sourceId = this.dataImage.avatarId;
      this.sourceLink = this.dataImage.avatar;
    },
    //==============================================PAGE================================================================
    async callActionButton(vFlag) {
      switch (vFlag) {
        case 1: {
          // Gọi từ thư viện
          await this.callStoreSendLibraryModal({
            groupType: 1
          })
          NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentAvatar_LibraryManagerModal.pageId, 1)
          break
        }
        case 2: {
          // Thêm hình ảnh từ máy tính
          NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentAvatar_UpdateImageFromComputer.pageId, 1)
          break
        }
        case 3: {
          // Thêm hình ảnh từ đường dẫn khác
          NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentAvatar_UpdateImageFromDifferenceComputer.pageId, 1)
          break
        }
        case 4: {
          // Xóa hình ảnh
          this.defaultImage()
          NCoreHelper.v2alertMess(this, 'Xóa hình ảnh thành công', 2)
          break
        }
      }
    },

    async returnAvatarInfo(id) {
      //const avatarInfo = await NCoreHelper.v2executeViewFileDifference(this, serverFileApi.SERVER_FILE_VIEW_FILE_LINK, id)
      // this.sourceLink = avatarInfo.isLocal
      //   ? this.cutLinkLocal(avatarInfo.link)
      //   : avatarInfo.link

      this.sourceTitle = avatarInfo.name
      this.sourceId = avatarInfo.id
      // return avatarInfo
    },
    cutLinkLocal(filePath) {
      if (filePath.includes("https")) return filePath;
      return this.$serverfile + filePath.replace(/\\/g, '/')

    },
    async subEvModalContentAvatar_UpdateImageFromComputer(vData) {
      await this.returnAvatarInfo(vData.id)
      //================================================================================================================
      NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentAvatar_UpdateImageFromComputer.pageId, 0)
      this.$hideProcessing()
    },
    async subEvModalContentAvatar_UpdateImageDifferenceFromComputer(vData) {
      //=========================================Call API lấy dữ liệu đường link hình ảnh===============================
      //await this.returnAvatarInfo(vData.id)
      console.log("vData", vData)
      this.sourceId = vData.id;
      this.sourceLink = vData.link;
      //================================================================================================================
      NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentAvatar_UpdateImageFromDifferenceComputer.pageId, 0)
      this.$hideProcessing()
    },
    //==================================================================================================================
    //==================================================SAVE-ALL========================================================
    async subEvModalContentImageBtnSave(val) {
      if (val) {
        this.$showProcessing()
        if (this.sourceLink === '') {
          NCoreHelper.v2alertMess(this, 'Không có dữ liệu hình ảnh', 1)
          this.$hideProcessing()
          return
        }
        const iValue =
          '<div class="row clearfix nContent_Img">' +
          ' <div class="col-xs-12"> <img src="' + this.sourceLink + '" alt="' + this.sourceTitle + '" /></div>' +
          ' <div class="col-xs-12 title">' + this.sourceTitle + '</div>' +
          '<div class="row clearfix nContent_Content">' +
          ' <div class="col-xs-12"> ' + this.sourceDescription + ' </div>' +
          '</div>'

        this.$emit('handlerSubmitEvent', {
          id: this.pageData.id,
          contentFlagKey: this.pageData.contentFlagKey,
          name: this.sourceTitle,
          linkSource: this.sourceLink,
          linkFull: iValue,
          content: this.sourceDescription,
          position: this.pageData.position,
        })
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageId, 0)
      }
    },
    //==================================================================================================================
    defaultImage() {
      this.sourceLink = '/images/khung_vien/newsAvatar.png'
    },
    returnValue() {
      return {
        id: this.sourceId,
        name: this.sourceTitle,
        link: this.sourceLink
      }
    },
    callUploadFromComputer() {
      document.getElementById('addImageFromComputer').click()
    },
    async callUploadFromComputerUploadFile() {
      let countFile = this.$refs.addImageFromComputer.files.length
      let formData = new FormData();
      if (countFile === 0) {
        NCoreHelper.v2alertMess(this, 'Không có dữ liệu file đính kèm', 1)
        this.processing = false
        return
      } else {
        for (let i = 0; i < countFile; i++) {
          let file = this.$refs.addImageFromComputer.files[i];
          formData.append('files[' + i + ']', file);
        }
      }
      this.$showProcessing()
      formData.append('Name', NCoreHelper.returnStringDateTime());
      formData.append('ParentId', NCoreConfig.isGuidEmpty);
      formData.append('FileType', 1);
      formData.append('VideoType', 3);

      const iResultUpload = await NCoreHelper.v2uploadFile(
        this,
        serverFileApi.SERVER_FILE_UPLOAD_FILE,
        formData)

      if (iResultUpload?.link) {
        this.sourceLink = this.cutLinkLocal(iResultUpload.link);
        this.sourceId = iResultUpload.id;
        NCoreHelper.v2alertMess(
          this,
          'Upload file thành công',
          2);
      } else {
        NCoreHelper.v2alertMess(
          this,
          'Upload file không thành công',
          1);
      }

      this.$hideProcessing()
      this.processing = false
    },
  },
  computed: {
    ...mapGetters(['storeSendImageAvatar'])
  },
  watch: {
    storeSendImageAvatar: async function (val) {
      console.log("val", val)
      if (val.id === NCoreConfig.isGuidEmpty) {
        this.defaultImage()
      } else {
        //await this.returnAvatarInfo(val.id)
      }
    },
    dataImage: {
      handler(newdataImage) {
        console.log(newdataImage)
        if (newdataImage.avatar && newdataImage.avatarId) {
          this.sourceLink = this.cutLinkLocal(newdataImage.avatar);
          this.sourceId = newdataImage.avatarId
        }
      },
      deep: true
    },

  },
  created() {
    this.handleInit();
  },
  async mounted() {
    this.handleInit();
  },
};
</script>
