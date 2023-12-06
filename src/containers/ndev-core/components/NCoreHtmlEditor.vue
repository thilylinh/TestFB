<template>
  <div>
    <DxHtmlEditor :ref="myHtmlEditorRef"
                  v-model:value="dataHtmlEditor"
                  height="725px"
                  tabindex="99999999999"
    @paste="($event)=>pasteValue($event)"
    @onPaste="($event)=>pasteValue($event)"
    @onCapturePaste="pasteValue($event)"
                  @initialized="onEditorInitialized">
      <DxMediaResizing :enabled="true"/>
      <!--      <DxImageUpload-->
      <!--        :tabs="currentTabs"-->
      <!--        file-upload-mode="base64"-->
      <!--      />-->
      <DxToolbar :multiline="isMultiline">
        <DxItem name="undo"/>
        <DxItem name="redo"/>
        <DxItem name="separator"/>
        <DxItem
          :accepted-values="sizeValues"
          name="size"
        />
        <DxItem
          :accepted-values="fontValues"
          name="font"
        />
        <DxItem name="separator"/>
        <DxItem name="bold"/>
        <DxItem name="italic"/>
        <DxItem name="strike"/>
        <DxItem name="underline"/>
        <DxItem name="separator"/>
        <DxItem name="alignLeft"/>
        <DxItem name="alignCenter"/>
        <DxItem name="alignRight"/>
        <DxItem name="alignJustify"/>
        <DxItem name="separator"/>
        <DxItem name="orderedList"/>
        <DxItem name="bulletList"/>
        <DxItem name="separator"/>
        <DxItem
          :accepted-values="headerValues"
          name="header"
        />
        <DxItem name="separator"/>
        <DxItem name="color"/>
        <DxItem name="background"/>
        <DxItem name="separator"/>
        <DxItem name="link"
                :options="callAddHyperlink"/>
        <!--        <DxItem name="image"/>-->
        <DxItem name="photo"
                :options="toolbarButtonOptions"
                locate-in-menu="never"
                widget="dxButton"/>
<!--        <DxItem name="video"-->
<!--                :options="callAddVideo"/>-->
        <DxItem name="separator"/>
        <DxItem name="clear"/>
        <DxItem name="codeBlock"/>
        <DxItem name="blockquote"/>
        <DxItem name="separator"/>
        <DxItem name="insertTable"/>
        <DxItem name="deleteTable"/>
        <DxItem name="insertRowAbove"/>
        <DxItem name="insertRowBelow"/>
        <DxItem name="deleteRow"/>
        <DxItem name="insertColumnLeft"/>
        <DxItem name="insertColumnRight"/>
        <DxItem name="deleteColumn"/>
        <!--        <DxItem-->
        <!--          name="food"-->
        <!--          :options="toolbarButtonOptions"-->
        <!--          widget="dxButton"-->
        <!--        />-->
      </DxToolbar>
    </DxHtmlEditor>
    <!--        <div class="options">-->
    <!--          <div class="caption">Options</div>-->
    <!--          <div class="option">-->
    <!--            <DxCheckBox-->
    <!--              v-model:value="isMultiline"-->
    <!--              text="Multiline toolbar"-->
    <!--            />-->
    <!--          </div>-->
    <!--          <div class="option">-->
    <!--            <div class="label">Image upload tabs:</div>-->
    <!--            <DxSelectBox-->
    <!--              :items="tabs"-->
    <!--              v-model:value="currentTabs"-->
    <!--              display-expr="name"-->
    <!--              value-expr="value"-->
    <!--            />-->
    <!--          </div>-->
    <!--        </div>-->
    <add-hyper-link ref="refAddHyperLink"
                    @handlerSubmitEvent="subEvAddHyperLink"/>
  </div>
</template>
<script>
// import 'devextreme/dist/css/dx.light.css';

// import {
//   DxHtmlEditor,
//   DxToolbar,
//   DxMediaResizing,
//   DxImageUpload,
//   DxItem,
// } from 'devextreme-vue/html-editor';
// import {
//   DxCheckBox,
// } from 'devextreme-vue/check-box';
// import {
//   DxSelectBox,
// } from 'devextreme-vue/select-box';
// import {markup, tabs} from "@/containers/ndev-core/js/data";
// import AddHyperLink from "@/views/app/news-content-manager/modal-content/addHyperLink";
// import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";

