<template>
  <b-row>
    <b-col lg="12" md="12" sm="12" xs="12">
      <img
        :src="filePath"
        alt="Card image cap"
        class="img-thumbnail list-thumbnail rounded-circle align-self-center small"
        loading="lazy"
        style="height: 40px!important;"
      />
    </b-col>
  </b-row>
</template>
<script>

import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";

export default {
  components: {},
  props: {
    srcImage: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      filePath: '/assets/img/profiles/l-1.jpg',
    };
  },
  created() {
  },
  computed: {},
  watch: {
    srcImage: {
      deep: true,
      handler(val) {
        this.filePath = this.getThumnail(val)
      }
    }
  },
  methods: {
    getThumnail(src) {

      return NCoreHelper.GetSmallImage(src, '64x64', this.$serverfile)
    },
  }
};
</script>

