export default defineNuxtRouteMiddleware(async () => {
  const { user } = useMyUserStore();
  if (!user) return navigateTo("/login", { replace: true });
});
