//import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const store = useMyUserStore();
  //if (user !== null) return;

  await useAsyncData('myUserStore', () => store.refresh());
});
