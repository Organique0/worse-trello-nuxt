<template>
	<PopoverRoot>
		<PopoverTrigger
			class="hoverButtonWithBg flex !h-[100px] cursor-pointer items-center justify-center rounded-sm"
			:class="class"
			as-child
		>
			<p>Create new board</p>
		</PopoverTrigger>
		<NewBoardPopoverContent
			:selectedWorkspaceId_str="props.selectedWorkspaceId_str"
			side="right"
			align="start"
		/>
	</PopoverRoot>
</template>

<script lang="ts" setup>
	import {
		PopoverAnchor,
		PopoverArrow,
		PopoverClose,
		PopoverContent,
		PopoverPortal,
		PopoverRoot,
		PopoverTrigger,
	} from "radix-vue";
	import NewBoardPopoverContent from "../UI/NewBoardPopoverContent.vue";
	const props = defineProps({
		selectedWorkspaceId_str: {
			type: String,
			required: true,
		},
		class: {
			type: String,
			required: false,
		},
	});
</script>
