
export default defineNuxtRouteMiddleware(async (context) => {
  const userStore = useMyUserStore();

  console.log('Middleware started');

  // Ensure the store is hydrated from the persisted state
  if (import.meta.server) {
    console.log(userStore.user);
  }
  else {
    console.log('Running on client');
    await userStore.$hydrate();
  }

  console.log('Store hydrated');

  // Check if the user is available after hydration
  if (!userStore.user) {
    console.log('User not found, redirecting to login');
    return navigateTo("/login", { replace: true });
  }

  console.log('User found, continuing');
});
