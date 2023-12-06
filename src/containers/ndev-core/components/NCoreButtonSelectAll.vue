<template>
  <b-row class="nBorderTop">
    <b-col class="mt-2 text-center" lg="12" md="12" sm="12" xs="12">
      <b-button
        :disabled="$store.state.componentProcessing"
        class="mb-2"
        size="xs"
        variant="primary"
        @click="submitEvent(false)"
      ><i class="iconsminds-arrow-refresh"></i> Quay về
      </b-button>
      <b-button
        v-if="showBtnAll === '1'"
        :disabled="$store.state.componentProcessing"
        class="mb-2"
        size="xs"
        variant="danger"
        @click="submitEvent(true)"
      ><i class="iconsminds-upgrade"></i> Chọn tất cả
      </b-button>
    </b-col>
  </b-row>
</template>
<script>

export default {
  components: {},
  props: {
    showBtnAll: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {},
  watch: {},
  methods: {
    submitEvent(val) {
      this.$emit('submitEvent', val)
    }
  }
};
</script>

