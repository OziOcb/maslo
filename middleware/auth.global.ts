export default defineNuxtRouteMiddleware(async (to) => {
  // NOTE: I had to use the getCurrentUser() method here because using
  //       const { $auth } = useNuxtApp();
  //       was breaking the page on browser reload
  //       This solution was founded here (7:27) - https://www.youtube.com/watch?v=xceR7mrrXsA
  const { getCurrentUser } = useFirebaseAuth();
  const currentUser = await getCurrentUser();
  if (!currentUser?.uid && to.path !== "/") {
    return navigateTo("/");
  }
});
