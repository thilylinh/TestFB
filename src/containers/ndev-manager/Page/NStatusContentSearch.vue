<template>
  <b-dropdown
    id="status-content"
    :text="`${$t('pages.status-content')} ${sortData.Value}`"
    class="mr-1 float-md-left btn-group"
    size="xs"
    variant="outline-dark"
  >
    <b-dropdown-item
      v-for="(order, index) in statusContentData"
      :key="index"
      @click="handlerStatusSubmit(order)"
    >{{ order.Value }}
    </b-dropdown-item>
  </b-dropdown>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    "v-select": vSelect
  },
  props: ["categories", "statuses"],
  data() {
    return {
      statusContentData: [],
      sortData: {},
      statusId: 0,
    };
  },
  created() {
    this.callStatus()
  },
  computed: {
    ...mapGetters(['statusData'])
  },
  watch:{
    statusData: {
      deep: true,
      handler(val) {
        this.statusContentData = val
        this.sortData = val[0]
      }
    }
  },
  methods: {
    ...mapActions(['callStatus']),
    handlerStatusSubmit(val) {
      this.sortData = val
      this.$emit('handlerStatusSubmit', val.Key)
    },
  }
};
</script>

