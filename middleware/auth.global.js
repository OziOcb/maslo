export default defineNuxtRouteMiddleware(async (to) => {
  const { getCurrentUser } = useFirebaseAuth();
  const currentUser = await getCurrentUser();
  if (!currentUser?.uid && to.path !== "/") {
    return navigateTo("/");
  }
});
