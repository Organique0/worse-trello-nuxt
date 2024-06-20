<template>
	<div class="w-full">
		<WorkspaceInfoHeader :workspaceData="workspaceData" />
		<hr class="w-full p-0 my-[16px]" />
	</div>
</template>

<script lang="ts" setup>
	import type { Workspace } from "~/lib/types";

	definePageMeta({
		layout: "workspace",
	});

	const myWorkspaceStore = useMyWorkspaceStore();

	const route = useRoute();
	const workspaceData = ref<Workspace>();

	onBeforeMount(async () => {
		workspaceData.value = await myWorkspaceStore.getWorkspace(
			route.params.wid as String
		);
	});
</script>
