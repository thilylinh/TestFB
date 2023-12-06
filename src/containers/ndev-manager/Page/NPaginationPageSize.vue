<template>
  <div class="float-md-right pt-1">
    <span class="text-muted text-small mr-1 mb-2">{{ from }}-{{ to }} of {{ totalRecord }}</span>
    <b-dropdown
      id="ddown2"
      :text="`${pageSize}`"
      class="d-inline-block"
      right
      size="xs"
      variant="outline-dark"
    >
      <b-dropdown-item
        v-for="(size, index) in sizeData"
        :key="index"
        @click="changePageSize(size)"
      >{{ size }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    totalRecord: {
      default: 8,
      type: Number,
    },
    from: {
      default: 1,
      type: Number,
    },
    to: {
      default: 8,
      type: Number,
    },
    pageSizeDefault: {
      default: 8,
      type: Number,
    },
  },
  data() {
    return {
      pageSize: this.pageSizeDefault,
      sizeData: [4, 8, 12, 20, 30, 50, 100],
    }
  },
  computed: {
  },
  methods: {
    changePageSize(val) {
      this.pageSize = val
      this.$emit('handleChangePageSize', val)
    },
  },
}
</script>
