//import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const store = useMyUserStore();
  //if (user !== null) return;

  const r = await useAsyncData('myUserStore', () => store.refresh());
  console.log('Auth plugin', r);
  if (!r) {
    console.log('User not found, redirecting to login from plugin');
    navigateTo('/login', { replace: true });
  }
});
