<template>
	<div v-if="workspaceData">
		<WorkspaceInfoHeader :workspaceData="workspaceData" />
		<hr class="w-full p-0 my-[16px]" />

		<div class="pl-[14px]">
			<div class="flex gap-4">
				<Icon
					name="solar:user-linear"
					class="h-[24px] w-[24px]"
				/>
				<h1>Your boards</h1>
			</div>

			<div class="mt-5 grid grid-cols-4 gap-4">
				<LoggedInBoardPreview
					v-for="board in workspaceData.workspace_boards"
					:key="board.id_str"
					:board="board"
				/>
				<LoggedInEmptyBoard :selectedWorkspaceId_str="workspaceData.id_str" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type { Workspace } from "~/lib/types";

	const myWorkspaceStore = useMyWorkspaceStore();

	definePageMeta({
		layout: "logged-in-home",
	});
	const route = useRoute();
	const workspaceData = ref<Workspace>();

	onBeforeMount(async () => {
		await myWorkspaceStore.loadWorkspaces();
		workspaceData.value = myWorkspaceStore.workspaces.find(
			(workspace) => workspace.id_str == route.params.wid
		);
	});
</script>
