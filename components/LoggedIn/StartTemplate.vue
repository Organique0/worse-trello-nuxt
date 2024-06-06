<template>
	<div :class="props.class">
		<p class="px-2 py-1 text-xs">Top templates</p>
		<DropdownMenuItem
			v-for="item in templatesItems"
			:key="item.title"
		>
			<div class="inline-flex w-full">
				<NuxtImg
					:src="item.src"
					class="h-8 w-10 rounded-sm"
				/>

				<p class="ml-3 align-middle font-semibold">
					{{ item.title }}
				</p>
			</div>
		</DropdownMenuItem>

		<DropdownMenuSeparator />

		<div class="inline-flex w-full py-1">
			<span class="content-end pl-5">
				<LogosTrelloIcon class="text-primary" />
			</span>
			<p class="align-end ml-3 text-sm font-normal">
				See hundreds of templates from the Trello comunity
			</p>
		</div>

		<Button
			class="mt-2 h-8 w-full rounded-sm bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:brightness-125"
			>Explore templates</Button
		>
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

	const props = defineProps({
		class: {
			type: String,
			required: false,
		},
	});

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
</script>
