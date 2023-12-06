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
           size="xl"
           @shown="callOpenModal()"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12">
          <n-core-html-editor ref="refHtmlContent"
                              :data-html-editor="pageContent"
                              @handlerSubmitEvent="subEvModalContentContent_HtmlContent"/>
        </b-colxx>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         ref="refModalContentContentBtnSave"
                         @submitEvent="subEvModalContentContentBtnSave"/>
      <library-manager-modal ref="refModalContentContent_LibraryManagerModal"
                             @handlerSubmitEvent="subEvModalContentContent_LibraryManagerModal"/>
    </b-form>
  </b-modal>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import {mapActions, mapGetters} from "vuex";
import NCoreHtmlEditor from "@/containers/ndev-core/components/NCoreHtmlEditor";

export default {
  components: {
    NCoreHtmlEditor,
    NCoreButtonRun
  },
  props: {},
  data() {
    return {
      pageId: 'modalContentContentId',
      pageTitle: 'LOẠI NỘI DUNG: BÀI VIẾT',
      pageData: [],
      pageContent: '',
      resizeImageData: [],
      commonRef: {
        type: Object,
        default: _ => {
        },
      },
    };
  },
  mixins: [],
  validations: {},
  methods: {
    ...mapActions(['callStoreImageResizeCombobox']),
    //==============================================PAGE================================================================
    async callOpenModal() {
      const iDataReceive = this.$store.state.storeCrud.storeSendNewsContent
      if (iDataReceive.contentFlagKey === 2) {
        this.pageData = []
        this.pageData = iDataReceive
        if (iDataReceive.isAddNew) {
          // Thêm mới
          this.pageContent = ''
        } else {
          // Cập nhật
          this.pageContent = iDataReceive.linkSource
        }
      }
    },
    async resetStateModal() {
      this.pageContent = ''
    },
    //==================================================================================================================
    //==================================================SAVE-ALL========================================================
    async subEvModalContentContentBtnSave(val) {
      if (val) {
        this.$showProcessing()
        const iResult = this.$refs.refHtmlContent.dataHtmlEditor
        if (iResult === '') {
          NCoreHelper.v2alertMess(this, 'Không có dữ liệu bài viết', 2)
          return
        }
        const iValue =
          '<div class="row clearfix nContent_Content">' +
          ' <div class="col-xs-12"> ' + iResult + ' </div>' +
          '</div>'
        this.$emit('handlerSubmitEvent', {
          id: this.pageData.id,
          contentFlagKey: this.pageData.contentFlagKey,
          name: 'Bài viết',
          linkSource: iResult,
          linkFull: iValue,
          content: iValue,
          config: 0,
          position: this.pageData.position,
        })
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageId, 0)
      }
    },
    //==================================================================================================================
    async subEvModalContentContent_HtmlContent(vData) {
      switch (vData) {
        case 1: {
          NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentContent_LibraryManagerModal.pageId, 1)
          break
        }
      }
    },
    async subEvModalContentContent_LibraryManagerModal(vData) {
      const quill = this.$refs.refHtmlContent.htmlEditor
      const caretPosition = quill.getSelection(true)
      for (let i = 0; i < vData.length; i++) {
        quill.insertEmbed(caretPosition.index, 'image', vData[i])
      }
      this.$hideProcessing()
      NCoreHelper.v2modalShowHide(this, this.$refs.refModalContentContent_LibraryManagerModal.pageId, 0)
    },
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
