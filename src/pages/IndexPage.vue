<template>
  <q-page class="flex flex-center">
    <play-table :key="componentKey"></play-table>

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

    <!-- <q-btn label="Click me" color="primary" @click="reset" /> -->
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
  }),
  methods: {
    reset() {
      this.componentKey += 1;
      this.persistent = false;
    },
  },
});
</script>
