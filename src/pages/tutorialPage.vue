<template>
  <q-page
    id="pageId"
    class="fit row wrap justify-center items-center content-center page"
  >
    <div :class="$q.screen.gt.md ? 'q-pa-md steps col-6' : 'q-pa-md steps col'">
      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
        class="transparent"
        flat
        inactive-color="black"
        active-color="black"
      >
        <q-step
          :name="1"
          title="You have to know tic-tac-toe"
          icon="info"
          :done="step > 1"
        >
          We have 9 small and normal tic-tac-toe games. Two players, one circle
          and one cross play with each other in turn.When three similar elements
          places in a line vertical, horizontal or diagonal; that player wins
          the game.

          <q-stepper-navigation>
            <q-btn @click="goToStep(2)" color="primary" label="Continue" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Priorty matters"
          icon="priority_high"
          :done="step > 2"
        >
          Game always starts with cross; Next player should plays his turn after
          that.
          <br /><strong>
            For example first player clicks on middle block on upper right
            game.</strong
          >

          <q-stepper-navigation>
            <q-btn
              :loading="$q.screen.gt.md && buttonDisable[0]"
              @click="goToStep(3)"
              color="primary"
              label="Continue"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="You should have strategy"
          icon="extension"
          :done="step > 2"
        >
          Next player should play in corresponding game of 9 games by block
          which played last.
          <br />
          <strong>
            For example second player now only can play on center game.
          </strong>

          <q-stepper-navigation>
            <q-btn
              :loading="$q.screen.gt.md && buttonDisable[1]"
              @click="goToStep(4)"
              color="primary"
              label="Continue"
            />
            <!-- <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Back"
              class="q-ml-sm"
            /> -->
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="4"
          title="All of this for one game"
          icon="local_fire_department"
          :done="step > 4"
        >
          Game continues until one of players win a game. <br />

          <q-stepper-navigation>
            <q-btn
              :loading="$q.screen.gt.md && buttonDisable[2]"
              @click="goToStep(5)"
              color="primary"
              label="Continue"
            />
            <!-- <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Back"
              class="q-ml-sm"
            /> -->
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="5"
          title="You have to win 3 games in a line"
          icon="emoji_events"
          :done="step > 5"
        >
          Now you should try and have strategy to win three games in a line,
          vertically, horizontally or diagonal. <br />
          When a player wins 3 tables, the game would be finished and you can
          restart the game.

          <q-stepper-navigation>
            <q-btn
              :loading="$q.screen.gt.md && buttonDisable[3]"
              @click="restartTutorial"
              color="red"
              label="Restart tutorial"
            />
            <!-- <q-btn
              @click="this.$emit('go-to-game')"
              color="green"
              label="Play Game!"
              class="q-ml-sm"
            /> -->
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>

    <div
      v-if="$q.screen.gt.md"
      class="fit row wrap justify-start items-center content-center col"
    >
      <play-table
        style="pointer-events: none; font-size: 16px"
        :tutorial="step"
        id="tableId"
        :class="disableTable ? 'disabled' : ''"
        :key="componentKey"
        @done-status="
          (status) => {
            console.log(status);
            buttonDisable[status - 2] = false;
          }
        "
      ></play-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import PlayTable from "src/components/PlayTable.vue";

export default defineComponent({
  components: { PlayTable },

  name: "TutorialPage",

  data: () => ({
    step: 1,
    disableTable: true,
    buttonDisable: [true, true, true, true],
    componentKey: 0,
  }),
  methods: {
    goToStep(stepNum) {
      if (stepNum === 2) {
        this.disableTable = false;
        this.step = 2;
        document.getElementById("pageId").style.backgroundColor = "#B2A4FF";
      } else if (stepNum === 3) {
        this.step = 3;
        document.getElementById("pageId").style.backgroundColor = "#FFB4B4";
      } else if (stepNum === 4) {
        this.step = 4;
        document.getElementById("pageId").style.backgroundColor = "#FDF7C3";
      } else if (stepNum === 5) {
        this.step = 5;
        document.getElementById("pageId").style.backgroundColor = "#CBFFA9";
      }
    },
    restartTutorial() {
      this.componentKey++;
      this.disableTable = true;
      this.step = 1;
      this.buttonDisable = [true, true, true, true];
      document.getElementById("pageId").style.backgroundColor = "#8CC0DE";
    },
  },

  // name: 'PageName',
});
</script>

<style scoped>
.page {
  background-color: #8cc0de;
  font-size: 20px;
  transition-duration: 1500ms;
}

@media only screen and (max-width: 376px) and (min-width: 320px) {
  .page {
    font-size: 13px;
  }
}

@media only screen and (max-width: 767px) and (min-width: 377px) {
  .page {
    font-size: 18px;
  }
}
</style>
