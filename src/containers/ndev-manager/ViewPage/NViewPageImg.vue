<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="true"
           :hide-header="true"
           :title="titleModal"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="md"
           @shown="callOpenPage"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row class="mb-2">
        <b-colxx xxs="12" class="center">
          <b-button size="xs" variant="danger" @click="rotateRight">
            <i class="iconsminds-rotation-390"></i> Xoay hình
          </b-button>
          <b-button size="xs" variant="dark" @click="rotateLeft">
            <i class="simple-icon-logout"></i> Quay về
          </b-button>
        </b-colxx>
      </b-row>
      <div class="text-xs-center mb-3" :style="`transform: rotate(${rotation}deg);`">
        <img alt=""
             :src="fileUrl"
             style="width: 100%;object-fit: contain;max-height: 100%;overflow: hidden;"
             loading="lazy"/>
      </div>
    </b-form>
  </b-modal>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  components: {},
  directives: {},
  props: {},
  mixins: [],
  computed: {
    ...mapGetters(['storeSendViewImage'])
  },
  data() {
    return {
      pageId: 'NViewPageImgPageId',
      nViewPageImgData: [],
      titleModal: '',
      fileUrl: '',
      rotation: 0,
      right: false,
      left: false
    }
  },
  watch: {  },
  mounted() {
  },
  methods: {
    callOpenPage() {
      const iDataReceive = this.$store.state.storeCrud.storeSendViewImage
      this.titleModal = 'CHI TIẾT FILE'
      this.fileUrl = iDataReceive.url
      this.$hideAllPageLoading()
    },
    rotateRight() {
      this.rotation -= 90
    },
    rotateLeft() {
      // this.rotation += 90
      this.$bvModal.hide(this.pageId)
    },
    resetStateModal() {
      this.hiddenNoData = false
      this.hiddenPdf = true
    },
  },
}
</script>
