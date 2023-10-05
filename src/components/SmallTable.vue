<!-- eslint-disable vue/require-v-for-key -->
<template>
  <div class="q-pa-md">
    <table class="table">
      <tr v-for="indx in 3">
        <th v-for="indy in 3">
          <div
            :class="blocks[String(indx) + String(indy)].class"
            @click="check(String(indx) + String(indy))"
            :style="{
              backgroundColor: this.$parent.$parent.$parent.innerColor,
            }"
            @mouseenter="$event.srcElement.style.backgroundColor = '#2b4570'"
            @mouseleave="
              $event.srcElement.style.backgroundColor =
                this.$parent.$parent.$parent.innerColor
            "
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
      ["11", "12", "13"],
      ["21", "22", "23"],
      ["31", "32", "33"],
      ["11", "21", "31"],
      ["12", "22", "32"],
      ["13", "23", "33"],
    ],
    playerBlocks: { 0: [], 1: [] },
    gameIsDone: false,
    winnerPlayer: -1,
  }),
  methods: {
    check(code) {
      if (!this.blocks[code].set && this.blocks[code].player === -1) {
        if (this.$parent.turn == 0)
          this.blocks[code].source = "littleCircle.gif" + "?a=" + Math.random();
        else
          this.blocks[code].source = "littleCross.gif" + "?a=" + Math.random();
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
        const blocksArray = this.playerBlocks[player];
        if (blocksArray.length >= 3) {
          let res = false;
          this.winWays.forEach((winWay) => {
            let valid = true;
            winWay.forEach((el) => {
              if (!blocksArray.includes(el)) valid = false;
            });
            if (valid) return (res = valid);
          });
          console.log(res);
          if (res) return res;
          // for (const way in this.winWays) {
          //   if (Object.hasOwnProperty.call(this.winWays, way)) {
          //     const wayArr = this.winWays[way];
          //     // console.log;
          //     wayArr.forEach((el) => {});
          //     console.log(wayArr);
          //     wayArr.every((item) => console.log(item));
          //     // if ()
          //     //   return true;
          //   }
          // }
          // return this.winWays.some((way) =>
          //   way.every((item) => blocksArray.includes(item))
          // );

          // return (
          //   (blocksArray[0][0] === blocksArray[1][0] &&
          //     blocksArray[1][0] === blocksArray[2][0]) ||
          //   (blocksArray[0][1] === blocksArray[1][1] &&
          //     blocksArray[1][1] === blocksArray[2][1]) ||
          //   this.winWays[0].every((item) => blocksArray.includes(item)) ||
          //   this.winWays[1].every((item) => blocksArray.includes(item))
          // );
        }
        // }
      }
      // console.log("Cat");
      return false;
    },
    hoverBlock($event) {
      console.log($event);
      $event.srcElement.style.backgroundColor = "red";
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
  transition-duration: 0.15s;
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
.main {
  padding: 0px;
}
</style>
