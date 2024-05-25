export default defineNuxtRouteMiddleware(async () => {
    const { user } = useMyUserStore();
    // @ts-ignore
    if (user && user.username) return navigateTo(`/u/${user.username}/boards`, { replace: true });
});