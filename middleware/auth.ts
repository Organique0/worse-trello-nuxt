export default defineNuxtRouteMiddleware(async () => {
  const userStore = useMyUserStore();

  userStore.$hydrate();

  if (!userStore.user) {
    return navigateTo("/login", { replace: true });
  }
});
