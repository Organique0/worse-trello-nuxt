export default defineNuxtPlugin(async (context) => {
    const route = useRoute();
    const myWorkspaceStore = useMyWorkspaceStore();
    const MyUserStore = useMyUserStore();
    const { isLoggedIn } = storeToRefs(MyUserStore);

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




    watch(
        () => route.params,
        async (newParams) => {
            if (isLoggedIn.value) {
                await handleRouteChange(newParams)
            }

        })


    watch(isLoggedIn, async () => {
        if (isLoggedIn.value == true) {
            if (myWorkspaceStore.$state.workspaces.length == 0) {
                await myWorkspaceStore.loadWorkspaces();
            }
        }
    })


})
