<script setup lang="ts">
	import { type HTMLAttributes, computed } from "vue";
	import {
		SelectItem,
		SelectItemIndicator,
		type SelectItemProps,
		SelectItemText,
		useForwardProps,
	} from "radix-vue";
	import { Check } from "lucide-vue-next";
	import { cn } from "@/lib/utils";

	const props = defineProps<
		SelectItemProps & { class?: HTMLAttributes["class"] }
	>();

	const delegatedProps = computed(() => {
		const { class: _, ...delegated } = props;

		return delegated;
	});

	const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<SelectItem
		v-bind="forwardedProps"
		:class="
			cn(
				'relative flex w-full cursor-default select-none items-center rounded-none py-3 pl-8 pr-2 text-sm outline-none hover:bg-accent dark:hover:bg-gray-600/40 hover:shadow-blueLeft data-[disabled]:pointer-events-none data-[state=checked]:bg-blue-100/40 data-[state=checked]:text-blue-500 focus:data-[state=checked]:bg-blue-100/90 dark:focus:data-[state=checked]:bg-blue-900/70 dark:data-[state=checked]:bg-blue-950/70 data-[state=checked]:shadow-blueLeft data-[disabled]:opacity-50',
				props.class
			)
		"
	>
		<SelectItemText>
			<slot />
		</SelectItemText>
	</SelectItem>
</template>
