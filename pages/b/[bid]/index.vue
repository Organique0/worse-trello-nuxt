<template>
	<ClientOnly>
		<BoardHeader
			:key="boardData?.id_str"
			v-if="boardData"
			:boardData="boardData"
		/>

		<!-- 		<div class="overflow-x-scroll overflow-y-hidden whitespace-nowrap h-full">
			<BoardNewList class="inline-block" />
			<BoardList
				v-for="x in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
				class="inline-block"
			/>
		</div> -->
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
