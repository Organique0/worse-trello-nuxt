<template>
	<PopoverRoot>
		<PopoverTrigger
			class="hoverButtonWithBg flex !h-[100px] cursor-pointer items-center justify-center rounded-sm"
			:class="props.class"
			as-child
		>
			<p>Create new board</p>
		</PopoverTrigger>
		<NewBoardPopoverContent
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
		class: {
			type: String,
			required: false,
		},
	});
</script>
