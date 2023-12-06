<template>
  <b-row>
    <b-col lg="12" md="12" sm="12" xs="12">
      <quill-editor
        ref="myQuillEditor"
        :id="idEditor"
        v-model="contentEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
    </b-col>
    <b-col lg="12" md="12" sm="12" xs="12">
      contentEditor
      {{contentEditor}}
    </b-col>
    <b-col lg="12" md="12" sm="12" xs="12">
      sendContentEditor
      {{sendContentEditor}}
    </b-col>
  </b-row>
</template>
<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {quillEditor} from 'vue-quill-editor'
import {mapGetters} from "vuex";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";

export default {
  components: {
    quillEditor
  },
  props: {
    sendContent: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      idEditor: 'idEditor',
      contentEditor: '',
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
              {list: 'ordered'},
              {list: 'bullet'},
              {indent: '-1'},
              {indent: '+1'}
            ],
            ['clean']
          ]
        }
      },
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['stateEditorManager'])
  },
  watch: {
    stateEditorManager: function (val) {

      this.contentEditor = val.value
    },
    // sendContentEditor: function (val) {
    //
    //   this.contentEditor = val
    // }
    sendContentEditor: {
      deep: true,
      handler(val) {

        this.contentEditor = val
      }
    },
  },
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
  }
};
</script>

