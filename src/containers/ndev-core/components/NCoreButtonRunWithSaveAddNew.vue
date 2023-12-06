<template>
  <b-row class="nBorderTop">
    <b-col class="text-center mt-3" lg="12" md="12" sm="12" xs="12">
      <b-button :disabled="$store.state.componentProcessing"
                size="xs"
                variant="outline-dark"
                @click="submitEvent(0)">
        <i class="iconsminds-undo"></i> Hủy bỏ
      </b-button>
      <b-button v-if="showAddAndSave === '1'" :class="{'nFontButton btn-multiple-state btn-shadow': true,
                    'show-spinner': $store.state.componentProcessing }" :disabled="$store.state.componentProcessing"
                size="xs"
                type="button"
                variant="danger"
                @click="submitEvent(1)">
                            <span class="spinner d-inline-block">
                                <span class="bounce1"></span>
                                <span class="bounce2"></span>
                                <span class="bounce3"></span>
                            </span>
        <span class="icon success">
                                <i class="simple-icon-check"></i>
                            </span>
        <span class="icon fail">
                                <i class="simple-icon-exclamation"></i>
                            </span>
        <span class="label"><i class="iconsminds-save"></i> Lưu và thêm mới</span>
      </b-button>
      <b-button :class="{'nFontButton btn-multiple-state btn-shadow': true,
                    'show-spinner': $store.state.componentProcessing }" :disabled="$store.state.componentProcessing"
                size="xs"
                type="button"
                variant="dark"
                @click="submitEvent(2)">
                            <span class="spinner d-inline-block">
                                <span class="bounce1"></span>
                                <span class="bounce2"></span>
                                <span class="bounce3"></span>
                            </span>
        <span class="icon success">
                                <i class="simple-icon-check"></i>
                            </span>
        <span class="icon fail">
                                <i class="simple-icon-exclamation"></i>
                            </span>
        <span class="label"><i class="iconsminds-save"></i> Lưu và thoát</span>
      </b-button>
    </b-col>
  </b-row>
</template>
<script>

export default {
  components: {},
  props: {
    showAddAndSave: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      processing: false
    }
  },
  created() {
  },
  computed: {},
  watch: {},
  methods: {
    submitEvent(val) {
      this.$showProcessing()
      this.$emit('submitEvent', val)
    }
  }
};
</script>

