<template>
	<ClientOnly>
		<div class="h-[calc(100%-3.5rem)]">
			<BoardHeader
				:key="boardData?.id_str"
				v-if="boardData"
				:boardData="boardData"
			/>

			<div id="board">
				<div v-for="list in boardData?.board_list">
					<BoardList
						class="mr-[15px]"
						:boardList="list"
					/>
				</div>
				<div>
					<BoardNewList class="" />
				</div>
			</div>
		</div>
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
		boardData.value = getBoardById(route.params.bid as string);
	});
</script>
<style>
	#board {
		scrollbar-color: #fff6 #00000026;
		user-select: none;
		scrollbar-width: auto;
		white-space: nowrap;
		overflow-x: auto;
		height: 100%;
		padding: 15px;
		display: flex;
		flex-direction: row;
	}
</style>
