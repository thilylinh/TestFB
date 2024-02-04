<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">{{ pageTitle }}</h1>
          <piaf-breadcrumb />
          <div class="separator mb-2" />
        </b-colxx>
      </b-row>
      <template>
        <b-card>
          <b-row>
            <b-colxx xxs="12">
              <label class="font-weight-700">1. Thể loại <span class="nRequired">(*)</span> </label>
            </b-colxx>
            <b-colxx xxs="12">
              <n-core-tree-select :data-combobox="comboboxFather" ref="refNewsContentEvent_TreeViewNewsGroup"
                @handlerSubmitEvent="subEvNewsContentEvent_TreeViewNewsGroup" />
            </b-colxx>
          </b-row>
          <b-row class="mt-2">
            <b-colxx xxs="12">
              <label class="font-weight-700">2. Tiêu đề bài viết <span class="nRequired">(*)</span> </label>
            </b-colxx>
            <b-colxx xxs="12">
              <b-form-input id="newsContentEvent_txtTitle" v-model="$v.form.name.$model" :state="!$v.form.name.$error"
                autocomplete="off" autofocus placeholder="Nhập tiêu đề bài viết ..." />
              <b-form-invalid-feedback v-if="!$v.form.name.required">
                Không được bỏ trống
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.name.maxLength">
                Độ dài tối đa 500 kí tự
              </b-form-invalid-feedback>
            </b-colxx>
            <b-colxx xxs="12">
              <b-form-checkbox v-model="isMinusWord" unchecked-value="not_accepted" value="accepted">
                <span class="nHover selectCombobox">Tự động thay thế từ cấm</span>
              </b-form-checkbox>
            </b-colxx>
          </b-row>
          <b-row class="mt-3">
            <b-col xs="12" sm="6" md="4" lg="3">
              <b-row>
                <b-colxx xxs="12">
                  <label class="font-weight-700">3. Ảnh đại diện</label>
                </b-colxx>
              </b-row>
              <modal-content-avatar ref="refNewsContentEvent_ModalContentAvatar" :dataImage="dataImage" />
            </b-col>
            <b-col xs="12" sm="6" md="8" lg="9">
              <b-row>
                <b-colxx xxs="12">
                  <label class="font-weight-700">4. Từ khóa Seo</label>
                </b-colxx>
                <b-colxx xxs="12">
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-button variant="primary" @click="openSeoPagingModal()">
                        <i class="simple-icon-layers" />
                      </b-button>
                    </b-input-group-prepend>
                    <b-form-input id="newsContentEvent_txtSeoKeyWord" v-model="$v.form.seoKeyword.$model"
                      :state="!$v.form.seoKeyword.$error" autocomplete="off" placeholder="Nhập từ khóa Seo ..." />
                  </b-input-group>
                </b-colxx>
              </b-row>
              <b-row class="mt-2">
                <b-colxx xxs="12">
                  <label class="font-weight-700">5. Tóm tắt bài viết </label>
                </b-colxx>
                <b-colxx xxs="12">
                  <textarea v-model="$v.form.summary.$model" rows="5" placeholder="Nhập tóm tắt bài viết"
                    class="form-control" />
                </b-colxx>
              </b-row>
              <b-row class="mt-2">
                <b-col lg="12" md="12" sm="12" xs="12">
                  <label class="font-weight-700">6. Link Tree </label>
                </b-col>
                <b-col lg="12" md="12" sm="12" xs="12">
                  <b-form-input id="menuFunctionManagerEvent_txtlinkTree" v-model="$v.form.linkTree.$model"
                    :state="!$v.form.linkTree.$error" autocomplete="off" placeholder="Nhập linkTree ..." />
                </b-col>
                <b-col lg="12" md="12" sm="12" xs="12">
                  <b-form-checkbox v-model="agreeViaCheckbox" unchecked-value="not_accepted" value="accepted">
                    <span class="nHover selectCombobox">Duyệt Via</span>
                  </b-form-checkbox>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-colxx xxs="12">
              <label class="font-weight-700">7. Nội dung bài viết <span class="nRequired">(*)</span> </label>
            </b-colxx>
            <b-colxx xxs="12" class="mt-1">
              <!--              <content-editor ref="refHtmlContent"-->
              <!--                              :data-html-editor="form.content"/>-->
              <ckeditor :editor="editor" v-model="form.content" :config="editorConfig"></ckeditor>
            </b-colxx>
          </b-row>
          <b-row class="mt-2">
            <b-colxx xxs="12">
              <n-core-button-run3 :btn-cancel="'Quay về'" :btn-save-title="'Lưu bài viết'"
                :show-btn-copy-link="showBtnCopyLink" ref="refBtnNewsContentEvent"
                @submitEvent="subEvNewsContentEvent_BtnSave" @onSaveUpdate="onSaveUpdate" @copyLink="copyLink" />
            </b-colxx>
          </b-row>
        </b-card>
      </template>
    </b-colxx>
    <news-seo-key-word-paging-model ref="refNewsContent_NewsSeoKeyWordPagingModel"
      @handlerSubmitEvent="subEvNewsContent_NewsSeoKeyWordPagingModel" />
    <n-core-date-picker ref="refNewsContent_DatePicker" @handleSubmitEvent="subEvNewsContent_DatePicker" />
    <news-content-type-combobox-model ref="refNewsContent_NewsContentTypeComboboxModel"
      @handlerSubmitEvent="subEvNewsContent_NewsContentTypeComboboxModel" />
    <!--    //===========================================NEWS-CONTENT-TYPE======================================================-->
    <!--    <modal-content-image ref="refNewsContent_ModalContentImage"-->
    <!--                         @handlerSubmitEvent="subEvNewsContent_ModalContentImage"/>-->
    <!--    <modal-content-content ref="refNewsContent_ModalContentContent"-->
    <!--                           @handlerSubmitEvent="subEvNewsContent_ModalContentImage"/>-->
    <!--    <modal-content-view ref="refNewsContent_ModalContentView"/>-->
    <!--    <modal-content-position ref="refNewsContent_ModalContentPosition"-->
    <!--                            @handlerSubmitEvent="subEvNewsContent_ModalContentPosition"/>-->
    <!--    //==================================================================================================================-->
    <!--    //================================================QUESTION==========================================================-->
    <n-core-modal-question ref="refNewsContent_NCoreModalQuestion"
      @handleSubmitEvent="subEvNewsContent_NCoreModalQuestion" />
    <!--    //==================================================================================================================-->
  </b-row>
