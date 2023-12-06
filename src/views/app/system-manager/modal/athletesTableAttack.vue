<template>
  <b-table-simple small caption-top responsive bordered>
    <b-thead head-variant="dark">
      <b-tr style="font-size: 10px;">
        <b-th class="sttWidth center" rowspan="2">#</b-th>
        <b-th class="sttWidth center" colspan="2">CHỨC NĂNG</b-th>
        <b-th class="center" rowspan="2">TÊN {{ titleName }}</b-th>
      </b-tr>
      <b-tr style="font-size: 10px;">
        <b-th class="sttWidth center">XÓA</b-th>
        <b-th class="sttWidth center">XEM</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="(items, index) in documentData"
            :key="index"
            v-if="documentLength > 0">
        <b-td class="center">{{ index + 1 }}</b-td>
        <b-td class="center nHover selectCombobox"
              @click="deleteFile(items)"
              v-if="showDeleted === 1">
          <i class="simple-icon-trash font-weight-700" style="color: red"></i>
        </b-td>
        <b-td v-if="showDeleted === 0"></b-td>
        <b-td class="center nHover selectCombobox"
              @click="viewFile(items)">
          <i class="simple-icon-eyeglass font-weight-700" style="color: red"></i>
        </b-td>
        <b-td class="text-justify nHover selectCombobox">
          {{ items.fileName }}
        </b-td>
      </b-tr>
      <b-tr v-if="documentLength === 0">
        <b-td colspan="4" class="center" v-html="emptyTemplate"></b-td>
      </b-tr>
      <n-core-view-file-modal ref="refNotificationView_ViewFileModal"/>
      <n-view-page-img ref="refAthleteTableAttack_ViewImg"/>
    </b-tbody>
  </b-table-simple>
</template>

<script>

import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NViewPageImg from "@/containers/ndev-manager/ViewPage/NViewPageImg";
import {mapActions} from "vuex";
import serverFileApi from "@/views/app/system-manager/api/serverFileApi";
import NCoreViewFileModal from "@/containers/ndev-core/components/NCoreViewFileModal";

export default {
  components: {NCoreViewFileModal, NViewPageImg},
  directives: {},
  props: {
    titleName: {
      type: String,
      default: ''
    },
    documentData: {
      type: Object,
      default: []
    },
    documentLength: {
      type: Number,
      default: 0
    },
    showDeleted: {
      type: Number,
      default: 1
    }
  },
  mixins: [],
  validations: {},
  computed: {},
  data() {
    return {
      emptyTemplate: NCoreConfig.tableNoDataTemplate
    };
  },
  watch: {},
  mounted() {
  },
  methods: {
    ...mapActions(['callStoreSendViewImage', 'callStoreViewFile']),
    async callUploadFile(vType, vGroup) {
      this.$emit('handlerSubmitEvent', {
        vType, vGroup
      })
    },
    async deleteFile(vData) {
      this.$emit('handlerSubmitEvent', vData)
    },
    async viewFile(vData) {
      this.$showAllPageLoading()
      switch (vData.fileType) {
        case 1: {
          let iUrl = ''
          if (vData.isLocal)
            iUrl = await NCoreHelper.v2executeViewFile(this, serverFileApi.SERVER_FILE_VIEW_FILE, vData.id)
          else
            iUrl = await NCoreHelper.v2executeViewFileDifference(this, serverFileApi.SERVER_FILE_VIEW_FILE, vData.id)
          await this.callStoreSendViewImage({
            url: iUrl
          })
          NCoreHelper.v2modalShowHide(this, 'NViewPageImgPageId', 1)
          break;
        }
        case 2: {
          await this.callStoreViewFile({
            id: vData.id,
            name: vData.fileName
          })
          NCoreHelper.v2modalShowHide(this, 'NCoreViewFileModalPageId', 1)
          break;
        }
      }
    }
  },
};
</script>
