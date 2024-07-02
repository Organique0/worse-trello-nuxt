<template>
	<div>boardId : {{ boardData }}.</div>
</template>

<script lang="ts" setup>
	import type { FullBoard } from "~/lib/types";

	definePageMeta({
		layout: "workspace",
		middleware: ["auth"],
	});
	const route = useRoute();
	const myWorkspaceStore = useMyWorkspaceStore();
	const myColorStore = useColorStore();
	const boardData = ref<FullBoard>();

	onBeforeMount(async () => {
		myWorkspaceStore.addRecentId(route.params.bid as string);
		boardData.value = await myWorkspaceStore.fetchBoard<FullBoard>(
			route.params.bid as string
		);
	});

	//vibrant is loaded from script in the header
	//that defines window.Vibrant = Vibrant
	//direct url does not work. So we make an image element first.
	onMounted(async () => {
		const imagePath = myWorkspaceStore.currentBoard?.prefs_background_url;
		if (imagePath) {
			const img = new Image();
			img.crossOrigin = "Anonymous";
			img.src = imagePath;

			img.onload = async () => {
				//@ts-ignore
				const palette = await Vibrant.from(img).getPalette();
				myColorStore.setDominantColor(palette.LightMuted.hex);
			};
		}
	});
</script>
