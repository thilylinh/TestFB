<template>
  <b-button class="nFontButton btn-multiple-state btn-shadow nButtonAddNewDefault" size="xs" type="button"
            variant="danger" @click="handler_runAction()">
    <span class="label"><i class="simple-icon-pencil"/> Thêm mới</span>
  </b-button>
</template>
<script>

export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  created() {
  },
  computed: {},
  watch: {},
  methods: {
    handler_runAction() {
      this.$emit('handlerSubmitEvent')
    }
  }
};
</script>
<style>
.nButtonAddNewDefault {
  font-size: 18px !important;
  font-weight: 500;
}
</style>

