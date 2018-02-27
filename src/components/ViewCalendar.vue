<template>
  <div>
    <h1>予定</h1>

    <div class="calendar">
      <div class="calendar__item" v-for="(day, idx) in days" :key="idx">
        <div class="calendar__item__label">{{day.label}}</div>
        <div class="calendar__item__ticket" v-for="(ticket, index) in day.tickets" :key="index">{{ticket.name}}</div>
      </div>
    </div>
    <!--
    <div class="calendar__item" v-for="(ticket, idx) in tickets" :key="idx">
      {{ticket.start_at}} {{ticket.name}}
    </div>
    -->

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Ticket } from "@/components/data";

export default Vue.extend({
  props: {
    tickets: Array
  },
  computed: {
    days() {
      var out = [];
      var d = new Date();
      var targetMonth = d.getMonth();
      d.setDate(1);
      var day = d.getDay();
      d.setDate(d.getDate() - day);
      while (true) {
        out.push({
          label: d.getDate(),
          tickets: this.tickets.filter((item: Ticket) => {
            let e = new Date(item.start_at);
            return (
              d.getFullYear() === e.getFullYear() &&
              d.getMonth() === e.getMonth() &&
              d.getDate() === e.getDate()
            );
          })
        });
        d.setDate(d.getDate() + 1);
        if (d.getMonth() > targetMonth && d.getDay() === 0) {
          break;
        }
      }
      return out;
    }
  }
});
</script>

<style>
.calendar {
  width: 800px;
}
.calendar__item {
  width: 14%;
  height: 80px;
  border: 1px solid;
  display: inline-block;
  box-sizing: border-box;
  overflow: hidden;
}
.calendar__item__label {
  font-weight: 900;
}
.calendar__item__ticket {
  font-size: 0.5rem;
  background: #666;
  color: white;
  border-radius: 4px;
}
</style>
