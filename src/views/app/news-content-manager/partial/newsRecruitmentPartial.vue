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
              <label class="font-weight-700">1. Tiêu đề bài viết <span class="nRequired">(*)</span> </label>
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
          </b-row>
          <b-row class="mt-2">
            <b-col xs="12" sm="6" md="4" lg="3">
              <b-row>
                <b-colxx xxs="12">
                  <label class="font-weight-700">2. Ảnh đại diện</label>
                </b-colxx>
              </b-row>
              <modal-content-avatar ref="refNewsContentEvent_ModalContentAvatar"/>
            </b-col>
            <b-col xs="12" sm="6" md="8" lg="9">
              <b-row class="mt-2">
                <b-colxx xxs="12">
                  <label class="font-weight-700">3. Từ khóa Seo</label>
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
                  <label class="font-weight-700">4. Tóm tắt bài viết </label>
                </b-colxx>
                <b-colxx xxs="12">
                  <textarea v-model="form.summary" rows="5" placeholder="Nhập tóm tắt bài viết" class="form-control"/>
                </b-colxx>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-colxx xxs="12">
              <label class="font-weight-700">5. Nội dung bài viết <span class="nRequired">(*)</span> </label>
            </b-colxx>
            <b-colxx xxs="12">
              <froala id="txtQuestionManagerEvent_PageContent"
                      :tag="'textarea'"
                      :config="config"
                      v-model="form.content"></froala>
            </b-colxx>
          </b-row>
          <b-row class="mt-2">
            <b-colxx xxs="12">
              <n-core-button-run :btn-cancel="'Quay về'"
                                 :btn-save-title="'Lưu bài viết'"
                                 ref="refBtnNewsContentEvent"
                                 @submitEvent="subEvNewsContentEvent_BtnSave"/>
            </b-colxx>
          </b-row>
        </b-card>
      </template>
    </b-colxx>
    <news-seo-key-word-paging-model ref="refNewsContent_NewsSeoKeyWordPagingModel"
                                    @handlerSubmitEvent="subEvNewsContent_NewsSeoKeyWordPagingModel"/>
    <n-core-date-picker ref="refNewsContent_DatePicker"
                        @handleSubmitEvent="subEvNewsContent_DatePicker"/>
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
import NCoreTreeSelect from "@/containers/ndev-core/components/NCoreTreeSelect";
import NCoreCombobox from "@/containers/ndev-core/components/NCoreCombobox";
import {mapActions} from "vuex";
import NewsSeoKeyWordPagingModel from "../combobox/newsSeoKeyWordPagingModel";
import NCoreDatePicker from "../../../../containers/ndev-core/components/NCoreDatePicker";
import NewsContentTypeComboboxModel from "@/views/app/news-content-manager/combobox/newsContentTypeComboboxModel";
import ModalContentImage from "@/views/app/news-content-manager/modal-content/modalContentImage";
import NCoreModalQuestion from "@/containers/ndev-core/components/NCoreModalQuestion";
import ModalContentContent from "@/views/app/news-content-manager/modal-content/modalContentContent";
import ModalContentAvatar from "@/views/app/news-content-manager/modal-content/modalContentAvatar";
import ModalContentView from "@/views/app/news-content-manager/modal-content/modalContentView";
import ModalContentPosition from "@/views/app/news-content-manager/modal-content/modalContentPosition";
import newsRecruitmentApi from "@/views/app/news-content-manager/api/newsRecruitmentApi";
import newsRecruitmentQuoteApi from "@/views/app/news-content-manager/api/newsRecruitmentQuoteApi";

