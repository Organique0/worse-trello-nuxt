<template>
	<div
		v-if="!addListDialogOpen"
		class="flex gap-1 justify-between items-center px-[8px] pb-0"
	>
		<Button
			variant="ghost"
			@click="toggleAddListDialog"
			class="rounded-md w-full justify-start h-9 !p-1"
		>
			<Icon
				name="ic:outline-plus"
				color="black"
				size="20"
				class="mr-2"
			/>
			<p class="h-[20px]">Add a card</p>
		</Button>
		<Button
			variant="ghost"
			class="rounded-md h-9 w-[2.4rem]"
			size="icon"
		>
			<LogoCardFromTemplate class="text-gray-600" />
		</Button>
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
						<Textarea
							class="resize-none min-h-[36px] max-h-[160px] m-0 overflow-hidden overflow-y-auto border rounded-lg shadow-sm"
							type="text"
							placeholder="Enter title for this card..."
							v-bind="componentField"
						/>
					</FormControl>
				</FormItem>
			</FormField>
			<div class="flex gap-1 mt-2">
				<Button
					type="submit"
					class="workspaceHeaderShadButton"
				>
					Add card
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
	const { addCard, currentBoard, currentWorkspace } = useMyWorkspaceStore();
	const props = defineProps<{
		boardList: board_list;
	}>();

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
	import type { board_list, Card } from "~/lib/types";
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
		values.list_id = props.boardList.id_str;
		//@ts-expect-error
		values.order = props.boardList.cards ? props.boardList.cards.length + 1 : 1;
		//@ts-expect-error
		values.description = "";
		await addCard(values);
		form.resetForm();
	});

	//END

	const addListDialogOpen = ref(false);

	const toggleAddListDialog = () => {
		addListDialogOpen.value = !addListDialogOpen.value;
	};
</script>
