<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="q-pa-md">
    <table class="table">
      <tr v-for="indx in 3">
        <th v-for="indy in 3">
          <div
            :class="blocks[String(indx) + String(indy)].class"
            @click="check(String(indx) + String(indy))"
          >
            <img
              v-if="blocks[String(indx) + String(indy)].set"
              :src="blocks[String(indx) + String(indy)].source"
              :class="blocks[String(indx) + String(indy)].class"
              alt="circleGif"
            />
          </div>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data: () => ({
    blocks: {
      11: { source: "block", class: "block", set: false, player: -1 },
      12: { source: "block", class: "block", set: false, player: -1 },
      21: { source: "block", class: "block", set: false, player: -1 },
      22: { source: "block", class: "block", set: false, player: -1 },
      13: { source: "block", class: "block", set: false, player: -1 },
      23: { source: "block", class: "block", set: false, player: -1 },
      31: { source: "block", class: "block", set: false, player: -1 },
      32: { source: "block", class: "block", set: false, player: -1 },
      33: { source: "block", class: "block", set: false, player: -1 },
    },
    winWays: [
      ["11", "22", "33"],
      ["13", "22", "31"],
    ],
    playerBlocks: { 0: [], 1: [] },
    gameIsDone: false,
    winnerPlayer: -1,
  }),
  methods: {
    check(code) {
      if (!this.blocks[code].set && this.blocks[code].player === -1) {
        if (this.$parent.turn == 0)
          this.blocks[code].source =
            "src\\assets\\littleCircle.gif" + "?a=" + Math.random();
        else
          this.blocks[code].source =
            "src\\assets\\littleCross.gif" + "?a=" + Math.random();
        this.blocks[code].player = this.$parent.turn;
        this.blocks[code].class = "setBlock";
        this.blocks[code].set = true;
        this.playerBlocks[this.$parent.turn].push(code);
        this.$parent.lastSmallBlock = code;
        if (!this.gameIsDone) {
          this.gameIsDone = this.checkForWinner();
          if (this.gameIsDone)
            this.$parent.finishAGame(this.$attrs.id, this.$parent.turn);
        }
        if (this.playerBlocks[0].length + this.playerBlocks[1].length === 9)
          this.$parent.fullGames.push(this.$attrs.id);
        this.$parent.turn = this.$parent.turn == 0 ? 1 : 0;
      }
    },
    checkForWinner() {
      for (const player in this.playerBlocks) {
        if (Object.hasOwnProperty.call(this.playerBlocks, player)) {
          const blocksArray = this.playerBlocks[player];
          if (blocksArray.length >= 3) {
            return (
              (blocksArray[0][0] === blocksArray[1][0] &&
                blocksArray[1][0] === blocksArray[2][0]) ||
              (blocksArray[0][1] === blocksArray[1][1] &&
                blocksArray[1][1] === blocksArray[2][1]) ||
              blocksArray.every((item) => this.winWays[0].includes(item)) ||
              blocksArray.every((item) => this.winWays[1].includes(item))
            );
          }
        }
      }
      return false;
    },
  },
  watch: {
    // gameIsDone() {
    //   // console.log(this.$attrs.id);
    //   this.$parent.finishedGames.push({
    //     id: this.$attrs.id,
    //     winner: this.winnerPlayer,
    //   });
    // },
  },
};
</script>

<style scoped>
table {
  background-color: black;
  height: 100%;
  width: 100%;
}

.block {
  background-color: #7180ac;
  width: 50px;
  height: 50px;
  margin: 1px;
}

.setBlock {
  background-color: white;
  width: 50px;
  height: 50px;
  margin: 1px;
}

.cross {
  background-color: red;
  width: 50px;
  height: 50px;
  margin: 1px;
}

.circle {
  /* background-color: green; */
  /* background-color: white; */
  background-image: url("..\assets\circle.gif");
  background-position: center;
  width: 50px;
  height: 50px;
  margin: 1px;
}
.block:hover {
  background-color: #2b4570;
}

.main {
  padding: 0px;
}
</style>