const myHtmlEditorRef = 'my-html-editor';
export default {
  components: {
    // AddHyperLink,
    // DxHtmlEditor,
    // DxMediaResizing,
    // DxToolbar,
    // DxItem,
    // DxImageUpload,
    // DxCheckBox,
    // DxSelectBox,
  },
  props: {
    dataHtmlEditor: '',
  },
  created() {
  },
  data() {
    return {
      markup,
      tabs,
      sizeValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
      fontValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
      headerValues: [false, 1, 2, 3, 4, 5],
      currentTabs: tabs[2].value,
      isMultiline: true,
      myHtmlEditorRef,
      toolbarButtonOptions: {
        text: 'Thư viện',
        title: 'Thư viện',
        stylingMode: 'text',
        onClick: () => {
          this.$showAllPageLoading()
          this.$emit('handlerSubmitEvent', 1)
        },
      },
      callAddHyperlink: {
        onClick: () => {
          NCoreHelper.v2modalShowHide(this, this.$refs.refAddHyperLink.pageId, 1)
        },
      },
      callAddVideo: {
        onClick: () => {
          this.subEvAddVideo()
        },
      }
      // toolbarButtonOptions: {
      //   // text: 'Show markup',
      //   stylingMode: 'text',
      //   onClick: () => {
      //     alert('123')
      //   },
      // },
    };
  },
  computed: {
    htmlEditor: function () {
      return this.$refs[myHtmlEditorRef].instance;
    }
  },
  mounted() {
    this.initializeHtmlEditor()
  },
  methods: {
    onEditorInitialized(e) {
      this.editorInstance = e.component;

      // Bắt sự kiện paste
      this.editorInstance.on('paste', this.onPaste);
    },
    onPaste(e) {
      e.preventDefault();

      // Xử lý nội dung dán ở đây
      const clipboardData = e.originalEvent.clipboardData;
      const pastedData = clipboardData.getData('text/html');

      // Thực hiện xử lý pastedData theo yêu cầu của bạn
      console.log(clipboardData)
      console.log("==============================")
      console.log(pastedData)
      debugger
    },
    initializeHtmlEditor() {
      this.editorInstance = this.$refs[myHtmlEditorRef].instance;

      // this.editorInstance.option({
      //   // Cài đặt của trình soạn thảo
      //   // ...
      //   onInitialized: (e) => {
      //     this.editorInstance = e.component;
      //   },
      // });
      this.editorInstance.on("paste", function (e) {
        // Ngăn chặn việc xử lý mặc định của trình duyệt cho sự kiện paste
        e.preventDefault();

        // Truy cập dữ liệu đang được dán
        const clipboardData = e.originalEvent.clipboardData;
        const pastedData = clipboardData.getData('text/html');

        // Xử lý dữ liệu đang được dán ở đây
        // pastedData chứa nội dung HTML hoặc văn bản vừa được dán
        console.log(clipboardData)
        console.log("==============================")
        console.log(pastedData)
        debugger
      });
      this.editorInstance.on("valueChanged", (e) => {
        const newValue = e.value;
        // Xử lý ảnh ở đây
        // newValue chứa nội dung trình soạn thảo sau khi người dùng chèn ảnh

        // Ví dụ: Bạn có thể sử dụng các biểu thức chính quy để tìm và thay thế các base64 URLs bằng URLs bên ngoài
        const parser = new DOMParser();
        const doc = parser.parseFromString(newValue, "text/html");
        const images = doc.querySelectorAll("img");
        images.forEach((image) => {
          if (image.src.startsWith("data:image")) {
            // Xử lý và thay thế URL ảnh ở đây
            image.src = "external-url";
          }
        });

        // Đặt lại giá trị của trình soạn thảo với nội dung đã xử lý
        this.editorInstance.option("value", doc.body.innerHTML);
      });
    },
    async subEvAddHyperLink(vData) {
      const range = this.htmlEditor.getSelection(true)
      this.htmlEditor.insertText(range.index, vData.name, 'link', vData.link);
      NCoreHelper.v2modalShowHide(this, this.$refs.refAddHyperLink.pageId, 0)
      this.$hideProcessing()
    },
    async subEvAddVideo(vData) {
      const range = this.htmlEditor.getSelection(true)
      this.htmlEditor.insertEmbed(range.index, 'video', 'https://www.youtube.com/embed/k3zimSRKqNw');
    },
    async getVideoUrl(url) {
      let match = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) ||
        url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/) ||
        url.match(/^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
      // console.log(match[2]);
      if (match && match[2].length === 11) {
        return ('https') + '://www.youtube.com/embed/' + match[2] + '?showinfo=0';
      }
      if (match === url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {
        return (match[1] || 'https') + '://player.vimeo.com/video/' + match[2] + '/';
      }
      return null;
    },
    pasteValue(val){
      console.log(val)
      debugger
    }
  }
};
</script>
<style>
.dx-htmleditor-content img {
  vertical-align: middle;
  padding-right: 10px;
}

.dx-htmleditor-content table {
  width: 50%;
}

.options {
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  margin-top: 20px;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
  display: inline-block;
  margin-right: 40px;
}

.option > .dx-selectbox,
.option > .label {
  display: inline-block;
  vertical-align: middle;
}

.option > .label {
  margin-right: 10px;
}
</style>
