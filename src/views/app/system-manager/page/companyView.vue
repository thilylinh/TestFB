<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">Danh sách đơn vị</h1>
          <div class="top-right-button-container">
          </div>
          <piaf-breadcrumb/>
          <div class="mb-2">
            <n-button-default-display-option/>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <n-button-default-search ref="refSubjectManagerButtonDefaultSearch"
                                         @handlerSubmitEvent="subEvSubjectManagerButtonDefaultSearch"/>
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
                          :show-action="0"
                          ref="refSubjectManagerTreeView"/>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import {mapActions} from "vuex";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import NCoreTreeView from "@/containers/ndev-core/components/NCoreTreeView";
import NButtonDefaultDisplayOption from "@/containers/ndev-core/button_default/NButtonDefaultDisplayOption";
import NButtonDefaultSearch from "@/containers/ndev-core/button_default/NButtonDefaultSearch";
import managementManagerApi from "@/views/app/itphonui/api/managementManagerApi";
import NButtonDefaultChoose from "@/containers/ndev-core/button_default/NButtonDefaultChoose";

export default {
  components: {
    NButtonDefaultChoose,
    NButtonDefaultSearch,
    NButtonDefaultDisplayOption,
    NCoreTreeView,
  },
  data() {
    return {
      PageId: "companyViewPageId",
      nCoreTreeViewPageId: "companyView_TreeViewPageId",
    };
  },
  methods: {
    ...mapActions([      "callStoreSendTreeView"    ]),
    async fetchData() {
      this.$showLoading();
      const iResult = await NCoreHelper.v2executeGET(this, managementManagerApi.VIEW_MANAGEMENT)
      await this.callStoreSendTreeView({
        pageId: this.nCoreTreeViewPageId,
        id: 0,
        data: iResult
      })
    },
    async subEvSubjectManagerButtonDefaultSearch(vData) {
      this.search = vData;
      this.pageNumber = 1;
      await this.fetchData(true);
    },
  },
  computed: {},
  watch: {},
  async created() {
  },
  async mounted() {
    await this.fetchData();
  },
  beforeUpdate() {
  }
};
</script>
