//import { useUser, fetchCurrentUser } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
    const MyUserStore = useMyUserStore();
    const { user } = storeToRefs(MyUserStore);

    const fetchUser = async () => {
        if (user.value === null) {
            try {
                MyUserStore.user = await MyUserStore.fetchCurrentUser();
            } catch {
                MyUserStore.user = null;
            }
        }
    };

    fetchUser();
    watch(user, async () => {
        if (user.value === null) {
            fetchUser();
        }
    });


});
