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
           size="lg"
           @shown="callOpenModal()"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12" class="center">
          <b-button class="nFontButton btn-multiple-state btn-shadow mr-1"
                    size="xs"
                    type="button"
                    variant="danger"
                    @click="callActionButton(1)">
            <span class="label"><i class="simple-icon-organization"></i> Chọn từ thư viện</span>
          </b-button>
          <b-dropdown left
                      variant="success"
                      size="xs"
                      class="nFontButton mr-1 dropleft nButtonDropdown"
                      no-caret>
            <template slot="button-content">
              <span class="label"><i class="simple-icon-cloud-upload"></i> Upload dữ liệu</span>
            </template>
            <b-dropdown-item-button @click="callActionButton(2)">
              1. Thêm từ máy tính
            </b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button @click="callActionButton(3)">
              2. Thêm từ đường dẫn khác
            </b-dropdown-item-button>
          </b-dropdown>
          <b-button class="nFontButton btn-multiple-state btn-shadow mr-1"
                    size="xs"
                    type="button"
                    variant="primary"
                    @click="callActionButton(4)"
                    v-if="sourceLink!==''">
            <span class="label"><i class="simple-icon-pencil"></i> Đổi tên ảnh</span>
          </b-button>
          <b-button class="nFontButton btn-multiple-state btn-shadow mr-1"
                    size="xs"
                    type="button"
                    variant="dark"
                    @click="callActionButton(5)"
                    v-if="sourceLink!==''">
            <span class="label"><i class="simple-icon-social-soundcloud"></i> Xóa tên ảnh</span>
          </b-button>
          <b-button class="nFontButton btn-multiple-state btn-shadow mr-1"
                    size="xs"
                    type="button"
                    variant="default"
                    @click="callActionButton(6)"
                    v-if="sourceLink!==''">
            <span class="label"><i class="simple-icon-social-foursqare"></i> Ghi chú/Mô tả</span>
          </b-button>
        </b-colxx>
        <b-colxx xxs="12" class="mt-2 center">
          <b-img-lazy :src="sourceLink" class="NImage"/>
        </b-colxx>
        <b-colxx xxs="12" class="mt-2 center nFontBold">
          {{ sourceTitle }}
        </b-colxx>
        <b-colxx xxs="12" class="mt-2 center" style="font-weight: normal; font-style: italic;">
          {{ sourceDescription }}
        </b-colxx>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         ref="refModalContentImageBtnSave"
                         @submitEvent="subEvModalContentImageBtnSave"/>
      <library-manager-modal ref="refModalContentImage_LibraryManagerModal"
                             @handlerSubmitEventModalContentImage="subEvModalContentImage_LibraryManagerModal"/>
      <update-image-name ref="refModalContentImage_UpdateImageName"
                         :name-file="sourceTitle"
                         @handlerSubmitEvent="subEvModalContentImage_UpdateImageName"/>
      <update-image-description ref="refModalContentImage_UpdateImageDescription"
                                :name-file="sourceDescription"
                                @handlerSubmitEvent="subEvModalContentImage_UpdateImageDescription"/>
      <upload-image-from-computer ref="refModalContentImage_UpdateImageFromComputer"
                                  @handlerSubmitEvent="subEvModalContentImage_UpdateImageFromComputer"/>
      <upload-image-from-difference-link ref="refModalContentImage_UpdateImageFromDifferenceComputer"
                                         @handlerSubmitEvent="subEvModalContentImage_UpdateImageDifferenceFromComputer"/>
    </b-form>
  </b-modal>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import {mapActions, mapGetters} from "vuex";
//import LibraryManagerModal from "@/views/app/library-manager/page/libraryManagerModal";
import UpdateImageName from "@/views/app/news-content-manager/modal-content/updateImageName";
import UploadImageFromComputer from "@/views/app/news-content-manager/modal-content/uploadImageFromComputer";
import serverFileApi from "@/views/app/system-manager/api/serverFileApi";
import UploadImageFromDifferenceLink
  from "@/views/app/news-content-manager/modal-content/uploadImageFromDifferenceLink";
import UpdateImageDescription from "@/views/app/news-content-manager/modal-content/updateImageDescription";

