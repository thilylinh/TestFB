<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">{{ pageTitle }}</h1>
          <piaf-breadcrumb/>
          <div class="separator mb-2"/>
        </b-colxx>
      </b-row>
      <template>
        <b-card>
          <b-row>
            <b-colxx xxs="12">
              <label class="font-weight-700">1. Thể loại <span class="nRequired">(*)</span> </label>
            </b-colxx>
            <b-colxx xxs="12">
              <n-core-tree-select :data-combobox="comboboxFather"
                                  ref="refNewsContentEvent_TreeViewNewsGroup"
                                  @handlerSubmitEvent="subEvNewsContentEvent_TreeViewNewsGroup"/>
            </b-colxx>
          </b-row>
          <b-row class="mt-2">
            <b-colxx xxs="12">
              <label class="font-weight-700">2. Tiêu đề bài viết <span class="nRequired">(*)</span> </label>
            </b-colxx>
            <b-colxx xxs="12">
              <b-form-input id="newsContentEvent_txtTitle"
                            v-model="$v.form.name.$model"
                            :state="!$v.form.name.$error"
                            autocomplete="off"
                            autofocus
                            placeholder="Nhập tiêu đề bài viết ..."/>
              <b-form-invalid-feedback v-if="!$v.form.name.required">
                Không được bỏ trống
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.name.maxLength">
                Độ dài tối đa 500 kí tự
              </b-form-invalid-feedback>
            </b-colxx>
            <b-colxx xxs="12">
              <b-form-checkbox v-model="isMinusWord"
                               unchecked-value="not_accepted"
                               value="accepted">
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
              <modal-content-avatar ref="refNewsContentEvent_ModalContentAvatar" :dataImage="form"/>
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
                        <i class="simple-icon-layers"/>
                      </b-button>
                    </b-input-group-prepend>
                    <b-form-input id="newsContentEvent_txtSeoKeyWord"
                                  v-model="$v.form.seoKeyword.$model"
                                  :state="!$v.form.seoKeyword.$error"
                                  autocomplete="off"
                                  placeholder="Nhập từ khóa Seo ..."/>
                  </b-input-group>
                </b-colxx>
              </b-row>
              <b-row class="mt-2">
                <b-colxx xxs="12">
                  <label class="font-weight-700">5. Tóm tắt bài viết </label>
                </b-colxx>
                <b-colxx xxs="12">
                  <textarea v-model="$v.form.summary.$model" rows="5" placeholder="Nhập tóm tắt bài viết"
                            class="form-control"/>
                </b-colxx>
              </b-row>
              <b-row class="mt-2">
                <b-col lg="12" md="12" sm="12" xs="12">
                  <label class="font-weight-700">6. Link rút gọn </label>
                </b-col>
                <b-col lg="12" md="12" sm="12" xs="12">
                  <b-form-input id="menuFunctionManagerEvent_txtlinkTree"
                                v-model="$v.form.linkTree.$model"
                                :state="!$v.form.linkTree.$error"
                                autocomplete="off"
                                placeholder="Nhập link rút gọn ..."/>
                </b-col>
                <b-col lg="12" md="12" sm="12" xs="12">
                  <b-form-checkbox v-model="agreeViaCheckbox"
                                   unchecked-value="not_accepted"
                                   value="accepted">
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
              <ckeditor :editor="editor" v-model="form.content" :config="editorConfig"></ckeditor>
            </b-colxx>
          </b-row>
          <b-row class="mt-2">
            <b-colxx xxs="12">
              <n-core-button-run3 :btn-cancel="'Quay về'"
                                  :btn-save-title="'Lưu bài viết'"
                                  :show-btn-copy-link="showBtnCopyLink"
                                  ref="refBtnNewsContentEvent"
                                  @submitEvent="subEvNewsContentEvent_BtnSave"
                                  @onSaveUpdate="onSaveUpdate"
                                  @copyLink="copyLink"/>
            </b-colxx>
          </b-row>
        </b-card>
      </template>
    </b-colxx>
    <news-seo-key-word-paging-model ref="refNewsContent_NewsSeoKeyWordPagingModel"
                                    @handlerSubmitEvent="subEvNewsContent_NewsSeoKeyWordPagingModel"/>
    <n-core-date-picker ref="refNewsContent_DatePicker"
                        @handleSubmitEvent="subEvNewsContent_DatePicker"/>
    <news-content-type-combobox-model ref="refNewsContent_NewsContentTypeComboboxModel"
                                      @handlerSubmitEvent="subEvNewsContent_NewsContentTypeComboboxModel"/>
    <n-core-modal-question ref="refNewsContent_NCoreModalQuestion"
                           @handleSubmitEvent="subEvNewsContent_NCoreModalQuestion"/>
  </b-row>
</template>
<script>

