export default defineNuxtPlugin(async () => {
    const { user } = useMyUserStore();
    const { getWorkspace, setCurrentWorkspace, getBoardById } = useMyWorkspaceStore()
    const route = useRoute();
    if (!user) { return };
    const myWorkspaceStore = useMyWorkspaceStore();
    if (myWorkspaceStore.$state.workspaces.length == 0) {
        await myWorkspaceStore.loadWorkspaces();
    }

    if (route.params.wid !== undefined) {
        console.log(route.params.wid);
        const workspace = getWorkspace(route.params.wid as string);
        setCurrentWorkspace(workspace);
    } else if (route.params.bid !== undefined) {
        console.log(route.params.bid);
        const board = getBoardById(route.params.bid as string);
        const workspace = getWorkspace(board.workspace_id_str);
        setCurrentWorkspace(workspace);
    }
})
