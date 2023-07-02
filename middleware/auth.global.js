import { useUserStore } from "@/stores/userStore";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  userStore.$subscribe((cb) => {
    if (!cb.events.newValue?.uid && to.path !== "/login") {
      return navigateTo("/login");
    }
  });
});
