<template>
  <g :transform="transform">
    <rect x=8 y=0 :width="width" height=28></rect>
    <text y=20 text-anchor="end">{{ticket.name}}</text>
  </g>
</template>

<script lang="ts">
import Vue from "vue";
import * as d3scale from "d3-scale";
import { Ticket } from "./data";

export default Vue.extend({
  props: {
    ticket: Object,
    index: Number,
    options: Object
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
      return this.scale(this.startEpoc);
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
      return d3scale
        .scaleLinear()
        .domain(this.options.timeRange)
        .range([0, this.options.svgWidth])(value);
    }
  }
});
</script>

<style>
rect {
  fill: #aad;
}
</style>
