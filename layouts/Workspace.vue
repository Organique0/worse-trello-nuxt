<template>
	<LoggedInHeaderShad />
	<div class="flex flex-row flex-1 relative overflow-y-auto h-[100vh]">
		<WorkspaceSidebar
			:currentWorkspaceData="workspaceData"
			v-if="workspaceData"
		/>
		<div class="w-full m-5">
			<WorkspaceInfoHeader
				:workspaceData="workspaceData"
				v-if="
					route.fullPath.includes('members') ||
					route.fullPath.includes('account') ||
					route.fullPath == `/w/${workspaceData?.id_str}`
				"
			/>
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type { Workspace } from "~/lib/types";

	const route = useRoute();
	const workspaceData = ref<Workspace | undefined>();
	const myWorkspaceStore = useMyWorkspaceStore();

	onMounted(async () => {
		if (route.params.wid != undefined) {
			if (myWorkspaceStore.$state.workspaces.length == 0) {
				await myWorkspaceStore.loadWorkspace(route.params.wid as string);
			}
			workspaceData.value = myWorkspaceStore.getWorkspace(
				route.params.wid as string
			);
		}
		if (route.params.bid != undefined) {
			if (myWorkspaceStore.$state.workspaces.length == 0) {
				await myWorkspaceStore.loadWorkspace(route.params.wid as string);
			}

			const board = myWorkspaceStore.getBoardById(route.params.bid as string);
			workspaceData.value = myWorkspaceStore.getWorkspace(
				board.workspace_id_str
			);
		}

		console.log(route);
	});
</script>
