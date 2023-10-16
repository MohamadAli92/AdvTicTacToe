<!-- eslint-disable vue/require-v-for-key -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div
    id="tableDiv"
    class="column no-wrap flex-center table"
    :key="componentKey"
  >
    <div v-for="indx in 3" class="row no-wrap flex-center col">
      <div
        v-for="indy in 3"
        class="col block"
        :style="{
          backgroundColor: this.$parent.$parent.aroundColor,
        }"
      >
        <small-table
          :clickNum="clickNums[String(indx) + String(indy)]"
          :id="String(indx) + String(indy)"
          :class="gamesStatus[String(indx) + String(indy)]"
        ></small-table>
      </div>
    </div>
  </div>
</template>

<script>
import SmallTable from "src/components/SmallTable.vue";

export default {
  components: { SmallTable },
  props: {
    tutorial: Number,
  },
  emits: ["done-status"],
  data: () => ({
    loading: false,
    turn: 1,
    lastSmallBlock: 0,
    gamesStatus: {
      11: null,
      12: null,
      21: null,
      22: null,
      13: null,
      23: null,
      31: null,
      32: null,
      33: null,
    },
    fullGames: [],
    persistent: false,
    componentKey: 0,
    clickNums: {
      11: undefined,
      12: undefined,
      21: undefined,
      22: undefined,
      13: undefined,
      23: undefined,
      31: undefined,
      32: undefined,
      33: undefined,
    },
  }),
  methods: {
    finishAGame(code, winner) {
      this.gamesStatus[code] = winner === 0 ? "finishedO" : "finishedX";
      this.$parent.$parent.persistent = this.checkForOverallWinner();
    },
    checkForOverallWinner() {
      let g = { ...this.gamesStatus };
      for (const id in g) {
        if (Object.hasOwnProperty.call(g, id)) {
          if (g[id].includes("finished")) g[id] = g[id].substring(0, 9);
        }
      }

      let res = false;

      console.log(g);
      if (g[11].includes("finished")) {
        if (g[11] === g[12] && g[12] === g[13]) res = true;
        else if (g[11] === g[21] && g[21] === g[31]) res = true;
      }
      if (g[22].includes("finished")) {
        if (g[21] === g[22] && g[22] === g[23]) res = true;
        else if (g[12] === g[22] && g[22] === g[32]) res = true;

        if (g[11] === g[22] && g[22] === g[33]) res = true;
        else if (g[13] === g[22] && g[22] === g[31]) res = true;
      }
      if (g[33].includes("finished")) {
        if (g[31] === g[32] && g[32] === g[33]) res = true;
        else if (g[13] === g[23] && g[23] === g[33]) res = true;
      }

      return res;
    },
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
  watch: {
    turn() {
      if (this.fullGames.includes(this.lastSmallBlock)) {
        for (const key in this.gamesStatus) {
          if (this.gamesStatus[key] === "disabled")
            this.gamesStatus[key] = null;
          else if (this.gamesStatus[key] === "finishedX disabled")
            this.gamesStatus[key] = "finishedX";
          else if (this.gamesStatus[key] === "finishedO disabled")
            this.gamesStatus[key] = "finishedO";
        }
      } else {
        for (const key in this.gamesStatus) {
          if (key === this.lastSmallBlock) {
            if (this.gamesStatus[key] === "disabled")
              this.gamesStatus[key] = null;
            else if (this.gamesStatus[key] === "finishedX disabled")
              this.gamesStatus[key] = "finishedX";
            else if (this.gamesStatus[key] === "finishedO disabled")
              this.gamesStatus[key] = "finishedO";
          } else {
            if (this.gamesStatus[key] === null)
              this.gamesStatus[key] = "disabled";
            else if (this.gamesStatus[key] === "finishedX")
              this.gamesStatus[key] = "finishedX disabled";
            else if (this.gamesStatus[key] === "finishedO")
              this.gamesStatus[key] = "finishedO disabled";
          }
        }
      }
    },
    tutorial() {
      if (this.tutorial === 2) {
        setTimeout(() => {
          this.clickNums["13"] = "22";
        }, 1000);
        setTimeout(() => {
          this.$emit("done-status", 2);
        }, 1700);
      } else if (this.tutorial === 3) {
        setTimeout(() => {
          this.clickNums["22"] = "13";
        }, 1000);
        setTimeout(() => {
          this.$emit("done-status", 3);
        }, 1700);
      } else if (this.tutorial === 4) {
        setTimeout(() => {
          this.clickNums["13"] = "31";
        }, 1000);
        setTimeout(() => {
          this.clickNums["31"] = "13";
        }, 1700);
        setTimeout(() => {
          this.clickNums["13"] = "13";
        }, 2400);
        setTimeout(() => {
          this.$emit("done-status", 4);
        }, 3100);
      } else if (this.tutorial === 5) {
        let playingBlocks = [
          ["13", "33"],
          ["33", "12"],
          ["12", "33"],
          ["33", "22"],
          ["22", "33"],
          ["33", "32"],
          ["32", "23"],
          ["23", "21"],
          ["21", "23"],
          ["23", "22"],
          ["22", "23"],
          ["23", "23"],
        ];
        let i = 0;
        setInterval(() => {
          this.clickNums[playingBlocks[i][0]] = playingBlocks[i][1];
          i += 1;
        }, 700);
        setTimeout(() => {
          this.$emit("done-status", 5);
        }, 9100);
      }
    },
  },
};
</script>

<style scoped>
* {
  transition-duration: 0.5s;
}
.table {
  background-color: black;
  border-radius: 0.9375em;
  padding: 0.1em;
}

.disabled {
  pointer-events: none;
  opacity: 0.4;
  transition-duration: 1s;
}

.finishedX {
  background-image: url("../bigCross.gif");
  background-position: center;
  background-color: white;
  transition-duration: 1s;
}

.finishedO {
  background-image: url("../bigCircle.gif");
  background-position: center;
  background-color: white;
  background-size: 300px;
  transition-duration: 1s;
}

.block {
  background-color: #bbe5ed;
  padding: 0.9375em;
  margin: 0.5em;
  border-radius: 10px;
}

@media only screen and (max-width: 767px) and (min-width: 320px) {
  .block {
    padding: 0.5em;
  }
}
</style>
