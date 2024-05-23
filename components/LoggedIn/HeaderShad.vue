<template>
	<div class="min-h-[48px] max-h-[48px]">
		<ConfigProvider :use-id="useIdFunction">
			<div
				class="p-[8px] max-h-12 overflow-hidden flex box-border border-b-[1px] transition-colors"
			>
				<div class="flex w-full space-x-1">
					<!---more button-->
					<DropdownMenu>
						<DropdownMenuTrigger
							class="block relative mt-0 flex-shrink-0 py-2 h-[32px] w-[32px] rounded-sm hover:bg-slate-200 dark:hover:bg-opacity-10"
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
					<div
						@mouseenter="addHoverClass"
						@mouseleave="removeHoverClass"
						class="block relative mt-0 flex-shrink-0 py-2 px-2 h-[32px] rounded-sm hover:bg-slate-200 dark:hover:bg-opacity-10"
					>
						<div
							:class="currentGif"
							class="logoBeforeAfter"
						>
							<div class="h-[16px] w-[75px] py-[8px] px-0 opacity-100 m-0" />
						</div>
					</div>

					<!--workspaces-->
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button
								class="rounded-sm block relative mt-0 px-2 py-0 h-[32px]"
								variant="ghost"
							>
								Workspaces

								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									class="inline-flex dark:text-white text-opacity-65"
								/>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent class="w-[20rem] p-3">
							<DropdownMenuLabel class="font-normal text-[12px] leading-4 mb-2"
								>Your Workspaces
							</DropdownMenuLabel>

							<DropdownMenuItem
								v-for="item in workspaceItems"
								class="h-[4rem]"
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
								class="rounded-sm block relative mt-0 px-2 py-0 h-[32px]"
								variant="ghost"
							>
								Recent
								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									class="inline-flex dark:text-white text-opacity-65"
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
								class="rounded-sm block relative mt-0 px-2 py-0 h-[32px]"
								variant="ghost"
							>
								Starred
								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									class="inline-flex dark:text-white text-opacity-65"
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
								class="rounded-sm block relative mt-0 px-2 py-0 h-[32px]"
								variant="ghost"
							>
								Templates
								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									class="inline-flex dark:text-white text-opacity-65"
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
									<LogosTrelloIcon class="text-primary" />
								</span>
								<p class="font-normal text-sm ml-3 align-end">
									See hundreds of templates from the Trello comunity
								</p>
							</div>

							<Button
								class="mt-2 rounded-sm bg-gray-200 w-full hover:bg-gray-400 h-8 text-black dark:text-white dark:bg-gray-700 dark:hover:brightness-125"
								>Explore templates</Button
							>
						</DropdownMenuContent>
					</DropdownMenu>

					<!--create-->
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button
								class="rounded-sm block relative mt-0 px-2 h-[32px] py-0 dark:text-[#1d2125] hover:brightness-110 hover:bg-primary"
							>
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
								class="text-black dark:text-slate-400"
							/>
						</span>
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger
							class="h-8 w-8 bg-transparent rounded-full flex items-center justify-center hover:bg-slate-300 dark:hover:bg-gray-600"
						>
							<Icon
								name="tabler:school-bell"
								class="text-slate-600 text-lg dark:text-slate-200"
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent class="w-[432px] h-[25rem] p-3">
							<div class="flex justify-between h-[3rem] items-center">
								<h1 class="font-bold text-xl">Notifications</h1>

								<div class="items-center flex">
									<span
										for="only-unread"
										class="font-light text-xs text-gray-600 dark:text-slate-200"
										>Only show unread</span
									>
									<Switch
										id="only-unread"
										class="w-[28px] h-[15px] ml-2 mr-4"
									/>
									<DropdownMenu>
										<DropdownMenuTrigger>
											<Icon name="mdi:dots-vertical" />
										</DropdownMenuTrigger>
										<DropdownMenuContent class="w-[310px]">
											<DropdownMenuLabel
												class="text-gray-900 text-center w-full mt-0 mb-3"
											>
												Notification settings
											</DropdownMenuLabel>
											<DropdownMenuLabel
												class="font-normal text-xs text-gray-900"
											>
												Notification email frequency
											</DropdownMenuLabel>
											<DropdownMenuItem>
												<Select>
													<SelectTrigger>
														<SelectValue placeholder="Periodically" />
													</SelectTrigger>
													<SelectContent>
														<SelectGroup>
															<SelectItem
																value="never"
																class="focus:bg-blue-300 rounded-none"
															>
																Never
															</SelectItem>
															<SelectItem
																value="periodically"
																class="focus:bg-blue-300 rounded-none"
															>
																Periodically
															</SelectItem>
															<SelectItem
																value="instantly"
																class="focus:bg-blue-300 rounded-none"
															>
																Instantly
															</SelectItem>
														</SelectGroup>
													</SelectContent>
												</Select>
											</DropdownMenuItem>
											<DropdownMenuItem class="flex justify-between">
												<p>How to disable desktop notifications</p>
												<Icon
													name="heroicons-solid:arrow-sm-up"
													class="rotate-45"
												/>
											</DropdownMenuItem>
											<DropdownMenuItem class="flex justify-between">
												<p>All notification settings</p>
												<Icon
													name="heroicons-solid:arrow-sm-up"
													class="rotate-45"
												/>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>

							<DropdownMenuSeparator class="bg-gray-300" />

							<div
								v-for="notification in notificationItems"
								v-if="notificationItems.length > 0"
								class="h-[calc(100%-3rem)]"
							>
								<NotificationListItem
									:title="notification.title"
									:body="notification.body"
									:additional="notification.additional"
								/>
								<DropdownMenuSeparator class="bg-gray-300" />
							</div>

							<div
								class="h-[calc(100%-3rem)] pt-11"
								v-else
							>
								<img
									src="../../public/sleepyWolf.svg"
									class="m-auto"
								/>
								<h1 class="text-center pt-5 font-medium text-md">
									No unread notifications
								</h1>
							</div>

							<div></div>
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger
							class="h-8 w-8 bg-transparent rounded-full flex items-center justify-center hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:brightness-110"
						>
							<Icon
								name="ph:question"
								class="text-slate-700 text-xl dark:text-slate-200"
							/>
						</DropdownMenuTrigger>

						<DropdownMenuContent class="w-[384px] px-5">
							<div class="group py-2 w-full">
								<div
									class="group-hover:bg-gray-100 m-auto rounded-md min-h-[15rem] dark:group-hover:bg-opacity-10"
								>
									<NuxtImg
										:src="tipItems[tipItem].imgSrc"
										class="mb-2 rounded-sm w-full"
									/>

									<p
										class="group-hover:bg-gray-100 font-semibold text-center mx-8 pb-2 dark:group-hover:bg-opacity-0"
									>
										{{ tipItems[tipItem].body }}
									</p>
								</div>
							</div>
							<NuxtLink
								:onclick="changeTipItem"
								class="text-blue-600 text-center w-full block mb-2 hover:underline text-sm cursor-pointer"
								>Get a new tip</NuxtLink
							>
							<DropdownMenuSeparator class="bg-gray-300" />

							<div class="mx-10 flex flex-wrap justify-center items-center">
								<Button
									variant="ghost"
									class="text-sm font-light py-0 px-2 h-[2rem] hover:bg-gray-300 rounded-sm dark:hover:bg-opacity-5"
									>Pricing</Button
								>
								<Button
									variant="ghost"
									class="text-sm font-light py-0 px-2 h-[2rem] hover:bg-gray-300 rounded-sm dark:hover:bg-opacity-5"
									>Apps</Button
								>
								<Button
									variant="ghost"
									class="text-sm font-light py-0 px-2 h-[2rem] hover:bg-gray-300 rounded-sm dark:hover:bg-opacity-5"
									>Blog</Button
								>
								<Button
									variant="ghost"
									class="text-sm font-light py-0 px-2 h-[2rem] hover:bg-gray-300 rounded-sm dark:hover:bg-opacity-5"
									>Privacy</Button
								>
								<Button
									variant="ghost"
									class="text-sm font-light py-0 px-2 h-[2rem] hover:bg-gray-300 rounded-sm dark:hover:bg-opacity-5"
									>Notice at Collection</Button
								>
								<Button
									variant="ghost"
									class="text-sm font-light py-0 px-2 h-[2rem] hover:bg-gray-300 rounded-sm dark:hover:bg-opacity-5"
									>More...</Button
								>
							</div>
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/shadComponents/ui/select";
import { Input } from "@/shadComponents/ui/input";
import { Button } from "@/shadComponents/ui/button";
import { Label } from "@/shadComponents/ui/label";
import { Switch } from "@/shadComponents/ui/switch";
import { ConfigProvider } from "radix-vue";
import SignUpInput from "../UI/SignUpInput.vue";
import NotificationListItem from "../UI/NotificationListItem.vue";
import AllowMarketingEmailsNotificationItem from "~/components/UI/AllowMarketingEmailsNotificationItem.vue";

