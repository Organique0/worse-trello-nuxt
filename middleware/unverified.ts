export default defineNuxtRouteMiddleware(() => {
  const { user } = useMyUserStore();

  if (!user) return navigateTo("/login");

  // @ts-ignore
  if (user.value.email_verified_at || user.value.is_verified)
    return navigateTo("/dashboard");
});
