<template>
	<div :class="props.class">
		<h1 class="mb-3 text-center font-medium text-sm mt-[2px]">Create board</h1>

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
			<!-- 			<NuxtImg
				v-for="image in boardPhotos?.slice(0, 4)"
				:key="image.id"
				:src="image.urls.regular"
				width="64"
				height="40"
				class="rounded-sm w-[64px] h-[40px]"
			/> -->
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
		<div class="mb-4 flex justify-between">
			<!-- 			<img
				v-for="bg in bgColors"
				:key="bg"
				:src="bg"
				class="h-[32px] w-[40px] rounded-sm cursor-pointer"
				@click="
					() => {
						selectedPhoto = null;
						selectedColor = bg;
					}
				"
			/> -->
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
				<li>
					<Button class="h-[32px] w-[40px] rounded-sm">
						<Icon name="mdi:dots-horizontal" />
					</Button>
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
	import { giveBackgroundImage } from "~/lib/utils";
	import type { Board } from "~/lib/types";

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
	const boardPhotos = ref<any[] | undefined>();
	const selectedPhoto = ref<null | string>(null);
	const selectedColor = ref<null | string>(null);

	const visibilityItems = [
		{
			label: "private",
			icon: "i-heroicons-signal",
		},
		{
			label: "workspace",
			icon: "i-heroicons-signal",
		},
		{
			label: "public",
			icon: "i-heroicons-signal",
		},
	];

	const formSchema = toTypedSchema(
		z.object({
			title: z.string().min(1, { message: "Board title is required" }).max(20),
			workspace_id_str: z
				.string()
				.default(props.selectedWorkspaceId_str || workspaceItems[0].id_str),
			visibility: z.string().default(visibilityItems[0].label),
			prefs_background_url: z.string().nullable().default(selectedPhoto.value),
			prefs_background: z.string().nullable().default(selectedColor.value),
		})
	);

	const form = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = form.handleSubmit(async (values) => {
		values.prefs_background_url = selectedPhoto.value;
		values.prefs_background = selectedColor.value;

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
			})
			.then((result) => {
				selectedPhoto.value = result.response?.results[0].urls.regular;
				boardPhotos.value = result.response?.results;
			});
	});

	const selectedWorkspaceTitle = computed(() => {
		const selectedWorkspace = workspaceItems.find(
			(workspace) => workspace.id_str === props.selectedWorkspaceId_str
		);
		return selectedWorkspace
			? selectedWorkspace.title
			: workspaceItems[0].title;
	});

	const bgColors = [
		"/BgColorBlue.svg",
		"/BgColorOrange.svg",
		"/BgColorPink.svg",
		"/BgColorPurple.svg",
		"/BgColorBlueDark.svg",
	];
</script>
