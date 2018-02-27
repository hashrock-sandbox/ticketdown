<template>
  <g :transform="transform">
    <rect x=0 y=0 :width="width" height=28></rect>
    <text y=20 text-anchor="end">{{ticket.name}}</text>
  </g>
</template>

<script lang="ts">
import Vue from "vue";
import * as d3s from "d3-scale";
import { Ticket } from "./data";
import { stringify } from "querystring";

export default Vue.extend({
  props: {
    ticket: Object,
    index: Number,
    svgWidth: Number,
    timeRange: Array
  },
  computed: {
    transform(): string {
      return `translate(${this.startX}, ${this.index * 32})`;
    },
    width(): number {
      if (!this.endEpoc) {
        return (
          this.scale(1000 * 60 * 60 * 24 + this.startEpoc) -
          this.scale(this.startEpoc)
        );
      }
      return this.scale(this.endEpoc) - this.scale(this.startEpoc);
    },
    startX(): number {
      return d3s
        .scaleLinear()
        .domain(this.timeRange)
        .range([0, this.svgWidth])(this.startEpoc);
    },
    startEpoc(): number {
      return new Date(this.ticket.start_at).getTime();
    },
    endEpoc(): number {
      return new Date(this.ticket.end_at).getTime();
    }
  },
  methods: {
    scale(value: number) {
      return d3s
        .scaleLinear()
        .domain(this.timeRange)
        .range([0, this.svgWidth])(value);
    }
  }
});
</script>

<style>
rect {
  fill: #aad;
}
</style>
