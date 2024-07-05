<template>
	<div
		class="w-full p-3 flex justify-between backdrop-brightness-75"
		:style="[dynamicBg, dynamicText]"
		v-if="boardData"
	>
		<div class="flex gap-2">
			<!--TITLE BUTTON-->
			<Button
				class="text-xl"
				variant="boardHeader"
				>{{ boardData.title }}</Button
			>

			<!--STAR BUTTON-->
			<Button
				class="w-[32px] text-inherit"
				size="icon"
				variant="boardHeader"
			>
				<LogoFavorite
					:class="
						boardData.is_favorited
							? 'fill-current  stroke-current  stroke-2 hover:fill-none'
							: 'fill-transparent stroke-current stroke-2 transition-transform duration-100'
					"
				/>
			</Button>

			<!--VISIBILITY POPOVER-->
			<PopoverRoot>
				<PopoverTrigger
					as-child
					class=""
				>
					<Button variant="boardHeader">
						<Icon
							name="LogoMembers"
							class="w-[15px] h-[15px]"
						/>
						Workspace visible
					</Button>
				</PopoverTrigger>
				<PopoverPortal>
					<PopoverContent>
						<div>Change visibility</div>
					</PopoverContent>
				</PopoverPortal>
			</PopoverRoot>

			<!--VIEWS POPOVER-->
			<Button
				class="flex gap-2 bg-inherit text-inherit hover:brightness-110"
				variant="boardHeader"
			>
				<LogoBoardIcon class="w-[15px] h-[15px] stroke-currrent" />
				Board
				<Icon
					name="tabler:chevron-down"
					class="w-[15px] h-[15px]"
				/>
			</Button>
		</div>

		<!--RIGHT BUTTONS-->
		<div class="flex gap-2">
			<Button variant="boardHeader">
				<Icon
					name="ion:rocket-outline"
					class="h-[15px]"
				/>
				Power-Ups
			</Button>
			<Button variant="boardHeader">
				<Icon
					name="clarity:bolt-solid"
					class="h-[15px]"
				/>
				Automation
			</Button>
			<Button variant="boardHeader">
				<Icon
					name="ion:filter-outline"
					class="h-[15px] w-[15px]"
				/>
				Filters
			</Button>

			<Separator
				orientation="vertical"
				class="h-[15px] my-auto"
			/>

			<!--USER POPOVER-->
			<PopoverRoot>
				<PopoverTrigger
					class="relative block h-8 w-8 rounded-full border-none bg-orange-400 hover:brightness-110 font-semibold text-white"
				>
					{{
						user?.first_name[0].toUpperCase() +
						"" +
						user?.last_name[0].toUpperCase()
					}}
				</PopoverTrigger>
				<PopoverPortal>
					<PopoverContent
						side="bottom"
						class="rounded-md w-[304px] bg-white overflow-hidden"
					>
						<div
							class="bg-gradient-to-b from-blue-600 to-blue-600 bg-no-repeat flex pt-6 pb-2 pr-3 pl-[14px]"
							style="background-size: 100% 82px"
						>
							<div
								class="min-w-[88px] min-h-[88px] bg-orange-400 rounded-full border-2 border-white"
							>
								<span
									class="text-3xl text-white font-semibold absolute translate-x-[70%] translate-y-[60%]"
									>{{
										user?.first_name[0].toUpperCase() +
										"" +
										user?.last_name[0].toUpperCase()
									}}</span
								>
							</div>
							<div class="flex-1 mt-2 ml-2">
								<div class="font-bold text-white">{{ user?.username }}</div>
								<div class="font-light text-white text-xs pl-[1px]">
									{{ user?.username }}
								</div>
							</div>
						</div>
						<div class="px-4 py-2">
							<ul>
								<li class="boardProfileListItem">Edit profile info</li>
							</ul>
							<Separator class="my-2" />
							<ul>
								<li class="boardProfileListItem">
									View members board activity
								</li>
							</ul>
						</div>
						<PopoverClose
							class="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center absolute top-[5px] right-[5px] outline-none cursor-pointer"
							aria-label="Close"
						>
							<Icon
								name="radix-icons:cross-2"
								class="text-white hover:brightness-75"
							/>
						</PopoverClose>
					</PopoverContent>
				</PopoverPortal>
			</PopoverRoot>

			<!--SHARE BUTTON-->
			<Button
				class="flex gap-2 bg-gray-200 text-black hover:brightness-110"
				variant="boardHeader"
			>
				<Icon
					name="hugeicons:user-add-01"
					class="h-[15px] w-[15px]"
				/>
				Share
			</Button>

			<!--MORE BUTTON-->
			<Button
				class="boardHeaderButton w-[32px]"
				variant="boardHeader"
				size="icon"
			>
				<Icon
					name="tabler:dots"
					class="h-[24px] w-[24px]"
				/>
			</Button>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import type { PropType } from "vue";
	import type { FullBoard } from "~/lib/types";
	import {
		PopoverClose,
		PopoverContent,
		PopoverPortal,
		PopoverRoot,
		PopoverTrigger,
	} from "radix-vue";
	const { user } = useMyUserStore();
	const { dynamicBg, dynamicText } = useDynamicBg("55");
	const props = defineProps({
		boardData: {
			type: Object as PropType<FullBoard | null>,
			required: true,
		},
	});
</script>
