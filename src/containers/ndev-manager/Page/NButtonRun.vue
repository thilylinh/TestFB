<template>
  <b-row class="nBorderTop">
    <b-col class="text-center mt-3" lg="12" md="12" sm="12" xs="12">
      <b-button
        :disabled="processing"
        size="xs"
        variant="outline-dark"
        @click="submitEvent(false)"
      ><i class="iconsminds-undo"></i> {{ $t('pages.cancel') }}
      </b-button>
      <b-button :class="{'nFontButton btn-multiple-state btn-shadow': true,
                    'show-spinner': processing }" :disabled="processing" size="xs" type="button"
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
<!--  <b-row class="nBorderTop">-->
<!--    <b-colxx class="text-center mt-2">-->
<!--      <b-button-->
<!--        :disabled="processing"-->
<!--        size="sm"-->
<!--        variant="outline-dark"-->
<!--        @click="submitEvent(false)"-->
<!--      >{{ $t('pages.cancel') }}-->
<!--      </b-button>-->
<!--      <b-button :class="{'nFontButton btn-multiple-state btn-shadow': true,-->
<!--                    'show-spinner': processing }" :disabled="processing" size="sm" type="button"-->
<!--                variant="danger" @click="submitEvent(true)">-->
<!--                            <span class="spinner d-inline-block">-->
<!--                                <span class="bounce1"></span>-->
<!--                                <span class="bounce2"></span>-->
<!--                                <span class="bounce3"></span>-->
<!--                            </span>-->
<!--        <span class="icon success">-->
<!--                                <i class="simple-icon-check"></i>-->
<!--                            </span>-->
<!--        <span class="icon fail">-->
<!--                                <i class="simple-icon-exclamation"></i>-->
<!--                            </span>-->
<!--        <span class="label">{{ btnSaveTitle }}</span>-->
<!--      </b-button>-->
<!--    </b-colxx>-->
<!--  </b-row>-->
</template>
<script>

export default {
  components: {},
  props: {
    processing: {
      type: Boolean,
      default: false
    },
    btnSaveTitle: {
      type: String,
      default: 'Lưu dữ liệu'
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
    submitEvent(val) {
      this.processing = true
      this.$emit('submitEvent', val)
    }
  }
};
</script>

