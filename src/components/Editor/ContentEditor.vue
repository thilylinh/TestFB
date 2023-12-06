<template>
  <div>
    <n-core-html-editor ref="refHtmlContent"
                        :data-html-editor="dataHtmlEditor"
                        @handlerSubmitEvent="subEvModalContentContent_HtmlContent"/>
    <!-- <library-manager-modal ref="refContentEditor_LibraryManagerModal"
                           :library-modal-id="'pageIdContentEditor_LibraryManagerModal'"
                           @handlerSubmitEvent="subEvModalContentContent_LibraryManagerModal"/> -->
  </div>
</template>
<script>
// import NCoreHtmlEditor from "../../containers/ndev-core/components/NCoreHtmlEditor.vue";
// import LibraryManagerModal from "../../views/app/library-manager/page/libraryManagerModal.vue";
import NCoreHelper from "../../views/NCoreHelper/NCoreHelper";

export default {
  components: {
    //LibraryManagerModal,
    //NCoreHtmlEditor
  },
  props: ['dataHtmlEditor'],
  data() {
    return {};
  },
  mixins: [],
  validations: {},
  methods: {
    //==================================================SAVE-ALL========================================================
    returnHtml() {
      return this.$refs.refHtmlContent.dataHtmlEditor
    },
    //==================================================================================================================
    async subEvModalContentContent_HtmlContent(vData) {
      switch (vData) {
        case 1: {
          NCoreHelper.v2modalShowHide(this, this.$refs.refContentEditor_LibraryManagerModal.pageId, 1)
          break
        }
      }
    },
    async subEvModalContentContent_LibraryManagerModal(vData) {
      const quill = this.$refs.refHtmlContent.htmlEditor
      const caretPosition = quill.getSelection(true)
      for (let i = 0; i < vData.length; i++) {
        quill.insertEmbed(caretPosition.index, 'image', vData[i].link)
      }
      this.$hideProcessing()
      NCoreHelper.v2modalShowHide(this, this.$refs.refContentEditor_LibraryManagerModal.pageId, 0)
    },
    handlePaste(event) {
      // const clipboardData = event.clipboardData || window.clipboardData
      // const pastedData = clipboardData.getData('text/html')
      // // localStorage.setItem('localImage', pastedData)
      // const quill = this.$refs.refHtmlContent.htmlEditor
      // const caretPosition = quill.getSelection(true)
      // quill.setContent(caretPosition.index, pastedData)
    },
  },
  computed: {},
  watch: {},
  created() {
  },
  async mounted() {
    // window.addEventListener('paste', this.handlePaste)
  },
};
</script>
<style>
.dx-toolbar.dx-toolbar-multiline .dx-toolbar-item {
  line-height: 25px;
}

.dx-toolbar-button.dx-toolbar-text-auto-hide .dx-button .dx-button-content {
  padding: 0px;
}
</style>
