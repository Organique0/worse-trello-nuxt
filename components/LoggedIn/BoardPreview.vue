<template>
	<NuxtLink
		class="group relative"
		:to="resolvedUrl"
	>
		<div
			:style="giveBackgroundImage(src)"
			class="h-[100px] rounded-sm w-full cursor-pointer group-hover:brightness-90 bg-cover bg-[50%]"
			:class="class"
		/>
		<p
			class="text-medium absolute left-3 top-2 w-[170px] cursor-pointer select-none font-bold text-white"
		>
			{{ board.title }}
		</p>

		<LogoFavorite
			:class="
				starredRef
					? 'fill-yellow-600 stroke-yellow-600 stroke-2 hover:fill-none absolute bottom-2 right-2'
					: 'ease translate-x-[150%] transform fill-transparent stroke-white stroke-2 transition-transform duration-300 group-hover:translate-x-0 absolute bottom-2 right-2'
			"
			@click="favorite"
		/>
	</NuxtLink>
</template>

<script lang="ts" setup>
	import type { Board } from "~/lib/types";
	import { giveBackgroundImage } from "~/lib/utils";

	const router = useRouter();

	const props = defineProps<{
		board: Board;
		class?: String;
	}>();

	const resolvedUrl = router.resolve({ path: `/b/${props.board.id_str}` }).href;

	const src = props.board.prefs_background || props.board.prefs_background_url;

	const starredRef = ref(props.board.is_favorited);

	async function favorite() {
		starredRef.value = !starredRef.value;
		await $larafetch("api/boards/favorite", {
			method: "post",
			body: { id_str: props.board.id_str },
		});
	}
</script>
