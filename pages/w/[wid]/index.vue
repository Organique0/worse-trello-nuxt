<template>
	<div
		class="w-full"
		v-if="workspaceData"
	>
		<WorkspaceInfoHeader :workspaceData="workspaceData" />
		<hr class="w-full p-0 my-[16px]" />

		<h1>Boards</h1>

		<!--FILTERS-->
		<div
			class="flex flex-row flex-wrap justify-between max-w-[1250px] pt-[20px] pr-0 pb-[8px] pl-0"
		>
			<div class="flex flex-row flex-wrap">
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
				<Label for="searchBoards">Email</Label>
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
		<div class="flex flex-wrap justify-start">
			<LoggedInEmptyBoard
				:selectedWorkspaceId_str="workspaceData.id_str"
				class="w-[25%]"
			/>

			<LoggedInBoardPreview
				v-for="board in boards"
				:key="board.id_str"
				:board="board"
				class="w-[25%]"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type { Board, Workspace } from "~/lib/types";

	definePageMeta({
		layout: "workspace",
	});

	const route = useRoute();
	const workspaceData = ref<Workspace | null>(null);
	const boards = ref<Board[]>([]);
	const sortBy = ref("mostRecent");

	const myWorkspaceStore = useMyWorkspaceStore();

	onMounted(() => {
		const workspaceId = route.params.wid as string;
		workspaceData.value = myWorkspaceStore.getWorkspace(workspaceId);
		if (workspaceData.value) {
			console.log("Workspace data found:", workspaceData.value);
			boards.value = workspaceData.value.workspace_boards || [];
			boards.value.sort((a, b) => a.title.localeCompare(b.title));
		}
	});
</script>
