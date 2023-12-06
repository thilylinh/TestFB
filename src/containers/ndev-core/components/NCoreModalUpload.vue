<template>
  <b-modal
    :id="idModal"
    :hide-footer="true"
    :hide-header-close="false"
    :title="titleModal"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="lg"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col xs="12" sm="6" md="6" lg="6">
          <b-table-simple hover small caption-top responsive bordered striped style="min-height: 300px">
            <b-thead head-variant="dark">
              <b-tr style="font-size: 10px;">
                <b-th class="center">I. FILE TỪ MÁY TÍNH</b-th>
              </b-tr>
            </b-thead>
            <b-tbody style="font-size: 12px;">
              <b-tr>
                <b-td class="text-justify">
                  <b-dropdown id="ddown5" :text="$t('Chọn dữ liệu')" size="xs" variant="primary default"
                              class="mr-1 mb-1">
                    <b-dropdown-item @click="openLinkDifference(1, 1)">
                      <i class="simple-icon-picture"/> {{ $t('Hình ảnh') }}
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click="openLinkDifference(1, 2)">
                      <i class="simple-icon-notebook"/> {{ $t('File') }}
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click="openLinkDifference(1, 3)">
                      <i class="simple-icon-social-instagram"/> {{ $t('Video') }}
                    </b-dropdown-item>
                  </b-dropdown>
                  <input
                    id="processFileImageId"
                    ref="refProcessFileImage"
                    accept="*"
                    class="d-none"
                    type="file"
                    @change="addFileUpload(1)"
                  />
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
        <b-col xs="12" sm="6" md="6" lg="6">
          <b-table-simple hover small caption-top responsive bordered striped style="min-height: 300px;">
            <b-thead head-variant="dark">
              <b-tr style="font-size: 10px;">
                <b-th class="center">II. FILE TỪ LINK KHÁC</b-th>
              </b-tr>
            </b-thead>
            <b-tbody style="font-size: 12px;">
              <b-tr>
                <b-td class="text-justify">
                  <b-dropdown id="ddown5" :text="$t('Nhập link dữ liệu')" size="xs" variant="primary default"
                              class="mr-1 mb-1">
                    <b-dropdown-item @click="openLinkDifference(1, 1)">
                      <i class="simple-icon-picture"/> {{ $t('Hình ảnh') }}
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click="openLinkDifference(1, 2)">
                      <i class="simple-icon-notebook"/> {{ $t('File') }}
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click="openLinkDifference(1, 3)">
                      <i class="simple-icon-social-instagram"/> {{ $t('Video') }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-td>
              </b-tr>
              <b-tr>
                <b-td class="text-justify" style="overflow-x: hidden;">
                  <b-row v-for="(items, index) in dataImageDif" :key="index" style="overflow-x: hidden;">
                    <b-col xs="2" sm="2" md="2" lg="2" class="center">
                      <b-badge style="margin-top: 15%;" variant="success" class="nHover selectCombobox">
                        <i class="simple-icon-settings"></i> {{ $t('Sửa') }}
                      </b-badge>
                      <b-badge variant="danger" class="nHover selectCombobox mt-1">
                        <i class="simple-icon-settings"></i> {{ $t('Xóa') }}
                      </b-badge>
                    </b-col>
                    <b-col xs="8" sm="8" md="8" lg="8" class="nHover selectCombobox">
                      <span class="nFontBold">{{ items.name }}</span>
                      <br/>
                      <small style="font-style: normal;color: blue;">{{ items.link }}</small>
                      <small style="font-style: italic;"
                             v-if="items.description!==''"><br/>{{ items.description }}</small>
                    </b-col>
                    <b-col xs="2" sm="2" md="2" lg="2" class="center">
                      <b-badge v-if="items.flagGroup === 1" style="margin-top: 30%;" variant="success">
                        Img
                      </b-badge>
                      <b-badge v-else-if="items.flagGroup === 2" style="margin-top: 30%;" variant="danger">
                        File
                      </b-badge>
                      <b-badge v-else-if="items.flagGroup === 3" style="margin-top: 30%;" variant="info">
                        Video
                      </b-badge>
                    </b-col>
                    <b-colxx xxs="12">
                      <hr style="margin-top: 5px;margin-bottom: 10px;"/>
                    </b-colxx>
                  </b-row>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
        <b-colxx xxs="12">

        </b-colxx>
      </b-row>
      <n-core-button-run
        ref="refNCoreButtonRunModalQuestion"
        :btn-save-title="'Tải lên'"
        :show-btn-save="'1'"
        @submitEvent="submitEvent"
      />
      <n-core-modal-upload-event
        ref="refNCoreModalUploadEvent"
        @handleSubmitEvent="subEvNCoreModalUploadEvent"
      />
    </b-form>
  </b-modal>
</template>

<script>
import NCoreButtonRun from "./NCoreButtonRun";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";
import NCoreModalUploadEvent from "@/containers/ndev-core/components/NCoreModalUploadEvent";
import {mapActions} from "vuex";

export default {
  components: {
    NCoreModalUploadEvent,
    NCoreButtonRun,
  },
  directives: {},
  props: {},
  computed: {},
  watch: {},
  data() {
    return {
      modalData: [],
      idModal: "NCoreModalUploadId",
      titleModal: "UPLOAD FILE",
      processFile: false,
      isLocal: 'accepted',
      differenceLink: '',
      dataImageDif: []
    };
  },
  methods: {
    ...mapActions(['callStoreCrudUploadEvent']),
    resetStateModal() {
      this.processFile = false;
    },
    async submitEvent(val) {
      if (val) {
        this.$refs.refNCoreButtonRunModalQuestion.processing = true;
        this.$emit("handleSubmitEvent", this.modalData);
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    },
    change_local_file_upload() {
      if (this.isLocal === 'accepted') {
        // Từ máy tính
      } else {
        // Từ link khác
        this.$nextTick(function () {
          this.$refs["input_" + id].focus()
        })
      }
    },
    openUploadFiles() {

    },
    addFileUpload() {

    },
    async openLinkDifference(typeAdd, flag) {
      if (typeAdd === 1) {
        // Thêm mới
        let iTitle = ''
        switch (flag) {
          case 1: {
            iTitle = 'Hình ảnh'
            break;
          }
          case 2: {
            iTitle = 'File'
            break;
          }
          case 3: {
            iTitle = 'Video'
            break;
          }
        }
        await this.callStoreCrudUploadEvent({
          id: this.$refs.refNCoreModalUploadEvent.idModal,
          title: "THÊM MỚI LINK " + iTitle.toUpperCase() + " NGOÀI HỆ THỐNG",
          type: "add",
          funcName: "link ngoài hệ thống",
          data: null,
          flagGroup: flag
        });
        NCoreHelper.v2modalShowHide(this, this.$refs.refNCoreModalUploadEvent.idModal, 1);
      }
    },
    subEvNCoreModalUploadEvent(data) {
      if (data.type === 'add') {
        this.dataImageDif.push(data)
      }
      NCoreHelper.v2modalShowHide(this, this.$refs.refNCoreModalUploadEvent.idModal, 0);
    }
  },
};
</script>
