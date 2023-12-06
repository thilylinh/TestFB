<template>
  <b-row class="nBorderTop">
    <b-col class="text-center mt-3" lg="12" md="12" sm="12" xs="12">
      <b-button
        v-if="showBtnCancel === '1'"
        :disabled="$store.state.componentProcessing"
        size="xs"
        variant="outline-dark"
        @click="submitEvent(false)"
      ><i class="iconsminds-undo"></i> {{ btnCancel }}
      </b-button>
      <b-button v-if="showBtnSave === '1'" :class="{'nFontButton btn-multiple-state btn-shadow': true,
                    'show-spinner': $store.state.componentProcessing }" :disabled="$store.state.componentProcessing" size="xs" type="button"
                variant="danger" @click="submitEvent(true)">
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
        <span class="label"><i class="iconsminds-save"></i> {{ btnSaveTitle }}</span>
      </b-button>
    </b-col>
  </b-row>
</template>
<script>

export default {
  components: {},
  props: {
    btnSaveTitle: {
      type: String,
      default: 'Lưu dữ liệu'
    },
    btnCancel: {
      type: String,
      default: 'Hủy bỏ'
    },
    showBtnSave: {
      type: String,
      default: '1'
    },
    showBtnCancel: {
      type: String,
      default: '1'
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

      /*this.processing = true*/
      this.$emit('submitEvent', val)
    }
  }
};
</script>

