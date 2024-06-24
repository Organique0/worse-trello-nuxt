export default defineNuxtPlugin(async () => {
    const { user } = useMyUserStore();
    if (!user) { return };
    const myWorkspaceStore = useMyWorkspaceStore();
    if (myWorkspaceStore.$state.workspaces.length == 0) {
        await myWorkspaceStore.loadWorkspaces();
    }
})
