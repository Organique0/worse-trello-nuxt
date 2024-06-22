export default defineNuxtRouteMiddleware(async () => {
  const { user } = useMyUserStore();
  // @ts-ignore
  if (user && user.id)
    return navigateTo(`/u/${user.id}/boards`, { replace: true });
});
