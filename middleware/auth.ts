export default defineNuxtRouteMiddleware(async () => {
  try {
    await $larafetch("/api/user");
  } catch (error: any) {
    return navigateTo("/login", { replace: true });
  }
});
