<template>
  <div class="hello">
    <div>
      ticketdown - prototype
    </div>
    <code-mirror ref="editor" v-model="source" :options="options">
    </code-mirror>    
    <div>
      <select v-model="mode">
        <option value="ViewCalendar">calendar</option>
        <option value="ViewGantt">gantt</option>
        <option value="ViewIssue">issue</option>
        <option>board</option>
      </select>
    </div>

    <component :is="mode" :tickets="tickets"></component>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
const CodeMirror = require("vue-cm");
import "codemirror/mode/markdown/markdown";
import ViewCalendar from "./ViewCalendar.vue";
import ViewIssue from "./ViewIssue.vue";
import ViewGantt from "./ViewGantt.vue";
import { Ticket } from "./data";

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
  components: {
    CodeMirror,
    ViewCalendar,
    ViewGantt,
    ViewIssue
  },
  data() {
    return {
      source: source,
      mode: "ViewGantt",
      options: {
        mode: "markdown",
        theme: "monokai",
        lineNumbers: true,
        lineWrapping: true
      }
    };
  },
  computed: {
    tickets(): Ticket[] {
      return parseLines(this.source);
    },
    output(): string {
      return JSON.stringify(parseLines(this.source), null, 2);
    }
  },
  mounted() {
    // var cm = (this.$refs.editor as any).getCodeMirror()
  }
});
</script>

<style src="codemirror/lib/codemirror.css"></style>
<style src="codemirror/theme/monokai.css"></style>
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