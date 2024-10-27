//import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const store = useMyUserStore();
  //if (user !== null) return;

  const r = await useAsyncData('myUserStore', () => store.refresh());
  if (!r) {
    console.log('User not found, redirecting to login from plugin auth');
    navigateTo('/login', { replace: true });
  }
});
