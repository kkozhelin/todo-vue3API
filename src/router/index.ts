import { createRouter, createWebHistory } from "vue-router";

import AuthorizationPage from "@/views/AuthorizationPage.vue";
import TodosPage from "@/views/TodosPage.vue";

import { useProfileStore } from "@/store/profileStore";

export const routes = [
  {
    path: "/",
    redirect: { name: "Authorization" },
  },
  {
    path: "/auth",
    name: "Authorization",
    component: AuthorizationPage,
  },
  {
    path: "/todos",
    name: "todos",
    component: TodosPage,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Authorization" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  const profileStore = useProfileStore();
  await profileStore.checkAuth();
  if (to.path !== "/auth" && !profileStore.isAuthenticated) {
    return { path: "/auth" };
  }
});

export default router;
