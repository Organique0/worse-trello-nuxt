export default defineNuxtPlugin(async (context) => {
    const { user } = useMyUserStore();
    const route = useRoute();
    if (!user) { return };
    const myWorkspaceStore = useMyWorkspaceStore();
    if (myWorkspaceStore.$state.workspaces.length == 0) {
        await myWorkspaceStore.loadWorkspaces();
    }

    const handleRouteChange = async (routeParams: any) => {
        if (routeParams.wid !== undefined) {
            const workspace = myWorkspaceStore.getWorkspace(routeParams.wid as string)
            myWorkspaceStore.setCurrentWorkspace(workspace)
            myWorkspaceStore.setCurrentBoard(null);
        } else if (routeParams.bid !== undefined) {
            const board = myWorkspaceStore.getBoardById(routeParams.bid as string)
            const workspace = myWorkspaceStore.getWorkspace(board.workspace_id_str)
            myWorkspaceStore.setCurrentWorkspace(workspace)
            myWorkspaceStore.setCurrentBoard(board)
        } else {
            myWorkspaceStore.setCurrentWorkspace(null)
            myWorkspaceStore.setCurrentBoard(null);
        }
    };

    await handleRouteChange(route.params);

    watch(
        () => route.params,
        async (newParams) => {
            await handleRouteChange(newParams)
        })

})
