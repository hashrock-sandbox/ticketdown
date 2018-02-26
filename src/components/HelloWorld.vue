<template>
  <div class="hello">
    <div>
      ticketdown - prototype
    </div>
    <textarea class="editor" v-model="source"></textarea>
    <!--
    <textarea class="editor" v-model="output"></textarea>
    -->
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
      <div class="calendar__item" v-for="(ticket, idx) in tickets" :key="idx">
        {{ticket.start_at}} {{ticket.name}}
      </div>
    </div>
    <div v-if="mode === 'issue'">
      <h1>Issue一覧</h1>
      <div class="calendar__item" v-for="(ticket, idx) in issues" :key="idx">
        {{ticket.name}} <span v-if="ticket.user">👤{{ticket.user}}</span> <span class="tag" v-for="(tag, ti) in ticket.tags" :key="ti">#{{tag}}</span>
      </div>
    </div>
    <div v-if="mode === 'gantt'">
      <h1>ガントチャート</h1>
      <svg width="300" height="300">
        <rect class="gantt__line" v-for="(ticket, idx) in tickets" :x="d2s(ticket.start_at)" :y="idx * 24" :key="idx" :width="r2e(ticket.start_at, ticket.end_at)" height=22></rect>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as scale from "d3-scale";
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
  const user = items.find((i: string) => !!i.match(/^👤.*/g));
  const alarmAt = items.find((i: string) => !!i.match(/^⏰.*/g));
  const tags = items
    .filter((i: string) => !!i.match(/^#.*/g))
    .map((i: string) => i.replace(/#/g, ""));

  return {
    name: items[0],
    start_at: items[1],
    end_at: items[2],
    alarm_at: alarmAt ? alarmAt.replace(/⏰/g, "") : "",
    user: user ? user.replace(/👤/g, "") : "",
    tags: tags,
    attributes: {}
  };
}

function parseLines(src: string): Ticket[] {
  return src.split("\n").map(parseLine);
}

let source = `タスク1 2018-01-01 2018-01-03 👤yamada ⏰2018-01-02
タスク2 2018-01-02 2018-01-05
Issue1 2018-01-02 2018-01-05 #Open 👤yamada
Issue2 2018-01-03 2018-01-05 #Open
マイルストーン 2018-01-05`;

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      source: source,
      mode: "calendar",
      svgWidth: 600,
      timeRange: [
        new Date(2018, 0, 1).getTime(),
        new Date(2018, 0, 20).getTime()
      ]
    };
  },
  computed: {
    tickets(): Ticket[] {
      return parseLines(this.source);
    },
    output(): string {
      return JSON.stringify(parseLines(this.source), null, 2);
    },
    issues(): Ticket[] {
      return this.tickets.filter(i => i.tags.find(t => !!t.match("Open")));
    }
  },
  methods: {
    d2s(d: string) {
      return this.scale(new Date(d).getTime());
    },
    r2e(d: string, d2: string) {
      if (!d2) {
        return 1000 * 60 * 60 * 24;
      }
      return (
        this.scale(new Date(d2).getTime()) - this.scale(new Date(d).getTime())
      );
    },
    scale(epoc: number) {
      return scale
        .scaleLinear()
        .domain(this.timeRange)
        .range([0, this.svgWidth])(epoc);
    },
    invert(x: number) {
      return scale
        .scaleLinear()
        .domain(this.timeRange)
        .range([0, this.svgWidth])
        .invert(x);
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
.gantt__line {
  fill: #557;
}
.calendar__item {
  border: 1px solid #557;
  padding: 0.5rem;
}
.tag {
  background: #66a585;
  color: white;
  display: inline-block;
  padding: 0rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}
</style>
