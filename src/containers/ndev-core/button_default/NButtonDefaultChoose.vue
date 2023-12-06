<template>
  <b-button class="nFontButton btn-multiple-state btn-shadow nButtonAddNewDefault"
            size="xs"
            type="button"
            :variant="color"
            @click="handler_runAction()">
    <span class="label"><i :class="icons"/> {{title}}</span>
  </b-button>
</template>
<script>

export default {
  components: {},
  props: {
    icons:{
      type: String,
      default: 'simple-icon-compass'
    },
    title:{
      type: String,
      default: 'Chọn'
    },
    color:{
      type: String,
      default: 'primary'
    }
  },
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

