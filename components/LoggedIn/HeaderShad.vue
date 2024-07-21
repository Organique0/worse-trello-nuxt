<template>
	<div
		class="max-h-[48px] min-h-[48px] dark:!bg-[#1D2125] dark:!text-gray-400"
		:style="[dynamicBg, dynamicText]"
	>
		<ConfigProvider :use-id="useIdFunction">
			<div
				class="box-border flex max-h-12 overflow-hidden border-b-[1px] dark:border-b-gray-700 p-[8px] transition-colors"
				:class="dynamicBorder"
			>
				<div class="flex w-full space-x-1">
					<!---more button-->
					<DropdownMenu>
						<DropdownMenuTrigger
							class="relative mt-0 block h-[32px] w-[32px] flex-shrink-0 rounded-sm py-2 workspaceHeaderShadButtonDark"
							:class="dynamicHover"
						>
							<Icon
								name="gravity-ui:dots-9"
								:ssr="true"
								class="p-auto m-auto !block"
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
						class="relative mt-0 block h-[32px] flex-shrink-0 rounded-sm px-2 py-2 workspaceHeaderShadButtonDark"
						@mouseenter="addHoverClass"
						@mouseleave="removeHoverClass"
						@click="() => router.push('/')"
						:class="!dark && dynamicHover"
					>
						<!--please explain why does the filter change the size? if you remove this !sepia it will change size. like what?-->
						<div
							:class="[
								currentGif,
								colorStore.dominantColor == 'white' && 'filter-none sepia',
							]"
							class="logoBeforeAfter"
						>
							<div class="m-0 h-[16px] w-[75px] px-0 py-[8px] opacity-100" />
						</div>
					</div>

					<!--workspaces-->
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button
								class="relative mt-0 h-[32px] rounded-sm px-2 py-0 block max-[900px]:hidden workspaceHeaderShadButtonDark"
								variant="ghost"
								:class="!dark && dynamicHover"
							>
								Workspaces

								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									class="inline-flex text-opacity-65 dark:text-white"
								/>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent class="w-[20rem] p-3">
							<DropdownMenuLabel class="text-[12px] font-normal leading-4"
								>Your Workspaces
							</DropdownMenuLabel>

							<DropdownMenuItem
								v-for="item in myWorkspaceStore.workspaces"
								:key="item.title"
								class="h-[3.5rem] rounded-md workspaceHeaderShadButtonDark"
								@click="router.push(`/w/${item.id_str}`)"
							>
								<div class="inline-flex w-full">
									<div
										class="rounded-sm h-[40px] w-[40px] text-white dark:text-black font-bold text-[20px] flex justify-center items-center"
										:class="getWorkspaceTypeColor(item.type)"
									>
										{{ item.title.charAt(0).toLocaleUpperCase() }}
									</div>
									<p class="ml-3 content-center font-semibold">
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
								class="workspaceHeaderShadButton max-[1040px]:hidden workspaceHeaderShadButtonDark"
								variant="ghost"
								:class="!dark && dynamicHover"
							>
								Recent
								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									class="inline-flex text-opacity-65 dark:text-white"
								/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent class="w-[20rem] p-3">
							<DropdownMenuItem
								v-for="board in myWorkspaceStore.recentBoards"
								:key="board.title"
								class="group"
								@click="router.push(`/b/${board.id_str}`)"
							>
								<div class="group inline-flex w-full items-center">
									<div
										:style="
											giveBackgroundImage(
												board.prefs_background || board.prefs_background_url
											)
										"
										class="h-8 w-10 rounded-sm bg-cover"
									/>
									<div class="ml-3">
										<p class="font-semibold">{{ board.title }}</p>
										<p class="text-xs font-light">
											{{ board.workspace_id_str }}
										</p>
									</div>
									<Button
										class="workspaceSidemenuButtonIcon invisible group-hover:visible"
										size="icon"
										:class="board.is_favorited && 'visible'"
										@click.stop="myWorkspaceStore.favorite(board.id_str)"
									>
										<LogoFavorite
											:class="
												board.is_favorited
													? 'fill-gray-600 dark:fill-gray-400 stroke-gray-600 dark:stroke-gray-400 stroke-2 hover:fill-none'
													: 'fill-transparent stroke-gray-600 dark:stroke-gray-400 stroke-2 transition-transform duration-100'
											"
										/>
									</Button>
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<!--starred-->
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<Button
								class="workspaceHeaderShadButton max-[1160px]:hidden workspaceHeaderShadButtonDark"
								variant="ghost"
								:class="!dark && dynamicHover"
							>
								Starred
								<Icon
									name="tabler:chevron-down"
									:ssr="true"
									class="inline-flex text-opacity-65 dark:text-white"
								/>
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent class="w-[20rem] p-3">
							<div v-if="myWorkspaceStore.starredBoards.length > 0">
								<DropdownMenuItem
									v-for="board in myWorkspaceStore.starredBoards"
									:key="board.title"
									class="group"
									@click="router.push(`/b/${board.id_str}`)"
								>
									<div class="group inline-flex w-full items-center">
										<div
											:style="
												giveBackgroundImage(
													board.prefs_background || board.prefs_background_url
												)
											"
											class="h-8 w-10 rounded-sm bg-cover"
										/>
										<div class="ml-3">
											<p class="font-semibold">{{ board.title }}</p>
											<p class="text-xs font-light">
												{{ board.workspace_id_str }}
											</p>
										</div>
										<Button
											class="workspaceSidemenuButtonIcon invisible group-hover:visible"
											size="icon"
											:class="board.is_favorited && 'visible'"
											@click.stop="myWorkspaceStore.favorite(board.id_str)"
										>
											<LogoFavorite
												:class="
													board.is_favorited
														? 'fill-gray-600 dark:fill-gray-400 stroke-gray-600 dark:stroke-gray-400 stroke-2 hover:fill-none'
														: 'fill-transparent stroke-gray-600 dark:stroke-gray-400 stroke-2 transition-transform duration-100'
												"
											/>
										</Button>
									</div>
								</DropdownMenuItem>
							</div>
							<div v-else>
								<NuxtImg src="/starred.svg" />
								<p class="py-3 text-center text-sm font-light">
									Star important boards to access them quicly and easily.
								</p>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>

					<!--Templates-->
					<Dialog v-model:open="open">
						<DropdownMenu>
							<DropdownMenuTrigger as-child>
								<Button
									class="workspaceHeaderShadButton max-[1280px]:hidden workspaceHeaderShadButtonDark"
									variant="ghost"
									:class="!dark && dynamicHover"
								>
									Templates
									<Icon
										name="tabler:chevron-down"
										:ssr="true"
										class="inline-flex text-opacity-65 dark:text-white"
									/>
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent class="w-[20rem] p-3">
								<LoggedInStartTemplate />
							</DropdownMenuContent>
						</DropdownMenu>

						<!--create-->
						<DropdownMenu
							v-model:open="createDropdownOpen"
							@update:open="updateCreateInHeaderOpen"
						>
							<DropdownMenuTrigger as-child>
								<Button
									class="workspaceHeaderShadButton dark:text-[#1d2125] max-[1280px]:hidden"
									:style="dynamicText"
									:class="
										router.currentRoute.value.path.includes('/b/') &&
										!dark &&
										'!bg-transWhite hover:backdrop-brightness-110'
									"
								>
									Create
								</Button>
								<Button
									class="relative mt-0 flex h-[32px] rounded-sm px-2 py-0 hover:bg-darkBlueBg dark:text-[#1d2125] min-[1280px]:hidden"
								>
									<Icon
										name="ph:plus-bold"
										class="text-white"
									/>
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								v-if="!createInHeaderOpen && !templatesInHeaderOpen"
								class="w-[20rem] p-3"
							>
								<DropdownMenuItem
									class="max-w-72"
									@click="toggleCreateInHeaderOpen"
									@select="(e) => e.preventDefault()"
								>
									<div class="block">
										<div class="inline-flex w-full">
											<Icon
												name="lucide:trello"
												class="inline-flex h-4 w-4"
											/>
											<p class="ml-1 font-semibold">Create board</p>
										</div>
										<div class="text-left text-xs leading-4">
											<p>
												A board made up of cards ordered on lists. Use it to
												manage projects, track information, or organize
												anything.
											</p>
										</div>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem
									class="max-w-72"
									@click="toggleTemplatesInHeaderOpen"
									@select="(e) => e.preventDefault()"
								>
									<div class="block">
										<div class="inline-flex w-full">
											<Icon
												name="lucide:layout-template"
												class="inline-flex h-4 w-4"
											/>
											<p class="ml-1 font-semibold">Start with a template</p>
										</div>
										<div class="text-left text-xs leading-4">
											<p>Get started with a bord template.</p>
										</div>
									</div>
								</DropdownMenuItem>

								<DropdownMenuItem
									class="max-w-72"
									@select="(e) => e.preventDefault()"
								>
									<DialogTrigger as-child>
										<div class="block">
											<div class="inline-flex w-full">
												<Icon
													name="lucide:users-round"
													class="inline-flex h-4 w-4"
												/>
												<p class="ml-1 font-semibold">Create workspace</p>
											</div>
											<div class="text-left text-xs leading-4">
												<p>
													A workspace is a group of boards and people. Use it to
													organize your company, side hustle, family, or
													friends.
												</p>
											</div>
										</div>
									</DialogTrigger>
									<div class="mt-24 relative bg-red-300 h-full w-full">
										<DialogContent
											class="bg-white dark:bg-[#22272B] !p-0 border-none flex lg:!max-w-[1200px] flex-col-reverse lg:flex-row !max-w-[475px] overflow-hidden top-[58%] lg:top-[45%] rounded-[2px]"
										>
											<VisuallyHidden>
												<dialogHeader>
													<DialogTitle>create a workspace</DialogTitle>
													<DialogDescription
														>a form to create a new workspace</DialogDescription
													>
												</dialogHeader>
											</VisuallyHidden>
											<LoggedInCreateWorkspaceDialog
												@dialog-close="closeCreateWorkspaceDialog"
											/>
										</DialogContent>
									</div>
								</DropdownMenuItem>
							</DropdownMenuContent>
							<DropdownMenuContent
								v-if="createInHeaderOpen"
								class="w-[304px] p-4"
							>
								<Button
									size="icon"
									variant="ghost"
									class="absolute left-[15px] top-[15px] inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md outline-none"
									aria-label="Close"
									@click="toggleCreateInHeaderOpen"
								>
									<Icon
										name="tabler:chevron-left"
										class="w-5 h-5"
									/>
								</Button>
								<Button
									size="icon"
									variant="ghost"
									class="absolute right-[15px] top-[15px] inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md outline-none"
									aria-label="Close"
									@click="closeDropdown"
								>
									<Icon
										name="bitcoin-icons:cross-filled"
										class="h-5 w-5"
									/>
								</Button>
								<LoggedInNewBoard />
							</DropdownMenuContent>

							<DropdownMenuContent
								v-if="templatesInHeaderOpen"
								class="w-[304px] p-4"
							>
								<Button
									size="icon"
									variant="ghost"
									class="absolute left-[15px] top-[15px] inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md outline-none"
									aria-label="Close"
									@click="toggleTemplatesInHeaderOpen"
								>
									<Icon
										name="tabler:chevron-left"
										class="w-5 h-5"
									/>
								</Button>
								<Button
									size="icon"
									variant="ghost"
									class="absolute right-[15px] top-[15px] inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md outline-none"
									aria-label="Close"
									@click="closeDropdown"
								>
									<Icon
										name="bitcoin-icons:cross-filled"
										class="h-5 w-5"
									/>
								</Button>
								<h1 class="w-full text-center text-sm font-bold">
									Create from template
								</h1>
								<LoggedInStartTemplate class="pt-3" />
							</DropdownMenuContent>

							<DropdownMenuContent
								v-if="createInHeaderOpen"
								class="w-[304px] p-4"
							>
								<Button
									size="icon"
									variant="ghost"
									class="absolute left-[15px] top-[15px] inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md outline-none"
									aria-label="Close"
									@click="toggleCreateInHeaderOpen"
								>
									<Icon
										name="tabler:chevron-left"
										class="w-5 h-5"
									/>
								</Button>
								<Button
									size="icon"
									variant="ghost"
									class="absolute right-[15px] top-[15px] inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md outline-none"
									aria-label="Close"
									@click="closeDropdown"
								>
									<Icon
										name="bitcoin-icons:cross-filled"
										class="h-5 w-5"
									/>
								</Button>
								<LoggedInNewBoard />
							</DropdownMenuContent>
						</DropdownMenu>
					</Dialog>
				</div>

				<!--user-->
				<div class="flex space-x-1">
					<div class="relative min-w-60 max-[800px]:hidden">
						<Input
							id="search"
							type="text"
							placeholder="Search..."
							class="h-full pl-10 bg-transWhite border border-gray-400 dark:!bg-[#282d33]"
							:class="
								colorStore.dominantColor == 'white' &&
								'placeholder:text-white hover:!backdrop-brightness-110 transition-all !border-white'
							"
						/>
						<span
							class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
						>
							<Icon
								name="tabler:search"
								:style="!dark && dynamicText"
								class="text-gray-400 workspaceHeaderShadButtonDark"
							/>
						</span>
					</div>

					<NuxtLink
						class="flex items-center justify-center rounded-md bg-transparent dark:hover:bg-gray-600 min-[800px]:hidden h-8 w-8"
						to="/search"
						:class="!dark && dynamicHover"
					>
						<Icon
							name="tabler:search"
							:style="!dark && dynamicText"
							class="text-gray-400"
						/>
					</NuxtLink>

					<DropdownMenu>
						<DropdownMenuTrigger
							class="flex h-8 w-8 items-center justify-center !rounded-full bg-transparent workspaceHeaderShadButtonDark text-gray-400"
							:style="!dark && dynamicText"
							:class="!dark && dynamicHover"
						>
							<Icon
								name="tabler:school-bell"
								class="text-lg"
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent class="h-[25rem] w-[432px] p-3">
							<div class="flex h-[3rem] items-center justify-between">
								<h1 class="text-xl font-bold">Notifications</h1>

								<div class="flex items-center">
									<span
										for="only-unread"
										class="text-xs font-light text-gray-600 dark:text-slate-200"
										>Only show unread</span
									>
									<Switch
										id="only-unread"
										class="ml-2 mr-4 h-[15px] w-[28px]"
									/>
									<DropdownMenu>
										<DropdownMenuTrigger>
											<Icon name="mdi:dots-vertical" />
										</DropdownMenuTrigger>
										<DropdownMenuContent class="w-[310px]">
											<DropdownMenuLabel
												class="mb-3 mt-0 w-full text-center text-gray-900"
											>
												Notification settings
											</DropdownMenuLabel>
											<DropdownMenuLabel
												class="text-xs font-normal text-gray-900"
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
																class="rounded-none focus:bg-blue-300"
															>
																Never
															</SelectItem>
															<SelectItem
																value="periodically"
																class="rounded-none focus:bg-blue-300"
															>
																Periodically
															</SelectItem>
															<SelectItem
																value="instantly"
																class="rounded-none focus:bg-blue-300"
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

							<div v-if="notificationItems.length > 0">
								<div
									v-for="notification in notificationItems"
									:key="notification.title"
									class="h-[calc(100%-3rem)]"
								>
									<NotificationListItem
										:title="notification.title"
										:body="notification.body"
										:additional="notification.additional"
									/>
									<DropdownMenuSeparator class="bg-gray-300" />
								</div>
							</div>

							<div
								v-else
								class="h-[calc(100%-3rem)] pt-11"
							>
								<img
									src="../../public/sleepyWolf.svg"
									class="m-auto"
								/>
								<h1 class="text-md pt-5 text-center font-medium">
									No unread notifications
								</h1>
							</div>

							<div />
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger
							class="flex h-8 w-8 items-center justify-center !rounded-full bg-transparent workspaceHeaderShadButtonDark text-gray-400"
							:style="!dark && dynamicText"
							:class="!dark && dynamicHover"
						>
							<Icon
								name="ph:question"
								class="text-lg"
							/>
						</DropdownMenuTrigger>

						<DropdownMenuContent class="w-[384px] px-5">
							<div class="group w-full py-2">
								<div
									class="m-auto min-h-[15rem] rounded-md group-hover:bg-gray-100 dark:group-hover:bg-opacity-10"
								>
									<NuxtImg
										:src="tipItems[tipItem].imgSrc"
										class="mb-2 w-full rounded-sm"
									/>

									<p
										class="mx-8 pb-2 text-center font-semibold group-hover:bg-gray-100 dark:group-hover:bg-opacity-0"
									>
										{{ tipItems[tipItem].body }}
									</p>
								</div>
							</div>
							<NuxtLink
								:onclick="changeTipItem"
								class="mb-2 block w-full cursor-pointer text-center text-sm text-blue-600 hover:underline"
								>Get a new tip
							</NuxtLink>
							<DropdownMenuSeparator class="bg-gray-300" />

							<div class="mx-10 flex flex-wrap items-center justify-center">
								<Button
									variant="ghost"
									class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5"
									>Pricing</Button
								>
								<Button
									variant="ghost"
									class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5"
									>Apps</Button
								>
								<Button
									variant="ghost"
									class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5"
									>Blog</Button
								>
								<Button
									variant="ghost"
									class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5"
									>Privacy</Button
								>
								<Button
									variant="ghost"
									class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5"
									>Notice at Collection</Button
								>
								<Button
									variant="ghost"
									class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5"
									>More...</Button
								>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>

					<LoggedInUserDropdown
						:dynamicHover="dynamicHover"
						:dark="dark"
					/>
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
		SelectTrigger,
		SelectValue,
	} from "@/shadComponents/ui/select";
	import {
		Dialog,
		DialogClose,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogScrollContent,
		DialogTitle,
		DialogTrigger,
	} from "@/shadComponents/ui/dialog";
	import { Input } from "@/shadComponents/ui/input";
	import { Button } from "@/shadComponents/ui/button";
	import { Switch } from "@/shadComponents/ui/switch";
	import { ConfigProvider, VisuallyHidden } from "radix-vue";
	import NotificationListItem from "../UI/NotificationListItem.vue";
	import AllowMarketingEmailsNotificationItem from "~/components/UI/AllowMarketingEmailsNotificationItem.vue";
	import { getWorkspaceTypeColor, giveBackgroundImage } from "~/lib/utils";

	const { dynamicBg, dynamicText, dynamicHover, dynamicBorder } =
		useDynamicBg();
	const colorMode = useColorMode();
	const colorStore = useColorStore();

	const myWorkspaceStore = useMyWorkspaceStore();

	const dark = computed(() => {
		return colorMode.value == "dark";
	});

	const useIdFunction = () => useId();

	const router = useRouter();

	const isHovered = ref(false);
	const staticGif = "logoBeforeAfter";
	const currentGif = ref("logoBeforeAfter");
	const animatedGif = "logoBeforeAfterAnimated";

	const createInHeaderOpen = ref(false);
	const updateCreateInHeaderOpen = (payload: boolean) => {
		if (payload == false) {
			createInHeaderOpen.value = false;
			templatesInHeaderOpen.value = false;
		}
	};

	const toggleCreateInHeaderOpen = () => {
		createInHeaderOpen.value = !createInHeaderOpen.value;
	};

	const templatesInHeaderOpen = ref(false);
	const toggleTemplatesInHeaderOpen = () => {
		templatesInHeaderOpen.value = !templatesInHeaderOpen.value;
	};

	const createDropdownOpen = ref(false);
	const closeDropdown = () => {
		createDropdownOpen.value = false;
		createInHeaderOpen.value = false;
		templatesInHeaderOpen.value = false;
	};

	const open = ref(false);
	const closeCreateWorkspaceDialog = () => {
		open.value = false;
	};

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

	const notificationItems = [
		{
			title: "Hey there!",
			body: "Trello and Atlassian (Trello’s parent company) would love to keep in touch. Can we send occasional marketing emails?",
			additional: AllowMarketingEmailsNotificationItem,
		},
		{
			title: "Normal notification",
			body: "This is a regular text notification",
			additional: undefined,
		},
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
		filter: invert(69%) sepia(8%) saturate(866%) hue-rotate(180deg)
			brightness(84%) contrast(97%);
	}

	.dark .logoBeforeAfter {
		filter: brightness(0) saturate(100%) invert(66%) sepia(20%) saturate(225%)
			hue-rotate(170deg) brightness(101%) contrast(85%) !important;
	}

	.logoBeforeAfter.sepia {
		filter: sepia(1);
	}

	div[data-radix-select-viewport] > div {
		padding: 0px;
	}

	div[data-radix-select-viewport] {
		padding: 0px;
	}
</style>
