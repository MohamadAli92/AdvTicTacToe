const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "game",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "tutorial",
        name: "tutorial",
        component: () => import("src/pages/tutorialPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
