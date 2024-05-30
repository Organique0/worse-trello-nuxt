<template>
	<div class="w-[25%] bg-inherit">
		<Button
			class="rounded-md block w-full h-10 mb-1 text-left"
			:class="
				$router.currentRoute.value.path.includes('boards') &&
				'bg-lightBlueBg dark:bg-accent dark:hover:bg-accent text-primary hover:bg-lightBlueBg hover:text-primary'
			"
			variant="ghost"
			><Icon name="i-mingcute:trello-board-fill" />
			Boards
		</Button>
		<Button
			class="rounded-md block w-full h-10 mb-1 text-left"
			:class="
				$router.currentRoute.value.path.includes('templates') &&
				'bg-lightBlueBg dark:bg-accent dark:hover:bg-accent text-primary hover:bg-lightBlueBg hover:text-primary '
			"
			variant="ghost"
		>
			<Icon name="LogoIcon" />
			Templates</Button
		>
		<Button
			class="rounded-md block w-full h-10 mb-1 text-left"
			:class="
				$router.currentRoute.value.path == '/' &&
				'bg-lightBlueBg dark:bg-accent dark:hover:bg-accent text-primary hover:bg-lightBlueBg hover:text-primary'
			"
			variant="ghost"
			><Icon name="fluent:pulse-24-regular" /> Home</Button
		>

		<Separator class="my-4 h-[2px]" />

		<h1 class="font-bold text-xs p-3">Workspaces</h1>

		<Accordion
			type="single"
			collapsible
			v-for="workspace in workspaces"
		>
			<AccordionItem
				value="item-1"
				class="border-b-0 mb-4"
			>
				<AccordionTrigger
					class="hover:no-underline text-left h-10 rounded-md p-3 hoverButton"
				>
					<div class="inline-flex gap-x-3">
						<NuxtImg
							:src="workspace.src"
							width="24"
							height="24"
							class="rounded-sm"
						/>
						<p class="text-sm">{{ workspace.title }}</p>
					</div>
				</AccordionTrigger>
				<AccordionContent
					v-for="item in workspaceItems"
					class="py-0 hoverButton"
					asChild
				>
					<button
						class="text-left h-8 rounded-md flex w-full justify-start gap-3 pl-12 relative group items-center"
					>
						<Icon
							:name="item.icon"
							class="pl-1 w-5 h-5"
						/>
						{{ item.title }}
						<Icon
							name="ic:baseline-plus"
							class="ml-auto w-5 h-5 transform translate-x-[2rem] group-hover:translate-x-0 transition-transform duration-300 ease"
							v-if="item.title == 'Members'"
						/>
						<Icon
							name="mingcute:right-line"
							class="ml-auto w-5 h-5"
							:class="item.class"
							v-if="item.class != ''"
						/>
					</button>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
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
		class: "",
	},
	{
		title: "Highlights",
		icon: "la:heart",
		class: "",
	},
	{
		title: "Views",
		icon: "LogoViews",
		class:
			"transform translate-x-full group-hover:translate-x-[-0.7rem] transition-transform duration-300 ease",
	},
	{
		title: "Members",
		icon: "LogoMembers",
		class:
			"transform translate-x-full group-hover:translate-x-[-0.7rem] transition-transform duration-300 ease",
	},
	{
		title: "Settings",
		icon: "LogoSettings",
		class:
			"transform translate-x-full group-hover:translate-x-[-0.7rem] transition-transform duration-300 ease",
	},
];
</script>
