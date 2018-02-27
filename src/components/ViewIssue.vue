<template>
  <div>
    <h1>Issue一覧</h1>
    <div class="calendar__item" v-for="(ticket, idx) in issues" :key="idx">
      {{ticket.name}}
      <span v-if="ticket.user">👤{{ticket.user}}</span>
      <span class="tag" v-for="(tag, ti) in ticket.tags" :key="ti">#{{tag}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Ticket } from "./data";

export default Vue.extend({
  props: {
    tickets: Array
  },
  computed: {
    issues(): Ticket[] {
      const tickets: Ticket[] = this.tickets as Ticket[];
      return tickets.filter((i: Ticket) =>
        i.tags.find((t: string) => !!t.match("Open"))
      );
    }
  }
});
</script>

<style>

</style>
