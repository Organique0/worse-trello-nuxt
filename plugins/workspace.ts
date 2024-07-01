export default defineNuxtPlugin(async () => {
    const { user } = useMyUserStore();
    const { getWorkspace, setCurrentWorkspace, getBoardById, setCurrentBoard } = useMyWorkspaceStore()
    const route = useRoute();
    if (!user) { return };
    const myWorkspaceStore = useMyWorkspaceStore();
    if (myWorkspaceStore.$state.workspaces.length == 0) {
        await myWorkspaceStore.loadWorkspaces();
    }

    const handleRouteChange = async (routeParams: any) => {
        if (routeParams.wid !== undefined) {
            console.log(routeParams.wid)
            const workspace = myWorkspaceStore.getWorkspace(routeParams.wid as string)
            myWorkspaceStore.setCurrentWorkspace(workspace)
        } else if (routeParams.bid !== undefined) {
            console.log(routeParams.bid)
            const board = myWorkspaceStore.getBoardById(routeParams.bid as string)
            const workspace = myWorkspaceStore.getWorkspace(board.workspace_id_str)
            myWorkspaceStore.setCurrentWorkspace(workspace)
            myWorkspaceStore.setCurrentBoard(board)
        }
    };

    await handleRouteChange(route.params);

    watch(
        () => route.params,
        async (newParams) => {
            await handleRouteChange(newParams)
        })
})
