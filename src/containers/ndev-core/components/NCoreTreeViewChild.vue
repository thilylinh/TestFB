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
                  show-checkbox
                  @item-click="itemClick">
          <template scope="_">
            <div style="display: inherit;">
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
  props: {},
  data() {
    return {
      pageId: 'NCoreTreeViewPageId',
      noDataTemplate: NCoreConfig.noDataTemplate,
      hiddenNoData: false,
      dataTree: [],
      treeSelectOld: "",
      treeSelectItem: "",
      isMinusChild: false,
      newsGroupRelationshipData: [],
      newsGroupRelationshipDataSelect: [],
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['storeSendTreeViewChild'])
  },
  watch: {
    storeSendTreeViewChild: function (val) {
      this.dataTree = []
      this.newsGroupRelationshipDataSelect = []
      this.newsGroupRelationshipData = []
      this.newsGroupRelationshipData = val.newsGroupRelationshipData
      this.isMinusChild = val.isMinusChild
      let dataFather = []
      for (let i = 0; i < val.data.length; i++) {
        if (val.data[i].statusId === 3) {
          const iCheck = val.newsGroupRelationshipData === undefined || val.newsGroupRelationshipData.length === 0
            ? undefined
            : val.newsGroupRelationshipData.find(o => o.id === val.data[i].id)
          //==========================Kiểm tra xem có cần loại bỏ dữ liệu hay không ?===================================
          let iPlusData = true
          if (iCheck !== undefined) {
            if (val.isMinusChild) {
              //=======================================Loại bỏ dữ liệu==================================================
              iPlusData = false // => Loại bỏ file
              //========================================================================================================
            } else {
              this.newsGroupRelationshipDataSelect.push({
                id: val.data[i].id,
                name: val.data[i].label,
                parentId: NCoreConfig.isGuidEmpty,
                parentName: ''
              })
            }
          }
          if (iPlusData) {
            dataFather = {
              children: null,
              id: val.data[i].id,
              text: val.data[i].text,
              label: val.data[i].label,
              icon: val.data[i].icon,
              parentId: val.data[i].parentId,
              permissionValue: val.data[i].permissionValue,
              opened: val.data[i].opened,
              openedAction: val.data[i].openedAction,
              menuGroupId: val.data[i].menuGroupId,
              position: val.data[i].position,
              statusId: val.data[i].statusId,
              statusName: val.data[i].statusName,
              statusColor: val.data[i].statusColor,
              selected: iCheck !== undefined,
            }
            if (val.data[i].children !== null)
              dataFather.children = this.runChildren(val.data[i].children, val.data[i].id, val.data[i].label, val.newsGroupRelationshipData, val.isMinusChild)
            this.dataTree.push(dataFather)
          }
        }
      }
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
    runChildren(data, parentIds, parentNames, newsGroupRelationshipData, isMinusChild) {
      let dataChild = []
      let dataChildReturn = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].statusId === 3) {
          const iCheck = newsGroupRelationshipData === undefined || newsGroupRelationshipData.length === 0
            ? undefined
            : newsGroupRelationshipData.find(o => o.id === data[i].id)
          //==========================Kiểm tra xem có cần loại bỏ dữ liệu hay không ?===================================
          let iPlusData = true
          if (iCheck !== undefined) {
            if (isMinusChild) {
              //=======================================Loại bỏ dữ liệu==================================================
              iPlusData = false // => Loại bỏ file
              //========================================================================================================
            } else {
              this.newsGroupRelationshipDataSelect.push({
                id: data[i].id,
                name: data[i].label,
                parentId: parentIds,
                parentName: parentNames
              })
            }
          }
          if (iPlusData) {
            dataChild = {
              children: null,
              id: data[i].id,
              text: data[i].text,
              label: data[i].label,
              icon: data[i].icon,
              parentId: data[i].parentId,
              permissionValue: data[i].permissionValue,
              opened: data[i].opened,
              openedAction: data[i].openedAction,
              menuGroupId: data[i].menuGroupId,
              position: data[i].position,
              statusId: data[i].statusId,
              statusName: data[i].statusName,
              statusColor: data[i].statusColor,
              selected: iCheck !== undefined,
            }
            if (data[i].children !== null) dataChild.children = this.runChildren(data[i].children, data[i].id, data[i].label, newsGroupRelationshipData, isMinusChild)
            dataChildReturn.push(dataChild)
          }
        }
      }
      return dataChildReturn
    },
    handler_runAction(flag, data) {
      this.$emit('handlerSubmitEvent', {
        id: flag,
        dataContentId: data.id,
        dataContentName: data.label
      })
    },
    handler_selectList() {
      let dataFather = []
      for (let i = 0; i < this.dataTree.length; i++) {
        if (this.dataTree[i].selected === true) {
          dataFather.push({
            id: this.dataTree[i].id,
            name: this.dataTree[i].label,
            parentId: NCoreConfig.isGuidEmpty,
            parentName: '',
          })
        }
        if (this.dataTree[i].children !== null) {
          this.handler_selectChildRen(this.dataTree[i].children, this.dataTree[i].id, this.dataTree[i].label, dataFather)
        }
      }
      //===> Nếu có loại bỏ dữ liệu thì không cần xử lý phần này
      if(this.isMinusChild){}
      else {
        // => Dựa vào danh sách dữ liệu đã chọn (ban đầu) gán lên treeView, ta loại bỏ các phần tử này trong danh sách
        // ==> các dữ liệu được gửi ở page trước
        let dataDefaultNoSelect = []//Danh sách dữ liệu chưa được chọn => xử lý cho trường hợp nội dung dữ liệu không cùng nhóm tin
        if(this.newsGroupRelationshipData !== undefined) {
          if (this.newsGroupRelationshipData.length > 0) {
            // => Có dữ liệu nhóm tin đã chọn từ trước
            if (this.newsGroupRelationshipDataSelect.length > 0) {
              //=> Có dữ liệu nhóm tin được chọn nằm trong loại nhóm tin này
              // => Duyệt vòng lặp kiểm tra xem nhóm tin có bị xóa hay không ?
              for (let i = 0; i < this.newsGroupRelationshipData.length; i++) {
                const iCheck = this.newsGroupRelationshipDataSelect.find(o => o.id === this.newsGroupRelationshipData[i].id)
                if (iCheck === undefined || iCheck === null) {
                  // Không có dữ liệu => Thêm vào dữ liệu trả về
                  dataDefaultNoSelect.push(this.newsGroupRelationshipData[i])
                }
              }
            } else {
              // => Không có dữ liệu nhóm tin được chọn trong loại nhóm tin
              for (let i = 0; i < this.newsGroupRelationshipData.length; i++) {
                dataDefaultNoSelect.push(this.newsGroupRelationshipData[i])
              }
            }
          }
        }
        if (dataDefaultNoSelect.length > 0) {
          // => Có dữ liệu chưa được chọn => add thêm vào dữ liệu trả về
          for (let i = 0; i < dataDefaultNoSelect.length; i++) {
            dataFather.push(dataDefaultNoSelect[i])
          }
        }
      }
      return dataFather
    },
    handler_selectChildRen(data, parentIds, parentNames, lReturn) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].selected === true) {
          lReturn.push({
            id: data[i].id,
            name: data[i].label,
            parentId: parentIds,
            parentName: parentNames,

          })
        }
        if (data[i].children !== null) {
          this.handler_selectChildRen(data[i].children, data[i].id, data[i].label, lReturn)
        }
      }
    },
  }
};
</script>

