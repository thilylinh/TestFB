<template>
  <b-modal :id="idModal"
           :hide-footer="true"
           :hide-header-close="true"
           :title="titleModal"
           cancel-title="Hủy bỏ"
           cancel-variant="outline-primary"
           centered
           no-close-on-backdrop
           ok-title="Lưu"
           size="xl"
           @hidden="resetStateModal">
    <b-form class="content-form ndev-form">
      <b-row>
        <b-col xs="12" sm="6" md="6">
          <b-row>
            <b-col lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">1. Tên quyền sử dụng</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <b-form-input id="authorityManagerEvent_txtTenChucNang"
                            v-model="$v.form.authorityName.$model"
                            :state="!$v.form.authorityName.$error"
                            autocomplete="off"
                            autofocus
                            placeholder="Nhập tên quyền sử dụng ..."/>
              <b-form-invalid-feedback v-if="!$v.form.authorityName.required">
                Không được bỏ trống
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-else-if="!$v.form.authorityName.maxLength">
                Độ dài tối đa 500 kí tự
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
<!--          <b-row class="mt-1">-->
<!--            <b-col lg="12" md="12" sm="12" xs="12">-->
<!--              <label class="font-weight-700">2. Dự án</label>-->
<!--            </b-col>-->
<!--            <b-col lg="12" md="12" sm="12" xs="12" class="center nFontBold nColorRed">-->
<!--              {{ projectName }}-->
<!--            </b-col>-->
<!--          </b-row>-->
          <b-row class="mt-1">
            <b-col lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">2. Ghi chú</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12">
              <textarea rows="5"
                        v-model="$v.form.authorityDescription.$model"
                        class="form-control"
                        id="authorityManagerEvent_txtGhiChu"
                        placeholder="Mô tả quyền sử dụng ..."/>
            </b-col>
          </b-row>
        </b-col>
        <b-col xs="12" sm="6" md="6">
          <b-row>
            <b-col class="mt-1" lg="12" md="12" sm="12" xs="12">
              <label class="font-weight-700">3. Quyền sử dụng chi tiết</label>
            </b-col>
            <b-col lg="12" md="12" sm="12" xs="12" style="max-height: 500px;overflow: hidden;overflow-y: scroll;">
              <v-jstree :data="dataTree"
                        allow-batch
                        multiple
                        show-checkbox
                        whole-row>
                <template scope="_">
                  <div style="display: inherit;">
                    <i v-if="!_.model.loading" :class="_.vm.themeIconClasses" role="presentation"></i>
                    {{ _.model.text }}
                  </div>
                </template>
              </v-jstree>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <n-core-button-run :btnSaveTitle="'Lưu dữ liệu'"
                         :showBtnSave="'1'"
                         @submitEvent="subEvNCoreButtonRun"
                         ref="refNCoreButtonRun"/>
    </b-form>
  </b-modal>
</template>

<script>
import {maxLength, required} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {mapGetters} from "vuex";
import VJstree from 'vue-jstree'
import NCoreButtonRun from "../../../../../containers/ndev-core/components/NCoreButtonRun";
import NCoreHelper from "../../../../NCoreHelper/NCoreHelper";
import NCoreConfig from "../../../../NCoreHelper/NCoreConfig";
import authorityManagerApi from "../../api/authorityManagerApi";

export default {
  components: {
    NCoreButtonRun,
    VJstree,
  },
  directives: {},
  props: {},
  mixins: [validationMixin],
  validations: {
    form: {
      authorityName: {
        required,
        maxLength: maxLength(500),
      },
      authorityDescription: {}
    }
  },
  computed: {
    ...mapGetters(['storeCrudUpdate']),
  },
  data() {
    return {
      idModal: "authorityManagerEventId",
      titleModal: "",
      dataTree: [],
      modalData: [],
      form: {
        authorityName: '',
        authorityDescription: '',
      },
      projectName: ''
    };
  },
  watch: {
    storeCrudUpdate: async function (val) {
      if (this.idModal === val.id) {
        this.titleModal = val.title.toUpperCase()
        if (val.data != null) {
          this.form.authorityName = val.data.name
          this.form.authorityDescription = val.data.description
        } else {
          this.form.authorityName = ''
          this.form.authorityDescription = ''
        }
        this.dataTree = []
        this.dataTree = val.dataAuthorities
        this.projectName = val.projectName
        this.modalData = val
      }
      this.$hideAllPageLoading()
    }
  },
  methods: {
    resetStateModal() {
      this.form.authorityName = ''
      this.form.authorityDescription = ''
    },
    runAuthorities(data, dataSend) {
      if (data.children != null) {
        // Có thằng con
        dataSend.push({
          id: data.id,
          parentId: data.parentId,
          name: data.text,
          value: data.selected === true ? (NCoreConfig.isGuidEmpty === data.parentId ? 1 : (data.parentCount > 0 ? 1 : 0)) : 0,
        })

        for (let i = 0; i < data.children.length; i++) {
          this.runAuthorities(data.children[i], dataSend)
        }
      } else {
        if (data.selected === true) {
          let iFind = dataSend.find(x => x.id === data.parentId);
          iFind.value += data.value
        }
      }
    },
    openFullOrClose(val) {
      NCoreHelper.openFullOrCloseTreeView(val, this.dataTree)
    },
    async subEvNCoreButtonRun(isSave) {
      if (isSave === true) {
        this.$v.$touch();
        this.$v.form.$touch();
        if (!this.$v.form.$anyError) {
          this.$refs.refNCoreButtonRun.processing = true
          const authoritySend = []
          for (let i = 0; i < this.dataTree.length; i++) {
            this.runAuthorities(this.dataTree[i], authoritySend)
          }
          let dataSend = {
            name: this.form.authorityName,
            description: this.form.authorityDescription,
            projectId: this.modalData.projectId,
            menuRoleEventViewModels: authoritySend
          }
          if (this.modalData.type !== "add") {
            dataSend.id = this.modalData.data.id
          }
          const iResult =
              this.modalData.type === "add"
                  ? await NCoreHelper.v2executePOST(
                      this,
                      authorityManagerApi.AUTHORITIES_MANAGER_CREATE,
                      dataSend
                  )
                  : await NCoreHelper.v2executePUT(
                      this,
                      authorityManagerApi.AUTHORITIES_MANAGER_UPDATE,
                      dataSend
                  );
          if (iResult) {
            NCoreHelper.v2alertMess(
                this,
                NCoreHelper.returnMessage(
                    this.modalData.type === "add" ? 1 : 2,
                    true,
                    this.modalData.funcName
                ),
                iResult ? 2: 3
            );
            this.$emit("handleSubmitEvent", true);
            this.$refs.refNCoreButtonRun.processing = false
          } else {
            NCoreHelper.v2alertMess(
                this,
                NCoreHelper.returnMessage(
                    this.modalData.type === "add" ? 1 : 2,
                    false,
                    this.modalData.funcName
                ),
                iResult ? 1 : 3
            )
            this.$refs.refNCoreButtonRun.processing = false
          }
        }
      } else {
        NCoreHelper.v2modalShowHide(this, this.idModal, 0);
      }
    }
  }
};
</script>
