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
				board.is_favorited
					? 'fill-yellow-600 stroke-yellow-600 stroke-2 hover:fill-none absolute bottom-2 right-2'
					: 'ease translate-x-[150%] transform fill-transparent stroke-white stroke-2 transition-transform duration-300 group-hover:translate-x-0 absolute bottom-2 right-2'
			"
			@click.stop="myWorkspaceStore.favorite(board.id_str)"
		/>
	</NuxtLink>
</template>

<script lang="ts" setup>
	import type { Board } from "~/lib/types";
	import { giveBackgroundImage } from "~/lib/utils";
	const myWorkspaceStore = useMyWorkspaceStore();

	const router = useRouter();

	const props = defineProps<{
		board: Board;
		class?: String;
	}>();

	const resolvedUrl = router.resolve({ path: `/b/${props.board.id_str}` }).href;
	const src = props.board.prefs_background || props.board.prefs_background_url;
</script>
