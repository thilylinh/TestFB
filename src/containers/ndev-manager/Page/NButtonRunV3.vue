<template>
  <b-row class="nBorderTop">
    <b-col class="text-center mt-3" lg="12" md="12" sm="12" xs="12">
      <b-button
        size="xs"
        variant="outline-dark"
        @click="submitEvent(false)"
      ><i class="iconsminds-undo"></i> {{ $t('pages.cancel') }}
      </b-button>
      <b-button :class="{'nFontButton btn-multiple-state btn-shadow': true }" size="xs" type="button"
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
  props: {},
  data() {
    return {
      btnSaveTitle: 'Lưu dữ liệu',
      processing: false
    }
  },
  created() {
  },
  computed: {},
  watch: {},
  methods: {
    submitEvent(val) {
      this.processing = true
      this.$emit('submitEvent', val)
    }
  }
};
</script>

