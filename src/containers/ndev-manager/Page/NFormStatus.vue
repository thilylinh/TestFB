<template>
  <div>
    <b-badge v-if="sendId === 1" pill variant="dark">{{ $t(sendName) }}</b-badge>
    <b-badge v-else-if="sendId === 2" pill variant="warning">{{ $t(sendName) }}</b-badge>
    <b-badge v-else-if="sendId === 3" pill variant="success">{{ $t(sendName) }}</b-badge>
<!--    <b-badge-->
<!--      v-if="sendId === 1"-->
<!--      variant="light-dark"-->
<!--    >-->
<!--      <span>{{ sendName }}</span>-->
<!--    </b-badge>-->
<!--    <b-badge-->
<!--      v-else-if="sendId === 2"-->
<!--      variant="light-info"-->
<!--    >-->
<!--      <span>{{ sendName }}</span>-->
<!--    </b-badge>-->
<!--    <b-badge-->
<!--      v-else-if="sendId === 3"-->
<!--      variant="light-success"-->
<!--    >-->
<!--      <span>{{ sendName }}</span>-->
<!--    </b-badge>-->
  </div>
</template>
<script>
import {
  BBadge,
} from 'bootstrap-vue'

export default {
  components: {
    BBadge,
  },
  props: {
    sendId: {
      type: Number,
      default: 0,
    },
    sendName: {
      type: String,
      default: '',
    },
  },
  mounted() {
  },
  methods: {
  },
}
</script>
