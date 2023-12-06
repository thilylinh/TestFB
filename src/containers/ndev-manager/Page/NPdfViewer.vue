<template>
  <b-row>
    <b-col lg="12" md="12" sm="12" xs="12" style="height: 75vh;">
      <vue-pdf-app :pdf="filePath"></vue-pdf-app>
    </b-col>
  </b-row>
</template>
<script>

import VuePdfApp from "vue-pdf-app";
import "vue-pdf-app/dist/icons/main.css";

export default {
  components: {
    VuePdfApp,
  },
  props: {
    sendUrl: '',
  },
  data() {
    return {
      filePath: '',
    };
  },
  created() {
  },
  computed: {},
  watch: {
    sendUrl(val) {
      this.filePath = val
    }
  },
  methods: {
  }
};
</script>

