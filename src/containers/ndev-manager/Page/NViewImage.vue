<template>
  <b-modal
    :id="idModal"
    :hide-footer="true"
    :hide-header-close="true"
    :title="titleModal"
    cancel-title="Hủy bỏ"
    cancel-variant="outline-primary"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="xl"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12">
          <b-button size="xs" variant="danger" @click="rotateRight">
            <i class="iconsminds-rotation-390"></i> Xoay hình
          </b-button>
          <b-button size="xs" variant="dark" @click="rotateLeft">
            <i class="simple-icon-logout"></i> Quay về
          </b-button>
        </b-colxx>
      </b-row>
      <div class="text-xs-center" :style="`transform: rotate(${rotation}deg);`">
        <img alt="" :src="fileUrl" style="width: 100%;object-fit: contain;max-height: 100%;overflow: hidden;" loading="lazy"/>
      </div>
    </b-form>
  </b-modal>
</template>

<script>

export default {
  components: {
  },
  directives: {},
  props: {
    fileUrl: ''
  },
  mixins: [],
  computed: {
  },
  data() {
    return {
      idModal: 'NviewImageId',
      titleModal: '',
      rotation: 0,
      right: false,
      left: false
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    rotateRight() {
      this.rotation -= 90
    },
    rotateLeft() {
      // this.rotation += 90
      this.$bvModal.hide(this.idModal)
    },
    resetStateModal() {
      this.hiddenNoData = false
      this.hiddenPdf = true
    },
  },
}
</script>
