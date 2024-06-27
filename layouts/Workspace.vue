<template>
	<LoggedInHeaderShad />
	<div class="flex flex-row flex-1 relative overflow-y-auto h-full">
		<client-only>
			<WorkspaceSidebar
				v-if="currentWorkspace"
				:currentWorkspace="currentWorkspace"
				class="relative"
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
	const {
		getWorkspace,
		getBoardById,
		currentWorkspace,
		setCurrentWorkspace,
		workspaces,
		loadWorkspaces,
	} = useMyWorkspaceStore();
</script>
