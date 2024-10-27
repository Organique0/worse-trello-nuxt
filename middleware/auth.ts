export default defineNuxtRouteMiddleware(async (context) => {
  const userStore = useMyUserStore();

  console.log('Middleware started');

  // Ensure the store is hydrated from the persisted state
  if (import.meta.server) {
    console.log('Running on server');
    const cookieHeader = useRequestHeaders()['cookie'];
    if (cookieHeader) {
      const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));
      const savedState = cookies[userStore.$id];
      if (savedState) {
        console.log('Hydrating store from cookies');
        userStore.$patch(JSON.parse(decodeURIComponent(savedState)));
      }
    }
  } else {
    console.log('Running on client');
    await userStore.$hydrate();
  }

  console.log('Store hydrated');

  try {
    // Attempt to fetch the current user
    console.log('Fetching current user');
    const user = await userStore.fetchCurrentUser();

    // Check if the user is available after fetching
    if (!user) {
      console.log('User not found, redirecting to login');
      return navigateTo("/login", { replace: true });
    }

    console.log('User found, continuing');
  } catch (error) {
    // If there's an error (e.g., user not logged in), redirect to login
    console.error('Error fetching user:', error);
    return navigateTo("/login", { replace: true });
  }
});
