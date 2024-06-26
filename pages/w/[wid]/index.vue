<template>
	<div
		class="w-[100%-4vw] mx-[3vw]"
		v-if="workspaceData"
	>
		<hr class="w-full p-0 my-[16px]" />

		<h1 class="text-xl font-bold">Boards</h1>

		<!--FILTERS-->
		<div
			class="flex flex-row flex-wrap justify-between pt-[20px] pr-0 pb-[8px] pl-0 relative w-full"
		>
			<div class="flex flex-row">
				<div class="w-[200px]">
					<p
						class="text-gray-600 dark:text-gray-400 text-[12px] font-bold mb-1"
					>
						Sort by
					</p>
					<Select
						defaultValue="mostRecent"
						v-model="sortBy"
					>
						<SelectTrigger>
							<SelectValue placeholder="Most recent active" />
						</SelectTrigger>
						<SelectContent class="rounded-none py-2">
							<SelectGroup>
								<SelectItemTheme value="mostRecent">
									Most recent active
								</SelectItemTheme>
								<SelectItemTheme value="leastRecent">
									Least recent active
								</SelectItemTheme>
								<SelectItemTheme value="az">
									Alphabetically A-Z
								</SelectItemTheme>
								<SelectItemTheme value="za">
									Alphabetically Z-A
								</SelectItemTheme>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div class="pl-2 w-[200px]">
					<p
						class="text-gray-600 dark:text-gray-400 text-[12px] font-bold mb-1"
					>
						Filter by
					</p>
					<PopoverRoot>
						<PopoverTrigger
							class="border text-sm py-2 px-3 rounded-md w-full flex justify-between items-center"
							>Choose a collection
							<Icon
								name="tabler:chevron-down"
								class="w-[18px] h-[18px] text-gray-600 hover:!text-gray-600"
						/></PopoverTrigger>
						<PopoverPortal>
							<PopoverContent
								side="bottom"
								align="start"
								class="myPopoverContent"
							>
								<div class="flex justify-between">
									<div class="w-[32px]" />
									<h1 class="font-semibold text-sm flex items-center">
										Collections
									</h1>
									<PopoverClose
										class="w-[32px] h-[32px] hoverButton centerIcon"
									>
										<Icon name="material-symbols:close" />
									</PopoverClose>
								</div>

								<div class="max-h-[795px] mt-4">
									<div class="flex flex-col items-center text-center">
										<p class="mb-4 font-semibold text-[16px]">
											Organize your boards with collections
										</p>
										<p class="mb-4 text-sm">
											Upgrade to Premium to group your boards by department,
											topic, team and more
										</p>
										<Button
											class="bg-[#DFD8FD] dark:bg-[#352C63] dakr:hover:bg-[] dark:text-[#B6C2CF] text-black h-9 rounded-sm mb-2"
										>
											Try it free for 14 days
										</Button>
									</div>
								</div>
							</PopoverContent>
						</PopoverPortal>
					</PopoverRoot>
				</div>
			</div>

			<div>
				<p class="text-gray-600 dark:text-gray-400 text-[12px] font-bold mb-1">
					Search
				</p>
				<div class="relative flex flex-col min-w-60">
					<Input
						id="searchBoards"
						type="search"
						placeholder="Search boards"
						class="pl-10 rounded-sm"
						v-model="searchValue"
					/>
					<span
						class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
					>
						<Icon
							name="tabler:search"
							:ssr="true"
							class="text-slate-600 dark:text-slate-400"
						/>
					</span>
				</div>
			</div>
		</div>

		<!--SHOW BOARDS-->
		<div class="mt-6">
			<ul class="flex flex-wrap justify-start">
				<li class="boardsList">
					<LoggedInEmptyBoard :selectedWorkspaceId_str="workspaceData.id_str" />
				</li>
				<li
					v-for="board in sortedBoards"
					:key="board.id_str"
					class="boardsList"
				>
					<LoggedInBoardPreview
						:key="board.id_str"
						:board="board"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type { Board, Workspace } from "~/lib/types";
	import {
		PopoverAnchor,
		PopoverArrow,
		PopoverClose,
		PopoverContent,
		PopoverPortal,
		PopoverRoot,
		PopoverTrigger,
	} from "radix-vue";
	definePageMeta({
		layout: "workspace",
		middleware: ["auth"],
	});

	const route = useRoute();
	const workspaceData = ref<Workspace | null>(null);
	const boards = ref<Board[]>([]);
	const sortBy = ref("az");
	const myWorkspaceStore = useMyWorkspaceStore();
	const searchValue = ref("");

	const sortedBoards = computed(() => {
		const sorted = [...boards.value.filter((board) => !board.closed)];
		switch (sortBy.value) {
			case "mostRecent":
				sorted.sort(
					(a, b) =>
						new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
				);
				break;
			case "leastRecent":
				sorted.sort(
					(a, b) =>
						new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
				);
				break;
			case "az":
				sorted.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case "za":
				sorted.sort((a, b) => b.title.localeCompare(a.title));
				break;
		}

		if (searchValue.value) {
			return sorted.filter((board) =>
				board.title.toLowerCase().includes(searchValue.value.toLowerCase())
			);
		}

		return sorted;
	});

	onMounted(() => {
		const workspaceId = route.params.wid as string;
		workspaceData.value = myWorkspaceStore.getWorkspace(workspaceId);
		if (workspaceData.value) {
			boards.value = workspaceData.value.workspace_boards || [];
		}
	});

	watch(sortBy, (newValue) => {
		sortBy.value = newValue;
	});
</script>
