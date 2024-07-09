<template>
	<div :class="props.class">
		<h1 class="myPopoverTitle">Create board</h1>

		<div
			:style="
				giveBackgroundImage(
					selectedPhoto != null ? selectedPhoto : selectedColor
				)
			"
			class="m-auto rounded-sm w-[200px] h-[120px] bg-center bg-cover items-center flex justify-center"
		>
			<img src="/boardSkeleton.svg" />
		</div>

		<p class="mb-2 mt-6 text-xs font-medium">Background</p>
		<div class="mb-2">
			<ul class="flex gap-2">
				<li
					v-for="image in boardPhotos?.slice(0, 4)"
					class="w-[64px] h-[40px] relative rounded-sm group"
				>
					<button
						:style="giveBackgroundImage(image.urls.regular)"
						class="w-full h-full rounded-sm bg-center bg-cover before:absolute before:top-0 before:right-0 before:w-full before:rounded-sm before:h-full before:z-0 before:group-hover:bg-[#00000048]"
						:class="
							image.urls.regular == selectedPhoto && 'before:bg-[#00000029] '
						"
						@click="
							() => {
								selectedRegularPhoto = convertFullToRegular(image.urls.full);
								selectedFullPhoto = image.urls.full;
								selectedPhoto = image.urls.regular;
								selectedColor = null;
							}
						"
					></button>
					<Icon
						v-if="image.urls.regular == selectedPhoto"
						name="material-symbols:check"
						class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10"
					/>
				</li>
			</ul>
		</div>
		<!--Colors-->
		<div class="mb-4 flex justify-between">
			<ul class="flex gap-2 max-w-full">
				<li
					v-for="bg in bgColors.slice(0, 5)"
					class="h-[32px] w-[40px] relative rounded-sm group"
				>
					<button
						:style="giveBackgroundImage(bg)"
						class="w-full h-full absolute top-0 right-0 rounded-sm bg-center bg-cover before:absolute before:top-0 before:right-0 before:w-full before:rounded-sm before:h-full before:z-0 before:group-hover:bg-[#00000048]"
						:class="bg == selectedColor && 'before:bg-[#00000029] '"
						@click="
							() => {
								selectedRegularPhoto = null;
								selectedFullPhoto = null;
								selectedPhoto = null;
								selectedColor = bg;
							}
						"
					></button>
					<Icon
						v-if="bg == selectedColor"
						name="material-symbols:check"
						class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10"
					/>
				</li>
				<!--More-->
				<li class="h-[32px] w-[40px] relative rounded-sm group">
					<PopoverRoot>
						<PopoverTrigger
							class="h-full w-full rounded-sm hoverButtonWithBg flex items-center justify-center"
						>
							<Icon name="mdi:dots-horizontal" />
						</PopoverTrigger>
						<PopoverPortal>
							<PopoverContent
								class="myPopoverContent"
								side="right"
								align="center"
							>
								<PopoverClose
									class="popoverCloseButton"
									@click="
										() => {
											seeMoreBgImgOpen = false;
											seeMoreColorOpen = false;
										}
									"
								>
									<Icon
										name="bitcoin-icons:cross-filled"
										class="popoverCloseIconButton"
								/></PopoverClose>

								<div v-if="!seeMoreBgImgOpen && !seeMoreColorOpen">
									<h1 class="myPopoverTitle">Board background</h1>

									<div class="flex justify-between h-6 my-2">
										<div class="text-xs h-full p-2 flex items-center">
											Photos
										</div>
										<Button
											class="hoverButtonWithBg !h-full text-xs !rounded-sm"
											@click="() => (seeMoreBgImgOpen = true)"
										>
											See more
										</Button>
									</div>

									<ul class="flex flex-wrap m-0">
										<li
											v-for="image in boardPhotos?.slice(0, 6)"
											class="w-[calc(33.3%-8px)] h-[56px] relative rounded-sm group p-[4px] box-content"
										>
											<button
												:style="giveBackgroundImage(image.urls.regular)"
												class="w-full h-full !rounded-sm bg-center bg-cover before:absolute before:top-[4px] before:right-[4px] before:w-[calc(100%-8px)] before:rounded-sm before:h-[calc(100%-8px)] before:z-0 before:group-hover:bg-[#00000048]"
												:class="
													image.urls.regular == selectedPhoto &&
													'before:bg-[#00000029] '
												"
												@click="
													() => {
														selectedRegularPhoto = convertFullToRegular(
															image.urls.full
														);
														selectedFullPhoto = image.urls.full;
														selectedPhoto = image.urls.regular;
														selectedColor = null;
													}
												"
											></button>
											<Icon
												v-if="image.urls.regular == selectedPhoto"
												name="material-symbols:check"
												class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10"
											/>
										</li>
									</ul>

									<div class="flex justify-between h-6 my-1">
										<div class="text-xs h-full p-2 flex items-center">
											Colors
										</div>
										<Button
											class="hoverButtonWithBg !h-full text-xs !rounded-sm"
											@click="() => (seeMoreColorOpen = true)"
										>
											See more
										</Button>
									</div>

									<ul class="flex flex-wrap m-0">
										<li
											v-for="bg in bgColors.slice(0, 6)"
											class="w-[calc(33.3%-8px)] h-[56px] relative rounded-sm group p-[4px] box-content"
										>
											<button
												:style="giveBackgroundImage(bg)"
												class="w-full h-full !rounded-sm bg-center bg-cover before:absolute before:top-[4px] before:right-[4px] before:w-[calc(100%-8px)] before:rounded-sm before:h-[calc(100%-8px)] before:z-0 before:group-hover:bg-[#00000048]"
												:class="bg == selectedColor && 'bg-[#00000029] '"
												@click="
													() => {
														selectedRegularPhoto = null;
														selectedFullPhoto = null;
														selectedPhoto = null;
														selectedColor = bg;
													}
												"
											></button>
											<Icon
												v-if="bg == selectedColor"
												name="material-symbols:check"
												class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10"
											/>
										</li>
									</ul>
								</div>
								<div v-else-if="seeMoreBgImgOpen">
									<Button
										size="icon"
										variant="ghost"
										class="popoverCloseButton !left-[10px]"
										aria-label="Close"
										@click="() => (seeMoreBgImgOpen = false)"
									>
										<Icon
											name="tabler:chevron-left"
											class="popoverCloseIconButton"
										/>
									</Button>
									<h1 class="myPopoverTitle">
										Photos by
										<a
											href="https://unsplash.com/"
											target="_blank"
											class="text-primary"
											>Unsplash</a
										>
									</h1>
									<div class="relative flex flex-col w-full mb-3">
										<Input
											id="searchPhotos"
											type="search"
											placeholder="Photos"
											class="pl-8 rounded-sm"
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
									<div
										class="grid grid-cols-2 gap-2 h-[85vh] overflow-y-scroll"
										ref="el"
									>
										<div
											v-for="image in boardPhotos"
											class="w-full h-[81px] relative rounded-sm group"
										>
											<button
												:style="giveBackgroundImage(image.urls.regular)"
												class="w-full h-full rounded-sm bg-center bg-cover before:absolute before:top-0 before:right-0 before:w-full before:rounded-sm before:h-full before:z-0 before:group-hover:bg-[#00000048]"
												:class="
													image.urls.regular == selectedPhoto &&
													'before:bg-[#00000029] '
												"
												@click="
													() => {
														selectedRegularPhoto = convertFullToRegular(
															image.urls.full
														);
														selectedFullPhoto = image.urls.full;
														selectedPhoto = image.urls.regular;
														selectedColor = null;
													}
												"
											></button>
											<Icon
												v-if="image.urls.regular == selectedPhoto"
												name="material-symbols:check"
												class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10"
											/>
										</div>
									</div>
								</div>
								<div v-else-if="seeMoreColorOpen">
									<Button
										size="icon"
										variant="ghost"
										class="popoverCloseButton !left-[10px]"
										aria-label="Close"
										@click="() => (seeMoreColorOpen = false)"
									>
										<Icon
											name="tabler:chevron-left"
											class="popoverCloseIconButton"
										/>
									</Button>

									<h1 class="myPopoverTitle">Colors</h1>

									<div class="h-1/2">
										<div class="grid grid-cols-3 gap-2">
											<div
												v-for="bg in bgColors"
												class="w-full h-[61px] relative rounded-sm group"
											>
												<button
													:style="giveBackgroundImage(bg)"
													class="w-full h-full absolute top-0 right-0 rounded-sm bg-center bg-cover before:absolute before:top-0 before:right-0 before:w-full before:rounded-sm before:h-full before:z-0 before:group-hover:bg-[#00000048]"
													:class="
														bg == selectedColor && 'before:bg-[#00000029] '
													"
													@click="
														() => {
															selectedRegularPhoto = null;
															selectedFullPhoto = null;
															selectedPhoto = null;
															selectedColor = bg;
														}
													"
												></button>
												<Icon
													v-if="bg == selectedColor"
													name="material-symbols:check"
													class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10"
												/>
											</div>
										</div>
									</div>
									<Separator class="my-5" />
									<div class="h-1/2">
										<div class="grid grid-cols-3 gap-2">
											<div
												v-for="bg in bgSingleColors"
												class="w-full h-[61px] relative rounded-sm group"
											>
												<button
													:style="giveBackgroundImage(bg)"
													class="w-full h-full absolute top-0 right-0 rounded-sm bg-center bg-cover before:absolute before:top-0 before:right-0 before:w-full before:rounded-sm before:h-full before:z-0 before:group-hover:bg-[#00000048]"
													:class="
														bg == selectedColor && 'before:bg-[#00000029] '
													"
													@click="
														() => {
															selectedRegularPhoto = null;
															selectedFullPhoto = null;
															selectedPhoto = null;
															selectedColor = bg;
														}
													"
												></button>
												<Icon
													v-if="bg == selectedColor"
													name="material-symbols:check"
													class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10"
												/>
											</div>
										</div>
									</div>
								</div>
							</PopoverContent>
						</PopoverPortal>
					</PopoverRoot>
				</li>
			</ul>
		</div>

		<form @submit="onSubmit">
			<FormField
				v-slot="{ componentField }"
				name="title"
			>
				<FormItem>
					<FormLabel class="text-xs font-semibold">Board title</FormLabel>
					<FormControl>
						<Input
							type="text"
							placeholder="Your new boards title"
							v-bind="componentField"
							class="rounded-sm border-black focus-visible:ring-0"
						/>
					</FormControl>
					<FormDescription class="text-black"
						>👋 Board title is required
					</FormDescription>
				</FormItem>
			</FormField>

			<FormField
				name="workspace_id"
				v-slot="{ componentField }"
			>
				<FormItem class="mt-4">
					<FormLabel class="text-xs font-semibold">Workspace</FormLabel>
					<Select
						v-bind="componentField"
						:default-value="selectedWorkspaceId_str"
					>
						<FormControl>
							<SelectTrigger class="rounded-sm border-black focus:ring-0">
								<span>{{ selectedWorkspaceTitle }}</span>
							</SelectTrigger>
						</FormControl>
						<SelectContent class="rounded-none py-1">
							<SelectItemCreateBoard
								v-for="item in workspaceItems"
								:key="item.id_str"
								:value="item.id_str"
								class="rounded-none p-3"
							>
								{{ item.title }}
							</SelectItemCreateBoard>
						</SelectContent>
					</Select>
				</FormItem>
			</FormField>

			<FormField
				name="visibility"
				v-slot="{ componentField }"
			>
				<FormItem class="mt-2">
					<FormLabel class="text-xs font-semibold">Visibility</FormLabel>
					<Select v-bind="componentField">
						<FormControl>
							<SelectTrigger class="rounded-sm border-black focus:ring-0">
								<span>{{ form.values.visibility }}</span>
							</SelectTrigger>
						</FormControl>
						<SelectContent class="rounded-none py-1">
							<SelectItemCreateBoard
								v-for="item in visibilityItems"
								:key="item.label"
								:value="item.label"
								class="rounded-none"
							>
								<span class="">{{ item.label }}</span>
							</SelectItemCreateBoard>
						</SelectContent>
					</Select>
				</FormItem>
			</FormField>
			<Button
				type="submit"
				class="hoverButtonWithBg mt-4 w-full rounded-sm"
				:disabled="!form.values.title"
			>
				Create
			</Button>
		</form>
		<Button
			type="submit"
			class="hoverButtonWithBg mt-2 w-full rounded-sm"
		>
			Start with a template
		</Button>
		<p class="text-[12px] leading-4 my-1">
			By using images from Unsplash, you agree to their
			<a
				href="https://unsplash.com/license"
				class="hover:underline"
				>licence</a
			>
			and
			<a
				href="https://unsplash.com/terms"
				class="hover:underline"
				>Terms of Service</a
			>
		</p>
	</div>
