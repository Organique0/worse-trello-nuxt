
export default defineNuxtRouteMiddleware(async (context) => {
  const userStore = useMyUserStore();

  if (!userStore.user) {
    console.log("User not found, redirecting to login from middleware");
    return navigateTo("/login", { replace: true });
  }
});
