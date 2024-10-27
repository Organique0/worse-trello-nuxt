//import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const store = useMyUserStore();
  //if (user !== null) return;

  console.log(store.user);
  const r = await useAsyncData('myUserStore', () => store.fetchCurrentUser());
  console.log(r.status.value);
  console.log(store.user);
  if (r.status.value != 'success') {
    console.log('User not found, redirecting to login from plugin auth');
    navigateTo('/login', { replace: true });
  }
});
