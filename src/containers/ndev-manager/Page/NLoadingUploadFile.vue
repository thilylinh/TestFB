<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header="true"
           :hide-header-close="true"
           centered
           no-close-on-backdrop
           size="xs">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12" class="text-center">
          <b-img-lazy alt="Đang xử lý dữ liệu, vui lòng đợi giây lát"
                      loading="eager"
                      src="/images/gif/loading_gif.gif"/>
        </b-colxx>
        <b-colxx xxs="12" lg="12" md="12" sm="12"
                 class="text-center nFontButton font-weight-700 mb-5"
                 style="font-size: 20px;color: red;">
          Đang upload dữ liệu ...
        </b-colxx>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>

import NButtonRun from "@/containers/ndev-manager/Page/NButtonRun";

export default {
  components: {NButtonRun},
  directives: {},
  props: {},
  // mixins: [validationMixin],
  validations: {},
  computed: {},
  data() {
    return {
      pageId: 'NLoadingUploadFilePageId',
    }
  },
  watch: {},
  mounted() {
  },
  methods: {},
}
</script>
