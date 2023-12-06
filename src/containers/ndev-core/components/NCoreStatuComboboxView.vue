<template>
  <b-dropdown :text="NStatusDataViewName" size="xs" variant="dark" class="mr-1 NStatusDataView">
    <b-dropdown-item @click="changeValue(0, 'Tất cả')">1. Tất cả</b-dropdown-item>
    <b-dropdown-item @click="changeValue(1, 'Khóa')">2. Khóa</b-dropdown-item>
    <b-dropdown-item @click="changeValue(2, 'Chờ duyệt')">3. Chờ duyệt</b-dropdown-item>
    <b-dropdown-item @click="changeValue(3, 'Hoạt động')">4. Hoạt động</b-dropdown-item>
  </b-dropdown>
</template>
<script>

export default {
  components: {},
  props: {},
  data() {
    return {
      NStatusDataViewName: 'Trạng thái: -- Tất cả --'
    }
  },
  created() {
  },
  computed: {},
  watch: {},
  methods: {
    changeValue(flag, message) {
      this.NStatusDataViewName = 'Trạng thái: -- ' + message + ' --'
      this.$emit('handlerSubmitEvent', flag)
    }
  }
};
</script>
<style>
.NStatusDataView button {
  color: whitesmoke !important;
}
</style>

