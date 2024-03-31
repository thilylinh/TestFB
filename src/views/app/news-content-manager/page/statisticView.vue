<template>
    <div>
        <h1>Thống kê danh sách lượt view</h1>
        <div class="filter-container">
            <div class="dates row">
                <div class="form-group col-6">
                    <label for="exampleInputEmail1">Từ ngày</label>
                    <input type="date" class="form-control" :value="fromDate"
                        @change="(e) => handleChangeFromDate(e.target.value)">
                </div>
                <div class="form-group col-6">
                    <label for="exampleInputEmail1">Đến ngày</label>
                    <input type="date" class="form-control" :value="currentDate"
                        @change="(e) => handleChangeToDate(e.target.value)">
                </div>
            </div>
            <div class="domains">
                <v-select :options="comboboxData || []" :reduce="(name) => name.id" label="name" multiple
                    persistent-hint @input="selectDomain" />
            </div>
            <button @click="handleSubmit" class="btn btn-success mt-2">Lọc</button>
        </div>
        <div class="infor mt-4 mb-6">
            <vuetable ref="refNewsSeoKeyWordTable" :api-mode="false" :data="tableData" :fields="fields"
                :no-data-template="noDataTemplate" :reactive-api-url="true" class="table-divided order-with-arrow">
                <template slot="stt" slot-scope="props">
                    <span class="NTitleDataInTable">{{ props.rowIndex + 1 }}</span>
                </template>
                <template slot="userCode" slot-scope="props">
                    <span class="NTitleDataInTable">{{ props.rowData.userCode }}</span>
                </template>
                <template slot="name" slot-scope="props">
                    <span class="NTitleDataInTable">{{ props.rowData.name }}</span>
                </template>
                <template slot="totalView" slot-scope="props">
                    <span class="NTitleDataInTable">{{ props.rowData.totalView }}</span>
                </template>
                <template slot="revenue" slot-scope="props">
                    <span class="NTitleDataInTable"></span>
                </template>
                <template slot="bonus" slot-scope="props">
                    <span class="NTitleDataInTable"></span>
                </template>
                <template slot="totalIncome" slot-scope="props">
                    <span class="NTitleDataInTable"></span>
                </template>
            </vuetable>
        </div>
    </div>
</template>
<script>
import NCoreHelper from "../../../NCoreHelper/NCoreHelper";
import NCoreConfig from "../../../NCoreHelper/NCoreConfig";
import Vuetable from "vuetable-2/src/components/Vuetable";
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
export default {
    components: { vSelect, Vuetable },
    data() {
        return {
            noDataTemplate: NCoreConfig.noDataTemplate,
            comboboxData: [],
            tableData: [],
            domains: [],
            fromDate: null,
            currentDate: null,
            fields: [
                {
                    name: "__slot:stt",
                    sortField: "name",
                    title: "STT",
                    titleClass: "center",
                    dataClass: "center",
                    width: "5%"
                },
                {
                    name: "__slot:userCode",
                    sortField: "name",
                    title: "Mã người dùng",
                    titleClass: "center",
                    dataClass: "center",
                    width: "10%"
                },
                {
                    name: "__slot:name",
                    sortField: "name",
                    title: "Tên người dùng",
                    titleClass: "center",
                    dataClass: "center",
                    width: "10%"
                },
                {
                    name: "__slot:totalView",
                    sortField: "name",
                    title: "Lượt view",
                    titleClass: "",
                    dataClass: "list-item-heading",
                    width: "10%"
                },
                {
                    name: "__slot:revenue",
                    sortField: "name",
                    title: "Doanh thu",
                    titleClass: "",
                    dataClass: "list-item-heading",
                    width: "10%"
                },
                {
                    name: "__slot:bonus",
                    sortField: "bonus",
                    title: "Thưởng",
                    titleClass: "",
                    dataClass: "list-item-heading",
                    width: "15%"
                },
                {
                    name: "__slot:totalIncome",
                    sortField: "name",
                    title: "Tổng thu nhập",
                    titleClass: "",
                    dataClass: "list-item-heading",
                    width: "15%"
                },
            ]
        }
    },
    mounted() {
        this.fetchData();
        this.initDate();
    },
    methods: {
        initDate() {
            this.fromDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
            this.currentDate = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
        },

        async fetchData() {
            this.$showLoading();
            // call compoboxx
            this.comboboxData = await NCoreHelper.v2executeGET(
                this,
                "Web/combobox"
            );
            // call table
            let payload = {
                startDate: this.fromDate,
                endDate: this.currentDate,
                domainIds: this.domains
            };
            let reports = await NCoreHelper.v2executeGET(
                this,
                "GoogleAnalytics/report",
                payload,
            );

            this.tableData = reports.users;
            this.$hideLoading();
        },

        selectDomain(item) {
            this.domains = item;
        },

        handleChangeFromDate(date) {
            this.fromDate = new Date(date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
        },

        handleChangeToDate(date) {
            this.currentDate = new Date(date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
        },

        handleSubmit() {
            if (this.compareDate(this.fromDate, this.currentDate) > 0) {
                NCoreHelper.v2alertMess(this, 'Ngày bắt đầu lớn hơn ngày kết thúc, vui lòng chọn lại', 1)
                return;
            }
            this.tableData = []
            this.fetchData()
        },

        compareDate(date1String, date2String) {
            const date1 = new Date(date1String);
            const date2 = new Date(date2String);

            if (date1 > date2) {
                return 1;
            } else if (date1 < date2) {
                return -1;
            } else {
                return 0;
            }
        }
    }
}
</script>