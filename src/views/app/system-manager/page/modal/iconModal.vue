<template>
  <b-modal
    :id="idModal"
    :hide-footer="true"
    :hide-header-close="true"
    cancel-title="Hủy bỏ"
    cancel-variant="outline-primary"
    centered
    no-close-on-backdrop
    ok-title="Lưu"
    size="lg"
    title="DANH SÁCH ICON"
  >
    <b-form class="content-form ndev-form">
      <b-row style="max-height: 600px;overflow: hidden; overflow-y: scroll;">
        <b-colxx xxs="12">
          <b-card
            :title="
              $t('icons.simplelineicons') +
                ' (' +
                simplelineicons.length +
                ' icons)'
            "
            class="mb-4"
          >
            <div class="simple-line-icons">
              <div
                v-for="(icon, index) in simplelineicons"
                :key="index"
                class="glyph nHover selectCombobox"
                @click="chooseIcon(icon)"
              >
                <div :class="'glyph-icon ' + icon" />
                <div class="class-name">{{ icon }}</div>
              </div>
            </div>
          </b-card>
        </b-colxx>
        <b-colxx xxs="12">
          <b-card :title="$t('icons.iconsmind')" class="mb-4">
            <div class="mind-icons">
              <div
                v-for="(group, parentIndex) in iconsmind"
                :key="parentIndex"
                class="mb-5"
              >
                <h6 class="mb-4">{{ group.title }}</h6>
                <div
                  v-for="(icon, iconIndex) in group.icons"
                  :key="`${parentIndex}_${iconIndex}`"
                  class="glyph nHover selectCombobox"
                  @click="chooseIcon(icon)"
                >
                  <div :class="'glyph-icon ' + icon" />
                  <div class="class-name">{{ icon }}</div>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </b-card>
        </b-colxx>
      </b-row>
      <b-row>
        <b-col class="mt-2 text-center" lg="12" md="12" sm="12" xs="12">
          <hr />
          <b-button
            class="mb-2"
            size="sm"
            variant="primary"
            @click="closeModal()"
            ><i class="iconsminds-arrow-refresh"></i> Quay về
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
import { iconsmind, simplelineicons } from "../../../../../data/icons";
import NCoreHelper from "../../../../NCoreHelper/NCoreHelper";

export default {
  components: {},
  directives: {},
  props: {},
  computed: {},
  data() {
    return {
      idModal: "IConModal",
      simplelineicons,
      iconsmind
    };
  },
  watch: {},
  methods: {
    closeModal() {
      NCoreHelper.v2modalShowHide(this, this.idModal, 0);
    },
    chooseIcon(val) {
      this.$emit("submitIcon", val);
    }
  }
};
</script>
