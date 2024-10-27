// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useMyUserStore();

  // Ensure the store is hydrated from the persisted state
  if (import.meta.server) {
    const cookieHeader = useRequestHeaders()['cookie'];
    if (cookieHeader) {
      const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
      const savedState = cookies[userStore.$id];
      if (savedState) {
        userStore.$patch(JSON.parse(decodeURIComponent(savedState)));
      }
    }
  } else {
    await userStore.$hydrate();
  }

  // Check if the user is logged in
  if (!userStore.isLoggedIn) {
    return navigateTo('/login', { replace: true });
  }
});