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
				:key="board.title"
				:title="board.title"
				:link="board.link"
				:src="board.src"
				:starred="board.starred"
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
					<Button class="hoverButtonWithBg"
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
					:src="board.prefs_background || board.prefs_background_url"
					:starred="board.is_favorited"
					link=""
					:title="board.title"
					:id_str="board.id_str"
				/>
				<LoggedInEmptyBoard :selectedWorkspaceId_str="workspace.id_str" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { getWorkspaceTypeColor } from "~/lib/utils";

	const myWorkspaceStore = useMyWorkspaceStore();

	definePageMeta({
		layout: "logged-in-home",
	});

	onBeforeMount(async () => {
		await myWorkspaceStore.loadWorkspaces();
	});

	const recentBoards = [
		{
			src: "/boardExample.jpg",
			link: "",
			title: "1-on-1 Meeting Agenda",
			starred: true,
		},
		{
			src: "/boardExample2.jpg",
			link: "",
			title: "2-on-1 Meeting Agenda",
			starred: false,
		},
		{
			src: "/boardExample3.jpg",
			link: "",
			title: "3-on-1 Meeting Agenda",
			starred: true,
		},
		{
			src: "/boardExample4.jpg",
			link: "",
			title: "4-on-1 Meeting Agenda",
			starred: false,
		},
	];
</script>
