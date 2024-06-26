<template>
	<PopoverPortal>
		<PopoverContent
			:side="side"
			:align="align"
			avoidCollisions
			hideWhenDetached
			updatePositionStrategy="always"
			class="myPopoverContent"
		>
			<PopoverClose
				class="hoverButton centerIcon absolute right-[10px] top-[14px] h-[30px] w-[30px] rounded-md"
			>
				<Icon
					name="bitcoin-icons:cross-filled"
					class="h-4 w-4"
			/></PopoverClose>
			<LoggedInNewBoard
				:selectedWorkspaceId_str="props.selectedWorkspaceId_str"
			/>
		</PopoverContent>
	</PopoverPortal>
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

	interface Props {
		selectedWorkspaceId_str: string;
		align?: "center" | "start" | "end" | undefined;
		side?: "top" | "right" | "bottom" | "left" | undefined;
	}

	const props = withDefaults(defineProps<Props>(), {
		align: "start",
		side: "right",
	});
</script>
