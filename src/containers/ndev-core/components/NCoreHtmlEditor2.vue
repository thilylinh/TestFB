<template>
  <div>
    <DxHtmlEditor :ref="myHtmlEditorRef"
                  v-model:value="dataHtmlEditor"
                  height="350px"
                  tabindex="99999999999">
      <DxMediaResizing :enabled="true"/>
      <DxToolbar>
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
        <DxItem name="color"/>
        <DxItem name="background"/>
        <DxItem name="separator"/>
        <DxItem name="clear"/>
        <DxItem name="blockquote"/>
      </DxToolbar>
    </DxHtmlEditor>
  </div>
</template>
<script>
// import 'devextreme/dist/css/dx.light.css';

import {
  DxHtmlEditor,
  DxToolbar,
  DxMediaResizing,
  DxImageUpload,
  DxItem,
} from 'devextreme-vue/html-editor';
import {
  DxCheckBox,
} from 'devextreme-vue/check-box';
import {
  DxSelectBox,
} from 'devextreme-vue/select-box';
import {markup, tabs} from "@/containers/ndev-core/js/data";

const myHtmlEditorRef = 'my-html-editor-2';
export default {
  components: {
    DxHtmlEditor,
    DxMediaResizing,
    DxToolbar,
    DxItem,
    DxImageUpload,
    DxCheckBox,
    DxSelectBox,
  },
  props: {
    dataHtmlEditor: {
      type: String,
      default: ''
    },
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
      myHtmlEditorRef
    };
  },
  computed: {
    htmlEditor: function () {
      return this.$refs[myHtmlEditorRef].instance;
    }
  },
  methods: {
    returnValue() {
      return this.dataHtmlEditor
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