</template>

<script lang="ts" setup>
	import { toTypedSchema } from "@vee-validate/zod";
	import * as z from "zod";
	import { useForm } from "vee-validate";
	import {
		FormControl,
		FormDescription,
		FormField,
		FormItem,
		FormLabel,
	} from "@/shadComponents/ui/form";

	import {
		Select,
		SelectContent,
		SelectTrigger,
		SelectValue,
		SelectItemCreateBoard,
	} from "@/shadComponents/ui/select";
	import { _backgroundImage } from "#tailwind-config/theme";
	import type { Icon } from "lucide-vue-next";
	import { giveBackgroundImage, visibilityItems } from "~/lib/utils";
	import {
		PopoverAnchor,
		PopoverArrow,
		PopoverClose,
		PopoverContent,
		PopoverPortal,
		PopoverRoot,
		PopoverTrigger,
	} from "radix-vue";
	import { useInfiniteScroll, watchDebounced } from "@vueuse/core";
	import Separator from "~/shadComponents/ui/separator/Separator.vue";

	const props = defineProps({
		class: {
			type: String,
			required: false,
			default: "",
		},
		selectedWorkspaceId_str: {
			type: String,
			required: false,
		},
	});

	const router = useRouter();

	const myWorkspaceStore = useMyWorkspaceStore();
	const workspaceItems = myWorkspaceStore.workspaces;
	const unsplash = useUnsplash();
	const boardPhotos = ref<any[]>([]);
	const selectedColor = ref<null | string>(null);
	const selectedPhoto = ref<null | string>(null);
	const selectedFullPhoto = ref<null | string>(null);
	const selectedRegularPhoto = ref<null | string>(null);
	const seeMoreBgImgOpen = ref(false);
	const seeMoreColorOpen = ref(false);
	const searchValue = ref("");
	const el = ref<HTMLElement | null>(null);
	const page = ref(2);

	const formSchema = toTypedSchema(
		z.object({
			title: z.string().min(1, { message: "Board title is required" }).max(20),
			workspace_id_str: z
				.string()
				.default(props.selectedWorkspaceId_str || workspaceItems[0].id_str),
			visibility: z.string().default(visibilityItems[0].label),
			prefs_background_url: z.string().nullable().default(selectedPhoto.value),
			prefs_background_url_regular: z
				.string()
				.nullable()
				.default(selectedRegularPhoto.value),
			prefs_background_url_full: z
				.string()
				.nullable()
				.default(selectedFullPhoto.value),
			prefs_background: z.string().nullable().default(selectedColor.value),
		})
	);

	const form = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = form.handleSubmit(async (values) => {
		values.prefs_background_url = selectedPhoto.value;
		values.prefs_background = selectedColor.value;
		values.prefs_background_url_full = selectedFullPhoto.value;
		values.prefs_background_url_regular = selectedRegularPhoto.value;

		try {
			const response = await myWorkspaceStore.createBoard(values);
			if (response.success && response.board) {
				await router.push(`/b/${response.board.id_str}`);
			} else {
				console.error("Error creating board:", response);
			}
		} catch (error) {
			console.error("Error creating board:", error);
		}
	});

	onBeforeMount(async () => {
		await unsplash.collections
			.getPhotos({
				collectionId: "317099",
				perPage: 30,
				page: 1,
			})
			.then((result) => {
				if (result.response) {
					const fullImageUrl = result.response.results[0].urls.full;
					selectedFullPhoto.value = fullImageUrl;
					selectedPhoto.value = result.response.results[0].urls.regular;
					selectedRegularPhoto.value = convertFullToRegular(fullImageUrl);
					boardPhotos.value = result.response.results;
				}
			});
	});

	useInfiniteScroll(el, async () => {
		if (!searchValue.value) {
			await unsplash.collections
				.getPhotos({
					collectionId: "317099",
					perPage: 30,
					page: page.value,
				})
				.then((result) => {
					if (result.response) {
						boardPhotos.value?.push(...result.response.results);
						page.value++;
					}
				});
		} else {
			await unsplash.search
				.getPhotos({
					query: searchValue.value,
					perPage: 30,
					page: page.value,
				})
				.then((result) => {
					if (result.response) {
						boardPhotos.value?.push(...result.response.results);
						page.value++;
					}
				});
		}
	});

	watchDebounced(
		searchValue,
		async () => {
			if (searchValue.value) {
				await unsplash.search
					.getPhotos({
						query: searchValue.value,
						perPage: 30,
						page: 1,
					})
					.then((result) => {
						if (result.response) {
							boardPhotos.value = result.response.results;
							page.value++;
						}
					});
			} else {
				await unsplash.collections
					.getPhotos({
						collectionId: "317099",
						perPage: 30,
						page: 1,
					})
					.then((result) => {
						if (result.response) {
							boardPhotos.value = result.response.results;
						}
					});
			}
		},
		{ debounce: 400, maxWait: 500 }
	);

	const convertFullToRegular = (fullImageUrl: string) => {
		//modify the url to make an optimized image
		const url = new URL(fullImageUrl);
		url.searchParams.set("q", "50");
		url.searchParams.set("w", "2560");
		url.searchParams.set("h", "1707");
		return url.toString();
	};

	const selectedWorkspaceTitle = computed(() => {
		const selectedWorkspace = workspaceItems.find(
			(workspace) => workspace.id_str === props.selectedWorkspaceId_str
		);
		return selectedWorkspace
			? selectedWorkspace.title
			: workspaceItems[0].title;
	});

	const bgColors = [
		"/BgGradientSnow.svg",
		"/BgGradientOcean.svg",
		"/BgGradientCrystal.svg",
		"/BgGradientRainbow.svg",
		"/BgGradientPeach.svg",
		"/BgGradientFlower.svg",
		"/BgGradientEarth.svg",
		"/BgGradientAlien.svg",
		"/BgGradientVulcano.svg",
	];

	const bgSingleColors = [
		"rgb(0, 121, 191)",
		"rgb(210, 144, 52)",
		"rgb(81, 152, 57)",
		"rgb(176, 70, 50)",
		"rgb(137, 96, 158)",
		"rgb(205, 90, 145)",
		"rgb(75, 191, 107)",
		"rgb(0, 174, 204)",
		"rgb(131, 140, 145)",
	];
</script>
