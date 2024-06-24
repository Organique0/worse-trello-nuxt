<template>
	<div>boardId : {{ route.params.bid }}</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		layout: "workspace",
	});
	const route = useRoute();
	const myWorkspaceStore = useMyWorkspaceStore();

	onMounted(() => {
		myWorkspaceStore.addRecentId(route.params.bid as string);
	});
</script>
