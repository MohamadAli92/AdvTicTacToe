<template>
  <q-layout view="lhh lpR fff">
    <q-header reveal elevated class="bg-black text-white">
      <q-toolbar class="glossy">
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo.png" />
          </q-avatar>
          Advanced Tic-Tac-Toe
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          :icon="page === 'game' ? 'help' : 'close'"
          @click="changePage"
          :to="page === 'game' ? '/tutorial' : '/'"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <transition mode="out-in" name="fade">
        <router-view v-slot="{ Component }">
          <component @go-to-game="changePage" :is="Component" />
        </router-view>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import "animate.css";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  data: () => ({
    page: "game",
  }),
  methods: {
    changePage() {
      console.log(this.$route);
      this.page = this.page === "game" ? "tutorial" : "game";
    },
  },
  mounted() {
    this.page = this.$route.name;
  },
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
