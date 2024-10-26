export default defineNuxtRouteMiddleware(() => {
  const userStore = useMyUserStore();

  userStore.$hydrate();

  if (!userStore.user) {
    return navigateTo("/login", { replace: true });
  }

  if (!(userStore.user.email_verified_at))
    return navigateTo("/verify-email");
});
