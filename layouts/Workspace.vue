<template>
	<LoggedInHeaderShad />
	<div
		class="flex flex-row flex-1 relative bg-cover bg-center h-[calc(100vh-48px)] w-[100vw]"
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
				:style="[dynamicBg, dynamicText]"
			/>
		</client-only>
		<div class="w-[calc(100vw-260px)]">
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
	const { dynamicBg, dynamicText } = useDynamicBg("ee");
</script>
