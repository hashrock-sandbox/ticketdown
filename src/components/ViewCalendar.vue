<template>
  <div>
    <h1>予定</h1>
    <div class="calendar__item" v-for="(ticket, idx) in tickets" :key="idx">
      {{ticket.start_at}} {{ticket.name}}
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    tickets: Array
  }
});
</script>

<style>

</style>
