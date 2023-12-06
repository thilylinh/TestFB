<template>
  <div>
    <n-core-skeleton :flag-group="3"></n-core-skeleton>
    <b-row v-show="!$store.state.componentLoading">
      <b-colxx :hidden="hiddenNoData"
               class="text-center"
               xxs="12"
               v-html="noDataTemplate"></b-colxx>
      <b-colxx :hidden="!hiddenNoData" xxs="12">
        <b-colxx class="mb-3" xxs="12">
          <b-button size="xs"
                    variant="outline-danger"
                    @click="openFullOrClose(1)">
            <i class="simple-icon-size-fullscreen"></i> Mở rộng tất cả
          </b-button>
          <b-button size="xs"
                    variant="outline-primary"
                    @click="openFullOrClose(2)">
            <i class="simple-icon-size-actual"></i> Thu gọn tất cả
          </b-button>
        </b-colxx>
        <v-jstree :data="dataTree"
                  allow-batch
                  multiple
                  whole-row
                  @item-click="itemClick">
          <template scope="_">
            <div style="display: inherit;">
              <!--              <i-->
              <!--                v-if="!_.model.loading"-->
              <!--                :class="_.vm.themeIconClasses"-->
              <!--                role="presentation"-->
              <!--              ></i>        -->
              <i v-if="_.model.statusId === 1"
                 class="simple-icon-briefcase mr-1 nFontBold"
                 role="presentation"
                 title="Tạm khóa"></i>
              <span v-if="_.model.statusId === 1" class="font-italic">
                {{ _.model.text }} <b-badge pill variant="warning" style="font-size: 50%!important;">Tạm khóa</b-badge>
              </span>
              <span v-else-if="_.model.statusId !== 1">
                {{ _.model.text }}
              </span>
              <span v-if="showAction === 1"
                    :id="_.model.text"
                    :hidden="_.model.openedAction">
                              <b-badge v-for="(items, index) in _.model.actions" :key="index"
                                       pill
                                       class="mr-1"
                                       :variant="items.color"
                                       @click="handler_runAction(items.id, _.model)">
                                {{ items.name }}
                              </b-badge>
                            </span>
            </div>
          </template>
        </v-jstree>
      </b-colxx>
    </b-row>
  </div>
</template>
<script>

import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import NCoreConfig from "@/views/NCoreHelper/NCoreConfig";
import NCoreHelper from "@/views/NCoreHelper/NCoreHelper";
import {mapGetters} from "vuex";
import VJstree from "vue-jstree";

export default {
  components: {
    NCoreSkeleton,
    VJstree
  },
  props: {
    pageId: {
      type: String,
      default: 'NCoreTreeViewPageId'
    },
    showAction: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      noDataTemplate: NCoreConfig.noDataTemplate,
      hiddenNoData: false,
      dataTree: [],
      treeSelectOld: "",
      treeSelectItem: "",
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['storeSendTreeView'])
  },
  watch: {
    storeSendTreeView: function (val) {
      this.dataTree = val.data;
      this.hiddenNoData = val.data !== null && val.data.length > 0;
      this.$forceUpdate()
      this.$hideLoading();
    }
  },
  methods: {
    openFullOrClose(val) {
      NCoreHelper.openFullOrCloseTreeView(val, this.dataTree);
    },
    itemClick(node) {
      this.treeSelectItem = node.model;
      if (this.treeSelectOld !== "") {
        for (let i = 0; i < this.dataTree.length; i++) {
          this.setOpenedAction(this.dataTree[i]);
        }
      }
      node.model.openedAction = false;
      this.treeSelectOld = node.model.id;
      // Xử lý trường hợp item này có childRen
      if (node.model.children !== null) {
        node.model.opened = true
      }
    },
    setOpenedAction(data) {
      if (data.children != null) {
        if (data.id === this.treeSelectOld) {
          data.openedAction = true;
        } else {
          for (let i = 0; i < data.children.length; i++) {
            this.setOpenedAction(data.children[i]);
          }
        }
      } else {
        if (data.id === this.treeSelectOld) {
          data.openedAction = true;
        }
      }
    },
    handler_runAction(flag, data) {
      this.$emit('handlerSubmitEvent', {
        id: flag,
        dataContentId: data.id,
        dataContentName: data.label
      })
    }
  }
};
</script>

