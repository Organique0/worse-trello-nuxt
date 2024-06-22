<template>
	<div
		class="w-[325px] border h-full"
		v-if="workspaceData != undefined"
	>
		<div class="flex gap-2 border-b p-3">
			<div
				class="rounded-sm h-[32px] w-[32px] text-white font-bold text-[20px] flex justify-center items-center"
				:class="getWorkspaceTypeColor(workspaceData.type)"
			>
				{{ workspaceData.title.charAt(0).toLocaleUpperCase() }}
			</div>

			<div class="items-center leading-5">
				<h2 class="text-[15px] font-bold leading-3">
					{{ workspaceData.title }}
				</h2>

				<span class="text-xs font-light">{{
					workspaceData.visibility.charAt(0).toUpperCase() +
					workspaceData.visibility.substring(1)
				}}</span>
			</div>

			<Button class="ml-auto hoverButton h-[32px] w-[32px] p-0 bg-transparent">
				<Icon
					name="mingcute:left-line"
					class="h-5 w-5 text-black fill-red-50"
				/>
			</Button>
		</div>

		<!--START SECTION-->

		<div class="mt-2">
			<!--BOARDS-->
			<Button class="workspaceSidemenuButton !bg-gray-300">
				<Icon
					name="mdi:trello"
					class="h-[16px] w-[16px] mr-2"
				/>
				Boards</Button
			>
			<!--MEMBERS-->
			<Button class="workspaceSidemenuButton">
				<Icon
					name="solar:user-linear"
					class="h-[16px] w-[16px] mr-2"
				/>
				Members
				<Button
					class="workspaceSidemenuButtonIcon"
					size="icon"
				>
					<Icon
						name="ic:outline-plus"
						class="w-[18px] h-[18px] text-gray-600 hover:!text-gray-600"
					/>
				</Button>
			</Button>
			<Button class="workspaceSidemenuButton">
				<LogoSettings class="h-[16px] w-[16px] mr-2" />
				Workspace settings
				<!--SETTINGS-->
				<Button
					class="workspaceSidemenuButtonIcon"
					size="icon"
				>
					<Icon
						name="tabler:chevron-down"
						class="w-[18px] h-[18px] text-gray-600 hover:!text-gray-600"
					/>
				</Button>
			</Button>
		</div>

		<!--WORKSPACE VIEWS-->
		<h1 class="font-bold text-[14px] ml-3 mt-3 mb-3">Workspace views</h1>

		<!--TABLE-->
		<Button class="group workspaceSidemenuButton">
			<LogoTable class="h-[16px] w-[16px] mr-2" />
			Table
			<Button
				class="workspaceSidemenuButtonIcon"
				size="icon"
			>
				<Icon
					name="tabler:dots"
					class="w-[18px] h-[18px] text-transparent group-hover:!text-gray-600"
				/>
			</Button>
		</Button>

		<!--CALENDAR-->
		<Button class="group workspaceSidemenuButton flex justify-between">
			<div class="flex">
				<LogoCalendar class="h-[16px] w-[16px] mr-2" />
				Calendar
			</div>
			<Button
				class="workspaceSidemenuButtonIcon"
				size="icon"
			>
				<Icon
					name="tabler:dots"
					class="w-[18px] h-[18px] text-transparent group-hover:!text-gray-600"
				/>
			</Button>
		</Button>

		<!--YOUR BOARD-->
		<div class="flex ml-3 mt-3 justify-between group">
			<h1 class="font-bold text-[14px] block h-full">Your board</h1>
			<div class="flex gap-1">
				<Button
					class="ml-auto mr-2 hoverButton bg-transparent h-[25px] w-[25px] opacityGray !rounded-sm"
					size="icon"
				>
					<Icon
						name="tabler:dots"
						class="w-[18px] h-[18px] text-transparent group-hover:!text-gray-600"
					/>
				</Button>
				<Button
					class="workspaceSidemenuButtonIcon"
					size="icon"
				>
					<Icon
						name="ic:outline-plus"
						class="w-[18px] h-[18px] text-gray-600 hover:!text-gray-600"
					/>
				</Button>
			</div>
		</div>

		<!--BOARD ITEMS-->
	</div>
</template>

<script lang="ts" setup>
	import { onBeforeMount, ref } from "vue";
	import { useRoute } from "vue-router";
	import type { Workspace } from "../../lib/types";
	import { getWorkspaceTypeColor } from "../../lib/utils";

	const myWorkspaceStore = useMyWorkspaceStore();

	const route = useRoute();
	const workspaceData = ref<Workspace>();

	onBeforeMount(async () => {
		workspaceData.value = await myWorkspaceStore.getWorkspace(
			route.params.wid as String
		);

		console.log(workspaceData.value);
	});
</script>
