<template>
	<div
		v-if="true"
		class="relative min-w-[260px] border dark:border-gray-600 border-t-0 h-full dark:!bg-[#1D2125] border-l-0"
		:class="dynamicBorder"
	>
		<div v-if="myWorkspaceStore.currentWorkspace">
			<div
				class="flex gap-2 border-b dark:border-b-gray-600 p-3"
				:class="dynamicBorder"
			>
				<div
					class="rounded-sm h-[32px] w-[32px] text-white dark:text-black font-bold text-[20px] flex justify-center items-center"
					:class="getWorkspaceTypeColor(myWorkspaceStore.currentWorkspace.type)"
				>
					{{
						myWorkspaceStore.currentWorkspace.title
							.charAt(0)
							.toLocaleUpperCase()
					}}
				</div>

				<div class="items-center leading-5">
					<h2 class="text-[15px] font-bold leading-3 dark:text-gray-400">
						{{ myWorkspaceStore.currentWorkspace.title }}
					</h2>

					<span class="text-xs font-light dark:text-gray-400">{{
						myWorkspaceStore.currentWorkspace.visibility
							.charAt(0)
							.toUpperCase() +
						myWorkspaceStore.currentWorkspace.visibility.substring(1)
					}}</span>
				</div>

				<Button
					class="ml-auto hoverButton h-[32px] w-[32px] p-0 bg-transparent"
					@click="toggleSidebarOpen"
					:class="dynamicHover"
				>
					<Icon
						name="mingcute:left-line"
						class="h-5 w-5 dark:text-gray-400"
						:class="dynamicIcons"
					/>
				</Button>
			</div>

			<!--START SECTION-->

			<div class="mt-2 text-inherit">
				<!--BOARDS-->
				<Button
					class="workspaceSidemenuButton"
					:class="[
						route.path == `/w/${route.params.wid}` &&
							'!bg-gray-300 workspaceSidemenuCurrentRouteButton',
						dynamicHover,
					]"
					@click="
						() => router.push('/w/' + myWorkspaceStore.currentWorkspace?.id_str)
					"
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
					:class="[
						route.path.includes('members') &&
							'!bg-gray-300 workspaceSidemenuCurrentRouteButton',
						dynamicHover,
					]"
					@click="
						() =>
							router.push(
								'/w/' + myWorkspaceStore.currentWorkspace?.id_str + '/members'
							)
					"
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
							:class="dynamicIcons"
						/>
					</Button>
				</Button>
				<Button
					class="workspaceSidemenuButton"
					:class="[
						route.path.includes('account') &&
							'!bg-gray-300 workspaceSidemenuCurrentRouteButton',
						dynamicHover,
					]"
					@click="
						() =>
							router.push(
								'/w/' + myWorkspaceStore.currentWorkspace?.id_str + '/account'
							)
					"
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
							:class="dynamicIcons"
						/>
					</Button>
				</Button>
			</div>

			<!--WORKSPACE VIEWS-->
			<h1 class="font-bold text-[14px] ml-3 mt-3 mb-3 dark:text-gray-400">
				Workspace views
			</h1>

			<!--TABLE-->
			<Button
				class="group workspaceSidemenuButton"
				:class="dynamicHover"
			>
				<LogoTable class="h-[16px] w-[16px] mr-2 dark:text-gray-400" />
				<p class="dark:text-gray-400">Table</p>
				<Button
					class="workspaceSidemenuButtonIcon"
					size="icon"
				>
					<Icon
						name="tabler:dots"
						:class="dynamicHiddenIcons"
					/>
				</Button>
			</Button>

			<!--CALENDAR-->
			<Button
				class="group workspaceSidemenuButton flex justify-between"
				:class="dynamicHover"
			>
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
						:class="dynamicHiddenIcons"
					/>
				</Button>
			</Button>

			<!--YOUR BOARD-->
			<div class="flex ml-3 mt-3 justify-between group">
				<h1 class="font-bold text-[14px] block h-full dark:text-gray-400">
					Your boards
				</h1>
				<div class="flex gap-1">
					<PopoverRoot>
						<PopoverTrigger
							class="workspaceSidemenuButtonIcon dark:hover:!bg-transparent centerIcon"
						>
							<Icon
								name="tabler:dots"
								:class="dynamicHiddenIcons"
							/>
						</PopoverTrigger>
						<PopoverPortal>
							<PopoverContent
								class="myPopoverContent"
								align="start"
								side="bottom"
							>
								<div>
									<h1 class="myPopoverTitle">Your boards</h1>
									<PopoverClose
										class="hoverButton centerIcon absolute right-[10px] top-[14px] h-[30px] w-[30px] rounded-md"
									>
										<Icon
											name="bitcoin-icons:cross-filled"
											class="h-4 w-4"
									/></PopoverClose>
								</div>
								<p>Sort</p>
								<Select
									defaultValue="mostRecent"
									v-model="sortBy"
								>
									<SelectTrigger>
										<SelectValue placeholder="Most recent active" />
									</SelectTrigger>
									<SelectContent class="rounded-none py-2">
										<SelectGroup>
											<SelectItemTheme value="az">
												Sort alphabetically
											</SelectItemTheme>
											<SelectItemTheme value="mostRecent">
												Sort by most recent
											</SelectItemTheme>
										</SelectGroup>
									</SelectContent>
								</Select>
							</PopoverContent>
						</PopoverPortal>
					</PopoverRoot>

					<PopoverRoot>
						<PopoverTrigger
							class="workspaceSidemenuButtonIcon dark:hover:!bg-transparent centerIcon"
						>
							<Icon
								name="ic:outline-plus"
								:class="dynamicIcons"
							/>
						</PopoverTrigger>
						<NewBoardPopoverContent />
					</PopoverRoot>
				</div>
			</div>

			<!--BOARD ITEMS-->

			<Button
				class="group workspaceSidemenuButton !justify-between"
				v-for="board in sortedBoards"
				@click="() => router.push(`/b/${board.id_str}`)"
				:class="[
					route.params.bid != undefined &&
						route.params.bid == board.id_str &&
						dynamicCurrentRoute,
					dynamicHover,
				]"
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
					<PopoverRoot v-model:defaultOpen="popoverOpen">
						<PopoverTrigger
							@click.stop
							@click="togglePopover"
							class="workspaceSidemenuButtonIcon invisible group-hover:visible centerIcon"
						>
							<Icon
								name="tabler:dots"
								:class="dynamicIcons"
							/>
						</PopoverTrigger>
						<PopoverPortal>
							<PopoverContent
								v-if="!closeBoardOpen"
								class="myPopoverContent !px-0"
								align="start"
								side="bottom"
							>
								<!--HEADER-->
								<div class="flex justify-between">
									<div class="w-[32px] ml-2" />
									<h1 class="font-semibold text-sm flex items-center">
										{{ board.title }}
									</h1>
									<PopoverClose
										class="w-[32px] h-[32px] hoverButton centerIcon mr-2"
									>
										<Icon
											name="material-symbols:close"
											class="text-gray-600 hover:!text-gray-600 dark:text-gray-400"
										/>
									</PopoverClose>
								</div>

								<!--CLOSE-->
								<Button
									class="hoverButton w-full flex justify-between bg-transparent text-black dark:text-gray-400 mt-2 !rounded-none h-9"
									@click="toggleCloseBoardOpen"
								>
									Close board
									<Icon
										name="tabler:chevron-right"
										class="w-[18px] h-[18px] text-inherit"
								/></Button>
							</PopoverContent>
							<PopoverContent
								v-else
								class="myPopoverContent"
								align="start"
								side="bottom"
							>
								<!--HEADER-->
								<div class="flex justify-between">
									<Button
										class="w-[32px] h-[32px] hoverButton centerIcon bg-transparent"
										size="icon"
										@click="toggleCloseBoardOpen"
									>
										<Icon
											name="tabler:chevron-left"
											class="w-[18px] h-[18px] text-gray-600 hover:!text-gray-600 dark:text-gray-400"
										/>
									</Button>
									<h1 class="font-semibold text-sm flex items-center">
										Close board?
									</h1>
									<PopoverClose
										class="w-[32px] h-[32px] hoverButton centerIcon"
									>
										<Icon
											name="material-symbols:close"
											class="text-gray-600 hover:!text-gray-600 dark:text-gray-400"
										/>
									</PopoverClose>
								</div>

								<p class="p-2 text-sm">
									You can find and reopen closed boards at the bottom of
									<a
										@click="() => router.push('/u/' + user?.id + '/boards')"
										class="underline cursor-pointer"
										>your boards page.</a
									>
								</p>

								<!--CLOSE-->
								<PopoverClose
									class="w-full bg-transparent text-white mt-2 !bg-red-700 hover:!bg-red-800 text-center h-9"
									@click="myWorkspaceStore.closeBoard(board.id_str)"
								>
									Close
								</PopoverClose>
							</PopoverContent>
						</PopoverPortal>
					</PopoverRoot>
					<Button
						class="workspaceSidemenuButtonIcon invisible group-hover:visible"
						size="icon"
						:class="board.is_favorited && 'visible'"
						@click.stop="myWorkspaceStore.favorite(board.id_str)"
					>
						<LogoFavorite
							:class="
								board.is_favorited ? dynamicFavoriteFull : dynamicFavoriteEmpty
							"
						/>
					</Button>
				</div>
			</Button>
		</div>
	</div>
	<button
		class="relative border-r border-gray-700 h-full dark:!bg-[#1D2125] w-3"
		v-else
	></button>
