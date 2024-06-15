<template>
	<div
		v-if="workspaceData"
		class="w-full h-full mx-12"
	>
		<div
			class="p-[32px]"
			v-if="!editOpen"
		>
			<div class="flex gap-2">
				<div
					class="rounded-sm h-[60px] w-[60px] text-white font-bold text-[35px] flex justify-center items-center"
					:class="getWorkspaceTypeColor(workspaceData.type)"
				>
					{{ workspaceData.title.charAt(0).toLocaleUpperCase() }}
				</div>

				<div class="flex items-center">
					<div class="h-fit">
						<h2 class="text-[20px] font-bold leading-6">
							{{ workspaceData.title }}
							<Button
								class="bg-transparent hoverButton text-black h-[24px] w-[24px] p-0 m-0 !rounded-[4px]"
								@click="editOpen = !editOpen"
							>
								<Icon name="clarity:edit-line" />
							</Button>
						</h2>
						<span class="text-xs font-light">{{
							workspaceData.visibility.charAt(0).toUpperCase() +
							workspaceData.visibility.substring(1)
						}}</span>
					</div>
				</div>
			</div>
			<p class="text-xs font-light">{{ workspaceData.description }}</p>
		</div>

		<div
			class=""
			v-if="editOpen"
		>
			<form @submit="onSubmit">
				<FormField
					v-slot="{ componentField }"
					name="title"
				>
					<FormItem class="mb-2">
						<FormLabel>Title</FormLabel>
						<FormControl>
							<Input
								type="text"
								class="w-[250px] hover:brightness-95 border-gray-500 rounded-[3px]"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<FormField
					v-slot="{ componentField }"
					name="description"
				>
					<FormItem>
						<FormLabel>Description (optional)</FormLabel>
						<FormControl>
							<Textarea
								class="w-[250px] hover:brightness-95 border-gray-500 rounded-[3px]"
								v-bind="componentField"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				</FormField>
				<div class="flex gap-2 mt-4">
					<Button
						class="relative mt-0 block h-[32px] rounded-sm px-2 py-0 hover:bg-darkBlueBg dark:text-[#1d2125]"
						type="submit"
					>
						Save
					</Button>
					<Button
						class="hoverButtonWithBg"
						type="button"
						@click="editOpen = !editOpen"
						>Cancel</Button
					>
				</div>
			</form>
		</div>

		<hr class="w-full p-0 my-[16px]" />

		<div class="pl-[14px]">
			<div class="flex gap-4">
				<Icon
					name="solar:user-linear"
					class="h-[24px] w-[24px]"
				/>
				<h1>Your boards</h1>
			</div>

			<div class="mt-5 grid grid-cols-4 gap-4">
				<LoggedInBoardPreview
					v-for="board in workspaceData.workspace_boards"
					:key="board.id_str"
					:src="board.prefs_background || board.prefs_background_url || ''"
					:starred="board.is_favorited"
					link=""
					:title="board.title"
					:id_str="board.id_str"
				/>
				<LoggedInEmptyBoard :selectedWorkspaceId_str="workspaceData.id_str" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type { Workspace } from "~/lib/types";
	import { getWorkspaceTypeColor } from "~/lib/utils";
	import { Textarea } from "~/shadComponents/ui/textarea";
	import { useForm } from "vee-validate";
	import { toTypedSchema } from "@vee-validate/zod";
	import * as z from "zod";

	const myWorkspaceStore = useMyWorkspaceStore();

	definePageMeta({
		layout: "logged-in-home",
	});
	const route = useRoute();
	const workspaceData = ref<Workspace>();
	const editOpen = ref(false);

	const formSchema = toTypedSchema(
		z.object({
			title: z.string().min(3).max(20),
			description: z.string(),
		})
	);

	const form = useForm({
		validationSchema: formSchema,
	});

	onBeforeMount(async () => {
		await myWorkspaceStore.loadWorkspaces();
		/* 		workspaceData.value = await $larafetch(
				`api/workspaces/${route.params.wid}`,
				{
					method: "get",
				}
			); */

		workspaceData.value = myWorkspaceStore.workspaces.find(
			(workspace) => workspace.id_str == route.params.wid
		);
	});

	const onSubmit = form.handleSubmit(async (values) => {
		const response = await $larafetch(`api/workspaces/${route.params.wid}`, {
			method: "put",
			body: values,
		});
		editOpen.value = !editOpen.value;

		//@ts-expect-error
		workspaceData.value.title = response.title;
		//@ts-expect-error
		workspaceData.value.description = response.description;
	});
</script>
