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
			<PopoverClose class="popoverCloseButton">
				<Icon
					name="bitcoin-icons:cross-filled"
					class="popoverCloseIconButton"
			/></PopoverClose>
			<LoggedInNewBoard :selectedWorkspaceId_str="currentWorkspace?.id_str" />
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

	const { currentWorkspace } = useMyWorkspaceStore();

	interface Props {
		align?: "center" | "start" | "end" | undefined;
		side?: "top" | "right" | "bottom" | "left" | undefined;
	}

	const props = withDefaults(defineProps<Props>(), {
		align: "start",
		side: "right",
	});
</script>
