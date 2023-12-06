<template>
  <v-select v-model="dataSend"
            :options="dataCombobox || []"
            :reduce="(title) => title.id"
            label="title"
            @input="sendValue"/>
</template>
<script>

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import {mapGetters} from "vuex";

export default {
  components: {
    vSelect
  },
  props: {
    comboboxSend: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
      dataCombobox: [],
      dataSend: ''
    }
  },
  created() {
  },
  computed: {},
  watch: {
    comboboxSend: {
      handler: function (vData) {
        this.dataCombobox = []
        this.dataCombobox = vData.data
        if (vData.dataSend === undefined) vData.dataSend = ''
        if (vData.isShowTitleHeader) {
          if (vData.dataSend !== '') this.dataSend = vData.dataSend
          else this.dataSend = vData.data[0].id
        } else {
          if (vData.dataSend !== '') this.dataSend = vData.dataSend
          else this.dataSend = vData.data != null ? (vData.dataSend !== '' ? vData.dataSend : vData.data[0].id) : ''
        }
      },
      deep: true
    }
  },
  methods: {
    sendValue() {
      this.$emit('handlerSubmitEvent', {
        id: this.dataSend,
        name: this.dataCombobox.find(x => x.id === this.dataSend).title
      })
    },
    returnValue() {
      return {
        id: this.dataSend,
        name: this.dataCombobox.find(x => x.id === this.dataSend).title
      }
    }
  }
};
</script>

