<template>
  <b-button
    v-b-toggle.displayOptions
    class="pt-0 pl-0 d-inline-block d-md-none nFontBold mt-2"
    variant="empty">
    <span style="font-family: Verdana;color: blue;">Lựa chọn sự kiện</span>
    <i class="simple-icon-arrow-down align-middle"/>
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

