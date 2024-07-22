<template>
	<div class="w-[272px] bg-white rounded-lg pb-[8px]">
		<div
			class="flex relative flex-grow-0 flex-wrap items-start justify-between px-[8px] pt-[8px] pb-0"
		>
			<div class="relative flex-grow flex-shrink min-h-[20px]">
				<h3
					class="block m-0 py-[6px] pr-[8px] pl-[12px] overflow-hidden text-[14px] font-semibold leading-5 cursor-pointer"
				>
					{{ props.boardList.title }}
				</h3>
			</div>
			<Button
				variant="ghost"
				class="rounded-md h-8 w-8"
				size="icon"
			>
				<Icon
					name="tabler:dots"
					class="w-[16px] h-[16px] text-gray-600"
				/>
			</Button>
		</div>
		<div>
			<draggable
				:list="boardList.board_list_card"
				:disabled="!enabled"
				item-key="name"
				class="list-group"
				ghost-class="ghost"
				:move="checkMove"
				@start="dragging = true"
				@end="dragging = false"
			>
				<template #item="{ element }">
					<div
						class="list-group-item px-[8px]"
						:class="{ 'not-draggable': !enabled }"
					>
						<BoardCard :element="element" />
					</div>
				</template>
			</draggable>
		</div>
		<BoardNewCard :boardList="boardList" />
	</div>
</template>

<script lang="ts" setup>
	import draggable from "vuedraggable";
	import type { board_list } from "~/lib/types";

	const props = defineProps<{ boardList: board_list }>();
	const enabled = ref(true);
	const dragging = ref(false);

	const checkMove = (e: any) => {
		console.log(e.draggedContext.futureIndex);
	};
</script>
<style scoped>
	.buttons {
		margin-top: 35px;
	}

	.ghost {
		opacity: 0.5;
		background: #c8ebfb;
	}

	.not-draggable {
		cursor: no-drop;
	}
</style>
