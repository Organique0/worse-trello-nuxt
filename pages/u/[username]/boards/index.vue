<template>
	<div class="w-[75rem] m-auto flex mt-8">
		<LoggedInSideBar />

		<div class="bg-blue-600/10 w-full ml-12">
			<div class="flex gap-x-3">
				<Icon
					name="mdi:clock-outline"
					width="25"
					height="25"
				/>
				<h1>Recently viewed</h1>
			</div>
			<div class="inline-flex gap-6">
				<BoardPreview
					:title="board.title"
					:link="board.link"
					:src="board.src"
					:starred="board.starred"
					v-for="board in recentBoards"
				/>
			</div>

			<h1>YOUR WORKSPACES</h1>

			<div v-for="workspace in workspaces">
				<div class="flex justify-between">
					<div class="flex">
						<NuxtImg
							:src="workspace.src"
							width="40"
							height="40"
							class="rounded-sm"
						/>
						<h1>{{ workspace.title }}</h1>
					</div>

					<div class="flex">
						<Button class="hoverButton">Boards</Button>
						<Button>Views</Button>
						<Button>Members</Button>
						<Button>Settings</Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "logged-in-home",
});

const router = useRouter();
router.currentRoute.value;

const workspaces = [
	{
		src: "/templatesExample.jpg",
		title: "Trello Workspace",
	},
	{
		src: "/templatesExample.jpg",
		title: "Trello Workspace",
	},
];

const boards = [
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
];

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
