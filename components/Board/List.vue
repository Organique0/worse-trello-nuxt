<template>
	<div class="w-[272px] bg-white rounded-lg">
		<h3>hello</h3>
		<draggable
			:list="list"
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
					class="list-group-item"
					:class="{ 'not-draggable': !enabled }"
				>
					<BoardCard :element="element" />
				</div>
			</template>
		</draggable>
	</div>
</template>

<script lang="ts" setup>
	import draggable from "vuedraggable";
	const list = [
		{
			name: "John",
			id: 0,
		},
		{
			name: "Joao",
			id: 1,
		},
		{
			name: "Jean",
			id: 2,
		},
	];
	const enabled = ref(true);
	const dragging = ref(false);

	const checkMove = (e) => {
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
