<template>
  <b-row>
    <b-col xs="12" sm="12" md="12" class="mt-1 center">
      <b-img-lazy :src="sourceLink"
                  style="width: 100%; height: 300px;object-fit: contain;"/>
    </b-col>
    <b-colxx xxs="12" class="mt-2 center">
      <b-button class="nFontButton btn-multiple-state btn-shadow" size="xs" type="button"
                variant="dark" @click="callActionButton(4)">
        <span class="label">Xóa ảnh</span>
      </b-button>
      <b-dropdown left
                  variant="danger"
                  size="xs"
                  class="nFontButton mr-1 dropleft nButtonDropdown"
                  no-caret>
        <template slot="button-content">
            <span class="label">
              <i class="simple-icon-globe-alt"></i> Đổi ảnh</span>
        </template>
        <b-dropdown-group header="*. Dữ liệu hình ảnh từ thư viện">
          <b-dropdown-item-button @click="callActionButton(1)">
            1. Chọn từ thư viện
          </b-dropdown-item-button>
        </b-dropdown-group>
        <b-dropdown-group header="*. Dữ liệu hình ảnh từ máy tính">
          <b-dropdown-item-button @click="callActionButton(2)">
            1. Chọn từ máy tính
          </b-dropdown-item-button>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button @click="callActionButton(3)">
            2. Từ đường dẫn khác
          </b-dropdown-item-button>
        </b-dropdown-group>
      </b-dropdown>
    </b-colxx>
    <library-manager-modal ref="refModalContentAvatar_LibraryManagerModal"
                           @handlerSubmitEventModalContentImage="subEvModalContentAvatar_LibraryManagerModal"/>
    <upload-image-from-computer ref="refModalContentAvatar_UpdateImageFromComputer"
                                @handlerSubmitEvent="subEvModalContentAvatar_UpdateImageFromComputer"/>
    <upload-image-from-difference-link ref="refModalContentAvatar_UpdateImageFromDifferenceComputer"
                                       @handlerSubmitEvent="subEvModalContentAvatar_UpdateImageDifferenceFromComputer"/>
  </b-row>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import {mapActions, mapGetters} from "vuex";
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
  props: {},
  data() {
    return {
      pageId: 'modalContentImageId',
      pageTitle: 'CẬP NHẬT ẢNH ĐẠI DIỆN',
      pageData: [],
      sourceId: '',
      sourceLink: '',
      sourceTitle: '',
      sourceDescription: ''
    };
  },
  mixins: [],
  validations: {},
  methods: {
    ...mapActions(['callStoreSendLibraryModal']),
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
    async subEvModalContentAvatar_LibraryManagerModal(vData) {
      // Lấy dữ liệu từ ID trả về
      this.sourceId = vData[0].id
      this.sourceLink = vData[0].link
      this.sourceTitle = vData[0].name
      NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentAvatar_LibraryManagerModal.pageId, 0)
    },
    async subEvModalContentAvatar_UpdateImageFromComputer(vData) {
      //=========================================Call API lấy dữ liệu đường link hình ảnh===============================
      this.sourceLink = await NCoreHelper.v2executeViewFile(this, serverFileApi.SERVER_FILE_VIEW_FILE, vData.id)
      this.sourceId = vData.id
      this.sourceTitle = vData.name
      //================================================================================================================
      NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentAvatar_UpdateImageFromComputer.pageId, 0)
      this.$hideProcessing()
    },
    async subEvModalContentAvatar_UpdateImageDifferenceFromComputer(vData) {
      //=========================================Call API lấy dữ liệu đường link hình ảnh===============================
      this.sourceLink = await NCoreHelper.v2executeViewFileDifference(this, serverFileApi.SERVER_FILE_VIEW_FILE, vData.id)
      this.sourceTitle = vData.name
      this.sourceId = vData.id
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
      this.sourceLink = '/images/avatar.png'
    },
    returnValue() {
      if (this.sourceId === '') {
        return {
          id: NCoreConfig.isGuidEmpty,
          name: '',
          link: ''
        }
      }
      return {
        id: this.sourceId,
        name: this.sourceTitle,
        link: this.sourceLink
      }
    }
  },
  computed: {
    ...mapGetters(['storeSendImageAvatar'])
  },
  watch: {
    storeSendImageAvatar: {
      handler: async function (val) {
        if (val.id === NCoreConfig.isGuidEmpty) {
          this.defaultImage()
        } else {
          if (val.isLocal) {
            this.sourceLink = await NCoreHelper.v2executeViewFile(this, serverFileApi.SERVER_FILE_VIEW_FILE, val.id)
          } else {
            this.sourceLink = await NCoreHelper.v2executeViewFileDifference(this, serverFileApi.SERVER_FILE_VIEW_FILE, val.id)
          }
        }
      },
      deep: true
    }
  },
  created() {
  },
  async mounted() {

  },
};
</script>
