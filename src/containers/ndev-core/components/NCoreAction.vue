<template>
  <b-dropdown variant="link"
              boundary="viewport"
              toggle-class="text-decoration-none"
              class="NButton_DropDown"
              no-caret>
    <template v-slot:button-content>
      <i class="simple-icon-layers"
         style="font-size: 20px;font-weight: bold;color: darkslategray;"/>
    </template>
    <div v-for="(items, index) in dataAction" :key="index">
      <b-dropdown-item @click="handler_runAction(items.id)">
        <i :class="items.icon"/>
        <span class="content">{{ items.name }}</span>
      </b-dropdown-item>
      <b-dropdown-divider v-if="index < dataAction.length - 1"></b-dropdown-divider>
    </div>
    <!--    <b-dropdown-item v-for="(items, index) in dataAction" :key="index"-->
    <!--                     @click="handler_runAction(items.id, dataId)">-->
    <!--      <i :class="items.icon"/>-->
    <!--      <span class="content">{{ items.name }}</span>-->
    <!--    </b-dropdown-item>-->
    <!--    <b-dropdown-divider></b-dropdown-divider>-->
  </b-dropdown>
</template>
<script>

export default {
  components: {},
  props: {
    dataId: '',
    dataName: '',
    dataAction: []
  },
  data() {
    return {}
  },
  created() {
  },
  computed: {},
  watch: {},
  methods: {
    handler_runAction(flag) {
      this.$emit('handlerSubmitEvent', {
        id: flag,
        dataContentId: this.dataId,
        dataContentName: this.dataName
      })
    }
  }
};
</script>

