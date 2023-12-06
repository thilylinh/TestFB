<template>
  <div
    v-if="showPagination"
    class="pagination-container"
  >
    <div class="d-flex justify-content-between flex-wrap">
      <!--      <div-->
      <!--        v-if="showPageSelect===true"-->
      <!--        class="d-flex align-items-center mb-0 mt-1"-->
      <!--      >-->
      <!--        <span class="text-nowrap">-->
      <!--          &lt;!&ndash; {{ $t('common.pagination.show') }} &ndash;&gt;-->
      <!--          Hiển thị-->
      <!--        </span>-->
      <!--        <b-form-select-->
      <!--          v-model="pageSize"-->
      <!--          :options="[10,20,50,100,150,200,300,500]"-->
      <!--          class="mx-1"-->
      <!--          @input="handlePageSizeChange"-->
      <!--        >-->
      <!--        </b-form-select>-->
      <!--        <span class="text-nowrap">của {{ `${totalItems}` }} mục</span>-->
      <!--      </div>-->
      <div class="page-number" style="margin: 0 auto;">
        <b-pagination v-model="selectedPage"
                      :per-page="pageSize"
                      :total-rows="totalItems"
                      class="mt-1 mb-0"
                      @page-click="handlePagingClick">
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

<style lang="scss" scoped>
.pagination-container {
  margin-top: 1rem;

  .page-size {
    margin-left: 1rem;
    margin-right: 2rem;
  }

  .icon {
    width: 8px;
  }
}
</style>
<style lang="scss">
.pagination-container {
  .page-link {
    background-color: #f6faff;
  }

  .page-item.disabled {
    .page-link {
      background-color: #f6faff;
    }
  }

  .text-nowrap {
    margin-left: 1rem;
  }

  .page-number {
    margin-right: 1rem;
  }
}

@media (min-width: 375px) and (max-width: 425px) {
  .pagination-container {
    .page-number {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-right: 1rem;
    }
  }
}

.page-item.active .page-link {
  background: red !important;
  border: 1px solid yellowgreen !important;
  color: whitesmoke !important;
  font-weight: 700 !important;
}
</style>
