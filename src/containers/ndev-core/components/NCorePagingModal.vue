<template>
  <div
    v-if="showPagination"
    class="pagination-container NCorePagingModal"
  >
    <div class="d-flex justify-content-between flex-wrap">
      <div class="page-number" style="margin: 0 auto;">
        <b-pagination
          v-model="selectedPage"
          :per-page="pageSize"
          :total-rows="totalItems"
          size="sm"
          @page-click="handlePagingClick"
        >
          <template #first-text>
            <span class="icon">
              <i class="simple-icon-control-rewind"/>
            </span>
          </template>
          <template #prev-text>
            <span class="icon">
              <i class="simple-icon-arrow-left"></i>
            </span>
          </template>
          <template #ellipsis-text>
            <span class="icon">
            </span>
          </template>
          <template #next-text>
            <span class="icon">
              <i class="simple-icon-arrow-right"/>
            </span>
          </template>
          <template #last-text>
            <span class="icon">
              <i class="simple-icon-control-forward"/>
            </span>
          </template>
        </b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {BCol, BFormSelect, BFormSelectOption, BPagination, BRow,} from 'bootstrap-vue'

export default {
  components: {
    'b-pagination': BPagination,
    'b-form-select': BFormSelect,
    BRow,
    BCol,
    BFormSelectOption,
  },
  props: {
    totalItems: {
      default: 0,
      type: Number,
    },
    defaultPageSize: {
      default: 10,
      type: Number,
    },
    showPageSelect: {
      type: Boolean,
      default: true,
    },
    currentPage: {
      default: 1,
      type: Number,
    },
  },
  data() {
    return {
      selectedPage: this.currentPage,
      pageSize: this.defaultPageSize,
    }
  },
  computed: {
    showPagination() {
      return this.totalItems > 0
    },
  },
  watch: {
    currentPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.selectedPage = newValue
      }
    },
    defaultPageSize(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.pageSize = newValue
      }
    },
  },
  methods: {
    handlePagingClick(bvEvent, page) {
      this.$emit('handlePagingClick', page, this.pageSize)
    },
    handlePageSizeChange(pageSize) {
      this.$emit('handlePagingClick', 1, pageSize)
    },
  },
}
</script>
<style>
.NCorePagingModal .page-item {
  padding: 5px !important;
}

.NCorePagingModal .pagination {
  margin-bottom: 0px !important;
}
</style>
