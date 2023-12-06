<template>
  <div class="contactRightButton">
    <div class="support" v-if="hideSupport === 1">
      <b-row>
        <b-col xs="12" sm="12" md="12" lg="12">
          <a class="items-support" href="https://www.facebook.com/itphonuiinc" title="Fanpage: itphonuiinc"
             target="_blank">
            <span>
              <b-img-lazy src="/images/icon/facebook.png" alt="Facebook" style="width: 40px;"/>
            </span>
            <span class="title">Fanpage: itphonuiinc</span>
          </a>
        </b-col>
        <b-col xs="12" sm="12" md="12" lg="12">
          <hr class="items-hr"/>
        </b-col>
        <b-col xs="12" sm="12" md="12" lg="12">
          <a class="items-support" href="https://zalo.me/0989812739" title="Zalo: 0989.812.739" target="_blank">
            <span>
              <b-img-lazy src="/images/icon/zalo.png" alt="Zalo: 0989.812.739" style="width: 40px;"/>
            </span>
            <span class="title">Zalo: 0989.812.739</span>
          </a>
        </b-col>
        <b-col xs="12" sm="12" md="12" lg="12">
          <hr class="items-hr"/>
        </b-col>
        <b-col xs="12" sm="12" md="12" lg="12">
          <a class="items-support" href="https://itphonui.com/" title="Website: itphonui.com" target="_blank">
            <span>
              <b-img-lazy src="/images/icon/website.png" alt="Website: itphonui.com" style="width: 40px;"/>
            </span>
            <span class="title">Website: itphonui.com</span>
          </a>
        </b-col>
        <b-col xs="12" sm="12" md="12" lg="12">
          <hr class="items-hr"/>
        </b-col>
        <b-col xs="12" sm="12" md="12" lg="12">
          <a class="items-support" href="tel:0989812739" title="Website: itphonui.com">
            <span>
              <b-img-lazy src="/images/icon/phone.png" alt="Điện thoại: 0989.812.739" style="width: 40px;"/>
            </span>
            <span class="title">Điện thoại: 0989.812.739</span>
          </a>
        </b-col>
      </b-row>
    </div>
    <div class="iconRight">
      <button type="button"
              class="btn icon-button large ml-1 btn-success"
              title="Trợ giúp"
              @click="openSupport">
        <i class="simple-icon-earphones-alt" style="font-weight: bold;"></i>
      </button>
      <br/>
      <span class="nHover" @click="openSupport">Liên hệ/Hỗ trợ</span>
    </div>
  </div>
</template>
<script>

export default {
  components: {},
  props: {},
  data() {
    return {
      pageId: 'contactRightIconPageId',
      hideSupport: 0
    };
  },
  mixins: [],
  validations: {},
  methods: {
    openSupport() {
      this.hideSupport = this.hideSupport === 1 ? 0 : 1
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  async mounted() {

  },
};
</script>
<style>
.iconRight{
  text-align: center;
  font-weight: bold;
  color: blue;
  font-family: Verdana;
}
</style>
