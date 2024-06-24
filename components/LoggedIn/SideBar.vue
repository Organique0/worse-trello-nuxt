<template>
	<div class="w-[256px] bg-inherit sticky top-[40px]">
		<Button
			class="hoverButton mb-1 block h-9 w-full rounded-md text-left"
			:class="
				$router.currentRoute.value.path.includes('boards') &&
				'bg-lightBlueBg text-primary hover:bg-lightBlueBg hover:text-primary dark:bg-accent dark:hover:bg-accent'
			"
			variant="ghost"
			@click="() => router.push(`/u/${myUserStore.user!.id}/boards`)"
		>
			<Icon name="i-mingcute:trello-board-fill" />
			Boards
		</Button>
		<Button
			class="hoverButton mb-1 block h-9 w-full rounded-md text-left"
			:class="
				$router.currentRoute.value.path.includes('templates') &&
				'bg-lightBlueBg text-primary hover:bg-lightBlueBg hover:text-primary dark:bg-accent dark:hover:bg-accent'
			"
			variant="ghost"
		>
			<Icon name="LogoIcon" />
			Templates
		</Button>
		<Button
			class="hoverButton mb-1 block h-9 w-full rounded-md text-left"
			:class="
				$router.currentRoute.value.path == '/' &&
				'bg-lightBlueBg text-primary hover:bg-lightBlueBg hover:text-primary dark:bg-accent dark:hover:bg-accent'
			"
			variant="ghost"
		>
			<Icon name="fluent:pulse-24-regular" /> Home
		</Button>

		<Separator class="my-4 h-[2px]" />

		<!--DROPDOWN START-->

		<h1 class="p-3 text-xs font-bold">Workspaces</h1>
		<Accordion
			type="single"
			collapsible
		>
			<ConfigProvider :use-id="useIdFunction">
				<AccordionItem
					v-for="workspace in myWorkspaceStore.workspaces"
					:key="workspace.id_str"
					class="mb-4 border-b-0"
					:value="workspace.id_str"
				>
					<AccordionTrigger
						class="hoverButton h-9 rounded-md p-3 text-left hover:no-underline inline-flex gap-x-3"
					>
						<!-- 						<NuxtImg
							:src="workspace.src"
							width="24"
							height="24"
							class="rounded-sm"
						/> -->
						<div class="flex gap-2">
							<div
								class="rounded-sm h-[24px] w-[24px] text-white text-base font-bold flex justify-center"
								:class="getWorkspaceTypeColor(workspace.type)"
							>
								{{ workspace.title.charAt(0).toUpperCase() }}
							</div>
							<p class="text-sm">{{ workspace.title }}</p>
						</div>
					</AccordionTrigger>

					<AccordionContent
						v-for="item in workspaceItems"
						:key="item.title"
						class="hoverButton py-0"
						as-child
					>
						<button
							@click="() => router.push(`/w/${workspace.id_str}/home`)"
							class="group relative flex h-8 w-full items-center justify-start gap-3 rounded-md pl-12 text-left"
						>
							<Icon
								:name="item.icon"
								class="h-5 w-5 pl-1"
							/>
							{{ item.title }}
							<Icon
								v-if="item.title == 'Members'"
								name="ic:baseline-plus"
								class="ease ml-auto h-5 w-5 translate-x-[2rem] transform transition-transform duration-300 group-hover:translate-x-0"
							/>
							<Icon
								v-if="item.class != ''"
								name="mingcute:right-line"
								class="ml-auto h-5 w-5"
								:class="item.class"
							/>
						</button>
					</AccordionContent>
				</AccordionItem>
			</ConfigProvider>
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
	import { ConfigProvider } from "radix-vue";
	import { getWorkspaceTypeColor } from "~/lib/utils";
	const useIdFunction = () => useId();
	const router = useRouter();
	router.currentRoute.value;

	const myWorkspaceStore = useMyWorkspaceStore();
	const myUserStore = useMyUserStore();

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
