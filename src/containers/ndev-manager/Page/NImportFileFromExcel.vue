<template>
  <b-modal
    :id="idModal"
    :hide-footer="true"
    :hide-header-close="false"
    cancel-title="Hủy bỏ"
    cancel-variant="outline-primary"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="md"
    :title="titleModal"
    @hidden="resetStateModal"
  >
    <b-form class="content-form ndev-form">
      <b-row>
        <b-colxx xxs="12">
          <b-button size="xs" variant="danger" @click="dowload_template()">
            <i class="simple-icon-cloud-download"></i> Tải file mẫu
          </b-button>
        </b-colxx>
        <b-colxx xxs="12" class="text-center">
          <b-row>
            <b-col class="mt-2" lg="12" md="12" sm="12" xs="12">
              <b-button :class="{'font-weight-700 nFontButton btn-multiple-state btn-shadow': true,
                              'show-spinner': processing }" :disabled="processing"
                        size="xs"
                        type="button" variant="outline-info" @click="openUploadFile()">
                  <span class="spinner d-inline-block">
                                          <span class="bounce1"></span>
                                          <span class="bounce2"></span>
                                          <span class="bounce3"></span>
                                      </span>
                <span class="icon success">
                                          <i class="simple-icon-check"></i>
                                      </span>
                <span class="icon fail">
                                          <i class="simple-icon-exclamation"></i>
                                      </span>
                <span class="label"><i class="simple-icon-paper-clip"></i>Chọn file excel cần import</span>
              </b-button>
              <input id="importFileExcel" ref="refImportFileExcel" accept=".xlsx" class="d-none"
                     type="file" @change="importExcel()">
            </b-col>
            <b-col v-for="(items, index) in importData" :key="index"
                   class="mt-3 nFileMinhChung"
                   lg="12" md="12" sm="12" xs="12">
              <i class="simple-icon-trash font-weight-700" style="color: red"></i> {{ items.name }}
            </b-col>
          </b-row>
        </b-colxx>
      </b-row>
      <n-button-run :btn-save-title="'Upload và lưu file'" :processing="processing" @submitEvent="submitEvent"/>
    </b-form>
  </b-modal>
</template>

<script>

import NButtonRun from "./NButtonRun";
import NCoreHelper from "../../../views/NCoreHelper/NCoreHelper";
import NCoreConfig from "../../../views/NCoreHelper/NCoreConfig";
import {mapActions, mapGetters} from "vuex";
import DelegationProfileApi from "../../../views/app/delegation-profile/api/DelegationProfileApi";
import readXlsxFile from 'read-excel-file'
import MenuManagerApi from "../../../views/app/MenuManager/api/MenuManagerApi";

export default {
  components: {
    NButtonRun
  },
  directives: {},
  props: {},
  computed: {
    ...mapGetters(['stateImportFileFromExcel']),
  },
  watch: {
    stateImportFileFromExcel(val) {
      if (val.id === this.idModal) {
        this.modalData = val
        this.titleModal = val.title
        switch (val.type) {
          case 1: {
            // Ban giám khảo
            this.arrayExcel = [
              'stt',
              'name',
              'duties',
              'workUnit',
              'taskId',
              'subjectId',
              'userName',
              'passWord'
            ]
            break
          }
          case 2: {
            // Đề thi
            this.arrayExcel = [
              'stt',
              'subjectId',
              'classed',
              'weekLearn',
              'planWeekLearn',
              'name',
              'limmitted'
            ]
            break
          }
          default: {
            break
          }
        }

      }
    }
  },
  data() {
    return {
      modalData: [],
      importData: [],
      arrayExcel: [],
      idModal: 'idModalNImportFileFromExcel',
      titleModal: '',
      processing: false,
    }
  },
  methods: {
    ...mapActions(['callStoreLoadingPage']),
    resetStateModal() {
      this.processing = false
    },
    async submitEvent(val) {
      if (val) {
        let iResult = false
        this.processing = true
        const iPortal = JSON.parse(localStorage.getItem(NCoreConfig.projectData))
        // đọc dữ liệu file excel
        const input = this.$refs.refImportFileExcel.files[0]
        const dataInput = []
        readXlsxFile(input).then(async rows => {
          if (rows.length > 0) {
            for (let i = 2; i < rows.length; i++) {
              const c = this.arrayExcel.reduce((previousValue, currentValue, currentIndex) => {
                previousValue[currentValue] = this.checkRowExcel(rows[i][currentIndex])
                return previousValue
              }, {})
              dataInput.push(c)
            }
            // Gửi dữ liệu lên server
            switch (this.modalData.type) {
              case 1: {
                // Ban giám khảo
                await NCoreHelper.excutePOST(this, DelegationProfileApi.ORGANIZING_COMMITTEE_JUDGES_IMPORT_FROM_JSON, {
                  projectId: iPortal.portal,
                  listExcel: dataInput,
                  companyId: NCoreConfig.isGuidEmpty
                }, 'Cập nhật dữ liệu từ excel thành công')
                this.$emit('submitImportFileFromExcel')
                break
              }
              case 2: {
                // Đề thi
                await NCoreHelper.excutePOST(this, MenuManagerApi.TOPIC_EXAM_MANAGER_IMPORT_FROM_JSON, {
                  projectId: iPortal.portal,
                  listExcel: dataInput
                }, 'Cập nhật dữ liệu từ excel thành công')
                this.$emit('submitImportFileFromExcel')
                break
              }
              default: {
                break
              }
            }
          }
        })

        if (iResult) {
          this.processing = false
          this.$emit('submitEvent', true)
        }
      } else {
        this.$bvModal.hide(this.idModal)
      }
    },
    checkRowExcel(a) {
      if (!a) {
        return a
      }
      return a.toString()
    },
    async dowload_template() {
      await this.callStoreLoadingPage(true)
      const iPortal = JSON.parse(localStorage.getItem(NCoreConfig.projectData))
      switch (this.modalData.type) {
        case 1: {
          // Ban giám khảo
          await NCoreHelper.excuteDowloadFile(this, DelegationProfileApi.ORGANIZING_COMMITTEE_JUDGES_TEMPLATE, {
            projectId: iPortal.portal,
            nameFile: this.modalData.fileName
          })
          break
        }
        case 2: {
          // Đề thi
          await NCoreHelper.excuteDowloadFile(this, MenuManagerApi.TOPIC_EXAM_MANAGER_TEMPLATE, {
            projectId: iPortal.portal,
            nameFile: this.modalData.fileName
          })
          break
        }
        default: {
          break
        }
      }
      await this.callStoreLoadingPage(false)
    },
    openUploadFile() {
      document.getElementById('importFileExcel').click()
    },
    async importExcel() {
      this.importData = []
      for (let i = 0; i < this.$refs.refImportFileExcel.files.length; i++) {
        let file = this.$refs.refImportFileExcel.files[i];
        this.importData.push(file)
      }
    },
  },
}
</script>
