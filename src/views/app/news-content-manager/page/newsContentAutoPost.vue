<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <b-row>
        <b-colxx xxs="12">
          <h1 class="NHeaderPage">Quản lý lên lịch đăng bài tự động</h1>
          <!--          <piaf-breadcrumb/>-->
          <div class="mb-2">
            <n-button-default-display-option/>
            <b-collapse id="displayOptions" class="d-md-block">
              <div class="d-block d-md-inline-block pt-1">
                <n-button-default-search ref="refNewsContentButtonDefaultSearch"
                                         @handlerSubmitEvent="subEvNewsContentButtonDefaultSearch"/>
                <!--                <news-group-type-combobox :btn-show-all="'0'"-->
                <!--                                          :page-title="newsGroupTypeComboboxTitle"-->
                <!--                                          ref="refNewsContent_NewsGroupTypeCombobox"-->
                <!--                                          @submitEvent="subEvNewsContent_NewsGroupTypeCombobox"/>-->
                <news-author-combobox :btn-show-all="'0'"
                                      :page-title="newsGroupTypeComboboxTitle"
                                      ref="refNewsContent_NewsGroupTypeCombobox"
                                      @submitEvent="subEvNewsContent_NewsGroupTypeCombobox"/>
                <news-group-combobox :btn-show-all="'0'"
                                     :page-title="newsGroupComboboxTitle"
                                     :page-data="newsGroupTypeCombobox"
                                     ref="refNewsContent_NewsGroupCombobox"
                                     @handlerSubmitEvent="subEvNewsContent_NewsGroupCombobox"/>
                <b-button class="nColorWhite" size="xs" variant="success" @click="callSchedule(2)"
                          v-if="scheduleConfig === 1">
                  <i class="iconsminds-folder-cloud"></i> Chạy lập lịch
                </b-button>
                <b-button class="nColorWhite" size="xs" variant="dark" @click="callSchedule(1)"
                          v-if="scheduleConfig === 2">
                  <i class="iconsminds-folder-cloud"></i> Hủy chạy lập lịch
                </b-button>
              </div>
              <n-pagination-page-size :from="from"
                                      :page-size-default="pageSize"
                                      :to="to"
                                      :total-record="totalRecord"
                                      @handleChangePageSize="handleChangePageSize"/>
            </b-collapse>
          </div>
          <div class="separator mb-2"/>
        </b-colxx>
      </b-row>
      <template>
        <n-core-skeleton :flag-group="3"/>
        <b-row v-if="!$store.state.componentLoading">
          <b-colxx xxs="12" class="NTable">
            <vuetable ref="projectManagerTableRef"
                      :api-mode="false"
                      :data="dataPage"
                      :fields="fields"
                      :no-data-template="noDataTemplate"
                      :reactive-api-url="true"
                      class="table-divided order-with-arrow">
              <template slot="avatar" slot-scope="props">
                <b-img-lazy :src="returnAvatar(props.rowData)" class="img_avatar_table" width="100" height="100"/>
              </template>
              <template slot="staffName" slot-scope="props">
                {{ props.rowData.name }}
                <br/>
                <small style="font-style: italic;">
                  <b-badge class="NBadge nHover"
                           pill
                           variant="danger">{{ props.rowData.newsGroupName }}
                  </b-badge>
                </small>
              </template>
              <!--              <template slot="newsGroupName" slot-scope="props">{{-->
              <!--                  props.rowData.newsGroupName-->
              <!--                }}-->
              <!--              </template>-->
              <template slot="ownerName" slot-scope="props">
                <small style="color: blue; font-weight: bold">{{ props.rowData.ownerName }}</small>
                <br/>
                <small style="font-style: italic">
                  {{ props.rowData.dateTimeStart | formatDateDDMMYYYYHHMM }}
                </small>
              </template>
              <!--              <template slot="roomStatus" slot-scope="props">-->
              <!--                <b-badge class="NBadge nHover"-->
              <!--                         pill-->
              <!--                         variant="success"-->
              <!--                         v-if="props.rowData.statusId === 3"-->
              <!--                         @click="agreeContentNew(1, props.rowData)">Đã đăng-->
              <!--                </b-badge>-->
              <!--                <br v-if="props.rowData.statusId !== 3"/>-->
              <!--                <b-badge class="NBadge nHover"-->
              <!--                         pill-->
              <!--                         variant="danger"-->
              <!--                         v-if="props.rowData.statusId !== 3"-->
              <!--                         @click="agreeContentNew(2, props.rowData)">Chờ đăng-->
              <!--                </b-badge>-->
              <!--                <br/>-->
              <!--                <b-badge class="NBadge nHover"-->
              <!--                         pill-->
              <!--                         variant="dark"-->
              <!--                         @click="copyToLink(props.rowData)">Copy-Link-->
              <!--                </b-badge>-->
              <!--                <br/>-->
              <!--                <b-badge class="NBadge nHover"-->
              <!--                         pill-->
              <!--                         variant="dark"-->
              <!--                         @click="copyToTitle(props.rowData.name)">Copy-Title-->
              <!--                </b-badge>-->
              <!--              </template>-->
              <template slot="scheduler" slot-scope="props">
                  <span>
                      <b-badge class="NBadge nHover"
                               pill
                               variant="info"
                               @click="callDateTimePickerModal(props.rowData)"> Lên lịch
                </b-badge>
                  </span>
                <small v-if="props.rowData.timeAutoPost !== null"><br/>{{
                    props.rowData.timeAutoPost | formatDateDDMMYYYYHHMM
                  }}</small>
              </template>
              <!--              <template slot="postNews" slot-scope="props">-->
              <!--                <b-badge class="NBadge nHover"-->
              <!--                         pill-->
              <!--                         variant="danger"-->
              <!--                         v-if="props.rowData.linkTree !== '' && props.rowData.statusId !== 3"-->
              <!--                         @click="postNewFace(props.rowData)">Đăng face-->
              <!--                </b-badge>-->
              <!--              </template>-->
              <!--              <template slot="actions" slot-scope="props">-->
              <!--                <n-core-action :data-id="props.rowData.id"-->
              <!--                               :data-name="props.rowData.name"-->
              <!--                               :data-action="props.rowData.actions"-->
              <!--                               @handlerSubmitEvent="subEvNewsContentAction"/>-->
              <!--              </template>-->
            </vuetable>
            <n-pagination :current-page="pageNumber"
                          :default-page-size="pageSize"
                          :total-items="totalRecord"
                          @handlePagingClick="handlePagingClick"/>
          </b-colxx>
        </b-row>
      </template>
    </b-colxx>
    <modal-content-date-time ref="refNewsContent_DatePicker"
                             @handleSubmitEvent="subEvNewsContent_DatePicker"/>
  </b-row>
