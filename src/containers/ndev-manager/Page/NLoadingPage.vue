<template>
  <b-row :hidden="hiddenNloadingPage">
    <b-colxx xxs="12" class="text-center">
      <img alt="Đang xử lý dữ liệu, vui lòng đợi giây lát" loading="eager" src="/images/loading_page.png"
           style="max-width: 500px"/>
    </b-colxx>
    <b-colxx xxs="12" class="text-center nFontButton font-weight-700" lg="12" md="12" sm="12"
             style="font-size: 20px;color: red;">
      Đang xử lý dữ liệu ...
    </b-colxx>
  </b-row>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  components: {},
  directives: {},
  props: {},
  // mixins: [validationMixin],
  validations: {},
  computed: {
    ...mapGetters(['storeLoadingPage2'])
  },
  data() {
    return {
      hiddenNloadingPage: false
    }
  },
  watch: {
    storeLoadingPage2: function (val) {
      this.hiddenNloadingPage = val

    }
  },
  mounted() {
  },
  methods: {},
}
</script>