const useIdFunction = () => useId();

const isHovered = ref(false);
const staticGif = "logoBeforeAfter";
var currentGif = ref("logoBeforeAfter");
const animatedGif = "logoBeforeAfterAnimated";

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
	{
		src: "/templatesExample.jpg",
		title: "Trello Workspace",
	},
];

const notificationItems = [
	/* 	{
		title: "Hey there!",
		body: "Trello and Atlassian (Trello’s parent company) would love to keep in touch. Can we send occasional marketing emails?",
		additional: AllowMarketingEmailsNotificationItem,
	},
	{
		title: "Normal notification",
		body: "This is a regular text notification",
		additional: undefined,
	}, */
];

const tipItem = ref(0);
const changeTipItem = () => {
	if (tipItem.value >= tipItems.length - 1) {
		tipItem.value = 0;
	} else {
		tipItem.value = tipItem.value + 1;
	}
};

const tipItems = [
	{
		imgSrc: "/tip1.png",
		body: "It’s easy to get your team up and running with Trello playbooks",
	},
	{
		imgSrc: "/tip4.png",
		body: "Make boards more powerful with Trello Power-Ups",
	},
	{
		imgSrc: "/tip2.png",
		body: "New to Trello? Check out the guide",
	},
	{
		imgSrc: "/tip3.png",
		body: "Get inspired by dozens of different Trello workflows",
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
	filter: invert(49%) sepia(8%) saturate(866%) hue-rotate(180deg)
		brightness(84%) contrast(97%);
}

div[data-radix-select-viewport] > div {
	padding: 0px;
}
div[data-radix-select-viewport] {
	padding: 0px;
}
</style>
