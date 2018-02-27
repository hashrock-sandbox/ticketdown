<template>
  <div>
    <h1>ガントチャート</h1>
    <svg width="300" height="300">
      <ViewGanttLine v-for="(ticket, index) in tickets" :ticket="ticket" :index="index" :key="index" :svg-width="svgWidth" :time-range="timeRange"></ViewGanttLine>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as scale from "d3-scale";
import ViewGanttLine from "./ViewGanttLine.vue";

export default Vue.extend({
  components: {
    ViewGanttLine
  },
  props: {
    tickets: Array
  },
  data() {
    return {
      svgWidth: 600,
      timeRange: [
        new Date(2018, 0, 1).getTime(),
        new Date(2018, 0, 20).getTime()
      ]
    };
  },
  methods: {}
});
</script>

<style>

</style>
