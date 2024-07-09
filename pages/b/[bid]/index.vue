<template>
	<ClientOnly>
		<BoardHeader
			:key="boardData?.id_str"
			v-if="boardData"
			:boardData="boardData"
		/>
	</ClientOnly>
</template>

<script lang="ts" setup>
	import type { FullBoard } from "~/lib/types";

	definePageMeta({
		layout: "workspace",
		middleware: ["auth"],
	});
	const route = useRoute();
	const { getBoardById, currentBoard, addRecentId } = useMyWorkspaceStore();
	const myColorStore = useColorStore();
	const boardData = ref<FullBoard>();

	onBeforeMount(async () => {
		addRecentId(route.params.bid as string);
		/* 		boardData.value = await myWorkspaceStore.fetchBoard<FullBoard>(
			route.params.bid as string
		); */
		boardData.value = getBoardById(route.params.bid as string);
	});
</script>
