<template>
  <b-img-lazy :src="callAvatar(sendUrl, sendName, sendIsLocal, sendUrlLocal)"
              style="width: 50px"/>
  <!--  <img :alt="sendName"-->
  <!--       v-lazy="callAvatar(sendUrl, sendName, sendIsLocal)"-->
  <!--       class="list-thumbnail responsive border-0"/>-->
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";

export default {
  components: {},
  props: ['sendUrl', 'sendName', 'sendIsLocal', 'sendUrlLocal'],
  data() {
    return {}
  },
  created() {
  },
  computed: {},
  watch: {},
  methods: {
    callAvatar(sendUrl, sendName, sendIsLocal, sendUrlLocal) {
      if (sendIsLocal)
        return NCoreHelper.returnModalAvatar(sendUrl, sendIsLocal, this.$serverfile)
      return NCoreHelper.returnModalAvatarV2023(sendUrl, sendUrlLocal, sendIsLocal, this.$serverfile)
    }
  }
};
</script>