</template>
<script>

import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import NCoreConfig from "../../../NCoreHelper/NCoreConfig";
import { maxLength, required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import Datepicker from "vuejs-datepicker";
import NCoreHtmlEditor from "@/containers/ndev-core/components/NCoreHtmlEditor";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import newsGroupApi from "@/views/app/news-content-manager/api/newsGroupApi";
import NCoreTreeSelect from "@/containers/ndev-core/components/NCoreTreeSelect";
import NCoreCombobox from "@/containers/ndev-core/components/NCoreCombobox";
import { mapActions } from "vuex";
import NewsSeoKeyWordPagingModel from "../combobox/newsSeoKeyWordPagingModel";
import NCoreDatePicker from "../../../../containers/ndev-core/components/NCoreDatePicker";
import NewsContentTypeComboboxModel from "@/views/app/news-content-manager/combobox/newsContentTypeComboboxModel";
import ModalContentImage from "@/views/app/news-content-manager/modal-content/modalContentImage";
import NCoreModalQuestion from "@/containers/ndev-core/components/NCoreModalQuestion";
import ModalContentContent from "@/views/app/news-content-manager/modal-content/modalContentContent";
import ModalContentAvatar from "@/views/app/news-content-manager/modal-content/modalContentAvatar";
import newsContentApi from "@/views/app/news-content-manager/api/newsContentApi";
import ModalContentView from "@/views/app/news-content-manager/modal-content/modalContentView";
import ModalContentPosition from "@/views/app/news-content-manager/modal-content/modalContentPosition";
import ContentEditor from "../../../../components/Editor/ContentEditor.vue";
import NCoreButtonRun3 from "@/containers/ndev-core/components/NCoreButtonRun3.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    NCoreButtonRun3,
    ContentEditor,
    ModalContentPosition,
    ModalContentView,
    ModalContentAvatar,
    ModalContentContent,
    NCoreModalQuestion,
    ModalContentImage,
    NewsContentTypeComboboxModel,
    NCoreDatePicker,
    NewsSeoKeyWordPagingModel,
    NCoreCombobox,
    NCoreTreeSelect,
    NCoreButtonRun,
    NCoreHtmlEditor,
    Datepicker,
  },
  props: {},
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Nhập dữ liệu bài viết</p>',
      editorConfig: {
        // The configuration of the editor.
      },
      pageTitle: '',
      newsGroupCombobox: '',
      comboboxFather: [],
      agreeViaCheckbox: '',
      showBtnCopyLink: '2',
      form: {
        id: '',
        name: '',
        newsGroupId: '',
        summary: '',
        content: '',
        seoKeyword: '',
        author: '',
        urlRootLink: '',
        avatarId: '',
        dateTimeStart: '',
        typeId: '',
        attackViewId: '',
        statusId: '',
        linkRoot: '',
        agreeVia: '',
        linkTree: '',
      },
      isStatusContent: NCoreConfig.checkedValue,
      newsGroupTypeReciveFromCombobox: null,
      newsGroupReciveFromCombobox: null,
      newsContentTypeData: [],
      newsContentTypeHidden: false,
      newsContentTypeNoData: NCoreConfig.noDataTemplateModal,
      isMinusWord: NCoreConfig.checkedValue,
      dataImage: null,
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      content: '',
      summary: "",
      seoKeyword: "",
      author: '',
      urlRootLink: '',
      avatarId: '',
      typeId: '',
      attackViewId: '',
      statusId: '',
      dateTimeStart: '',
      agreeVia: '',
      linkTree: '',
      name: {
        required,
        maxLength: maxLength(500)
      },
    }
  },
  methods: {
    ...mapActions([
      'callStoreSendCombobox',
      'callStoreSendTreeViewSelect',
      'callStoreSendNewsContent',
      'callStoreCrudQuestion',
      'callStoreImageResizeCombobox',
      'callStoreSendLibraryModal',
      'callStoreSendImageAvatar',
      'callStoreSendViewContent'
    ]),
    async subEvNewsContentEvent_BtnSave(isSave) {
      if (isSave === true) {
        //=================================================Loại nhóm tin==============================================
        // if (this.newsGroupTypeReciveFromCombobox === null) {
        //   NCoreHelper.v2alertMess(this, 'Không có dữ liệu loại nhóm tin', 1)
        //   return
        // }
        //============================================================================================================
        //=================================================Tiêu đề bài viết==============================================
        if (this.form.name === '') {
          NCoreHelper.v2alertMess(this, 'Không có dữ liệu tiêu đề bài viết', 1)
          return
        }
        const iContent = this.form.content
        if (iContent === '') {
          NCoreHelper.v2alertMess(this, 'Không có dữ liệu nội dung bài viết', 1)
          return
        }
        //============================================================================================================
        //==================================================Loại tin==================================================
        if (this.newsGroupReciveFromCombobox === null) {
          NCoreHelper.v2alertMess(this, 'Không có dữ liệu nhóm bài viết', 1)
          return
        }
        //============================================================================================================
        // //==================================================Nội dung==================================================
        // if (this.newsContentTypeData.length === 0) {
        //   NCoreHelper.v2alertMess(this, 'Không có dữ liệu bài viết', 1)
        //   return
        // }
        // //============================================================================================================
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$showProcessing()
          const iAvatar = this.$refs.refNewsContentEvent_ModalContentAvatar.returnValue()
          console.log("iAvatar", iAvatar)
          // let iContent = ''
          // for (let i = 0; i < this.newsContentTypeData.length; i++) {
          //   if (iContent === '') {
          //     iContent = this.newsContentTypeData[i].linkFull;
          //   } else {
          //     iContent = iContent + '' + this.newsContentTypeData[i].linkFull;
          //   }
          //   iContent = iContent + '<div class="row clearfix Nmt-10px"></div>'
          // }

          const dataSend = {
            name: this.form.name,
            summary: this.form.summary,
            content: iContent,
            author: this.form.author,
            urlRootLink: this.form.urlRootLink,
            newsGroupId: this.newsGroupReciveFromCombobox.dataContentId,
            newsGroupTypeId: NCoreConfig.isGuidEmpty, //this.newsGroupTypeReciveFromCombobox.id,
            seoKeyword: this.form.seoKeyword,
            agreeVia: this.agreeViaCheckbox === NCoreConfig.checkedValue,
            linkTree: this.form.linkTree,
            avatarId: iAvatar.id,
            avatarLink: iAvatar.link,
            dateTimeStart: Date.now().toLocaleString(),
            attackViewId: 0,
            statusId: this.isStatusContent === NCoreConfig.checkedValue ? 3 : 4,
            newsContentAttackModels: null,
            newsContentContentModels: this.newsContentTypeData,
            id: NCoreConfig.isGuidEmpty
          }

          const iResult = await NCoreHelper.v2executePOST(
            this,
            newsContentApi.NEWS_CONTENT_CREATE,
            dataSend
          )
          if (iResult) {
            NCoreHelper.v2alertMess(
              this,
              NCoreHelper.returnMessage(this.$route.params.id === NCoreConfig.isGuidEmpty ? 1 : 2, true, "bài viết"),
              iResult ? 2 : 3
            );
            this.$hideProcessing()
            await this.$router.push({
              name: 'news-content-manager-news-content'
            })
          } else {
            NCoreHelper.v2alertMess(
              this,
              NCoreHelper.returnMessage(this.$route.params.id === NCoreConfig.isGuidEmpty ? 1 : 2, false, "bài viết"),
              iResult ? 1 : 3
            );
            this.$hideProcessing()
          }
        }
      } else {
        await this.$router.push({
          name: 'news-content-manager-news-content'
        })
      }
    },
    async onSaveUpdate() {
      //=================================================Tiêu đề bài viết==============================================
      if (this.form.name === '') {
        NCoreHelper.v2alertMess(this, 'Không có dữ liệu tiêu đề bài viết', 1)
        return
      }
      const iContent = this.form.content
      if (iContent === '') {
        NCoreHelper.v2alertMess(this, 'Không có dữ liệu nội dung bài viết', 1)
        return
      }
      //============================================================================================================
      //==================================================Loại tin==================================================
      if (this.newsGroupReciveFromCombobox === null) {
        NCoreHelper.v2alertMess(this, 'Không có dữ liệu nhóm bài viết', 1)
        return
      }
      //============================================================================================================
      this.$v.$touch();
      this.$v.form.$touch();
      if (!this.$v.form.$anyError) {
        this.$showProcessing()
        const iAvatar = this.$refs.refNewsContentEvent_ModalContentAvatar.returnValue()
        console.log("iAvatar", iAvatar)
        const dataSend = {
          name: this.form.name,
          summary: this.form.summary,
          content: iContent,
          author: this.form.author,
          urlRootLink: this.form.urlRootLink,
          newsGroupId: this.newsGroupReciveFromCombobox.dataContentId,
          newsGroupTypeId: NCoreConfig.isGuidEmpty,
          seoKeyword: this.form.seoKeyword,
          agreeVia: this.agreeViaCheckbox === NCoreConfig.checkedValue,
          linkTree: this.form.linkTree,
          avatarId: iAvatar.id,
          avatarLink: iAvatar.link,
          dateTimeStart: this.form.dateTimeStart,
          attackViewId: 0,
          statusId: this.isStatusContent === NCoreConfig.checkedValue ? 3 : 4,
          newsContentAttackModels: null,
          newsContentContentModels: this.newsContentTypeData,
          id: NCoreConfig.isGuidEmpty
        }

        const iResult = await NCoreHelper.v2executePOST(
          this, newsContentApi.NEWS_CONTENT_CREATE, dataSend);
        if (iResult) {
          NCoreHelper.v2alertMess(
            this,
            NCoreHelper.returnMessage(this.$route.params.id === NCoreConfig.isGuidEmpty ? 1 : 2, true, "bài viết"),
            iResult ? 2 : 3
          );
          this.$hideProcessing()
          this.showBtnCopyLink = '1'
          await this.$router.push({
            name: 'news-content-manager-news-content-event',
            params: {
              id: iResult.id
            }
          })
        } else {
          NCoreHelper.v2alertMess(
            this,
            NCoreHelper.returnMessage(this.$route.params.id === NCoreConfig.isGuidEmpty ? 1 : 2, false, "bài viết"),
            iResult ? 1 : 3
          );
          this.$hideProcessing()
        }
      }
    },
    async copyLink() {
      const result = await NCoreHelper.v2executeGET(this, newsContentApi.COPY_LINK, { id: this.$route.params.id });
      const textarea = document.createElement('textarea');
      // textarea.value = val.domain + '' + val.metaName + '-' + val.metaKey
      textarea.value = result[0].name
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      NCoreHelper.v2alertMess(this, 'Sao chép link thành công', 2)
    },
    returnDeadLine() {
      return NCoreHelper.returnCreateNews()
    },
    //===================ComboboxNewsGroupType===============================
    async subEvNewsContentEvent_ComboboxNewsGroupType(val) {
      this.$showLoadingRunFunctionInModal()
      await this.callTreeViewSelect(
        await NCoreHelper.v2executeGET(this, newsGroupApi.NEWS_GROUP_TREE_VIEW_MODAL, {
          newsGroupTypeId: val.id,
          isAll: false
        }), null)
      this.newsGroupTypeReciveFromCombobox = val
      this.$hideLoadingRunFunctionInModal()
    },
    async callTreeViewSelect(vData, vDataSelect) {
      await this.callStoreSendTreeViewSelect({
        id: this.$refs.refNewsContentEvent_TreeViewNewsGroup.pageId,
        data: vData,
        dataSelect: vDataSelect,
        noChildrenText: 'Không có dữ liệu nhóm tin con',
        messageNoChoice: 'Chọn dữ liệu nhóm tin cha'
      });
    },
    async subEvNewsContentEvent_TreeViewNewsGroup(val) {
      console.log(val)
      this.newsGroupReciveFromCombobox = val
    },
    //==================================================================================================================
    //===================Paging-Seo-KeyWord-Modal============================
    async openSeoPagingModal() {
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refNewsContent_NewsSeoKeyWordPagingModel.pageId,
        1
      )
    },
    async subEvNewsContent_NewsSeoKeyWordPagingModel(data) {
      // => Gán dữ liệu vào trường SEO KEY WORD
      let iValue = ''
      if (this.form.seoKeyword === '') {
        iValue = data.join(',')
      } else {
        const iDataOld = this.form.seoKeyword.split(',')
        const iDataNew = iDataOld + ',' + data
        const iArray = iDataNew.split(',')
        iValue = [...new Set(iArray)].join(',');
      }
      this.form.seoKeyword = iValue
      this.$hideProcessing()
    },
    //==================================================================================================================
    //================================================Lấy dữ liệu DateTime-Picker=======================================
    async callDateTimePickerModal() {
      this.$refs.refNewsContent_DatePicker.dateTimeData = this.form.dateTimeStart
      NCoreHelper.v2modalShowHide(this, this.$refs.refNewsContent_DatePicker.pageId, 1)
    },
    async subEvNewsContent_DatePicker(val) {
      this.form.dateTimeStart = val
      NCoreHelper.v2modalShowHide(this, this.$refs.refNewsContent_DatePicker.pageId, 0)
    },
    //==================================================================================================================
    //==========================================NewsContentTypeCombobox=================================================
    returnNewsContentTypeName(val) {
      return NCoreHelper.returnNewsContentTypeName(val)
    },
    async callNewsContentTypeComboboxModel() {
      NCoreHelper.v2modalShowHide(this, this.$refs.refNewsContent_NewsContentTypeComboboxModel.pageId, 1)
    },
    async subEvNewsContent_NewsContentTypeComboboxModel(val) {
      let pageModalId = ''
      switch (val.id) {
        case 1: {
          pageModalId = this.$refs.refNewsContent_ModalContentImage.pageId
          break
        }
      }
      await this.callStoreSendNewsContent({
        id: val.isAddNew ? NCoreHelper.CreateGuid() : val.data.id,
        name: val.isAddNew ? '' : val.data.name,
        linkSource: val.isAddNew ? '' : val.data.linkSource,
        linkFull: val.isAddNew ? '' : val.data.linkFull,
        content: val.isAddNew ? '' : val.data.content,
        config: val.isAddNew ? 0 : val.data.config,
        contentFlagKey: val.id,
        position: val.isAddNew ? 0 : val.data.position,
        isAddNew: val.isAddNew,
        pageModalId: pageModalId
      })
      await this.callModalContent(val.id, 1)
      this.$hideProcessing()
      NCoreHelper.v2modalShowHide(this, this.$refs.refNewsContent_NewsContentTypeComboboxModel.pageId, 0)
    },
    async callModalContent(key, flagShow) {
      switch (key) {
        case 1: {
          // Hình ảnh
          NCoreHelper.v2modalShowHide(this, this.$refs.refNewsContent_ModalContentImage.pageId, flagShow)
          break
        }
        case 2: {
          // Bài viết
          NCoreHelper.v2modalShowHide(this, this.$refs.refNewsContent_ModalContentContent.pageId, flagShow)
          break
        }
      }
    },
    async callNewsContentTypeComboboxModelUpdate(data) {
      await this.subEvNewsContent_NewsContentTypeComboboxModel({
        id: data.contentFlagKey,
        name: data.name,
        isAddNew: false,
        data: {
          id: data.id,
          name: data.name,
          linkSource: data.linkSource,
          linkFull: data.linkFull,
          content: data.content,
          config: data.config,
          contentFlagKey: data.contentFlagKey,
          position: data.position,
        }
      })
    },
    async callNewsContentTypeComboboxModelDelete(data) {
      await this.callStoreCrudQuestion({
        id: this.$refs.refNewsContent_NCoreModalQuestion.idModal,
        tableId: 0,
        contentId: data.id,
        flagKey: 0,
        titleOne: 'BẠN CHẮC CHẮN MUỐN XÓA DỮ LIỆU',
        titleTwo: data.name
      })
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refNewsContent_NCoreModalQuestion.idModal,
        1
      );
    },
    async subEvNewsContent_ModalContentImage(val) {
      let dataSave = {
        id: val.id,
        contentFlagKey: val.contentFlagKey,
        name: val.name,
        linkSource: val.linkSource,
        linkFull: val.linkFull,
        content: val.content,
        config: val.config,
        position: 1,
      }
      if (this.newsContentTypeData.length === 0) {
        this.newsContentTypeData.push(dataSave)
      } else {
        const iCheck = this.newsContentTypeData.find(o => o.id === val.id)
        if (iCheck === undefined || iCheck === null) {
          // Chưa có
          const iMax = Math.max(...this.newsContentTypeData.map(o => o.position))
          dataSave.position = iMax + 1
          this.newsContentTypeData.push(dataSave)
        } else {
          // Đã có
          iCheck.position = val.position
          iCheck.contentFlagKey = val.contentFlagKey
          iCheck.name = val.name
          iCheck.linkSource = val.linkSource
          iCheck.linkFull = val.linkFull
          iCheck.content = val.content
          iCheck.config = val.config
        }
      }
      this.newsContentTypeHidden = true
      await this.callModalContent(val.contentFlagKey, 0)
      this.$hideProcessing()
    },
    async subEvNewsContent_NCoreModalQuestion(val) {
      if (val.result) {
        if (val.data.flagKey === 5000) {
          //================================PHỤC HỒI DỮ LIỆU CONTENT TỪ LOG=============================================
          const iLogContentValue = JSON.parse(localStorage.getItem(NCoreConfig.localLogContent))
          if (iLogContentValue !== null || iLogContentValue !== undefined) {
            this.form.content = iLogContentValue.content
            this.form.summary = iLogContentValue.summary
            this.form.seoKeyword = iLogContentValue.seoKeyword
            this.form.author = iLogContentValue.author
            this.form.urlRootLink = iLogContentValue.urlRootLink
            this.form.avatarId = iLogContentValue.avatarId
            this.form.dateTimeStart = iLogContentValue.dateTimeStart
            this.form.typeId = iLogContentValue.typeId
            this.form.attackViewId = iLogContentValue.attackViewId
            this.form.statusId = iLogContentValue.statusId
            this.form.linkRoot = iLogContentValue.linkRoot
            this.form.name = iLogContentValue.name
            this.form.id = iLogContentValue.id
            this.newsContentTypeData = JSON.parse(iLogContentValue.newsContentTypeData)
          }
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNewsContent_NCoreModalQuestion.idModal,
            0
          );
          NCoreHelper.v2alertMess(this, 'Phục hồi dữ liệu thành công', 2)
          //============================================================================================================
        } else {
          // XÓa dữ liệu trong this.newsContentTypeData
          // const iCheck = this.newsContentTypeData.find(o => o.id === val.data.contentId)
          this.newsContentTypeData = this.newsContentTypeData.filter(e => e.id !== val.data.contentId)
          this.newsContentTypeHidden = this.newsContentTypeData.length > 0
          //======================================Cập nhật lại position=================================================
          let iNumberOfPosition = 1
          for (let i = 0; i < this.newsContentTypeData.length; i++) {
            this.newsContentTypeData[i].position = iNumberOfPosition++
          }
          //============================================================================================================
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNewsContent_NCoreModalQuestion.idModal,
            0
          );
          NCoreHelper.v2alertMess(this, 'Xử lý dữ liệu thành công', 1)
        }
        this.$hideProcessing()
      }
    },
    async callNewsContentTypeComboboxModelView(val) {
      await this.callStoreSendViewContent({
        id: this.$refs.refNewsContent_ModalContentView.pageId,
        isNewsContent: true,
        data: val.linkFull,
        name: val.name
      })
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refNewsContent_ModalContentView.pageId,
        1
      );
    },
    async callNewsContentTypeComboboxModelPosition() {
      localStorage.setItem('NewsContentPositionDataTemp', JSON.stringify(this.newsContentTypeData))
      await this.callStoreSendViewContent({
        id: this.$refs.refNewsContent_ModalContentPosition.pageId,
        data: this.newsContentTypeData
      })
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refNewsContent_ModalContentPosition.pageId,
        1
      );
    },
    async subEvNewsContent_ModalContentPosition(vData) {
      this.newsContentTypeData = []
      if (vData.result === true) {
        this.newsContentTypeData = vData.data
      } else {
        this.newsContentTypeData = JSON.parse(localStorage.getItem('NewsContentPositionDataTemp'))
      }
      NCoreHelper.v2modalShowHide(
        this,
        this.$refs.refNewsContent_ModalContentPosition.pageId,
        0
      );
    },
    //==================================================================================================================
    //=============================================Ghi log bài viết=====================================================
    async autoSaveLogContent() {
      this.form.id = this.$route.params.id
      this.form.newsContentTypeData = JSON.stringify(this.newsContentTypeData)
      localStorage.setItem(NCoreConfig.localLogContent, JSON.stringify(this.form))
    },
    //==================================================================================================================
    get_nodes(parent, node_name) {
      let result = [];
      for (let child of parent.childNodes) {
        console.log('=========child=========')
        console.log(child)
        if (node_name) {
          //find specific nodeName
          if (child.nodeName === node_name) {
            result = [...result, child];
          }
        } else {
          result = [...result, child];
        }
        result = [...result, ...this.get_nodes(child, node_name)];
      }
      return result;
    },
    is_sponsor_node(node) {
      if (node == null && node.innerText == null) return false;

      try {
        let words = [
          'read more:',
          'see also:',
          'related:',
          'click here',
          'recommended video',
          'recommended article',
          'anchor:'

        ];
        let node_names = ['P', 'A', 'U', 'SPAN', 'STRONG', 'B'];
        return words.some(el => node.innerText.trim().toLowerCase().startsWith(el))
          && node_names.includes(node.nodeName);
      } catch (error) {
        return false;
      }
    },
    transform(text) {
      let another_phrases = [
        '(open in new tab)', 'open in new tab', 'open in a new tab',
        '(opens in new tab)', 'opens in new tab', 'opens in a new tab',
        '()',
      ];
      for (let phrase of another_phrases) {
        text = text.split(phrase).join('');
      }

      // for (let pair of replaces) {
      //   text = text.split(pair[0]).join(pair[1])
      // }

      return text;
    },
    formatContent(content) {
      let parser = new DOMParser()
      let document = parser.parseFromString(content, 'text/html');

      const remove_internal_links = true
      const remove_external_links = true
      // const listNodeName=['A','href','U','IFRAME','#text','AMP-IMG']
      let a_nodes = this.get_nodes(document.body, 'A');
      for (let node of a_nodes) {
        try {
          console.log(node)
          if (remove_internal_links && node.href.includes(window.location.host)) {
            node.removeAttribute('href');
          }
          if (remove_external_links) {
            node.removeAttribute('href');
          }

          if (node.querySelector('img') != null) {
            node.replaceWith(node.querySelector('img'));
            continue;
          }

          if (node.getAttribute('href') == null) {
            let text = node.innerText;
            node.replaceWith(text || '');
          }
        } catch (error) {
        }
      }

      for (let node of this.get_nodes(document.body, 'U')) {
        try {
          let text = node.innerText;
          node.replaceWith(text || '');
        } catch (error) {
        }
      }

      let iframes = this.get_nodes(document.body, 'IFRAME');
      for (let node of iframes) {
        try {

          let width = node.width || node.style.width;
          let height = node.height || node.style.height;
          node.removeAttribute('style');
          node.removeAttribute('allow');

          if (width == null || width === '' || height == null || height === '') {
            if (node.src.includes('youtube')) {
              width = 560;
              height = 315;
            } else if (node.src.includes('twitter')) {
              width = 400;
              height = 400;
            }
          }
          if (node.src.includes('youtube')) {
            width = 560;
            height = 315;
          }
          node.setAttribute('width', width);
          node.setAttribute('height', height);
          node.setAttribute('allowFullScreen', '');
          if (node.getAttribute('src') == null) {
            node.remove();
          }
        } catch (error) {
        }
      }

      let text_nodes = this.get_nodes(document.body, '#text');
      for (let node of text_nodes) {
        try {
          node.textContent = this.transform(node.textContent);
        } catch (error) {
        }
      }

      for (let node of this.get_nodes(document.body, 'AMP-IMG')) {
        try {
          let img = document.createElement('img');
          img.classList.add('alignnone', 'size-large');
          img.src = node.getAttribute('src');
          node.replaceWith(img)
        } catch (error) {
        }
      }

      for (let node of document.querySelectorAll('picture source')) {
        // node.remove();
      }

      for (let node of this.get_nodes(document.body, 'svg')) {
        try {
          node.remove();
        } catch (error) {
        }
      }

      for (let node of this.get_nodes(document.body, 'DIV')) {
        try {
          if (
            node.querySelector('iframe') != null
            || node.querySelector('img') != null
            || node.querySelector('video') != null
          ) continue;
          if (node.innerText != null && node.innerText.trim() !== '') continue;
          node.remove();
        } catch (error) {
        }
      }
      for (let node of this.get_nodes(document.body, 'SECTION')) {
        try {
          if (
            node.querySelector('iframe') != null
            || node.querySelector('img') != null
            || node.querySelector('video') != null
          ) continue;
          if (node.innerText != null && node.innerText.trim() !== '') continue;
          node.remove();
        } catch (error) {
        }
      }
      for (let node of this.get_nodes(document.body, 'P')) {
        try {
          // console.log('===================P=====================')
          // console.log(node.innerText.trim())
          // console.log('===================P=====================')
          if (
            node.querySelector('iframe') != null
            || node.querySelector('img') != null
            || node.querySelector('video') != null
          ) continue;
          if (node.innerText != null && node.innerText.trim() !== '') continue;
          node.remove();
        } catch (error) {
        }
      }

      for (let node of this.get_nodes(document.body, 'IMG')) {
        try {
          if (node.getAttribute('width') == 0) {
            node.removeAttribute('width');
          }
          if (node.getAttribute('height') == 0) {
            node.removeAttribute('height');
          }
          node.removeAttribute('alt');
          if (node.hasAttribute('src')) {
            // node.removeAttribute('srcset');
          }

        } catch (error) {
        }
      }

      for (let node of this.get_nodes(document.body, 'VIDEO')) {
        try {
          if (node.src == null) {
            node.remove();
          }

        } catch (error) {
        }
      }

      let all_nodes = this.get_nodes(document.body, null);
      for (let node of all_nodes) {
        try {
          if (typeof node['removeAttribute'] === 'function' && node.getAttribute('keep-attrs') == null) {
            node.removeAttribute('id');
            node.removeAttribute('class');
            node.removeAttribute('style');
          }
          if (node.src != null) {
            node.src = node.src;
          }
          if (this.is_sponsor_node(node)) {
            node.remove();
            continue;
          }

          if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.nodeName)) {
            node.remove();
            continue;
          }
        } catch (error) {
        }
      }

      return document.body.innerHTML;
    },
  },
  computed: {},
  watch: {},
  async created() {
    this.newsGroupTypeId = localStorage.getItem('newsGroupTypeCombobox')
    setInterval(() => this.autoSaveLogContent(), 30000);
  },
  async mounted() {
    this.$showAllPageLoading()
    let urlLink = localStorage.getItem('urlLink')
    const result = await NCoreHelper.v2executeGET(this, newsContentApi.READ_LINK, {
      id: urlLink
    })

    console.log("image", result)
    //this.form.content = this.formatContent(result.body)
    this.dataImage = {
      avatarId: result.imageId,
      avatar: result.imageLink,
    }
    this.form.content = result.body
    this.pageTitle = "Thêm mới bài viết từ link"
    this.form.newsGroupId = NCoreConfig.isGuidEmpty //null
    this.form.dateTimeStart = this.returnDeadLine();
    this.form.author = JSON.parse(localStorage.getItem(NCoreConfig.userData)).fullName;
    await this.callStoreSendImageAvatar({
      id: result.image
    })
    this.form.name = result.title
    this.agreeViaCheckbox = NCoreConfig.uncheckedValue
    this.showBtnCopyLink = '2'
    await this.callTreeViewSelect(
      await NCoreHelper.v2executeGET(this, newsGroupApi.NEWS_GROUP_TREE_VIEW_MODAL, {
        newsGroupTypeId: NCoreConfig.isGuidEmpty,
        isAll: false
      }), null)
    this.$hideAllPageLoading()
  },
  //====================================================================================================================
};
</script>
