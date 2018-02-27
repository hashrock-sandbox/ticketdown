<template>
  <div id="app">
    <MainPage msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MainPage from "./components/MainPage.vue";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
export default Vue.extend({
  name: "app",
  components: {
    MainPage
  }
});
</script>