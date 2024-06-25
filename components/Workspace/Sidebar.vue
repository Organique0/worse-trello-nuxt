<template>
	<div
		class="w-[340px] border h-full dark:bg-black/40"
		v-if="workspaceData != undefined"
	>
		<div class="flex gap-2 border-b p-3">
			<div
				class="rounded-sm h-[32px] w-[32px] text-white dark:text-black font-bold text-[20px] flex justify-center items-center"
				:class="getWorkspaceTypeColor(workspaceData.type)"
			>
				{{ workspaceData.title.charAt(0).toLocaleUpperCase() }}
			</div>

			<div class="items-center leading-5">
				<h2 class="text-[15px] font-bold leading-3">
					{{ workspaceData.title }}
				</h2>

				<span class="text-xs font-light">{{
					workspaceData.visibility.charAt(0).toUpperCase() +
					workspaceData.visibility.substring(1)
				}}</span>
			</div>

			<Button class="ml-auto hoverButton h-[32px] w-[32px] p-0 bg-transparent">
				<Icon
					name="mingcute:left-line"
					class="h-5 w-5 text-black dark:text-gray-400"
				/>
			</Button>
		</div>

		<!--START SECTION-->

		<div class="mt-2">
			<!--BOARDS-->
			<Button
				class="workspaceSidemenuButton"
				:class="
					route.path == `/w/${route.params.wid}` &&
					'!bg-gray-300 workspaceSidemenuCurrentRouteButton'
				"
				@click="() => router.push('/w/' + workspaceData?.id_str)"
			>
				<Icon
					name="mdi:trello"
					class="h-[16px] w-[16px] mr-2 dark:text-gray-400"
				/>
				Boards</Button
			>
			<!--MEMBERS-->
			<Button
				class="workspaceSidemenuButton"
				:class="
					route.path.includes('members') &&
					'!bg-gray-300 workspaceSidemenuCurrentRouteButton'
				"
				@click="() => router.push('/w/' + workspaceData?.id_str + '/members')"
			>
				<Icon
					name="solar:user-linear"
					class="h-[16px] w-[16px] mr-2"
				/>
				Members
				<Button
					class="workspaceSidemenuButtonIcon"
					size="icon"
					@click.stop
				>
					<Icon
						name="ic:outline-plus"
						class="w-[18px] h-[18px] text-gray-600 hover:!text-gray-600 dark:text-gray-400"
					/>
				</Button>
			</Button>
			<Button
				class="workspaceSidemenuButton"
				:class="
					route.path.includes('account') &&
					'!bg-gray-300 workspaceSidemenuCurrentRouteButton'
				"
				@click="() => router.push('/w/' + workspaceData?.id_str + '/account')"
			>
				<LogoSettings class="h-[16px] w-[16px] mr-2" />
				Workspace settings
				<!--SETTINGS-->
				<Button
					class="workspaceSidemenuButtonIcon"
					size="icon"
					@click.stop
				>
					<Icon
						name="tabler:chevron-down"
						class="w-[18px] h-[18px] text-gray-600 hover:!text-gray-600 dark:text-gray-400"
					/>
				</Button>
			</Button>
		</div>

		<!--WORKSPACE VIEWS-->
		<h1 class="font-bold text-[14px] ml-3 mt-3 mb-3">Workspace views</h1>

		<!--TABLE-->
		<Button class="group workspaceSidemenuButton">
			<LogoTable class="h-[16px] w-[16px] mr-2 dark:text-gray-400" />
			<p class="dark:text-gray-400">Table</p>
			<Button
				class="workspaceSidemenuButtonIcon"
				size="icon"
			>
				<Icon
					name="tabler:dots"
					class="w-[18px] h-[18px] text-transparent group-hover:!text-gray-600 dark:group-hover:!text-gray-400"
				/>
			</Button>
		</Button>

		<!--CALENDAR-->
		<Button class="group workspaceSidemenuButton flex justify-between">
			<div class="flex">
				<LogoCalendar class="h-[16px] w-[16px] mr-2 dark:text-gray-400" />
				<p class="dark:text-gray-400">Calendar</p>
			</div>
			<Button
				class="workspaceSidemenuButtonIcon"
				size="icon"
			>
				<Icon
					name="tabler:dots"
					class="w-[18px] h-[18px] text-transparent group-hover:!text-gray-600 dark:group-hover:!text-gray-400"
				/>
			</Button>
		</Button>

		<!--YOUR BOARD-->
		<div class="flex ml-3 mt-3 justify-between group">
			<h1 class="font-bold text-[14px] block h-full">Your board</h1>
			<div class="flex gap-1">
				<Button
					class="workspaceSidemenuButtonIcon"
					size="icon"
				>
					<Icon
						name="tabler:dots"
						class="w-[18px] h-[18px] text-transparent group-hover:!text-gray-600 dark:group-hover:!text-gray-400"
					/>
				</Button>
				<Button
					class="workspaceSidemenuButtonIcon dark:hover:!bg-transparent"
					size="icon"
				>
					<Icon
						name="ic:outline-plus"
						class="w-[18px] h-[18px] text-gray-600 hover:!text-gray-600 dark:text-gray-400 dark:hover:!text-gray-400"
					/>
				</Button>
			</div>
		</div>

		<!--BOARD ITEMS-->

		<Button
			class="group workspaceSidemenuButton !justify-between"
			v-for="board in workspaceData.workspace_boards"
			@click="() => router.replace(`/b/${board.id_str}`)"
			:class="
				route.params.bid != undefined &&
				route.params.bid == board.id_str &&
				'workspaceSidemenuCurrentRouteButton'
			"
		>
			<div class="inline-flex gap-1">
				<div
					:style="
						giveBackgroundImage(
							board.prefs_background_url || board.prefs_background
						)
					"
					class="w-[24px] h-[20px] bg-cover rounded-sm"
				/>
				<span class="dark:text-gray-400">{{ board.title }}</span>
			</div>
			<div>
				<Button
					class="workspaceSidemenuButtonIcon invisible group-hover:visible"
					size="icon"
					@click.stop
				>
					<Icon
						name="tabler:dots"
						class="w-[18px] h-[18px] text-gray-600 hover:!text-gray-600 dark:text-gray-400 dark:hover:!text-gray-400"
					/>
				</Button>
				<Button
					class="workspaceSidemenuButtonIcon invisible group-hover:visible"
					size="icon"
					:class="board.is_favorited && 'visible'"
					@click.stop="favorite(board.id_str)"
				>
					<LogoFavorite
						:class="
							board.is_favorited
								? 'fill-gray-600 dark:fill-gray-400 stroke-gray-600 dark:stroke-gray-400 stroke-2 hover:fill-none'
								: 'fill-transparent stroke-gray-600 dark:stroke-gray-400 stroke-2 transition-transform duration-100'
						"
					/>
				</Button>
			</div>
		</Button>
	</div>
	<div v-else>no data</div>
