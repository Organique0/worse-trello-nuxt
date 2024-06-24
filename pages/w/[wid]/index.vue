<template>
	<div
		class="w-[100%-4vw] mx-[3vw]"
		v-if="workspaceData"
	>
		<hr class="w-full p-0 my-[16px]" />

		<h1>Boards</h1>

		<!--FILTERS-->
		<div
			class="flex flex-row flex-wrap justify-between max-w-[1250px] pt-[20px] pr-0 pb-[8px] pl-0 relative"
		>
			<div class="flex flex-row">
				<Select
					defaultValue="mostRecent"
					v-model="sortBy"
				>
					<SelectTrigger>
						<SelectValue placeholder="Most recent active" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="mostRecent"> Most recent active </SelectItem>
							<SelectItem value="leastRecent"> Least recent active </SelectItem>
							<SelectItem value="az"> Alphabetically A-Z </SelectItem>
							<SelectItem value="za"> Alphabetically Z-A </SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				<Select>
					<SelectTrigger>
						<SelectValue placeholder="Choose a collection" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value="apple"> Apple </SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div class="relative flex flex-col min-w-60">
				<Label for="searchBoards">Search</Label>
				<Input
					id="searchBoards"
					type="search"
					placeholder="Search boards"
				/>
				<span
					class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
				>
					<Icon
						name="tabler:search"
						:ssr="true"
						class="text-black dark:text-slate-400"
					/>
				</span>
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
	definePageMeta({
		layout: "workspace",
		middleware: ["auth"],
	});

	const route = useRoute();
	const workspaceData = ref<Workspace | null>(null);
	const boards = ref<Board[]>([]);
	const sortBy = ref("az");
	const myWorkspaceStore = useMyWorkspaceStore();

	const sortedBoards = computed(() => {
		const sorted = [...boards.value];
		switch (sortBy.value) {
			case "mostRecent":
				return sorted.sort(
					(a, b) =>
						new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
				);
			case "leastRecent":
				return sorted.sort(
					(a, b) =>
						new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()
				);
			case "az":
				return sorted.sort((a, b) => a.title.localeCompare(b.title));
			case "za":
				return sorted.sort((a, b) => b.title.localeCompare(a.title));
			default:
				return sorted;
		}
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
