<template>
  <b-row>
    <b-col lg="12" md="12" sm="12" xs="12" style="height: 75vh;">
<!--      <vue-pdf-app :pdf="filePath"-->
<!--                   :config="config"></vue-pdf-app>-->
    </b-col>
  </b-row>
</template>
<script>

export default {
  components: {
  },
  props: {
    sendUrl: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      filePath: '',
      config: {
        toolbar: false,
        errorWrapper: true,
      },
    };
  },
  created() {
  },
  computed: {},
  watch: {
    sendUrl: {
      handler: function (vData) {
        this.filePath = vData
      },
      deep: true
    }
  },
  methods: {}
};
</script>

