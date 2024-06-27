<template>
	<div class="w-full max-w-[825px] min-w-[288px] mt-[40px] mx-[16px]">
		<div
			v-if="recentBoards && recentBoards.length > 0"
			class="mb-16"
		>
			<div class="flex gap-x-3">
				<Icon
					name="mdi:clock-outline"
					width="25"
					height="25"
				/>
				<h1 class="mb-3">Recently viewed</h1>
			</div>
			<div class="">
				<ul class="flex flex-wrap justify-start">
					<li
						v-for="board in recentBoards"
						:key="board.id_str"
						class="boardsList"
					>
						<LoggedInBoardPreview :board="board" />
					</li>
				</ul>
			</div>
		</div>

		<h1 class="mb-6 font-bold">YOUR WORKSPACES</h1>

		<div
			v-for="workspace in workspaces"
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
			<div class="mt-6">
				<ul class="flex flex-wrap justify-start">
					<li
						v-for="board in workspace.workspace_boards"
						:key="board.id_str"
						class="boardsList"
					>
						<LoggedInBoardPreview :board="board" />
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { getWorkspaceTypeColor } from "~/lib/utils";
	definePageMeta({
		layout: "logged-in-home",
		middleware: ["auth"],
	});

	const { loadRecentBoards, recentBoards, workspaces } = useMyWorkspaceStore();

	const router = useRouter();

	onMounted(() => {
		loadRecentBoards();
	});
</script>
