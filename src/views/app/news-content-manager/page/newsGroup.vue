<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">Quản lý nhóm tin</h1>
          <div class="top-right-button-container">
            <n-button-default-add-new ref="refNewsGroupButtonDefaultAddNew"
                                      @handlerSubmitEvent="subEvNewsGroupButtonDefaultAddNew"/>
          </div>
          <piaf-breadcrumb/>
          <div class="mb-2">
            <n-button-default-display-option/>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <n-button-default-search ref="refNewsGroupButtonDefaultSearch"
                                         @handlerSubmitEvent="subEvNewsGroupButtonDefaultSearch"/>
<!--                <news-group-type-combobox :btn-show-all="'0'"-->
<!--                                          :page-title="newsGroupTypeComboboxTitle"-->
<!--                                          ref="refNewsGroup_NewsGroupTypeCombobox"-->
<!--                                          @submitEvent="subEvNewsGroup_NewsGroupTypeCombobox"/>-->
              </div>
            </b-collapse>
          </div>
          <div class="separator mb-2"/>
        </b-colxx>
      </b-row>
    </b-colxx>
    <b-colxx xxs="12">
      <b-card>
        <n-core-tree-view :page-id="nCoreTreeViewPageId"
                          ref="refNewsGroupTreeView"
                          @handlerSubmitEvent="subEvNewsGroupTreeView"/>
      </b-card>
    </b-colxx>
    <news-group-event ref="refNewsGroupEvent"
                      @handleSubmitEvent="subEvNewsGroupEventSave"/>
    <n-core-modal-delete ref="refNewsGroupDelete"
                         @handleSubmitEvent="subEvNewsGroupEventDelete"/>
    <n-core-modal-question ref="refNewsGroupEventQuestion"
                           @handleSubmitEvent="subEvNewsGroupEventQuestion"/>
  </b-row>
</template>
<script>
import {mapActions} from "vuex";
import NCoreModalDelete from "@/containers/ndev-core/components/NCoreModalDelete";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NewsGroupEvent from "@/views/app/news-content-manager/event/newsGroupEvent";
import newsGroupApi from "@/views/app/news-content-manager/api/newsGroupApi";
import NCoreModalQuestion from "@/containers/ndev-core/components/NCoreModalQuestion";
import NewsGroupTypeCombobox from "@/views/app/news-content-manager/combobox/newsGroupTypeCombobox";
import NCoreTreeView from "@/containers/ndev-core/components/NCoreTreeView";
import NButtonDefaultAddNew from "@/containers/ndev-core/button_default/NButtonDefaultAddNew";
import NButtonDefaultDisplayOption from "@/containers/ndev-core/button_default/NButtonDefaultDisplayOption";
import NButtonDefaultSearch from "@/containers/ndev-core/button_default/NButtonDefaultSearch";

