<template>
  <b-modal
    id="NLoadingId"
    :hide-footer="true"
    :hide-header-close="true"
    :hide-header="true"
    cancel-title="Hủy bỏ"
    cancel-variant="outline-primary"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="sm"
    title="NLoadingTitle"
  >
    <b-row>
      <b-col lg="12" md="12" sm="12" xs="12">
        <img alt="Đang xử lý dữ liệu, vui lòng đợi giây lát" loading="eager" src="/images/loading_page.png" style="width: 100%"/>
      </b-col>
      <b-col class="text-center nFontButton font-weight-700" lg="12" md="12" sm="12" style="font-size: 20px;color: red;" xs="12">
        Đang xử lý dữ liệu ...
      </b-col>
    </b-row>
  </b-modal>
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
    ...mapGetters(['storeLoadingPage'])
  },
  data() {
    return {}
  },
  watch: {
    storeLoadingPage(val) {
      if (val) {
        this.$bvModal.show('NLoadingId')
      } else {
        this.$bvModal.hide('NLoadingId')
      }
    }
  },
  mounted() {
  },
  methods: {},
}
</script>
