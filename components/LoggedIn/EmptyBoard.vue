<template>
	<Popover>
		<PopoverTrigger
			class="!w-[200px] !h-[100px] flex items-center justify-center rounded-sm hoverButtonWithBg cursor-pointer"
			asChild
		>
			<p>Create new board</p>
		</PopoverTrigger>
		<PopoverContent class="w-[304px]">
			<h1 class="text-center mb-3 font-medium">Create board</h1>
			<NuxtImg
				src="/boardExample.jpg"
				width="200"
				height="120"
				class="m-auto rounded-sm"
			/>

			<p class="text-xs font-medium mt-6 mb-2">Background</p>
			<div class="flex justify-between mb-2">
				<NuxtImg
					v-for="image in bgImages"
					:src="image"
					width="64"
					height="40"
					class="rounded-sm"
				/>
			</div>
			<div class="flex justify-between mb-4">
				<img
					v-for="bg in bgColors"
					:src="bg"
					class="w-[40px] h-[32px] rounded-sm"
				/>
				<Button class="w-[40px] h-[32px] rounded-sm">
					<Icon name="mdi:dots-horizontal" />
				</Button>
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
								class="border-black rounded-sm focus-visible:ring-0"
							/>
						</FormControl>
						<FormDescription class="text-black"
							>👋 Board title is required
						</FormDescription>
					</FormItem>
				</FormField>

				<FormField
					name="workspace"
					v-slot="{ componentField }"
				>
					<FormItem class="mt-4">
						<FormLabel class="text-xs font-semibold">Workspace</FormLabel>
						<FormControl>
							<Select>
								<SelectTrigger class="border-black rounded-sm focus:ring-0">
									<SelectValue :placeholder="workspaceItems[0].label" />
								</SelectTrigger>
								<SelectContent class="rounded-none py-1">
									<SelectItemCreateBoard
										:value="item.label"
										v-for="item in workspaceItems"
										class="p-3 rounded-none"
									>
										{{ item.label }}
									</SelectItemCreateBoard>
								</SelectContent>
							</Select>
						</FormControl>
					</FormItem>
				</FormField>

				<FormField
					name="visibility"
					v-slot="{ componentField }"
				>
					<FormItem class="mt-2">
						<FormLabel class="text-xs font-semibold">Visibility</FormLabel>
						<FormControl>
							<Select>
								<SelectTrigger class="border-black rounded-sm focus:ring-0">
									<SelectValue :placeholder="visibilityItems[0].label" />
								</SelectTrigger>
								<SelectContent class="rounded-none py-1">
									<SelectItemCreateBoard
										:value="item.label"
										v-for="item in visibilityItems"
										class="rounded-none"
									>
										<span class="">{{ item.label }}</span>
									</SelectItemCreateBoard>
								</SelectContent>
							</Select>
						</FormControl>
					</FormItem>
				</FormField>
				<Button
					type="submit"
					class="hoverButtonWithBg w-full mt-4 rounded-sm"
					:disabled="!form.values.title"
				>
					Create
				</Button>
			</form>
			<Button
				type="submit"
				class="hoverButtonWithBg w-full mt-2 rounded-sm"
			>
				Start with a template
			</Button>
		</PopoverContent>
	</Popover>
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
	FormMessage,
} from "@/shadComponents/ui/form";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	SelectItemCreateBoard,
} from "@/shadComponents/ui/select";

const formSchema = toTypedSchema(
	z.object({
		title: z.string().min(1, { message: "Board title is required" }).max(20),
		workspace: z.string(),
		visibility: z.string(),
	})
);

const form = useForm({
	validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
	console.log("Form submitted!", values);
});

const workspaceItems = [
	{
		label: "asdf",
	},
	{
		label: "Trello workspace",
	},
];

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

const bgImages = [
	"/boardExample.jpg",
	"/boardExample2.jpg",
	"/boardExample3.jpg",
	"/boardExample4.jpg",
];

const bgColors = [
	"/BgColorBlue.svg",
	"/BgColorOrange.svg",
	"/BgColorPink.svg",
	"/BgColorPurple.svg",
	"/BgColorBlueDark.svg",
];
</script>
