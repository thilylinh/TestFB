<template>
  <div class="quill-editor-wrapper">
    <quill-editor v-model="text" ref="quill-editor" :options="editorOption" @change="textChange" />
    <b-modal :id="idModal" ok-only ok-title="Accept" centered size="lg" :title="$t('menu.feedback-management')"
      hide-footer>
      <div class="bg-light-danger p-sm-1">
        <div id="inputEditor" ref="inputEditor" contenteditable="true" placeholder="Nhập đoạn dữ liệu sao chép"
          style="min-height: 300px" class="border box-textarea p-1"></div>
        <n-core-button-run :btn-save-title="'Lưu lựa chọn'" ref="refNCoreButtonRunNDatePicker"
          @submitEvent="submitEvent" />
      </div>
    </b-modal>
  </div>
</template>
<script>
import { quillEditor, Quill } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import ImageResize from "quill-image-resize-module";
// import 'quill-paste-smart'
import { ImageDrop } from "quill-image-drop-module";
// import { SERVER_FILE_STORE_MODULE } from '@/store/module'
// import { checkFileSizeValid } from '@/libs/shared'
import NCoreHelper from "../../views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun.vue";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);
// The font of the quill editor
const fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif",
];
const Font = Quill.import("formats/font");
Font.whitelist = fonts; // Add fonts to the whitelist
// Quill.register(Font, true)
const Embed = Quill.import("blots/embed");

Quill.register(
  class extends Embed {
    static create(key) {
      const node = super.create();
      node.innerHTML = `${key}`;
      return node;
    }

    static value(node) {
      return node.dataset.key;
    }

    static blotName = "customEmbed";

    static className = "customEmbed";

    static tagName = "span";
  }
);
export default {
  components: {
    quillEditor,
    NCoreButtonRun,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: 200,
    },
    isViewDetail: {
      type: Boolean,
      default: false,
    },
    noPlaceholder: {
      type: Boolean,
      default: false,
    },
    // option upload image in toolbar
    uploadImage: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      text: this.value,
      idModal: "IdNCoreModalCode",
      // checkFileSizeValid,
      editorOption: {
        modules: {
          imageResize: true,
          imageDrop: true,
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              // ['blockquote', { list: 'ordered' }, { list: 'bullet' }],
              // [{ font: [] }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", this.uploadImage ? "image" : ""],
            ],
            container: [
              ["bold", "italic", "underline", "strike"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", "image", "video", "formula"],
              ["code-block"],
            ],
            handlers: {
              "code-block": this.handlerOpenModal,
            },
          },
          clipboard: {
            allowed: {
              tags: [
                "a",
                "b",
                "strong",
                "u",
                "s",
                "i",
                "p",
                "br",
                "ul",
                "ol",
                "li",
                "span",
                "div",
              ],
              attributes: ["href", "rel", "target", "class"],
            },
            keepSelection: true,
            substituteBlockElements: true,
            magicPasteLinks: true,
            // matchVisual: false,
            hooks: {
              uponSanitizeElement(node, data, config) { },
            },
          },
        },
        placeholder: this.noPlaceholder
          ? ". . ."
          : this.$t("Nhập ở đây"),
      },
      fileType: "image",
      isEmptyValue: false,
      isUpdating: false,
    };
  },

  watch: {
    value(newVal, oldVal) {
      // if (newVal === '<p><br></p>' && this.isEmptyValue) {
      //   this.isEmptyValue = false
      //   this.text = null
      //   this.$emit('input', this.text)
      //   return
      // }
      // if (newVal && newVal !== this.text) {
      //    // Cập nhật nội dung cho editor
      //   this.text = newVal
      // }
      console.log("newVal", newVal)
      this.text = newVal
      // this.handleUpdateHeight()
    },
  },
  mounted() {
    // window.katex = katex
    const { quill } = this.$refs["quill-editor"];
    quill.container.firstChild.innerHTML = this.text;


    // Xử lý sự kiện khi người dùng xoá nội dung trong trình soạn thảo
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        const content = quill.getContents();
        if (content.ops.length === 1 && content.ops[0].insert === "\n") {
          this.isEmptyValue = true;
        }
      }
    });
    if (this.isViewDetail) {
      quill.disable();
    }

    // update height in scroll
    // this.handleUpdateHeight()
  },
  methods: {
    submitEvent(val) {
      this.$showProcessing();

      if (val) {
        const contentData = !this.$refs.inputEditor.innerHTML ||
          this.$refs.inputEditor.innerHTML === "<br>"
          ? null
          : this.$refs.inputEditor.innerHTML
        this.handleAddCode(contentData);
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
        this.$hideProcessing();
      }
    },
    handlerOpenModal() {
      NCoreHelper.v2modalShowHide(this, this.idModal, 1);
    },
    // nội dung thay đổi
    textChange(value) {
      const { quill } = this.$refs["quill-editor"];
      this.text = quill.root.innerHTML;
      this.$emit("input", this.text);
    },
    handleAddCode(code) {
      const { quill } = this.$refs["quill-editor"];
      const range = quill.getSelection(true);
      const regex = /<iframe[^>]*>.*?<\/iframe>/gi;
      const updatedContent = code.replace(regex, function (match) {
        return "<h1 style>" + match + "</h1>";
      });
      quill.deleteText(range.index, range.length);
      quill.insertEmbed(range.index, "customEmbed", updatedContent);
      quill.setSelection(range.index + range.length + 1);
      NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      this.$hideProcessing();
    },

    // handleUpdateHeight() {
    //   const { quill } = this.$refs["quill-editor"];
    //   setTimeout(() => {
    //     let iframe = quill.container.querySelector('iframe');
    //     console.log("ifr", iframe.scrollHeight)
    //     if (iframe)
    //       iframe.style.height = iframe.scrollHeight * 6 + 'px'
    //   }, 100)
    // }
  },
};
</script>
  
<style>
[contenteditable][placeholder]:empty::before {
  position: absolute;
  background-color: transparent;
  color: gray;
  content: attr(placeholder);
  font-size: 16px;
}
</style>
  