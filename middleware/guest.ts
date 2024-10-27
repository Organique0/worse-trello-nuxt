export default defineNuxtRouteMiddleware(async () => {
  const MyUserStore = useMyUserStore();
  const { user } = storeToRefs(MyUserStore);

  watch(user, async () => {
    if (user.value != null) {
      navigateTo('/u/' + user.value.id + '/boards', { replace: true });
    }
  });

});
