<!-- eslint-disable vue/require-v-for-key -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div class="q-pa-md">
    <table class="table" :key="componentKey">
      <tr v-for="indx in 3">
        <th v-for="indy in 3">
          <div class="block">
            <small-table
              :id="String(indx) + String(indy)"
              :class="gamesStatus[String(indx) + String(indy)]"
            ></small-table>
          </div>
        </th>
      </tr>
      <!-- <th>
          <div class="block">
            <small-table></small-table>
          </div>
        </th>
        <th>
          <div class="block"><small-table></small-table></div>
        </th>
        <th>
          <div class="block"><small-table></small-table></div>
        </th>
      </tr>
      <tr>
        <th>
          <div class="block"><small-table></small-table></div>
        </th>
        <th>
          <div class="block"><small-table></small-table></div>
        </th>
        <th>
          <div class="block"><small-table></small-table></div>
        </th>
      </tr>
      <tr>
        <th>
          <div class="block"><small-table></small-table></div>
        </th>
        <th>
          <div class="block"><small-table></small-table></div>
        </th>
        <th>
          <div class="block"><small-table></small-table></div>
        </th>
      </tr> -->
    </table>
  </div>
</template>

<script>
import SmallTable from "src/components/SmallTable.vue";

export default {
  components: { SmallTable },
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
    // finishedGames: [],
    // finishedAGame: false,
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
      // if (g[22].includes("finished")) {
      //   if (g[11] === g[22] && g[22] === g[33]) console.log("left to right");
      //   else if (g[13] === g[22] && g[22] === g[31])
      //     console.log("right to left");
      // }

      // if (
      //   ((g[11].includes("finishedX") || g[11].includes("finishedO")) &&
      //     ((g[11] === g[12] && g[12] === g[13]) ||
      //       (g[11] === g[21] && g[21] === g[31]))) ||
      //   ((g[22].includes("finishedX") || g[22].includes("finishedO")) &&
      //     ((g[21] === g[22] && g[22] === g[23]) ||
      //       (g[12] === g[22] && g[22] === g[32]))) ||
      //   ((g[33].includes("finishedX") || g[33].includes("finishedO")) &&
      //     ((g[31] === g[32] && g[32] === g[33]) ||
      //       (g[13] === g[23] && g[23] === g[33]))) ||
      //   ((g[22].includes("finishedX") || g[22].includes("finishedO")) &&
      //     ((g[11] === g[22] && g[22] === g[33]) ||
      //       (g[13] === g[22] && g[22] === g[31])))
      // ) {
      //   console.log("Game is done");
      //   this.$parent.persistent = true;
      // }
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
      // console.log(this.gamesStatus);
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
    // turn() {
    //   console.log(this.turn);
    //   console.log(this.finishedGames);
    //   // console.log(this.turn);
    //   console.log("length is" + this.finishedGames.length);
    //   // for (const game in this.finishedGames) {
    //   //   console.log(game);
    //   // }
    //   this.finishedGames.forEach((game) => {
    //     console.log(game);
    //     this.gamesStatus[game.id] =
    //       game.winner === 1 ? "finishedX" : "finishedO";
    //   });
    //   // console.log(this.gamesStatus);
    // },
    // finishedAGame() {
    //   console.log(this.finishedGames);
    //   this.finishedGames.forEach((game) => {
    //     console.log(game);
    //     this.gamesStatus[game.id] =
    //       game.winner === 1 ? "finishedX" : "finishedO";
    //   });
    // },
  },
};
</script>

<style scoped>
* {
  transition-duration: 1s;
}
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 1000000;
  color: white;
}

table {
  background-color: black;
}

.disabled {
  pointer-events: none;
  opacity: 0.4;
  transition-duration: 1s;
}

.finishedX {
  background-image: url("src\\assets\\bigCross.gif");
  background-position: center;
  background-color: white;
  transition-duration: 1s;
  /* background-color: red; */
}

.finishedO {
  background-image: url("src\\assets\\bigCircle.gif");
  background-position: center;
  background-color: white;
  background-size: 390px;
  transition-duration: 1s;
}

.block {
  background-color: #bbe5ed;
  height: 200px;
  width: 200px;
  margin: 5px;
}
</style>
