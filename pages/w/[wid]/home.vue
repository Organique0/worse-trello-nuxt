<template>
	<!-- 	<div>
		<div class="flex gap-2">
			<div
				class="rounded-sm h-[24px] w-[24px] text-white text-base font-bold flex justify-center"
				:class="getWorkspaceTypeColor(boardsInWorkspace.type)"
			>
				{{ boardsInWorkspace.title.charAt(0).toUpperCase() }}
			</div>
			<p class="text-sm">{{ boardsInWorkspace.title }}</p>
		</div>
	</div> -->
</template>

<script lang="ts" setup>
	import { getWorkspaceTypeColor } from "~/lib/utils";
	definePageMeta({
		layout: "logged-in-home",
	});
	const route = useRoute();
	const boardsInWorkspace = ref([]);

	onBeforeMount(async () => {
		boardsInWorkspace.value = await $larafetch(
			`api/workspaces/${route.params.wid}`,
			{
				method: "get",
			}
		);
	});
</script>
