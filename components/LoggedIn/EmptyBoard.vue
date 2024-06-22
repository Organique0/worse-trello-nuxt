<template>
	<Popover>
		<PopoverTrigger
			class="hoverButtonWithBg flex !h-[100px] !w-[200px] cursor-pointer items-center justify-center rounded-sm"
			as-child
		>
			<p>Create new board</p>
		</PopoverTrigger>
		<PopoverContent
			class="w-[304px]"
			side="right"
		>
			<LoggedInNewBoard
				:selectedWorkspaceId_str="props.selectedWorkspaceId_str"
			/>
			<PopoverClose
				class="hoverButton absolute right-[15px] top-[15px] inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md outline-none"
				aria-label="Close"
			>
				<Icon name="bitcoin-icons:cross-filled" />
			</PopoverClose>
		</PopoverContent>
	</Popover>
</template>

<script lang="ts" setup>
	import { PopoverClose } from "radix-vue";
	const props = defineProps({
		selectedWorkspaceId_str: {
			type: String,
			required: true,
		},
	});
</script>