import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import NCoreConfig from "../../../NCoreHelper/NCoreConfig";
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import Datepicker from "vuejs-datepicker";
import NCoreHtmlEditor from "@/containers/ndev-core/components/NCoreHtmlEditor";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import newsGroupApi from "@/views/app/news-content-manager/api/newsGroupApi";
import NCoreTreeSelect from "@/containers/ndev-core/components/NCoreTreeSelect";
import NCoreCombobox from "@/containers/ndev-core/components/NCoreCombobox";
import newsGroupTypeApi from "@/views/app/news-content-manager/api/newsGroupTypeApi";
import {mapActions} from "vuex";
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
import FroalaEditor from "@/components/Editor/FroalaEditor.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components: {
    FroalaEditor,
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
        avatar: '',
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
      imageAvatar: '',
      isMinusWord: NCoreConfig.checkedValue
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
            dateTimeStart: this.form.dateTimeStart,
            attackViewId: 0,
            statusId: this.isStatusContent === NCoreConfig.checkedValue ? 3 : 4,
            newsContentAttackModels: null,
            newsContentContentModels: this.newsContentTypeData,
            id: this.$route.params.id
          }

          const iResult =
            this.$route.params.id === NCoreConfig.isGuidEmpty
              ? await NCoreHelper.v2executePOST(
                this,
                newsContentApi.NEWS_CONTENT_CREATE,
                dataSend
              )
              : await NCoreHelper.v2executePUT(
                this,
                newsContentApi.NEWS_CONTENT_UPDATE,
                dataSend
              );
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
          dateTimeStart: this.form.dateTimeStart,
          attackViewId: 0,
          statusId: this.isStatusContent === NCoreConfig.checkedValue ? 3 : 4,
          newsContentAttackModels: null,
          newsContentContentModels: this.newsContentTypeData,
          id: this.$route.params.id
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
      const result = await NCoreHelper.v2executeGET(this, newsContentApi.COPY_LINK, {id: this.$route.params.id });
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
    }
    //==================================================================================================================
  },
  computed: {},
  watch: {},
  async created() {
    this.newsGroupTypeId = localStorage.getItem('newsGroupTypeCombobox')
    setInterval(() => this.autoSaveLogContent(), 30000);
  },
  async mounted() {
    const idContent = this.$route.params.id
    if (idContent === NCoreConfig.isGuidEmpty) {
      this.pageTitle = "Thêm mới bài viết"
      this.form.newsGroupId = NCoreConfig.isGuidEmpty //null
      this.form.dateTimeStart = this.returnDeadLine();
      this.form.author = JSON.parse(localStorage.getItem(NCoreConfig.userData)).fullName;
      await this.callStoreSendImageAvatar({
        id: NCoreConfig.isGuidEmpty
      })
      this.agreeViaCheckbox = NCoreConfig.uncheckedValue
      this.showBtnCopyLink = '2'
    } else {
      this.showBtnCopyLink = '1'
      this.pageTitle = "Cập nhật bài viết"
      //========================================Lấy dữ liệu bài viết====================================================
      const iValueInfo = await NCoreHelper.v2executeGETById(this, newsContentApi.NEWS_CONTENT_GET_BY_ID, idContent)
    console.log("iValueInfo", iValueInfo)
      this.form.author = iValueInfo.author
      this.form.content = iValueInfo.content
      this.form.dateTimeStart = iValueInfo.dateTimeStart
      this.form.name = iValueInfo.name
      //newsContentAttackModels
      //attackViewId
      //this.newsContentTypeData = iValueInfo.newsContentContentModels
      this.form.newsGroupId = iValueInfo.newsGroupId
      this.form.newsGroupTypeId = NCoreConfig.isGuidEmpty //iValueInfo.newsGroupTypeId
      this.form.seoKeyword = iValueInfo.seoKeyword
      this.isStatusContent = iValueInfo.statusId === 3 ? NCoreConfig.checkedValue : NCoreConfig.uncheckedValue
      this.form.summary = iValueInfo.summary
      this.form.urlRootLink = iValueInfo.urlRootLink
      this.form.agreeVia = iValueInfo.agreeVia;
      this.form.linkTree = iValueInfo.linkTree;
      this.form.avatar = iValueInfo.link;
      this.form.avatarId = iValueInfo.avatarId;
      this.agreeViaCheckbox = iValueInfo.agreeVia ? NCoreConfig.checkedValue : NCoreConfig.uncheckedValue;
      this.newsContentTypeHidden = this.newsContentTypeData.length > 0
      this.newsGroupReciveFromCombobox = {
        dataContentId: iValueInfo.newsGroupId
      }
    }
    await this.callTreeViewSelect(
      await NCoreHelper.v2executeGET(this, newsGroupApi.NEWS_GROUP_TREE_VIEW_MODAL, {
        newsGroupTypeId: NCoreConfig.isGuidEmpty, //this.newsGroupTypeId,
        isAll: false
      }), this.form.newsGroupId === NCoreConfig.isGuidEmpty ? null : this.form.newsGroupId)
    this.$hideAllPageLoading()
  },
};
</script>
