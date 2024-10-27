//import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const store = useMyUserStore();
  //if (user !== null) return;

  const r = await useAsyncData('myUserStore', () => store.refresh());
  console.log(r.status.value);
  if (r.status.value != 'success') {
    console.log('User not found, redirecting to login from plugin auth');
    navigateTo('/login', { replace: true });
  }
});
