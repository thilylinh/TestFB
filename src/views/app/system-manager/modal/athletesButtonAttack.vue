<template>
  <b-dropdown left
              :variant="vColor"
              size="xs"
              class="nFontButton mr-1 dropleft nButtonDropdown"
              no-caret>
    <template slot="button-content">
      <span class="label"><i class="simple-icon-paper-clip"></i> Chọn {{ titleName }}</span>
    </template>
    <b-dropdown-group header="*. Dữ liệu là hình ảnh">
      <b-dropdown-item-button @click="callUploadFile(1, vGroup)">
        1. Chọn file hình ảnh
      </b-dropdown-item-button>
    </b-dropdown-group>
    <b-dropdown-group header="*. Dữ liệu là file PDF">
      <b-dropdown-item-button @click="callUploadFile(2, vGroup)">
        2. Chọn file PDF
      </b-dropdown-item-button>
    </b-dropdown-group>
  </b-dropdown>
</template>

<script>

export default {
  components: {  },
  directives: {},
  props: {
    titleName: {
      type: String,
      default: ''
    },
    vGroup:{
      type: Number,
      default: 0
    },
    vColor:{
      type: String,
      default: 'danger'
    },
  },
  mixins: [],
  validations: {},
  computed: {},
  data() {
    return {};
  },
  watch: {},
  mounted() {
  },
  methods: {
    async callUploadFile(vType, vGroup) {
      this.$emit('handlerSubmitEvent', {
        vType, vGroup
      })
    }
  },
};
</script>
