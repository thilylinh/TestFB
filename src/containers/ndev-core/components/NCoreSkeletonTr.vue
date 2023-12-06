<template>
  <b-tr v-show="$store.state.componentLoadingRunFunctionInModal" class="overflow-hidden">
   <b-td class="center" colspan="100">
     <b-skeleton-table :rows="5"
                       :columns="4"
                       :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
     </b-td>
  </b-tr>
</template>
<script>

export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  created() {
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>

