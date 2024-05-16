<template>
	<div class="min-h-[48px] max-h-[48px]">
		<ConfigProvider :use-id="useIdFunction">
			<div
				class="p-[8px] max-h-12 overflow-hidden flex box-border border-b-[1px] transition-colors bg-white"
			>
				<div class="flex w-full space-x-1">
					<!---more button-->
					<DropdownMenu>
						<DropdownMenuTrigger
							class="block relative mt-0 flex-shrink-0 py-2 h-[32px] w-[32px] rounded-sm hover:bg-slate-200"
						>
							<Icon
								name="gravity-ui:dots-9"
								:ssr="true"
								class="m-auto p-auto !block"
							/>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Billing</DropdownMenuItem>
							<DropdownMenuItem>Team</DropdownMenuItem>
							<DropdownMenuItem>Subscription</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<!--gif logo-->
					<nuxt-link
						@mouseenter="addHoverClass"
						@mouseleave="removeHoverClass"
						class="block relative mt-0 flex-shrink-0 py-2 px-2 h-[32px] rounded-sm hover:bg-slate-200"
					>
						<div
							:class="currentGif"
							class="logoBeforeAfter"
						>
							<div class="h-[16px] w-[75px] py-[8px] px-0 opacity-100 m-0" />
						</div>
					</nuxt-link>

					<!--workspaces-->
					<DropdownMenu>
						<DropdownMenuTrigger
							class="hover:bg-slate-200 text-opacity-65 rounded-sm"
							as-child
						>
							<Button
								class="hover:bg-slate-200 text-opacity-65 rounded-sm block relative mt-0 px-2 h-[32px] py-0"
								variant="ghost"
							>
								Workspaces

								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									style="color: black"
									class="inline-flex"
								/>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent class="w-[20rem] p-3">
							<DropdownMenuLabel class="font-normal text-[12px] leading-4 mb-2"
								>Your Workspaces
							</DropdownMenuLabel>

							<DropdownMenuItem
								v-for="item in workspaceItems"
								class="h-[3rem]"
							>
								<div class="inline-flex w-full">
									<NuxtImg
										:src="item.src"
										class="h-10 w-10 rounded-sm"
									/>
									<p class="font-semibold ml-3 content-center">
										{{ item.title }}
									</p>
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<!--recent-->
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button
								class="hover:bg-slate-200 text-opacity-65 rounded-sm block relative mt-0 px-2 h-[32px] py-0"
								variant="ghost"
							>
								Recent
								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									style="color: black"
									class="inline-flex"
								/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent class="w-[20rem] p-3">
							<DropdownMenuItem
								v-for="item in recentItems"
								class="group"
							>
								<div class="inline-flex w-full items-center group">
									<NuxtImg
										:src="item.src"
										class="h-8 w-10 rounded-sm"
									/>
									<div class="ml-3">
										<p class="font-semibold">{{ item.title }}</p>
										<p class="font-light text-xs">{{ item.type }}</p>
									</div>
									<Icon
										name="material-symbols-light:star-outline"
										:ssr="true"
										class="h-6 w-6 ml-auto hidden group-hover:block group-hover:color-blue-400 hover:text-orange-400"
										@click="() => console.log('star clicked')"
									/>
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<!--starred-->
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button
								class="hover:bg-slate-200 text-opacity-65 rounded-sm block relative mt-0 px-2 h-[32px] py-0"
								variant="ghost"
							>
								Starred
								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									style="color: black"
									class="inline-flex"
								/>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent class="w-[20rem] p-3">
							<div v-if="starredItems.length > 0">
								<DropdownMenuItem v-for="item in starredItems">
									<div class="inline-flex w-full">
										<NuxtImg
											:src="item.src"
											class="h-8 w-8"
										/>
										<p class="font-semibold ml-1">{{ item.title }}</p>
									</div>
								</DropdownMenuItem>
							</div>
							<div v-else>
								<NuxtImg src="/starred.svg" />
								<p class="font-light text-sm py-3 text-center">
									Star important boards to access them quicly and easily.
								</p>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>

					<!--Templates-->
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button
								class="hover:bg-slate-200 text-opacity-65 rounded-sm block relative mt-0 px-2 h-[32px] py-0"
								variant="ghost"
							>
								Templates
								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									style="color: black"
									class="inline-flex"
								/>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent class="w-[20rem] p-3">
							<p class="px-2 py-1 text-xs">Top templates</p>
							<DropdownMenuItem v-for="item in templatesItems">
								<div class="inline-flex w-full">
									<NuxtImg
										:src="item.src"
										class="h-8 w-10 rounded-sm"
									/>

									<p class="font-semibold ml-3 align-middle">
										{{ item.title }}
									</p>
								</div>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<div class="inline-flex w-full py-1">
								<span class="pl-5 content-end">
									<Icon
										name="icon-park:page-template"
										class="text-lg mb-1"
									/>
								</span>
								<p class="font-normal text-sm ml-3 align-middle">
									See hundreds of templates from the Trello comunity
								</p>
							</div>

							<Button
								class="mt-2 rounded-sm bg-gray-300 w-full hover:bg-gray-400 h-8"
								>Explore templates</Button
							>
						</DropdownMenuContent>
					</DropdownMenu>

					<!--create-->
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button class="rounded-sm block relative mt-0 px-2 h-[32px] py-0">
								Create
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent class="w-[20rem] p-3">
							<DropdownMenuItem
								v-for="item in createItems"
								class="max-w-72"
							>
								<div class="block">
									<div class="inline-flex w-full">
										<Icon
											:name="item.icon"
											class="h-4 w-4 inline-flex"
										/>
										<p class="font-semibold ml-1">{{ item.label }}</p>
									</div>
									<div class="text-left text-xs leading-4">
										<p>{{ item.body }}</p>
									</div>
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<!--user-->
				<div class="flex space-x-1">
					<div class="relative min-w-60">
						<Input
							id="search"
							type="text"
							placeholder="Search..."
							class="h-full pl-10"
						/>
						<span
							class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
						>
							<Icon
								name="tabler:search"
								:ssr="true"
								style="color: black"
							/>
						</span>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger
							class="h-8 w-8 bg-primary rounded-full flex items-center justify-center hover:bg-blue-600"
						>
							<Icon
								name="tabler:school-bell"
								class="text-white text-lg"
							/>
						</DropdownMenuTrigger>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger
							class="h-8 w-8 bg-transparent rounded-full flex items-center justify-center hover:bg-slate-300"
						>
							<Icon
								name="ph:question"
								class="text-black text-xl"
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<NuxtImg src="/tip1.png" />
						</DropdownMenuContent>
					</DropdownMenu>

					<LoggedInUserDropdown />
				</div>
			</div>
		</ConfigProvider>
	</div>
