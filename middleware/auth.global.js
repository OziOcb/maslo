import { useUserStore } from "@/stores/userStore";

export default defineNuxtRouteMiddleware(async (to) => {
  await new Promise((r) => setTimeout(r, 350)); // FIXME: THIS IS A HACK! I need a proper way for waiting for Pinia to fully initialize itself. Otherwise there is a split of a second where the global $auth object is undefined, which breaks some api calls

  const userStore = useUserStore();
  userStore.$subscribe((cb) => {
    if (!cb.events.newValue?.uid && to.path !== "/") {
      return navigateTo("/");
    }
  });
});
