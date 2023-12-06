<template>
  <div id="app-container" :class="getMenuType">
    <topnav/>
    <sidebar/>
    <main>
      <!-- <n-notification/> -->
      <div class="container-fluid">
        <slot></slot>
<!--        <button type="button" class="btn icon-button large ml-1 btn-outline-primary"><i class="simple-icon-paper-clip"></i></button>-->
      </div>
<!--      <contact-right-icon/>-->
    </main>
    <footer-component/>
  </div>
</template>

<script>
import Sidebar from "../containers/navs/Sidebar";
import Topnav from "../containers/navs/Topnav";
import Footer from "../containers/navs/Footer";
import {mapGetters} from "vuex";
import ContactRightIcon from "@/views/app/system-manager/modal-content/contactRightIcon";

export default {
  components: {
    ContactRightIcon,
    topnav: Topnav,
    sidebar: Sidebar,
    "footer-component": Footer
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters(["getMenuType"])
  },
  mounted() {
    setTimeout(() => {
      document.body.classList.add("default-transition");
    }, 100);
  }
};
</script>
