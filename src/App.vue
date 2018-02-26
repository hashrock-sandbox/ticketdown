<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import "bootstrap/dist/css/bootstrap-reboot.min.css";

export default Vue.extend({
  name: "app",
  components: {
    HelloWorld
  }
});
</script>

<style>

</style>
