<template>
	<div
		v-if="workspaceData"
		class="mx-[16px] mt-[40px] w-full min-w-[288px] max-w-[825px]"
	>
		<WorkspaceInfoHeader :workspaceData="workspaceData" />
		<hr class="w-full p-0 my-[16px]" />

		<div class="pl-[14px]">
			<div class="flex gap-4">
				<Icon
					name="solar:user-linear"
					class="h-[24px] w-[24px]"
				/>
				<h1>Your boards</h1>
			</div>

			<div class="mt-5">
				<ul class="flex flex-wrap justify-start gap-[2%]">
					<li
						v-for="board in workspaceData.workspace_boards"
						:key="board.id_str"
						class="p-0 lg:w-[23.5%] mb-[2%] sm:w-[32%] w-[calc(50%-6px)]"
					>
						<LoggedInBoardPreview :board="board" />
					</li>
					<li class="p-0 w-[23.5%] mb-[2%]">
						<LoggedInEmptyBoard
							:selectedWorkspaceId_str="workspaceData.id_str"
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type { Workspace } from "~/lib/types";

	const myWorkspaceStore = useMyWorkspaceStore();

	definePageMeta({
		layout: "logged-in-home",
		middleware: ["auth"],
	});
	const route = useRoute();
	const workspaceData = ref<Workspace>();

	onMounted(() => {
		const workspaceId = route.params.wid as string;
		workspaceData.value = myWorkspaceStore.getWorkspace(workspaceId);
	});
</script>