</template>

<script lang="ts" setup>
	import { useRoute } from "vue-router";
	import type { Board, Workspace } from "../../lib/types";
	import { giveBackgroundImage, getWorkspaceTypeColor } from "~/lib/utils";

	const props = defineProps<{
		currentWorkspaceData: Workspace;
	}>();

	const { currentWorkspaceData } = toRefs(props);
	const workspaceData = currentWorkspaceData.value;
	const route = useRoute();
	const router = useRouter();

	//const starredRef = ref(props.board.is_favorited);

	async function favorite(id: string) {
		if (!workspaceData) {
			console.error("workspaceData is undefined");
			return;
		}

		const boardIndex = workspaceData.workspace_boards.findIndex(
			(board: Board) => board.id_str === id
		);

		if (boardIndex === -1) {
			console.error(`Board with id ${id} not found`);
			return;
		}

		const updatedBoard = {
			...workspaceData.workspace_boards[boardIndex],
			is_favorited: !workspaceData.workspace_boards[boardIndex].is_favorited,
		};

		workspaceData.workspace_boards.splice(boardIndex, 1, updatedBoard);

		try {
			await $larafetch("api/boards/favorite", {
				method: "post",
				body: { id_str: id },
			});
		} catch (error) {
			console.error("Error favoriting board:", error);
			// Revert the local state change if the API request fails
			workspaceData.workspace_boards.splice(
				boardIndex,
				1,
				workspaceData.workspace_boards[boardIndex]
			);
		}
	}
</script>
