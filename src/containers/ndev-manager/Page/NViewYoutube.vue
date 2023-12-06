<template>
<!--  <youtube :video-id="videoId" ref="youtube"/>-->
</template>

<script>
// import youtube from 'vue-youtube'
// import {getIdFromUrl} from 'vue-youtube'
import {mapGetters} from "vuex";

export default {
  components: {
    // youtube
  },
  directives: {},
  props: {},
  mixins: [],
  computed: {
    ...mapGetters(['storeSendYoutube'])
  },
  data() {
    return {
      idModal: 'NViewYoutubeId',
      videoId: ''
    }
  },
  watch: {
    storeSendYoutube: function (val) {
      this.videoId = this.$youtube.getIdFromUrl(val)
    }
  },
  mounted() {
  },
  methods: {},
}
</script>