</template>
<script>

import Vuetable from "vuetable-2/src/components/Vuetable";
import {mapActions} from "vuex";
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import NCoreConfig from "../../../NCoreHelper/NCoreConfig";
import NPagination from "../../../../containers/ndev-manager/Page/NPagination";
import NPaginationPageSize from "../../../../containers/ndev-manager/Page/NPaginationPageSize";
import NCoreModalDelete from "../../../../containers/ndev-core/components/NCoreModalDelete";
import NewsGroupTypeCombobox from "@/views/app/news-content-manager/combobox/newsGroupTypeCombobox";
import NButtonDefaultAddNew from "@/containers/ndev-core/button_default/NButtonDefaultAddNew";
import NButtonDefaultSearch from "@/containers/ndev-core/button_default/NButtonDefaultSearch";
import NButtonDefaultDisplayOption from "@/containers/ndev-core/button_default/NButtonDefaultDisplayOption";
import NCoreSkeleton from "@/containers/ndev-core/components/NCoreSkeleton";
import newsContentApi from "@/views/app/news-content-manager/api/newsContentApi";
import NCoreAction from "@/containers/ndev-core/components/NCoreAction";
import NCoreModalQuestion from "@/containers/ndev-core/components/NCoreModalQuestion";
import NewsGroupCombobox from "@/views/app/news-content-manager/combobox/newsGroupCombobox";
import ModalContentView from "@/views/app/news-content-manager/modal-content/modalContentView";
import NewsAuthorCombobox from "@/views/app/news-content-manager/combobox/newsAuthorCombobox.vue";
import NCoreDatePicker from "@/containers/ndev-core/components/NCoreDatePicker.vue";
import ModalContentDateTime from "@/views/app/news-content-manager/modal-content/modalContentDateTime.vue";
import newsDomainApi from "@/views/app/news-content-manager/api/newsDomainApi";