</template>

<script lang="ts" setup>
	import { useRoute } from "vue-router";
	import { giveBackgroundImage, getWorkspaceTypeColor } from "~/lib/utils";
	import {
		PopoverAnchor,
		PopoverArrow,
		PopoverClose,
		PopoverContent,
		PopoverPortal,
		PopoverRoot,
		PopoverTrigger,
	} from "radix-vue";
	import NewBoardPopoverContent from "../UI/NewBoardPopoverContent.vue";

	const route = useRoute();
	const router = useRouter();
	const sortBy = ref("mostRecent");
	const closeBoardOpen = ref(false);
	const popoverOpen = ref(false);
	const {
		dynamicHover,
		dynamicCurrentRoute,
		dynamicBorder,
		dynamicIcons,
		dynamicHiddenIcons,
		dynamicFavoriteFull,
		dynamicFavoriteEmpty,
	} = useDynamicBg();

	const myWorkspaceStore = useMyWorkspaceStore();
	const { user } = useMyUserStore();

	const open = ref(true);

	const toggleSidebarOpen = () => {
		open.value = !open.value;
	};

	const toggleCloseBoardOpen = () => {
		closeBoardOpen.value = !closeBoardOpen.value;
	};

	const togglePopover = () => {
		popoverOpen.value = false;
		closeBoardOpen.value = false;
	};

	const sortedBoards = computed(() => {
		const sorted = myWorkspaceStore.currentWorkspace?.workspace_boards.filter(
			(board) => !board.closed
		);

		if (sorted) {
			switch (sortBy.value) {
				case "mostRecent":
					return sorted.sort(
						(a, b) =>
							new Date(b.updated_at).getTime() -
							new Date(a.updated_at).getTime()
					);
				case "az":
					return sorted.sort((a, b) => a.title.localeCompare(b.title));
				default:
					return sorted;
			}
		}
	});
</script>
