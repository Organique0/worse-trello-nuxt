export default defineNuxtRouteMiddleware(async (context) => {
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

  try {
    // Attempt to fetch the current user
    const user = await userStore.fetchCurrentUser();

    // Check if the user is available after fetching
    if (!user) {
      return navigateTo("/login", { replace: true });
    }
  } catch (error) {
    // If there's an error (e.g., user not logged in), redirect to login
    return navigateTo("/login", { replace: true });
  }
});