export default {
  components: {
    NButtonDefaultSearch,
    NButtonDefaultDisplayOption,
    NButtonDefaultAddNew,
    NCoreTreeView,
    NewsGroupTypeCombobox,
    NCoreModalQuestion,
    NewsGroupEvent,
    NCoreModalDelete
  },
  data() {
    return {
      PageId: "newsGroupId",
      nCoreTreeViewPageId: "NewsGroupTreeViewPageId",
      newsGroupTypeCombobox: NCoreConfig.isGuidEmpty,
      newsGroupTypeComboboxTitle: 'Loại nhóm tin: -- Chọn loại nhóm tin --',
    };
  },
  methods: {
    ...mapActions([
      "callStoreCrudUpdate",
      "callStoreCrudDelete",
      "callStoreCrudQuestion",
      "callStoreSendTreeView"
    ]),
    async subEvNewsGroupButtonDefaultAddNew() {
      this.$showAllPageLoading()
      const valueAuthority = await NCoreHelper.v2checkAuthorities('NewsGroup')
      if ((valueAuthority & NCoreConfig.authority_Add) !== 0) {
        await this.callStoreCrudUpdate({
          id: this.$refs.refNewsGroupEvent.idModal,
          title: "Thêm mới nhóm tin",
          type: "add",
          funcName: "nhóm tin",
          newsGroupTypeId: this.newsGroupTypeCombobox,
          newsGroupCombobox: this.newsGroupTypeCombobox !== '' ? this.$refs.refNewsGroupTreeView.dataTree : '',
          data: null
        });
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refNewsGroupEvent.idModal,
          1
        );
      } else {
        NCoreHelper.v2alertMess(this, NCoreConfig.localErrMessAuthority, 1)
      }
    },
    async fetchData(isSecond) {
      if (isSecond) {
        this.$showLoading();
        const iResult = await NCoreHelper.v2executeGET(this, newsGroupApi.NEWS_GROUP_TREE_VIEW, {
          newsGroupTypeId: NCoreConfig.isGuidEmpty //this.newsGroupTypeCombobox
        })
        await this.callStoreSendTreeView({
          pageId: this.nCoreTreeViewPageId,
          id: 0,
          data: iResult
        })
      }
    },
    async subEvNewsGroupEventSave(val) {
      if (val.result) {
        this.newsGroupTypeCombobox = val.newsGroupTypeModal.id
        this.newsGroupTypeComboboxTitle = 'Loại nhóm tin: -- ' + val.newsGroupTypeModal.name + ' --'
        await this.fetchData(true)
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refNewsGroupEvent.idModal,
          0
        );
      }
    },
    async subEvNewsGroupEventDelete(val) {
      this.$showProcessing()
      let model = [];
      model.push(val.id);
      const iResult = await NCoreHelper.v2executePOST(
        this,
        newsGroupApi.NEWS_GROUP_DELETE,
        {
          models: model
        }
      );
      if (iResult) {
        await this.fetchData(true);
        NCoreHelper.v2alertMess(this, "Xóa dữ liệu thành công", 1);
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refNewsGroupDelete.idModal,
          0
        );
        this.$hideProcessing()
      } else {
        NCoreHelper.v2alertMess(this, "", 3);
        this.$hideLoading()
      }
    },
    async subEvNewsGroupEventQuestion(val) {
      if (val.result) {
        await this.fetchData(true)
        NCoreHelper.v2modalShowHide(
          this,
          this.$refs.refNewsGroupEventQuestion.idModal,
          0
        );
        NCoreHelper.v2alertMess(this, val.message, 1)
        this.$hideProcessing()
      }
    },
    async subEvNewsGroup_NewsGroupTypeCombobox(val) {
      this.newsGroupTypeCombobox = val.id
      this.newsGroupTypeComboboxTitle = 'Loại nhóm tin: -- ' + val.name + ' --'
      await this.fetchData(true)
    },
    async subEvNewsGroupTreeView(val) {
      switch (val.id) {
        // Mở khóa
        case 201: {
          await this.callStoreCrudQuestion({
            id: this.$refs.refNewsGroupEventQuestion.idModal,
            tableId: 1,
            contentId: val.dataContentId,
            flagKey: val.id,
            titleOne: 'BẠN CHẮC CHẮN MUỐN MỞ KHÓA DỮ LIỆU',
            titleTwo: val.dataContentName
          })
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNewsGroupEventQuestion.idModal,
            1
          );
          break
        }
        // Khóa
        case 202: {
          await this.callStoreCrudQuestion({
            id: this.$refs.refNewsGroupEventQuestion.idModal,
            tableId: 1,
            contentId: val.dataContentId,
            flagKey: val.id,
            titleOne: 'BẠN CHẮC CHẮN MUỐN KHÓA DỮ LIỆU',
            titleTwo: val.dataContentName
          })
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNewsGroupEventQuestion.idModal,
            1
          );
          break
        }
        // Cập nhật
        case 101: {
          this.$showAllPageLoading();
          await this.callStoreCrudUpdate({
            id: this.$refs.refNewsGroupEvent.idModal,
            title: "Cập nhật nhóm tin",
            type: "edit",
            mesSuccess: "Cập nhật nhóm tin thành công",
            funcName: "nhóm tin",
            newsGroupTypeId: this.newsGroupTypeCombobox,
            newsGroupCombobox: this.$refs.refNewsGroupTreeView.dataTree,
            data: await NCoreHelper.v2executeGETById(
              this,
              newsGroupApi.NEWS_GROUP_GET_BY_ID,
              val.dataContentId
            )
          });
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNewsGroupEvent.idModal,
            1
          );
          break
        }
        //Xóa
        case 102: {
          await this.callStoreCrudDelete({
            content: val.dataContentName,
            id: val.dataContentId
          });
          NCoreHelper.v2modalShowHide(
            this,
            this.$refs.refNewsGroupDelete.idModal,
            1
          );
          break
        }
        default:
          break
      }
    },
    async subEvNewsGroupButtonDefaultSearch() {
    },
  },
  computed: {},
  watch: {},
  async created() {
  },
  async mounted() {
    await this.fetchData(true);
  },
  beforeUpdate() {
  }
};
</script>
