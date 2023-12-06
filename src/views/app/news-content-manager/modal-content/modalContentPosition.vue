<template>
  <b-modal :id="pageId"
           :hide-footer="true"
           :hide-header-close="false"
           :title="pageTitle"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="lg"
           @shown="callOpenModal()"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col xs="12">
          <b-table-simple small caption-top responsive bordered>
            <b-thead head-variant="dark">
              <b-tr style="font-size: 10px;">
                <b-th class="sttWidth center" rowspan="2">#</b-th>
                <b-th class="center" colspan="2">CHỨC NĂNG</b-th>
                <b-th class="center" rowspan="2" style="width: 150px">LOẠI NỘI DUNG</b-th>
                <b-th class="center" rowspan="2">TÊN NỘI DUNG</b-th>
              </b-tr>
              <b-tr style="font-size: 10px;">
                <b-th class="sttWidth center">Lên</b-th>
                <b-th class="sttWidth center">Xuống</b-th>
              </b-tr>
            </b-thead>
            <b-tbody style="font-size: 12px;">
              <b-tr v-for="(items, index) in sortedPageData">
                <b-td class="sttWidth center">{{ index + 1 }}</b-td>
                <b-td class="sttWidth center nFontBold nColorBlue nHover selectCombobox"
                      @click="callAction(items, 1)"
                      v-if="items.position > 1">
                  <i class="iconsminds-arrow-outside-gap" title="Lên"></i> Lên
                </b-td>
                <b-td v-else-if="items.position === 1"></b-td>
                <b-td class="sttWidth center nFontBold nColorRed nHover selectCombobox"
                      @click="callAction(items, 2)"
                      v-if="items.position < maxPosition">
                  <i class="iconsminds-arrow-inside-gap" title="Xuống"></i> Xuống
                </b-td>
                <b-td v-else-if="items.position === maxPosition"></b-td>
                <b-td class="center">
                  <b-badge pill variant="success">{{ returnNewsContentTypeName(items.contentFlagKey) }}</b-badge>
                </b-td>
                <b-td>{{ items.name }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
      <n-core-button-run :show-btn-save="'1'"
                         :btn-save-title="'Lưu dữ liệu'"
                         ref="refModalContentPosition_BtnSave"
                         @submitEvent="subEvModalContentPosition_BtnSave"/>
    </b-form>
  </b-modal>
</template>
<script>

import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import {mapGetters} from "vuex";

export default {
  components: {
    NCoreButtonRun
  },
  props: {},
  data() {
    return {
      pageId: 'ModalContentPosition_Id',
      pageTitle: 'THAY ĐỔI VỊ TRÍ HIỂN THỊ',
      maxPosition: 0,
      pageData: []
    };
  },
  mixins: [],
  validations: {},
  methods: {
    //==============================================PAGE================================================================
    async callOpenModal() {
      const iDataReceive = this.$store.state.storeCrud.storeSendViewContent
      if (iDataReceive.id === this.pageId) {
        this.pageData = iDataReceive.data
        for (let i = 0; i < iDataReceive.data.length; i++) {
          if (iDataReceive.data[i].position > this.maxPosition) this.maxPosition = iDataReceive.data[i].position
        }
      }
    },
    async resetStateModal() {
    },
    //==================================================================================================================
    //==================================================SAVE-ALL========================================================
    returnNewsContentTypeName(val) {
      return NCoreHelper.returnNewsContentTypeName(val)
    },
    async subEvModalContentPosition_BtnSave(isSave) {
      if (isSave) {
        this.$emit('handlerSubmitEvent', {
          result: true,
          data: this.pageData
        })
      } else {
        this.$emit('handlerSubmitEvent', {
          result: false,
          data: null
        })
      }
    },
    async callAction(vData, flag) {
      const iPositionNow = flag === 1 ? vData.position - 1 : vData.position + 1
      if (flag === 1) {
        //===Tăng lên===> Tìm vị trí phía trên cần thay thế
        const iPosition = this.pageData.find(o => o.position === vData.position - 1)
        this.pageData.find(o => o.id === iPosition.id).position = iPositionNow + 1
      } else {
        //===Giảm xuống===> Tìm vị trí phía dưới cần thay thế
        const iPosition = this.pageData.find(o => o.position === vData.position + 1)
        this.pageData.find(o => o.id === iPosition.id).position = iPositionNow - 1
      }
      this.pageData.find(o => o.id === vData.id).position = iPositionNow
    }
    //==================================================================================================================
  },
  computed: {
    ...mapGetters(['storeSendViewContent']),
    sortedPageData: function () {
      function compare(a, b) {
        if (a.position < b.position)
          return -1;
        if (a.position > b.position)
          return 1;
        return 0;
      }

      return this.pageData.sort(compare);
    }
  },
  watch: {},
  created() {
  },
  async mounted() {
  },
};
</script>
