<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
  <q-page class="flex flex-center page">
    <div>
      <play-table class="playTable" :key="componentKey"></play-table>
    </div>

    <q-page-sticky position="right" :offset="[30, 18]">
      <q-btn
        fab
        icon="restart_alt"
        padding="25px"
        color="orange"
        size="30px"
        @click="showResetDialog"
      >
        <q-tooltip anchor="center left" self="center right" :offset="[10, 10]">
          <strong>Restart game!</strong>
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-fab color="purple" icon="settings" direction="up">
        <q-fab-action color="primary" @click="changeColor" icon="palette">
          <q-tooltip
            anchor="center left"
            self="center right"
            :offset="[10, 10]"
          >
            <strong>Color Picker</strong>
          </q-tooltip>
        </q-fab-action>
        <q-fab
          color="amber"
          text-color="black"
          icon="keyboard_arrow_left"
          direction="left"
          padding="8px"
        >
          <q-fab-action
            color="amber"
            text-color="black"
            @click="onClick"
            icon="info"
          >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
            >
              <strong>Toturial</strong>
            </q-tooltip>
          </q-fab-action>
          <a
            href="https://github.com/aiwnsjjw/AdvTicTacToe"
            target="_blank"
            rel="noreferrer"
          >
            <q-fab-action
              color="amber"
              text-color="black"
              @click="openGithub"
              icon="code"
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                <strong>Source Code</strong>
              </q-tooltip>
            </q-fab-action>
          </a>
        </q-fab>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="colorChanger" position="left">
      <q-card class="color-picker-card">
        <q-card-section>
          <div class="picker-text text-weight-bold">Table around color</div>
          <q-color
            v-model="aroundColor"
            no-header
            no-footer
            class="my-picker"
          />
        </q-card-section>
        <q-card-section>
          <div class="picker-text text-weight-bold">Table inner color</div>

          <q-color v-model="innerColor" no-header no-footer class="my-picker" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Geme Over!!!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Click on the button to play again.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Restart" @click="reset" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="resetDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Do you really want to restart game?</div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Yes" @click="componentKey += 1" v-close-popup />
          <q-btn flat label="No" @click="resetDialog = false" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import PlayTable from "src/components/PlayTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { PlayTable },
  name: "IndexPage",
  data: () => ({
    componentKey: 0,
    persistent: false,
    colorChanger: false,
    aroundColor: "#bbe5ed",
    innerColor: "#7180ac",
    resetDialog: false,
  }),
  methods: {
    reset() {
      this.componentKey += 1;
      this.persistent = false;
    },
    showResetDialog() {
      this.resetDialog = true;
    },
    changeColor() {
      this.colorChanger = true;
    },
  },
});
</script>

<style scoped>
.page {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 60s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.my-picker {
  margin-top: 5px;
  background-color: rgba(28, 28, 28, 0.626);
  border-radius: 10px;
}

.picker-text {
  padding: 5px;
  text-align: center;
  background: rgb(255, 255, 255);
  border-bottom-style: solid;
  border-radius: 40px;
}

.color-picker-card {
  background-color: transparent;
  border: none;
  box-shadow: none;
}
</style>
