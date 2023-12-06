<template>
  <!-- <cleave v-model="vModel"
          :options="options.number"
          :raw="false"
          autocomplete="off"
          class="form-control text-center"
          :placeholder="vPlaceholder"
          @input="cleaveChange()"/> -->
</template>
<script>
// import Cleave from "vue-cleave-component";

export default {
  // components: {
  //   Cleave
  // },
  props: {
    vModel: {
      type: String,
      default: '0'
    },
    vPlaceholder: {
      type: String,
      default: '0'
    },
    vData: {
      type: Object,
      default: []
    },
  },
  data() {
    return {
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: "thousand",
        },
      },
    }
  },
  created() {
  },
  computed: {},
  watch: {},
  methods: {
    cleaveChange() {
      this.$emit('handlerSubmitEvent', {
        id: this.vData.id,
        value: this.vModel
      })
    }
    // handler_runAction(flag) {
    //   this.$emit('handlerSubmitEvent', {
    //     id: flag,
    //     dataContentId: this.dataId,
    //     dataContentName: this.dataName
    //   })
    // }
  }
};
</script>

