<template>
  <b-modal :id="pageIdModal"
           :hide-footer="true"
           :hide-header-close="false"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="md"
           :title="'CẬP NHẬT QUYỀN TRUY CẬP'"
           @shown="callOpenPage"
           @hidden="resetStateModal">
    <b-row>
      <b-colxx xxs="12">
        <b-table-simple small caption-top responsive bordered>
          <b-thead head-variant="dark">
            <b-tr style="font-size: 10px;">
              <b-th class="sttWidth center">#</b-th>
              <b-th class="sttWidth center"></b-th>
              <b-th class="center">TÊN QUYỀN TRUY CẬP</b-th>
            </b-tr>
          </b-thead>
          <b-tbody style="font-size: 12px;">
            <n-core-skeleton-tr/>
            <b-tr v-show="!$store.state.componentLoadingRunFunctionInModal"
                  v-if="pageData.length > 0"
                  v-for="(items, index) in pageData"
                  :key="index">
              <b-td class="sttWidth center">{{ index + 1 }}</b-td>
              <b-td class="nFontBold nColorBlue center">
                <b-form-checkbox v-model="items.checked"
                                 unchecked-value="0"
                                 value="1">
                  <span class="nHover selectCombobox"></span>
                </b-form-checkbox>
              </b-td>
              <b-td class="text-justify">{{ items.name }}</b-td>
            </b-tr>
            <b-tr v-show="!$store.state.componentLoadingRunFunctionInModal"
                  v-if="pageData.length === 0">
              <b-td colspan="10" class="center">
                <span v-html="emptyData"></span>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-colxx>
      <b-colxx xxs="12" class="center">
        <n-core-button-run :show-btn-save="'1'"
                           ref="refNotificationView_BtnSave"
                           @submitEvent="subEvNotificationView_BtnSave"/>
      </b-colxx>
    </b-row>
  </b-modal>
</template>

<script>
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreSkeletonTr from "@/containers/ndev-core/components/NCoreSkeletonTr";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import sortMenuManagerApi from "@/views/app/system-manager/api/sortMenuManagerApi";

export default {
  components: {
    NCoreButtonRun,
    NCoreSkeletonTr,
    NCoreSkeleton,
  },
  directives: {},
  props: ['sendParam'],
  mixins: [],
  validations: {},
  computed: {},
  data() {
    return {
      pageIdModal: "sortMenuPermissionPageIdModal",
      emptyData: NCoreConfig.noDataTemplateModal,
      pageData: [],
      sortMenuId: ''
    };
  },
  watch: {
    sendParam: {
      handler: function (vData) {
        this.sortMenuId = vData
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    async callOpenPage() {
      this.$showLoadingRunFunctionInModal()
      this.pageData = []
      this.pageData = await NCoreHelper.v2executeGET(this, sortMenuManagerApi.PERMISSION, {id: this.sortMenuId})
      this.$hideLoadingRunFunctionInModal()
    },
    resetStateModal() {
      this.$hideProcessing()
    },
    async subEvNotificationView_BtnSave(isSave) {
      if (isSave) {
        this.$showProcessing()
        let iValue = 0
        for (let i = 0; i < this.pageData.length; i++) {
          if (parseInt(this.pageData[i].checked) === 1) iValue += this.pageData[i].value
        }
        const iResult = await NCoreHelper.v2executePOST(this, sortMenuManagerApi.PERMISSION_UPDATE, {
          id: this.pageData[0].authoritiesDetailId,
          value: iValue
        })
        if (iResult) {
          NCoreHelper.v2alertMess(
            this,
            'Cập nhật giá trị quyền thành công',
            2
          );
          this.$emit('handlerSubmitEvent', true)
        } else {
          NCoreHelper.v2alertMess(
            this,
            'Cập nhật giá trị quyền thất bại',
            1
          );
          this.$hideProcessing()
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.pageIdModal, 0)
      }
    },
  },
};
</script>
