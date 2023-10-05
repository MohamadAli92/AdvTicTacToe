<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable vue/require-v-for-key -->
<template>
  <q-page class="flex flex-center page">
    <div>
      <play-table class="playTable" :key="componentKey"></play-table>
    </div>

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

    <!-- <q-btn label="Click me" color="primary" @mouseenter="clickMe" class="btn" /> -->
  </q-page>
</template>

<script>
import PlayTable from "src/components/PlayTable.vue";
import { defineComponent } from "vue";
import anime from "animejs/lib/anime.es.js";

export default defineComponent({
  components: { PlayTable },
  name: "IndexPage",
  data: () => ({
    componentKey: 0,
    persistent: false,
  }),
  methods: {
    reset() {
      this.componentKey += 1;
      this.persistent = false;
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
</style>
