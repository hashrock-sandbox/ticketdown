<template>
  <div class="hello">
    <div>
      ticketdown - prototype
    </div>
    <textarea class="editor" v-model="source"></textarea>
    <textarea class="editor" v-model="output"></textarea>
    <div>
      <select v-model="mode">
        <option>calendar</option>
        <option>gantt</option>
        <option>issue</option>
        <option>board</option>
      </select>
    </div>

    <div v-if="mode === 'calendar'">
      <h1>予定</h1>
      <div v-for="(ticket, idx) in tickets" :key="idx">
        {{ticket.start_at}} {{ticket.name}}
      </div>
    </div>
    <div v-if="mode === 'gantt'">
      <svg width="300" height="300">
        <rect x=0 y=0 width=100 height=100></rect>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface Ticket {
  name: string;
  start_at: string;
  end_at: string;
  alarm_at: string;
  user: string;
  tags: string[];
  //  children: ticket[]
  //  status: 'open' | 'closed' attribute
  attributes: { [key: string]: string };
}

function parseLine(src: string): Ticket {
  const items = src.split(" ");
  const user = items.find(i => !!i.match(/^👤.*/g));
  const alarmAt = items.find(i => !!i.match(/^⏰.*/g));

  return {
    name: items[0],
    start_at: items[1],
    end_at: items[2],
    alarm_at: alarmAt ? alarmAt.replace(/⏰/g, "") : "",
    user: user ? user.replace(/👤/g, "") : "",
    tags: [],
    attributes: {}
  };
}

function parseLines(src: string): Ticket[] {
  return src.split("\n").map(parseLine);
}

let source = `タスク1 2018-01-01 2018-01-03 👤yamada ⏰2018-01-02
タスク2 2018-01-02 2018-01-05
マイルストーン 2018-01-05
`;

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      source: source,
      mode: "calendar"
    };
  },
  computed: {
    tickets(): Ticket[] {
      return parseLines(this.source);
    },
    output(): string {
      return JSON.stringify(parseLines(this.source), null, 2);
    }
  }
});
</script>

<style scoped>
.editor {
  width: 100%;
  height: 10rem;
}
body {
  background: #999;
}
.hello {
  margin: 1rem;
  padding: 1rem;
  background: white;
}
</style>
