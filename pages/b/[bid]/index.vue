<template>
	<div>boardId : {{ route.params.bid }}</div>
</template>

<script lang="ts" setup>
	import type { Board, Workspace } from "~/lib/types";

	definePageMeta({
		layout: "workspace",
	});
	const route = useRoute();
	const myWorkspaceStore = useMyWorkspaceStore();
	const url = ref(route.params.bid as String);

	const recentBoardsCookie = useCookie<String[]>("recentBoards", {
		default: () => [],
		sameSite: true,
	});

	/* 	const updateRecentBoards = () => {
		const rbc = recentBoardsCookie.value;
		const index = rbc.indexOf(url.value);

		if (index !== -1) {
			rbc.splice(index, 1);
		}

		rbc.unshift(url.value);

		if (rbc.length > 4) {
			rbc.pop();
		}

		//myWorkspaceStore.loadRecentBoards();
	};

	watchEffect(() => {
		url.value = route.params.bid as String;
		updateRecentBoards();
	}); */

	onMounted(() => {
		myWorkspaceStore.addRecentId(route.params.bid as string);
	});
</script>