</template>

<script lang="ts" setup>
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shadComponents/ui/dropdown-menu";
import { Input } from "@/shadComponents/ui/input";
import { Button } from "@/shadComponents/ui/button";
import { ConfigProvider } from "radix-vue";

const useIdFunction = () => useId();

const isHovered = ref(false);
const staticGif = "logoBeforeAfter";
var currentGif = ref("logoBeforeAfter");
const animatedGif = "logoBeforeAfterAnimated";


const items = [
	{
		label: "Switch accounts",
	},
	{
		label: "Manage account",
		icon: "formkit:linkexternal",
		click: () => {
			console.log("Edit");
		},
	},
	{
		label: "TRELLO",
		disabled: true,
	},
	{
		label: "Profile and visibility",
	},
	{
		label: "Activity",
	},
	{
		label: "Cards",
	},
	{
		label: "Settings",
	},
	{
		label: "Theme",
		icon: "material-symbols:arrow-forward-ios-rounded",
	},

	{
		label: "Help",
	},
	{
		label: "Shortcuts",
	},

	{
		label: "Log out",
	},
];

const createItems = [
	{
		label: "Create board",
		icon: "lucide:trello",
		body: "A board made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.",
	},
	{
		label: "Start with a template",
		icon: "lucide:layout-template",
		body: "Get started with a bord template.",
	},
	{
		label: "Create Workspace",
		icon: "lucide:users-round",
		body: "A workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.",
	},
];

const templatesItems = [
	{
		title: "1-on-1 Meeting Agenda",
		src: "templatesExample.jpg",
	},
	{
		title: "Agile Board Template | Trello",
		src: "/templatesExample.jpg",
	},
	{
		title: "Company Overview",
		src: "/templatesExample.jpg",
	},
	{
		title: "Design Huddle",
		src: "/templatesExample.jpg",
	},
	{
		title: "Go To Market Strategy Template",
		src: "/templatesExample.jpg",
	},
];

const starredItems: any[] = [
	/*     {
          src: "/templatesExample.jpg",
          title: "1-on-1 Meeting Agenda",
          type: "Trello workspace"
        } */
];

const recentItems = [
	{
		src: "/templatesExample.jpg",
		title: "1-on-1 Meeting Agenda",
		type: "Trello workspace",
	},
];

const workspaceItems = [
	{
		src: "/templatesExample.jpg",
		title: "Trello Workspace",
	},
];

function addHoverClass() {
	isHovered.value = true;
	currentGif.value = animatedGif;
}

function removeHoverClass() {
	isHovered.value = false;
	currentGif.value = staticGif;
}
</script>
<style>
.logoBeforeAfter::before,
.logoBeforeAfter::after {
	content: "";
	background-image: url("/public/logoStatic.gif");
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	display: block;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
}

.logoBeforeAfterAnimated::before,
.logoBeforeAfterAnimated::after {
	background-image: url("/public/logoGif.gif");
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	display: block;
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	content: "";
}

.logoBeforeAfter {
	filter: brightness(0) saturate(100%) invert(30%) sepia(53%) saturate(323%)
		hue-rotate(179deg) brightness(91%) contrast(88%);
}
</style>
