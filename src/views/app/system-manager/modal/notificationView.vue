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
           :title="'CHI TIẾT THÔNG BÁO'"
           @shown="callOpenPage"
           @hidden="resetStateModal">
    <b-row>
      <b-colxx class="nModal_BootTrap" xxs="12">
        <b-card class="no-header">
          <b-table-simple small caption-top responsive bordered>
            <b-tbody style="font-size: 12px;">
              <n-core-skeleton-tr/>
              <b-tr v-show="!$store.state.componentLoadingRunFunctionInModal"
                    v-if="pageData !== null">
                <b-td style="width: 100px">
                  <label>Tiêu đề</label>
                </b-td>
                <b-td class="nFontBold nColorBlue">{{ pageData.name }}</b-td>
              </b-tr>
              <b-tr v-show="!$store.state.componentLoadingRunFunctionInModal"
                    v-if="pageData !== null">
                <b-td style="width: 100px">
                  <label>Nội dung</label>
                </b-td>
                <b-td class="nFontBold nColorRed">{{ pageData.content }}</b-td>
              </b-tr>
              <b-tr v-show="!$store.state.componentLoadingRunFunctionInModal"
                    v-if="pageData !== null">
                <b-td style="width: 100px">
                  <label>Thời gian</label>
                </b-td>
                <b-td class="nFontBold">{{ pageData.dateSend | formatDateNotification }}</b-td>
              </b-tr>
              <b-tr v-show="!$store.state.componentLoadingRunFunctionInModal"
                    v-if="pageData !== null">
                <b-td style="width: 100px">
                  <label>Người gửi</label>
                </b-td>
                <b-td class="nFontBold">{{ pageData.authorName }}</b-td>
              </b-tr>
              <b-tr v-show="!$store.state.componentLoadingRunFunctionInModal"
                    v-if="pageData !== null">
                <b-td style="width: 100px">
                  <label>File đính kèm</label>
                </b-td>
                <b-td>
                  <b-table-simple small responsive>
                    <b-tbody style="font-size: 12px;">
                      <b-tr v-for="(items, index) in pageData.fileModels"
                            :key="index">
                        <b-td class="nHover selectCombobox">
                          <span @click="viewFile(items)">{{ index + 1 }}. {{ items.Value }}</span>
                        </b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-td>
              </b-tr>
              <b-tr v-show="!$store.state.componentLoadingRunFunctionInModal"
                    v-if="pageData === null">
                <b-td colspan="2" class="center">
                  <span v-html="emptyData"></span>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-card>
      </b-colxx>
      <b-colxx xxs="12" class="center">
        <n-core-button-run :show-btn-save="'0'"
                           ref="refNotificationView_BtnSave"
                           @submitEvent="subEvNotificationView_BtnSave"/>
        <n-core-view-file-modal ref="refNotificationView_ViewFileModal"/>
        <n-view-page-img ref="refNotificationView_ViewImg"/>
      </b-colxx>
    </b-row>
  </b-modal>
</template>

<script>
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NCoreButtonSelectAll from "@/containers/ndev-core/components/NCoreButtonSelectAll";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCorePagingModal from "@/containers/ndev-core/components/NCorePagingModal";
import NButtonDefaultSearch from "@/containers/ndev-core/button_default/NButtonDefaultSearch";
import NCoreSkeletonTr from "@/containers/ndev-core/components/NCoreSkeletonTr";
import NCoreButtonRun from "@/containers/ndev-core/components/NCoreButtonRun";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import notificationManagerApi from "@/views/app/system-manager/api/notificationManagerApi";
import NCoreViewPdf from "@/containers/ndev-core/components/NCoreViewPdf";
import {mapActions, mapGetters} from "vuex";
import NCoreViewFileModal from "@/containers/ndev-core/components/NCoreViewFileModal";
import NViewPageImg from "@/containers/ndev-manager/ViewPage/NViewPageImg";

export default {
  components: {
    NViewPageImg,
    NCoreViewFileModal,
    NCoreViewPdf,
    NCoreButtonRun,
    NCoreSkeletonTr,
    NButtonDefaultSearch,
    NCorePagingModal,
    NCoreButtonSelectAll,
    NCoreSkeleton,
  },
  directives: {},
  props: {  },
  mixins: [],
  validations: {},
  computed: {
    ...mapGetters(['storeSendNotificationView'])
  },
  data() {
    return {
      pageIdModal: "notificationViewPageIdModal",
      emptyData: NCoreConfig.noDataTemplateModal,
      pageData: null,
      modalData: null,
      viewFileUrl: ''
    };
  },
  watch: {},
  mounted() {
  },
  methods: {
    ...mapActions(['callStoreViewFile']),
    async callOpenPage() {
      this.$showLoadingRunFunctionInModal()
      this.modalData = this.$store.state.storeCombobox.storeSendNotificationView
      setTimeout(await this.fetchData(), 500)
    },
    async fetchData() {
      this.pageData = ''
      this.pageData = await NCoreHelper.v2executeGETById(
          this,
          this.modalData.isUser
              ? notificationManagerApi.NOTIFICATION_MANAGER_GET_VIEW_NOTIFICATION
              : notificationManagerApi.NOTIFICATION_MANAGER_GET_VIEW_NOTIFICATION_HOME,
          this.modalData.notificationId)
      this.$forceUpdate()
      this.$hideLoadingRunFunctionInModal()
    },
    resetStateModal() {
      this.dataSend = ''
    },
    subEvNotificationView_BtnSave() {
      NCoreHelper.v2modalShowHide(this, this.pageIdModal, 0)
    },
    async viewFile(vData) {
      await this.callStoreViewFile({
        id: vData.Key,
        name: vData.Value
      })
      NCoreHelper.v2modalShowHide(this, this.$refs.refNotificationView_ViewFileModal.pageId, 1)
    }
  },
};
</script>
