export default defineNuxtRouteMiddleware(async () => {
  const userStore = useMyUserStore();

  await useAsyncData('myUserStore', () => userStore.refresh());

  if (!userStore.user) {
    return navigateTo("/login", { replace: true });
  }
});
