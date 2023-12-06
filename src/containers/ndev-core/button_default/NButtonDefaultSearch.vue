<template>
  <div class="search-sm d-inline-block float-md-left mr-1 align-top">
    <b-input placeholder="Nhập giá trị cần tra cứu ..."
             autocomplete="off"
             @change="val => handler_runAction(val)"/>
  </div>
  <!--  :placeholder="$t('menu.search')"-->
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
    handler_runAction(val) {
      this.$emit('handlerSubmitEvent', val)
    }
  }
};
</script>

