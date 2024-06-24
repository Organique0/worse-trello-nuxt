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

		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class="absolute bottom-2 right-2 w-[15px] cursor-pointer hover:scale-125"
			:class="
				starredRef
					? 'fill-yellow-600 stroke-yellow-600 stroke-2 hover:fill-none'
					: 'ease translate-x-[150%] transform fill-transparent stroke-white stroke-2 transition-transform duration-300 group-hover:translate-x-0'
			"
			@click="favorite"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
			/>
		</svg>
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
