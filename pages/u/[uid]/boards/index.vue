<template>
	<div class="ml-12 w-full">
		<div class="flex gap-x-3">
			<Icon
				name="mdi:clock-outline"
				width="25"
				height="25"
			/>
			<h1 class="mb-3">Recently viewed</h1>
		</div>
		<div class="inline-flex gap-6">
			<LoggedInBoardPreview
				v-for="board in recentBoards"
				:key="board.id_str"
				:board="board"
			/>
		</div>

		<h1 class="mb-6 mt-16 font-bold">YOUR WORKSPACES</h1>

		<div
			v-for="workspace in myWorkspaceStore.workspaces"
			:key="workspace.title"
			class="mb-14"
		>
			<div class="flex justify-between">
				<div class="flex items-center">
					<div
						class="rounded-sm h-[32px] w-[32px] text-white text-xl font-bold flex items-center justify-center"
						:class="getWorkspaceTypeColor(workspace.type)"
					>
						{{ workspace.title.charAt(0).toUpperCase() }}
					</div>

					<h1 class="ml-3 font-semibold">{{ workspace.title }}</h1>
				</div>

				<div class="flex gap-x-2">
					<Button
						class="hoverButtonWithBg"
						@click="() => router.push(`/w/${workspace.id_str}`)"
						><Icon
							name="i-mingcute:trello-board-fill"
							class="mr-1"
						/>Boards</Button
					>
					<Button class="hoverButtonWithBg"
						><Icon
							name="LogoViews"
							class="mr-1"
						/>Views</Button
					>
					<Button class="hoverButtonWithBg"
						><Icon
							name="LogoMembers"
							class="mr-1"
						/>Members</Button
					>
					<Button class="hoverButtonWithBg"
						><Icon
							name="LogoSettings"
							class="mr-1"
						/>Settings</Button
					>
				</div>
			</div>
			<div class="mt-5 grid grid-cols-4 gap-4">
				<LoggedInBoardPreview
					v-for="board in workspace.workspace_boards"
					:key="board.id_str"
					:board="board"
				/>
				<LoggedInEmptyBoard :selectedWorkspaceId_str="workspace.id_str" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Board, Workspace } from "~/lib/types";
	import { getWorkspaceTypeColor } from "~/lib/utils";

	const myWorkspaceStore = useMyWorkspaceStore();
	const router = useRouter();
	const recentBoards = ref();

	definePageMeta({
		layout: "logged-in-home",
	});

	watch(router.currentRoute, async () => {
		await myWorkspaceStore.loadWorkspaces();
	});

	onBeforeMount(async () => {
		await myWorkspaceStore.loadWorkspaces();
	});

	watchEffect(async () => {
		recentBoards.value = myWorkspaceStore.getRecentBoards();
	});
</script>
