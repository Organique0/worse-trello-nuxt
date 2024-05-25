<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import {
	DropdownMenuItemIndicator,
	DropdownMenuRadioItem,
	type DropdownMenuRadioItemEmits,
	type DropdownMenuRadioItemProps,
	useForwardPropsEmits,
} from "radix-vue";
import { Circle } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<
	DropdownMenuRadioItemProps & { class?: HTMLAttributes["class"] }
>();

const emits = defineEmits<DropdownMenuRadioItemEmits>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<DropdownMenuRadioItem
		v-bind="forwarded"
		:class="
			cn(
				'relative flex cursor-default select-none items-center py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 h-[33%]  rounded-none font-medium hover:shadow-blueLeft hover:bg-gray-300 data-[state=checked]:bg-lightBlueBg data-[state=checked]:shadow-blueLeft dark:data-[state=checked]:bg-darkBlueBg',
				props.class
			)
		"
	>
		<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<DropdownMenuItemIndicator
				class="border border-green-700 rounded-full dark:border-white"
			>
				<Circle
					class="h-3 w-3 fill-green-700"
					color="transparent"
				/>
			</DropdownMenuItemIndicator>
		</span>
		<slot />
	</DropdownMenuRadioItem>
</template>
