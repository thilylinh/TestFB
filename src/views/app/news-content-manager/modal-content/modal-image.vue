<template>
    <b-modal :id="idModal" :hide-footer="true" :hide-header="true" :hide-header-close="true" no-close-on-backdrop :showBtnCancel="3"
        cancel-title="Hủy bỏ" centered size="md" @hidden="resetStateModal">
        <b-form class="content-form ndev-form">
            <b-row>
                <b-col lg="12" md="12" sm="12" xs="12">
                    <b-img-lazy :src="sourceLink" style="width: 100%; height: auto;" />
                </b-col>
            </b-row>
            <n-core-button-run ref="refNCoreButtonRunModalDelete" :btn-save-title="'Quay về'" @submitEvent="submitEvent" :show-btn-save="'0'"/>
        </b-form>
    </b-modal>
</template>
  
<script>

import { mapGetters } from "vuex";
import NCoreButtonRun from "../../../../containers/ndev-core/components/NCoreButtonRun.vue";
import NCoreHelper from "../../../../views/NCoreHelper/NCoreHelper";

export default {
    components: {
        NCoreButtonRun
    },
    directives: {},
    props: {
        sourceLink: String,
    },
    computed: {
        ...mapGetters(['storeCrudDelete']),
    },
    watch: {
        storeCrudDelete(val) {
            this.modalData = val
            this.$hideAllPageLoading()
        }
    },
    data() {
        return {
            modalData: [],
            idModal: 'IdNCoreModalImage',
            processing: false,
        }
    },
    methods: {
        resetStateModal() {
            this.processing = false
        },
        async submitEvent(val) {
            NCoreHelper.v2modalShowHide(this, this.idModal, 0);
        },
        returnUppercase(val) {
            if (val === undefined) return ''
            return val !== '' ? val.toUpperCase() : ''
        }
    },
}
</script>
  