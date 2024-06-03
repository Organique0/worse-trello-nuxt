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
        'relative flex h-[33%] cursor-default select-none items-center rounded-none py-1.5 pl-8 pr-2 text-sm font-medium outline-none transition-colors hover:bg-gray-300 hover:shadow-blueLeft focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[state=checked]:bg-lightBlueBg data-[state=checked]:text-accent-foreground data-[disabled]:opacity-50 data-[state=checked]:shadow-blueLeft dark:focus:bg-gray-600 dark:data-[state=checked]:bg-darkBlueBg',
        props.class,
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator
        class="rounded-full border border-green-700 dark:border-white"
      >
        <Circle class="h-3 w-3 fill-green-700" color="transparent" />
      </DropdownMenuItemIndicator>
    </span>
    <slot />
  </DropdownMenuRadioItem>
</template>
