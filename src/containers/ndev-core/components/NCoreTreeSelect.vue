<template>
  <treeselect v-model="dataSelect"
              :always-open="false"
              :append-to-body="false"
              :clear-on-select="true"
              :clearable="true"
              :close-on-select="true"
              :disabled="false"
              :limit="5"
              :load-options="loadOptions"
              :max-height="200"
              :multiple="false"
              :noChildrenText="noChildrenText"
              :open-on-click="true"
              :open-on-focus="true"
              :options="dataCombobox"
              :placeholder="messageNoChoice"
              :searchable="true"
              :valueFormat="valueFormat"
              :name="pageId"
              v-on:select="treeComboboxMenuFatherChange"/>
</template>
<script>

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {mapGetters} from "vuex";

export default {
  components: {
    Treeselect
  },
  props: {},
  data() {
    return {
      pageId: 'NCoreTreeSelectId',
      dataSelect: null,
      dataCombobox: [],
      valueFormat: 'id',
      noChildrenText: '',
      messageNoChoice: '',
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(["storeSendTreeViewSelect"])
  },
  watch: {
    storeSendTreeViewSelect: function (val) {
      if (this.pageId === val.id) {
        this.dataCombobox = []
        let dataFather = []
        for (let i = 0; i < val.data.length; i++) {
          if (val.data[i].statusId === 3) {
            dataFather = {
              children: null,
              id: val.data[i].id,
              text: val.data[i].text,
              label: val.data[i].label,
              icon: val.data[i].icon,
              parentId: val.data[i].parentId,
              permissionValue: val.data[i].permissionValue,
              opened: val.data[i].opened,
              openedAction: val.data[i].openedAction,
              menuGroupId: val.data[i].menuGroupId,
              position: val.data[i].position,
              statusId: val.data[i].statusId,
              actions: val.data[i].actions,
              statusName: val.data[i].statusName,
              statusColor: val.data[i].statusColor
            }
            if (val.data[i].children !== null) dataFather.children = this.runChildren(val.data[i].children)
            this.dataCombobox.push(dataFather)
          }
        }
        this.noChildrenText = val.noChildrenText
        this.messageNoChoice = val.messageNoChoice
        this.dataSelect = val.dataSelect
        this.$forceUpdate()
      }
    }
  },
  methods: {
    async loadOptions({action, parentNode, callback}) {
    },
    treeComboboxMenuFatherChange(node, instanceId) {
      this.$emit('handlerSubmitEvent', {
        dataContentId: node.id,
        dataContentName: node.label
      })
      // if (node.children != null) {
      //   // node cha
      //   this.form.menuGroupId = node.menuGroupId + 1;
      //   this.form.position = Math.max(...node.children.map((o) => o.position)) + 1;
      // } else {
      //   this.form.menuGroupId = node.menuGroupId + 1;
      //   this.form.position = node.position + 1;
      // }
    },
    handler_runAction(flag, data) {
      this.$emit('handlerSubmitEvent', {
        id: flag,
        dataContentId: data.id,
        dataContentName: data.label
      })
    },
    runChildren(data) {
      let dataChild = []
      let dataChildReturn = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].statusId === 3) {
          dataChild = {
            children: null,
            id: data[i].id,
            text: data[i].text,
            label: data[i].label,
            icon: data[i].icon,
            parentId: data[i].parentId,
            permissionValue: data[i].permissionValue,
            opened: data[i].opened,
            openedAction: data[i].openedAction,
            menuGroupId: data[i].menuGroupId,
            position: data[i].position,
            statusId: data[i].statusId,
            actions: data[i].actions,
            statusName: data[i].statusName,
            statusColor: data[i].statusColor
          }
          if (data[i].children !== null) dataChild.children = this.runChildren(data[i].children)
          dataChildReturn.push(dataChild)
        }
      }
      return dataChildReturn
    }
  }
};
</script>

