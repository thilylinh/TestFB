<template>
  <!--  <b-tr v-if="flagGroup === 1" v-show="$store.state.componentLoadingRunFunctionInModal" class="overflow-hidden">-->
  <!--    <b-td>-->
  <!--      <b-skeleton-table-->
  <!--        :rows="5"-->
  <!--        :columns="4"-->
  <!--        :table-props="{ bordered: true, striped: true }"-->
  <!--      ></b-skeleton-table>-->
  <!--    </b-td>-->
  <!--  </b-tr>-->
  <!--  <b-tr v-else-if="flagGroup === 2" v-show="$store.state.componentLoadingRunFunctionInModal" class="overflow-hidden">-->
  <!--    <b-td class="center">-->
  <!--      <b-img-lazy src="/images/gif/loading_duck_amination.gif"/>-->
  <!--    </b-td>-->
  <!--  </b-tr>-->
  <!--  <b-row v-else-if="flagGroup === 3" v-show="$store.state.componentLoading" class="overflow-hidden">-->
  <!--    <b-colxx xxs="12">-->
  <!--      <b-skeleton-table-->
  <!--        :rows="5"-->
  <!--        :columns="4"-->
  <!--        :table-props="{ bordered: true, striped: true }"-->
  <!--      ></b-skeleton-table>-->
  <!--    </b-colxx>-->
  <!--  </b-row>-->
  <!--  <div v-else-if="flagGroup === 4" v-show="$store.state.componentLoadingRunFunctionInModal" class="overflow-hidden">-->
  <!--    <b-skeleton-table-->
  <!--      :rows="5"-->
  <!--      :columns="4"-->
  <!--      :table-props="{ bordered: true, striped: true }"-->
  <!--    ></b-skeleton-table>-->
  <!--  </div>-->
  <!--  <div v-else-if="flagGroup === 5" v-show="$store.state.componentLoadingRunFunctionInModal" class="overflow-hidden">-->
  <!--    <div class="loading_css">-->
  <!--      <b-img-lazy src="/images/gif/loading_2.gif" style="width: 150px"/>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script>

export default {
  components: {},
  props: {
    flagGroup: 0,
  },
  data() {
    return {
      skeletonData: '',
    }
  },
  created() {
  },
  computed: {},
  watch: {
    flagGroup: function (val) {
      switch (val) {
        case 1: {
          this.skeletonData =
            '  <b-tr v-if="flagGroup === 1" v-show="$store.state.componentLoadingRunFunctionInModal" class="overflow-hidden">\n' +
            '      <b-td>\n' +
            '        <b-skeleton-table\n' +
            '          :rows="5"\n' +
            '          :columns="4"\n' +
            '          :table-props="{ bordered: true, striped: true }"\n' +
            '        ></b-skeleton-table>\n' +
            '      </b-td>\n' +
            '    </b-tr>'
          break
        }
        case 2: {
          this.skeletonData =
            '<b-tr v-show="$store.state.componentLoadingRunFunctionInModal" class="overflow-hidden">\n' +
            ' <b-td class="center">\n' +
            '   <b-img-lazy src="/images/gif/loading_duck_amination.gif"/>\n' +
            ' </b-td>\n' +
            '</b-tr>'
          break
        }
        case 3: {
          this.skeletonData =
            '  <b-row v-show="$store.state.componentLoading" class="overflow-hidden">\n' +
            '      <b-colxx xxs="12">\n' +
            '        <b-skeleton-table\n' +
            '          :rows="5"\n' +
            '          :columns="4"\n' +
            '          :table-props="{ bordered: true, striped: true }"\n' +
            '        ></b-skeleton-table>\n' +
            '      </b-colxx>\n' +
            '    </b-row>'
          break
        }
        case 4:{
          this.skeletonData =
            '    <div v-else-if="flagGroup === 4" v-show="$store.state.componentLoadingRunFunctionInModal" class="overflow-hidden">\n' +
            '      <b-skeleton-table\n' +
            '        :rows="5"\n' +
            '        :columns="4"\n' +
            '        :table-props="{ bordered: true, striped: true }"\n' +
            '      ></b-skeleton-table>\n' +
            '    </div>'
          break
        }
        case 5:{
          this.skeletonData =
            '  <div v-else-if="flagGroup === 5" v-show="$store.state.componentLoadingRunFunctionInModal" class="overflow-hidden">\n' +
            '      <div class="loading_css">\n' +
            '        <b-img-lazy src="/images/gif/loading_2.gif" style="width: 150px"/>\n' +
            '      </div>\n' +
            '    </div>'
          break
        }
      }
    }
  },
  methods: {}
};
</script>