export default {
  components: {
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
  props: ['title', 'path', 'typeNewRecruitment'],
  data() {
    return {
      pageTitle: '',
      form: {
        id: '',
        name: '',
        summary: '',
        content: '',
        seoKeyword: '',
        avatarId: '',
        dateTimeStart: '',
        typeId: '',
        statusId: '',
      },
      isStatusContent: NCoreConfig.checkedValue,
      imageAvatar: '',
      config: {
        events: {
          initialized: function () {
          }
        },
        placeholderText: 'Nhập nội dung ...',
        charCounterCount: true
      },
    };
  },
  mixins: [validationMixin],
  validations: {
    form: {
      content: '',
      summary: "",
      seoKeyword: "",
      avatarId: '',
      dateTimeStart: '',
      typeId: '',
      statusId: '',
      name: {
        required,
        maxLength: maxLength(500)
      },
    }
  },
  methods: {
    ...mapActions([
      'callStoreSendCombobox',
      'callStoreSendNewsContent',
      'callStoreSendImageAvatar',
    ]),
    async subEvNewsContentEvent_BtnSave(isSave) {
      if (isSave === true) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$showProcessing()
          const iAvatar = this.$refs.refNewsContentEvent_ModalContentAvatar.returnValue()

          const dataSend = {
            name: this.form.name,
            summary: this.form.summary,
            content: this.form.content,
            seoKeyword: this.form.seoKeyword,
            avatarId: iAvatar.id,
            dateTimeStart: this.form.dateTimeStart,
            statusId: this.isStatusContent === NCoreConfig.checkedValue ? 3 : 4,
            id: this.$route.params.id
          }

          let iResult = ''
          switch (this.typeNewRecruitment) {
            case 1: {
              iResult = this.$route.params.id === NCoreConfig.isGuidEmpty
                  ? await NCoreHelper.v2executePOST(
                      this,
                      newsRecruitmentApi.CREATE,
                      dataSend
                  )
                  : await NCoreHelper.v2executePUT(
                      this,
                      newsRecruitmentApi.UPDATE,
                      dataSend
                  );
              break
            }
            case 2: {
              iResult = this.$route.params.id === NCoreConfig.isGuidEmpty
                  ? await NCoreHelper.v2executePOST(
                      this,
                      newsRecruitmentQuoteApi.CREATE,
                      dataSend
                  )
                  : await NCoreHelper.v2executePUT(
                      this,
                      newsRecruitmentQuoteApi.UPDATE,
                      dataSend
                  );
              break
            }
          }

          if (iResult) {
            NCoreHelper.v2alertMess(
                this,
                NCoreHelper.returnMessage(this.$route.params.id === NCoreConfig.isGuidEmpty ? 1 : 2, true, this.title),
                iResult ? 2 : 3
            );
            this.$hideProcessing()
            await this.$router.push({
              name: this.path
            })
          } else {
            NCoreHelper.v2alertMess(
                this,
                NCoreHelper.returnMessage(this.$route.params.id === NCoreConfig.isGuidEmpty ? 1 : 2, false, this.title),
                iResult ? 1 : 3
            );
            this.$hideProcessing()
          }
        }
      } else {
        await this.$router.push({
          name: this.path
        })
      }
    },
    returnDeadLine() {
      return NCoreHelper.returnDeadLine()
    },
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
  },
  computed: {},
  watch: {},
  async created() {
  },
  async mounted() {
    const idContent = this.$route.params.id
    if (idContent === NCoreConfig.isGuidEmpty) {
      this.pageTitle = "Thêm mới " + this.title
      this.form.newsGroupId = null
      this.form.dateTimeStart = this.returnDeadLine();
      await this.callStoreSendImageAvatar({
        id: NCoreConfig.isGuidEmpty
      })
    }
    else {
      this.pageTitle = "Cập nhật " + this.title
      //========================================Lấy dữ liệu bài viết====================================================
      let iValueInfo = []
      switch (this.typeNewRecruitment) {
        case 1:{
          iValueInfo = await NCoreHelper.v2executeGETById(this, newsRecruitmentApi.GET_BY_ID, idContent)
          break
        }
        case 2:{
          iValueInfo = await NCoreHelper.v2executeGETById(this, newsRecruitmentQuoteApi.GET_BY_ID, idContent)
          break
        }
      }

      this.form.author = iValueInfo.author
      this.form.content = iValueInfo.content
      this.form.dateTimeStart = iValueInfo.dateTimeStart
      this.form.name = iValueInfo.name
      this.form.seoKeyword = iValueInfo.seoKeyword
      this.isStatusContent = iValueInfo.statusId === 3 ? NCoreConfig.checkedValue : NCoreConfig.uncheckedValue
      this.form.summary = iValueInfo.summary
      //================================================================================================================
      //===========================================Gửi ảnh đại diện=====================================================
      await this.callStoreSendImageAvatar({
        id: iValueInfo.avatarId,
        isLocal: iValueInfo.isLocal
      })
    }
    this.$hideAllPageLoading()
  },
  //====================================================================================================================
};
</script>
