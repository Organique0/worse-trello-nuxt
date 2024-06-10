<template>
	<div
		class="w-full lg:w-[50%] mt-0 lg:mt-[64px] mx-auto flex flex-1 items-center flex-col px-[24px] pb-6"
	>
		<div class="lg:w-[388px]">
			<span class="block text-[#172B4D] text-[24px] font-bold mb-3"
				>Let's build a Workspace</span
			>
			<span class="text-[#44546F] text-[18px]">
				Boost your productivity by making it easier for everyone to access
				boards in one location.
			</span>

			<form @submit="onSubmit">
				<FormField
					v-slot="{ componentField }"
					name="title"
				>
					<FormItem>
						<FormLabel class="text-[12px] font-semibold mt-5 block"
							>Workspace name</FormLabel
						>
						<FormControl>
							<Input
								class="rounded-sm"
								type="text"
								placeholder="Taco's Co."
								v-bind="componentField"
							/>
						</FormControl>
						<FormDescription class="text-[12px]">
							This is the name of your company, team or organization.e.
						</FormDescription>
						<FormMessage />
					</FormItem>
				</FormField>

				<FormField
					name="type"
					v-slot="{ componentField }"
				>
					<FormItem>
						<FormLabel class="text-[12px] font-semibold mt-5 block"
							>Workspace type</FormLabel
						>
						<Select v-bind="componentField">
							<FormControl>
								<SelectTrigger class="">
									<SelectValue placeholder="Choose.." />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectGroup>
									<SelectItemCreateBoard value="education">
										Education
									</SelectItemCreateBoard>
									<SelectItemCreateBoard value="it">
										Engineering-IT
									</SelectItemCreateBoard>
									<SelectItemCreateBoard value="hr">
										Human Resources
									</SelectItemCreateBoard>
									<SelectItemCreateBoard value="sales">
										Sales CRM
									</SelectItemCreateBoard>
									<SelectItemCreateBoard value="business">
										Small Business
									</SelectItemCreateBoard>
									<SelectItemCreateBoard value="marketing">
										Marketing
									</SelectItemCreateBoard>
									<SelectItemCreateBoard value="operations">
										Operations
									</SelectItemCreateBoard>
									<SelectItemCreateBoard value="other">
										Other
									</SelectItemCreateBoard>
								</SelectGroup>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				</FormField>

				<FormField
					v-slot="{ componentField }"
					name="description"
				>
					<FormItem>
						<FormLabel class="text-[12px] font-semibold mt-5 block"
							>Workspace description <span class="font-thin">Optional</span>
						</FormLabel>
						<FormControl>
							<Textarea
								class="resize-none rounded-sm h-36"
								placeholder="Our team organizes everything here"
								v-bind="componentField"
							/>
						</FormControl>
						<FormDescription class="text-[12px] mb-5">
							Get your members on board with a few words about your Workspace.
						</FormDescription>
						<FormMessage />
					</FormItem>
				</FormField>

				<Button
					type="submit"
					class="w-full rounded-sm h-12 mt-5"
				>
					Continue
				</Button>
			</form>
		</div>
	</div>

	<div class="w-full lg:w-[50%] rounded-md">
		<div
			class="bg-createWorkspaceFormBg scale-y-[2] -rotate-90 bg-no-repeat bg-cover flex flex-1 justify-center bg-[110px_center] lg:rotate-0 lg:scale-y-[1] lg:h-full lg:bg-left"
		>
			<NuxtImg
				src="/createWorkspaceFormImage.svg"
				type="svg"
				width="342"
				height="256"
				class="m-auto lg:mt-[25%] rotate-90 scale-x-50 pt-[40px] lg:rotate-0 lg:scale-x-[1]"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
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
	} from "@/shadComponents/ui/select";
	import { useForm } from "vee-validate";
	import { toTypedSchema } from "@vee-validate/zod";
	import * as z from "zod";
	import Textarea from "~/shadComponents/ui/textarea/Textarea.vue";
	import SelectItemCreateBoard from "~/shadComponents/ui/select/SelectItemCreateBoard.vue";

	const { createWorkspace } = useMyWorkspaceStore();

	const formSchema = toTypedSchema(
		z.object({
			title: z.string().min(2).max(50),
			type: z.string().min(1, { message: "Type is required" }),
			description: z.string().optional(),
		})
	);

	const form = useForm({
		validationSchema: formSchema,
	});

	const onSubmit = form.handleSubmit(async (values) => {
		console.log("Form submitted!", values);
		await createWorkspace(values);
	});
</script>
