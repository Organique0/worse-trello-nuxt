//import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const userStore = useMyUserStore();

  userStore.$hydrate();
  if (userStore.user !== null) return;
  await userStore.refresh();
});
