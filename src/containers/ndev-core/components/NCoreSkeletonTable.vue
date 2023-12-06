<template>
  <b-row v-show="$store.state.componentLoading" class="overflow-hidden">
    <b-colxx xxs="12">
      <b-skeleton-table :rows="5"
                        :columns="4"
                        :table-props="{ bordered: true, striped: true }"></b-skeleton-table>
    </b-colxx>
  </b-row>
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

