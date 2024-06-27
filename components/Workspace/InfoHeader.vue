<template>
	<div
		class="p-[32px] my-0 mx-auto max-w-[850px] justify-between items-start relative flex"
		v-if="!editOpen && currentWorkspace"
	>
		<div>
			<div class="flex gap-2">
				<div
					class="rounded-sm h-[60px] w-[60px] text-white dark:text-black font-bold text-[35px] flex justify-center items-center"
					:class="getWorkspaceTypeColor(currentWorkspace.type)"
				>
					{{ currentWorkspace.title.charAt(0).toLocaleUpperCase() }}
				</div>

				<div class="flex items-center">
					<div class="h-fit">
						<h2 class="text-[20px] font-bold leading-6">
							{{ currentWorkspace.title }}
							<Button
								class="bg-transparent hoverButton text-black h-[24px] w-[24px] p-0 m-0 !rounded-[4px]"
								@click="editOpen = !editOpen"
							>
								<Icon
									name="clarity:edit-line"
									class="dark:text-white"
								/>
							</Button>
						</h2>
						<span class="text-xs font-light">{{
							currentWorkspace.visibility.charAt(0).toUpperCase() +
							currentWorkspace.visibility.substring(1)
						}}</span>
					</div>
				</div>
			</div>
			<p class="text-xs font-light">{{ currentWorkspace.description }}</p>
		</div>
	</div>

	<div
		class="w-full mx-12"
		v-if="currentWorkspace && editOpen"
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
</template>

<script lang="ts" setup>
	import { getWorkspaceTypeColor } from "~/lib/utils";
	import { Textarea } from "~/shadComponents/ui/textarea";
	import { useForm } from "vee-validate";
	import { toTypedSchema } from "@vee-validate/zod";
	import * as z from "zod";
	import type { Workspace } from "~/lib/types";

	const { currentWorkspace } = useMyWorkspaceStore();

	const route = useRoute();
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

	const onSubmit = form.handleSubmit(async (values) => {
		const response = await $larafetch(`api/workspaces/${route.params.wid}`, {
			method: "put",
			body: values,
		});
		editOpen.value = !editOpen.value;

		//@ts-expect-error
		currentWorkspace.value.title = response.title;
		//@ts-expect-error
		currentWorkspace.value.description = response.description;
	});
</script>
