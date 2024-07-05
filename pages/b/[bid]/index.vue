<template>
	<ClientOnly>
		<BoardHeader
			:key="boardData?.id_str"
			v-if="boardData"
			:boardData="boardData"
		/>
	</ClientOnly>
</template>

<script lang="ts" setup>
	import type { FullBoard } from "~/lib/types";

	definePageMeta({
		layout: "workspace",
		middleware: ["auth"],
	});
	const route = useRoute();
	const { getBoardById, currentBoard, addRecentId } = useMyWorkspaceStore();
	const myColorStore = useColorStore();
	const boardData = ref<FullBoard>();

	onBeforeMount(async () => {
		addRecentId(route.params.bid as string);
		/* 		boardData.value = await myWorkspaceStore.fetchBoard<FullBoard>(
			route.params.bid as string
		); */
		boardData.value = getBoardById(route.params.bid as string);
	});

	//vibrant is loaded from script in the header
	//that defines window.Vibrant = Vibrant
	//direct url does not work. So we make an image element first.
	/* watchEffect(async () => {
		if (boardData.value?.prefs_background) {
			const imagePath = boardData?.value.prefs_background;
			if (imagePath) {
				const img = new Image();
				img.crossOrigin = "Anonymous";
				img.src = imagePath;

				img.onload = async () => {
					//@ts-ignore
					const palette = (await Vibrant.from(img).getPalette()) as Pallete;

					myColorStore.setDominantColor(palette.Vibrant.hex);
				};
			}
		} else if (boardData.value?.prefs_background_url) {
			const imagePath = boardData.value?.prefs_background_url;
			if (imagePath) {
				const img = new Image();
				img.crossOrigin = "Anonymous";
				img.src = imagePath;

				img.onload = async () => {
					//@ts-ignore
					const palette = (await Vibrant.from(img).getPalette()) as Pallete;
					console.log(palette);
					myColorStore.setDominantColor(palette.LightMuted.hex);
				};
			}
		}
	}); */
</script>
