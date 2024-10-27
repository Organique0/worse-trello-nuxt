//import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  if (import.meta.client) {
    const store = useMyUserStore();
    await store.refresh();

    if (!store.user) {
      console.log('User not found, redirecting to login from plugin auth');
      navigateTo('/login', { replace: true });
    }
  }
});
