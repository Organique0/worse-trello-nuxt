//import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const { user, refresh } = useMyUserStore();
  if (user !== null) return;
  await refresh();
});
