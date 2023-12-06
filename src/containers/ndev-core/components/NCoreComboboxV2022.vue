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
  props: {},
  data() {
    return {
      dataCombobox: [],
      dataSend: ''
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['storeSendComboboxV2022'])
  },
  watch: {
    storeSendComboboxV2022: {
      handler: async function (val) {
        this.dataCombobox = []
        this.dataCombobox = val.data
        if (val.isShowTitleHeader) {
          if (val.dataSend !== '') this.dataSend = val.dataSend
          else this.dataSend = val.data[0].id
        } else {
          if (val.dataSend !== '') this.dataSend = val.dataSend
          else this.dataSend = val.data != null ? (val.dataSend !== '' ? val.dataSend : val.data[0].id) : ''
        }
      },
      deep: true
    },
  },
  methods: {
    sendValue() {
      this.$emit('handlerSubmitEvent', {
        id: this.dataSend,
        name: this.dataCombobox.find(x => x.id === this.dataSend).title
      })
    },
    returnValue() {
      if (this.dataSend === undefined)
        return {
          id: '0',
          name: ''
        }
      return {
        id: this.dataSend,
        name: this.dataCombobox.find(x => x.id === this.dataSend).title
      }
    }
  }
};
</script>