export default {
  components: {
    ModalContentDateTime,
    NCoreDatePicker,
    NewsAuthorCombobox,
    ModalContentView,
    NewsGroupCombobox,
    NCoreModalQuestion,
    NCoreAction,
    NCoreSkeleton,
    NButtonDefaultDisplayOption,
    NButtonDefaultSearch,
    NButtonDefaultAddNew,
    NewsGroupTypeCombobox,
    NCoreModalDelete,
    NPaginationPageSize,
    NPagination,
    vuetable: Vuetable,
  },
  data() {
    return {
      noDataTemplate: NCoreConfig.noDataTemplate,
      pageNumber: 1,
      pageSize: 8,
      author: NCoreConfig.isGuidEmpty,
      scheduleConfig: 0,
      search: "",
      from: 1,
      to: 0,
      totalRecord: 0,
      dataPage: [],
      fields: [
        {
          name: "__slot:avatar",
          sortField: "avatar",
          title: "",
          titleClass: " text-center",
          dataClass: "list-item-heading text-center",
          width: "10%",
        },
        // {
        //   name: "__slot:actions",
        //   title: "ACT",
        //   titleClass: "center aligned text-right",
        //   dataClass: "center aligned text-right",
        //   width: "2%",
        // },
        {
          name: "__slot:staffName",
          sortField: "name",
          title: "TÊN BÀI VIẾT",
          titleClass: " text-center",
          dataClass: "",
          width: "40%",
        },
        {
          name: "__slot:ownerName",
          sortField: "ownerName",
          title: "TÁC GIẢ",
          titleClass: " text-center",
          dataClass: "list-item-heading text-center",
          width: "20%",
        },
        // {
        //   name: "__slot:danhGia",
        //   sortField: "name",
        //   title: "ĐÁNH GIÁ",
        //   titleClass: "center",
        //   dataClass: "text-justify",
        //   width: "15%"
        // },

        {
          name: "__slot:scheduler",
          sortField: "scheduler",
          title: "THỜI GIAN ĐĂNG BÀI",
          titleClass: " text-center",
          dataClass: "list-item-heading text-center",
          width: "20%",
        },
        // {
        //   name: "__slot:roomStatus",
        //   sortField: "roomStatus",
        //   title: "TRẠNG THÁI",
        //   titleClass: " text-center",
        //   dataClass: "list-item-heading text-center",
        //   width: "20%",
        // },
        // {
        //   name: "__slot:postNews",
        //   sortField: "postNews",
        //   title: "",
        //   titleClass: " text-center",
        //   dataClass: "list-item-heading text-center",
        //   width: "20%",
        // }
      ],
      isCallNow: true, // đang gọi dữ liệu
      newsGroupTypeCombobox: NCoreConfig.isGuidEmpty,
      newsGroupTypeComboboxTitle: 'Tác giả: -- Chọn tác giả --',
      newsGroupCombobox: [],
      newsGroupComboboxTitle: 'Nhóm tin: -- Tất cả --',
    };
  },
  methods: {
    ...mapActions([
      "callStoreCrudUpdate",
      "callStoreCrudDelete",
      "callStoreCloseLoadingNCoreModalDelete",
      "callStoreCrudQuestion",
      "callStoreSendViewContent"
    ]),
    async callScheuleConfig() {
      const iResult = await NCoreHelper.v2executeGET(
        this,
        newsContentApi.SCHEDULE_CONFIG
      );
      this.scheduleConfig = parseInt(iResult)
      this.$hideLoading();
    },
    async callSchedule(flag) {
      await NCoreHelper.v2executeGET(
        this,
        newsContentApi.SCHEDULER,
        {
          id: flag
        }
      );
      this.scheduleConfig = parseInt(flag)
      if (flag === 1) {
        NCoreHelper.v2alertMess(this, 'Hủy chạy lập lịch thành công', 2)
      } else {
        NCoreHelper.v2alertMess(this, 'Khởi chạy lập lịch thành công', 2)
      }
      this.$hideLoading();
    },
    async callAuthor() {
      const listAuthor = await NCoreHelper.v2executeGET(
        this,
        newsContentApi.NEWS_CONTENT_NEWS_AUTHOR
      );
      if (listAuthor.length === 1) {
        this.author = listAuthor[0].id
        this.newsGroupTypeComboboxTitle = 'Tác giả: -- ' + listAuthor[0].name + ' --'
      } else {
        this.author = listAuthor[0].id
        this.newsGroupTypeComboboxTitle = 'Tác giả: -- Tất cả --'
      }
    },
    async fetchData() {
      this.$showLoading();
      let dataSend = {
        search: this.search,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        // newsGroupTypeId: this.newsGroupTypeCombobox,
        // newsGroupId: JSON.stringify(this.newsGroupCombobox)
      };
      if (this.newsGroupTypeCombobox !== '') dataSend.author = this.newsGroupTypeCombobox
      // if (this.author !== NCoreConfig.isGuidEmpty) {
      //   dataSend.author = this.author
      // }
      if (this.newsGroupCombobox.length > 0) {
        dataSend.newsGroupId = JSON.stringify(this.newsGroupCombobox)
      }
      const iResult = await NCoreHelper.v2executeGET(
        this,
        newsContentApi.NEWS_CONTENT_GET_PAGING_AUTO_POST,
        dataSend
      );
      // ================================================Show hình ảnh==================================================
      // for (let i = 0; i < iResult.pageLists.length; i++) {
      //   this.dataPage.push({
      //     ...iResult.pageLists[i],
      //     img: iResult.pageLists[i].avatarLocal
      //       ? await NCoreHelper.v2executeViewFile(this, serverFileApi.SERVER_FILE_VIEW_FILE, iResult.pageLists[i].avatarId)
      //       : iResult.pageLists[i].avatarLink
      //   })
      // }
      this.dataPage = iResult?.pageLists || [];
      this.totalRecord = iResult.totalRecord;
      this.to = this.pageSize;
      this.$hideLoading();
    },
    returnAvatar(val) {
      if (val.avatarLink === '') return ''
      if (val.avatarLocal) {
        const cut = val.avatarLink.split('\\');
        return `${process.env.VUE_APP_BASE_API}` + cut[0] + "/" + cut[1] + "/" + cut[2] + '/' + cut[3] + '/500x320.' + cut[4].split('.')[1]
      }
      return val.avatarLink
    },
    async subEvNewsContentButtonDefaultSearch(vData) {
      this.search = vData
      await this.fetchData()
    },
    // async subEvNewsContentButtonDefaultAddNew() {
    //   this.$showAllPageLoading()
    //   setTimeout(await this.callAddFunction(false, null), 1000)
    // },
    // async callAddFunction(isUpdate, vData) {
    //   const valueAuthority = await NCoreHelper.v2checkAuthorities('NewsContent')
    //   //====================================Lưu dữ liệu loại và nhóm tin================================================
    //   const dataGroupTypeNews = {
    //     newsGroupType: {
    //       id: this.newsGroupTypeCombobox,
    //       name: this.newsGroupTypeComboboxTitle
    //     },
    //     newsGroup: {
    //       id: this.newsGroupCombobox,
    //       name: this.newsGroupComboboxTitle
    //     }
    //   }
    //   localStorage.setItem(NCoreConfig.localLogNewsGroupTypeContent, JSON.stringify(dataGroupTypeNews))
    //   //================================================================================================================
    //   if (isUpdate) {
    //     if ((valueAuthority & NCoreConfig.authority_Edit) !== 0) {
    //       localStorage.setItem('newsGroupTypeCombobox', this.newsGroupTypeCombobox)
    //       await this.$router.push({
    //         name: 'news-content-manager-news-content-event',
    //         params: {
    //           id: vData
    //         }
    //       })
    //     } else {
    //       NCoreHelper.v2alertMess(this, NCoreConfig.localErrMessAuthority, 1)
    //       this.$hideAllPageLoading()
    //     }
    //   } else {
    //     if ((valueAuthority & NCoreConfig.authority_Add) !== 0) {
    //       localStorage.setItem('newsGroupTypeCombobox', this.newsGroupTypeCombobox)
    //       await this.$router.push({
    //         name: 'news-content-manager-news-content-event',
    //         params: {
    //           id: NCoreConfig.isGuidEmpty
    //         }
    //       })
    //     } else {
    //       NCoreHelper.v2alertMess(this, NCoreConfig.localErrMessAuthority, 1)
    //       this.$hideAllPageLoading()
    //     }
    //   }
    // },
    async handlePagingClick(pageNumber, pageSize) {
      this.pageNumber = pageNumber;
      this.pageSize = pageSize;
      await this.fetchData();
    },
    async handleChangePageSize(val) {
      this.pageSize = val;
      await this.fetchData();
    },
    async searchChange(val) {
      this.search = val;
      this.pageNumber = 1;
      await this.fetchData();
    },
    async subEvNewsContent_NewsGroupTypeCombobox(val) {
      this.newsGroupTypeCombobox = val.id
      this.newsGroupTypeComboboxTitle = 'Tác giả: -- ' + val.name + ' --'
      this.pageNumber = 1;
      await this.fetchData(true)
    },
    async subEvNewsContent_NewsGroupCombobox(val) {
      this.newsGroupCombobox = []
      let sendName = ''
      if (val.length === 0) {
        sendName = '-- Tất cả --'
      } else {
        for (let i = 0; i < val.length; i++) {
          if (sendName === '') {
            sendName = val[i].name
          } else {
            sendName = sendName + ', ' + val[i].name
          }
          this.newsGroupCombobox.push(val[i].id)
        }
      }
      this.newsGroupComboboxTitle = 'Loại nhóm tin: -- ' + sendName + ' --'
      this.pageNumber = 1;
      await this.fetchData(true)
    },
    // async subEvNewsContentAction(val) {
    //   switch (val.id) {
    //       // Xem trước
    //     case 1: {
    //       this.$showAllPageLoading()
    //       await this.callStoreSendViewContent({
    //         id: this.$refs.refNewsContent_ModalContentView.pageId,
    //         contentId: val.dataContentId,
    //         isNewsContent: false
    //       })
    //       NCoreHelper.v2modalShowHide(
    //           this,
    //           this.$refs.refNewsContent_ModalContentView.pageId,
    //           1
    //       );
    //       break
    //     }
    //       // Mở khóa
    //     case 201: {
    //       await this.callStoreCrudQuestion({
    //         id: this.$refs.refNewsContent_ModalQuestion.idModal,
    //         tableId: 2,
    //         contentId: val.dataContentId,
    //         flagKey: val.id,
    //         titleOne: 'BẠN CHẮC CHẮN MUỐN ĐĂNG BÀI VIẾT',
    //         titleTwo: val.dataContentName
    //       })
    //       NCoreHelper.v2modalShowHide(
    //           this,
    //           this.$refs.refNewsContent_ModalQuestion.idModal,
    //           1
    //       );
    //       break
    //     }
    //       // Khóa
    //     case 202: {
    //       await this.callStoreCrudQuestion({
    //         id: this.$refs.refNewsContent_ModalQuestion.idModal,
    //         tableId: 2,
    //         contentId: val.dataContentId,
    //         flagKey: val.id,
    //         titleOne: 'BẠN CHẮC CHẮN MUỐN THU HỒI BÀI VIẾT',
    //         titleTwo: val.dataContentName
    //       })
    //       NCoreHelper.v2modalShowHide(
    //           this,
    //           this.$refs.refNewsContent_ModalQuestion.idModal,
    //           1
    //       );
    //       break
    //     }
    //       // Cập nhật
    //     case 101: {
    //       this.$showAllPageLoading()
    //       setTimeout(await this.callAddFunction(true, val.dataContentId), 2000)
    //       break
    //     }
    //       //Xóa
    //     case 102: {
    //       await this.callStoreCrudDelete({
    //         content: val.dataContentName,
    //         id: val.dataContentId
    //       });
    //       NCoreHelper.v2modalShowHide(
    //           this,
    //           this.$refs.refNewsContent_ModalDelete.idModal,
    //           1
    //       );
    //       break
    //     }
    //     default:
    //       break
    //   }
    // },
    // async subEvNewsContent_ModalQuestion(val) {
    //   if (val.result) {
    //     await this.fetchData()
    //     NCoreHelper.v2modalShowHide(
    //         this,
    //         this.$refs.refNewsContent_ModalQuestion.idModal,
    //         0
    //     );
    //     NCoreHelper.v2alertMess(this, val.message, 1)
    //     this.$hideProcessing()
    //   }
    // },
    // async subEvNewsContent_ModalDelete(vData) {
    //   let model = [];
    //   model.push(vData.id);
    //   const iResult = await NCoreHelper.v2executePOST(
    //       this,
    //       newsContentApi.NEWS_CONTENT_DELETE,
    //       {
    //         models: model
    //       }
    //   );
    //   if (iResult) {
    //     await this.fetchData();
    //     NCoreHelper.v2alertMess(this, "Xóa dữ liệu thành công", 1);
    //     NCoreHelper.v2modalShowHide(
    //         this,
    //         this.$refs.refNewsContent_ModalDelete.idModal,
    //         0
    //     );
    //   } else {
    //     NCoreHelper.v2alertMess(this, "", 3);
    //   }
    //   this.$hideProcessing()
    // },
    // async callComment(isTotal, data) {
    //   await this.callStoreCrudUpdateWorkManagerEvent({
    //     pageModalId: this.$refs.refCommentManagerModal.pageId,
    //     pageTitle: 'ĐÁNH GIÁ BÀI VIẾT',
    //     pageTitleProduct: data.name,
    //     contentId: data.id,
    //     statusId: isTotal ? 3 : 2
    //   })
    //   NCoreHelper.v2modalShowHide(
    //       this,
    //       this.$refs.refCommentManagerModal.pageId,
    //       1
    //   );
    // },
    // copyToTitle(value) {
    //   const textarea = document.createElement('textarea');
    //   textarea.value = value;
    //   document.body.appendChild(textarea);
    //   textarea.select();
    //   document.execCommand('copy');
    //   document.body.removeChild(textarea);
    //   NCoreHelper.v2alertMess(this, 'Sao chép tiêu đề thành công', 2)
    // },
    // async copyToLink(val) {
    //   // const textarea = document.createElement('textarea');
    //   // // textarea.value = val.domain + '' + val.metaGroup + '/' + val.metaName + '-' + val.metaKey
    //   // textarea.value = val.domain + '' + val.metaName + '-' + val.userCode + '-' + val.metaKey
    //   // document.body.appendChild(textarea);
    //   // textarea.select();
    //   // document.execCommand('copy');
    //   // document.body.removeChild(textarea);
    //   // NCoreHelper.v2alertMess(this, 'Sao chép link thành công', 2)
    //   const result = await NCoreHelper.v2executeGET(this, newsContentApi.COPY_LINK, {id: val.id});
    //   const textarea = document.createElement('textarea');
    //   // textarea.value = val.domain + '' + val.metaName + '-' + val.metaKey
    //   textarea.value = result[0].name
    //   document.body.appendChild(textarea);
    //   textarea.select();
    //   document.execCommand('copy');
    //   document.body.removeChild(textarea);
    //   NCoreHelper.v2alertMess(this, 'Sao chép link thành công', 2)
    // },
    // async postNewFace(val) {
    //   this.$showAllPageLoading()
    //   const iResult = await NCoreHelper.v2executePOST(this, newsContentApi.POST_NEW, {
    //     id: val.id,
    //     host: this.$serverfile
    //   })
    //   if (iResult.result) {
    //     NCoreHelper.v2alertMess(this, 'đăng face <span class=\"nFontBold nColorBlue\">' + val.name + '</span> thành công', 2)
    //   } else {
    //     NCoreHelper.v2alertMess(this, iResult.value, 1)
    //   }
    //   this.$hideAllPageLoading()
    // },
    // async agreeContentNew(flag, data) {
    //   const dataSend = {
    //     id: data.id,
    //     flagKey: flag === 1 ? 202 : 201,
    //     tableId: 2
    //   }
    //   const iResult = await NCoreHelper.v2executePUT(this, helperApi.HELPER_UPDATE_STATUS, dataSend)
    //   if (iResult) {
    //     await this.fetchData()
    //     NCoreHelper.v2modalShowHide(
    //         this,
    //         this.$refs.refNewsContent_ModalQuestion.idModal,
    //         0
    //     );
    //     NCoreHelper.v2alertMess(this, 'xử lý dữ liệu <span class=\"nFontBold nColorBlue\">' + data.name + '</span> thành công', 1)
    //     this.$hideProcessing()
    //   } else {
    //     NCoreHelper.v2alertMess(this, '', 3)
    //     this.$hideProcessing()
    //   }
    // },
    //================================================Lấy dữ liệu DateTime-Picker=======================================
    async callDateTimePickerModal(val) {
      this.$refs.refNewsContent_DatePicker.date = val.timeAutoPost
      this.$refs.refNewsContent_DatePicker.newsId = val.id
      NCoreHelper.v2modalShowHide(this, this.$refs.refNewsContent_DatePicker.pageId, 1)
    },
    async subEvNewsContent_DatePicker(val) {
      const dataInfo = this.dataPage.filter(x => x.id === val.id)[0]
      dataInfo.timeAutoPost = val.time
      NCoreHelper.v2modalShowHide(this, this.$refs.refNewsContent_DatePicker.pageId, 0)
    },
    //==================================================================================================================
  },
  computed: {},
  watch: {},
  created() {
  },
  async mounted() {
    // const iLog = localStorage.getItem(NCoreConfig.localLogNewsGroupTypeContent)
    // if (iLog != null) {
    //   const iValueLog = JSON.parse(iLog)
    //   this.newsGroupTypeCombobox = iValueLog.newsGroupType.id
    //   this.newsGroupTypeComboboxTitle = iValueLog.newsGroupType.name
    //   this.newsGroupCombobox = iValueLog.newsGroup.id
    //   this.newsGroupComboboxTitle = iValueLog.newsGroup.name
    // }
    await this.callAuthor();
    await this.fetchData();
    await this.callScheuleConfig();
  },
};
</script>
