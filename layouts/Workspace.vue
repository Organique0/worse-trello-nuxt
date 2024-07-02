<template>
	<LoggedInHeaderShad />
	<div
		class="flex flex-row flex-1 relative overflow-y-auto h-full bg-cover bg-center"
		:style="
			giveBackgroundImage(
				myWorkspaceStore.currentBoard &&
					(myWorkspaceStore.currentBoard.prefs_background_url_full ||
						myWorkspaceStore.currentBoard.prefs_background)
			)
		"
	>
		<client-only>
			<WorkspaceSidebar
				v-if="myWorkspaceStore.currentWorkspace"
				:currentWorkspace="myWorkspaceStore.currentWorkspace"
				class="relative bg-opacity-80"
				:style="dynamicBg"
			/>
		</client-only>
		<div class="w-full m-5">
			<WorkspaceInfoHeader
				v-if="
					route.path.includes('members') ||
					route.path.includes('account') ||
					/^\/w\//.test(route.path)
				"
			/>
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { giveBackgroundImage } from "~/lib/utils";

	const route = useRoute();
	const myWorkspaceStore = useMyWorkspaceStore();
	const myColorStore = useColorStore();

	const dynamicBg = computed(
		() => "background-color: " + myColorStore.dominantColor + "dd;"
	);
</script>
