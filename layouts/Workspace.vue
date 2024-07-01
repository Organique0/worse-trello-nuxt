<template>
	<LoggedInHeaderShad />
	<div
		class="flex flex-row flex-1 relative overflow-y-auto h-full bg-cover"
		:style="pageBgStyle"
	>
		<client-only>
			<WorkspaceSidebar
				v-if="myWorkspaceStore.currentWorkspace"
				:currentWorkspace="myWorkspaceStore.currentWorkspace"
				class="relative bg-[hsl(203,47.8%,69.7%)]"
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
	const route = useRoute();
	const myWorkspaceStore = useMyWorkspaceStore();

	const pageBgStyle = computed(() => {
		if (
			myWorkspaceStore.currentBoard &&
			myWorkspaceStore.currentBoard.prefs_background_url
		) {
			return {
				backgroundImage: `url(${myWorkspaceStore.currentBoard.prefs_background_url_full})`,
			};
		}
		return {};
	});
</script>