export default {
  components: {
    UpdateImageDescription,
    UploadImageFromDifferenceLink,
    UploadImageFromComputer,
    UpdateImageName,
    // LibraryManagerModal,
    NCoreSkeleton,
    NCoreButtonRun
  },
  props: {},
  data() {
    return {
      pageId: 'modalContentImageId',
      pageTitle: 'LOẠI NỘI DUNG: HÌNH ẢNH',
      pageData: [],
      sourceLink: '',
      sourceTitle: '',
      sourceDescription: '',
    };
  },
  mixins: [],
  validations: {},
  methods: {
    ...mapActions(['callStoreSendLibraryModal']),
    //==============================================PAGE================================================================
    async callOpenModal() {
      const iDataReceive = this.$store.state.storeCrud.storeSendNewsContent
      if (iDataReceive.pageModalId === this.pageId) {
        this.pageData = iDataReceive
        if (iDataReceive.isAddNew === false) {
          this.sourceLink = iDataReceive.linkSource
          this.sourceTitle = iDataReceive.name
          this.sourceDescription = iDataReceive.content
        } else {
          await this.resetStateModal()
        }
      }
    },
    async resetStateModal() {
      this.sourceLink = ''
      this.sourceTitle = ''
      this.sourceDescription = ''
    },
    async callActionButton(vFlag) {
      switch (vFlag) {
        case 1: {
          // Gọi từ thư viện
          await this.callStoreSendLibraryModal({
            groupType: 1
          })
          NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentImage_LibraryManagerModal.pageId, 1)
          break
        }
        case 2: {
          // Thêm hình ảnh từ máy tính
          NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentImage_UpdateImageFromComputer.pageId, 1)
          break
        }
        case 3: {
          // Thêm hình ảnh từ đường dẫn khác
          NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentImage_UpdateImageFromDifferenceComputer.pageId, 1)
          break
        }
        case 4: {
          // Đổi tên
          NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentImage_UpdateImageName.pageId, 1)
          break
        }
        case 5: {
          // Xóa tên
          this.sourceTitle = ''
          NCoreHelper.v2alertMess(this, 'Xóa tên file thành công', 2)
          break
        }
        case 6: {
          // Ghi chú/Mô tả
          NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentImage_UpdateImageDescription.pageId, 1)
          break
        }
      }
    },
    async subEvModalContentImage_LibraryManagerModal(vData) {
      // Lấy dữ liệu từ ID trả về
      this.sourceLink = vData[0].link
      this.sourceTitle = vData[0].name
      NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentImage_LibraryManagerModal.pageId, 0)
    },
    subEvModalContentImage_UpdateImageName(vData) {
      this.sourceTitle = vData.name
      NCoreHelper.v2alertMess(this, 'Đổi tên file thành công', 2)
      NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentImage_UpdateImageName.pageId, 0)
      this.$hideProcessing()
    },
    subEvModalContentImage_UpdateImageDescription(vData) {
      this.sourceDescription = vData.value
      NCoreHelper.v2alertMess(this, 'Ghi chú/Mô tả thành công', 2)
      NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentImage_UpdateImageDescription.pageId, 0)
      this.$hideProcessing()
    },
    async subEvModalContentImage_UpdateImageFromComputer(vData) {
      //=========================================Call API lấy dữ liệu đường link hình ảnh===============================
      this.sourceLink = await NCoreHelper.v2executeViewFile(this, serverFileApi.SERVER_FILE_VIEW_FILE, vData.id)
      this.sourceTitle = vData.name
      //================================================================================================================
      NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentImage_UpdateImageFromComputer.pageId, 0)
      this.$hideProcessing()
    },
    async subEvModalContentImage_UpdateImageDifferenceFromComputer(vData) {
      //=========================================Call API lấy dữ liệu đường link hình ảnh===============================
      this.sourceLink = await NCoreHelper.v2executeViewFileDifference(this, serverFileApi.SERVER_FILE_VIEW_FILE, vData.id)
      this.sourceTitle = vData.name
      //================================================================================================================
      NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentImage_UpdateImageFromDifferenceComputer.pageId, 0)
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
    }
    //==================================================================================================================
  },
  computed: {
    ...mapGetters(['storeSendNewsContent'])
  },
  watch: {},
  created() {
  },
  async mounted() {

  },
};
</script>
