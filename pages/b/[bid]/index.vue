<template>
	<div>boardId : {{ route.params.bid }}</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		layout: "workspace",
		middleware: ["auth"],
	});
	const route = useRoute();
	const myWorkspaceStore = useMyWorkspaceStore();

	onMounted(() => {
		myWorkspaceStore.addRecentId(route.params.bid as string);
	});
</script>
