<template>
	<div class="w-[70rem] m-auto flex mt-8">
		<div class="w-[20%]">
			<Button
				class="block w-full h-9 mb-1 bg-inherit dark:hover:bg-gray-600 dark:hover:brightness-110 text-left text-inherit"
				:class="
					$router.currentRoute.value.path.includes('boards') &&
					'bg-accent text-primary'
				"
				><Icon name="i-mingcute:trello-board-fill" />
				Boards
			</Button>
			<Button
				class="block w-full h-9 mb-1 bg-inherit dark:hover:bg-gray-600 dark:hover:brightness-110 text-left text-inherit"
				:class="
					$router.currentRoute.value.path.includes('templates') &&
					'bg-accent text-primary'
				"
			>
				<Icon name="LogoIcon" />
				Templates</Button
			>
			<Button
				class="block w-full h-9 mb-1 bg-inherit dark:hover:bg-gray-600 dark:hover:brightness-110 text-left text-inherit"
				:class="
					$router.currentRoute.value.path == '/' && 'bg-accent text-primary'
				"
				><Icon name="fluent:pulse-24-regular" /> Home</Button
			>

			<Separator class="my-4 dark:bg-red-600" />

			<h1 class="font-bold text-xs p-[18px]">Workspaces</h1>

			<Accordion
				type="single"
				collapsible
				v-for="workspace in workspaces"
			>
				<AccordionItem value="item-1">
					<AccordionTrigger
						class="hover:no-underline bg-inherit dark:hover:bg-gray-600 dark:hover:brightness-110 text-left text-inherit h-9 rounded-md"
						><NuxtImg
							:src="workspace.src"
							width="24"
							height="24"
							class="rounded-sm"
						/>{{ workspace.title }}</AccordionTrigger
					>
					<AccordionContent v-for="item in workspaceItems">
						<Button><Icon :name="item.icon" /> {{ item.title }}</Button>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
		<div class="bg-green-200"></div>
	</div>
</template>

<script setup lang="ts">
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/shadComponents/ui/accordion";
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

const workspaceItems = [
	{
		title: "Boards",
		icon: "i-mingcute:trello-board-fill",
	},
	{
		title: "Highlights",
		icon: "la:heart",
	},
	{
		title: "Views",
		icon: "LogoViews",
	},
	{
		title: "Members",
		icon: "LogoMembers",
	},
	{
		title: "Settings",
		icon: "LogoSettings",
	},
];
</script>
