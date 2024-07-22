<template>
	<div
		class="transition-all transition-duration-300 hover:bg-[#A6C5E229] bg-[#ffffff3d] w-[272px] rounded-md p-3 font-semibold text-sm flex align-middle items-center"
		:style="dynamicText"
		@click="toggleAddListDialog"
		v-if="!addListDialogOpen"
	>
		<Icon
			name="ic:outline-plus"
			:color="myColorStore.dominantColor == 'white' ? 'white' : 'black'"
			size="20"
			class="mr-2"
		/>
		<p class="h-[20px]">Add another list</p>
	</div>

	<div
		v-else
		class="bg-white rounded-md p-2 w-[272px]"
	>
		<form @submit="onSubmit">
			<FormField
				v-slot="{ componentField }"
				name="title"
			>
				<FormItem>
					<FormControl>
						<Input
							class="rounded-sm"
							type="text"
							placeholder="Enter list title..."
							v-bind="componentField"
						/>
					</FormControl>
				</FormItem>
			</FormField>
			<div class="flex gap-1 mt-2">
				<Button
					type="submit"
					class="workspaceHeaderShadButton w-20"
				>
					Add list
				</Button>
				<Button
					variant="ghost"
					size="icon"
					@click="toggleAddListDialog"
					class="h-[32px] w-[32px]"
				>
					<Icon
						name="material-symbols:close"
						height="20"
						width="20"
					/>
				</Button>
			</div>
		</form>
	</div>
</template>

<script lang="ts" setup>
	import { Button } from "~/shadComponents/ui/button";
	const myColorStore = useColorStore();
	const { dynamicText } = useDynamicBg();
	const { addList, currentBoard, currentWorkspace } = useMyWorkspaceStore();

	//FORM START
	import {
		FormControl,
		FormDescription,
		FormField,
		FormItem,
		FormLabel,
		FormMessage,
	} from "@/shadComponents/ui/form";
	import { useForm } from "vee-validate";
	import { toTypedSchema } from "@vee-validate/zod";
	import * as z from "zod";
	const formSchema = toTypedSchema(
		z.object({
			title: z.string(),
		})
	);
	const form = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = form.handleSubmit(async (values) => {
		//@ts-expect-error
		values.board_id = currentBoard?.id_str;
		//@ts-expect-error
		values.order = currentBoard?.board_lists
			? currentBoard?.board_list.length + 1
			: 1;
		toggleAddListDialog();
		await addList(values);
	});

	//END

	const addListDialogOpen = ref(false);

	const toggleAddListDialog = () => {
		addListDialogOpen.value = !addListDialogOpen.value;
	};
</script>
