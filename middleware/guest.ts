export default defineNuxtRouteMiddleware(async () => {
    const { user } = useMyUserStore();
    if (user) return navigateTo("/", { replace: true });
});