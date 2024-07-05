<template>
	<LoggedInHeaderShad />
	<div
		class="flex flex-row flex-1 relative overflow-y-auto h-full bg-cover bg-center"
		:style="
			giveBackgroundImage(
				myWorkspaceStore.currentBoard &&
					(myWorkspaceStore.currentBoard.prefs_background_url_regular ||
						myWorkspaceStore.currentBoard.prefs_background)
			)
		"
	>
		<client-only>
			<WorkspaceSidebar
				v-if="myWorkspaceStore.currentWorkspace"
				:currentWorkspace="myWorkspaceStore.currentWorkspace"
				:style="dynamicBg"
			/>
		</client-only>
		<div class="w-full">
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
	const { dynamicBg } = useDynamicBg("dd");
</script>
