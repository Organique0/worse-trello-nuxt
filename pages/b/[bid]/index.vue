<template>
	<div>boardId : boardData.</div>
</template>

<script lang="ts" setup>
	import type { Board, FullBoard } from "~/lib/types";

	definePageMeta({
		layout: "workspace",
		middleware: ["auth"],
	});
	const route = useRoute();
	const myWorkspaceStore = useMyWorkspaceStore();
	const boardData = ref<FullBoard>();

	onBeforeMount(async () => {
		myWorkspaceStore.addRecentId(route.params.bid as string);
		boardData.value = await myWorkspaceStore.fetchBoard<FullBoard>(
			route.params.bid as string
		);
	});
</script>
