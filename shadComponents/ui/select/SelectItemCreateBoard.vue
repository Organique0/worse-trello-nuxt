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
        'data-[state=checked]:text-primary- relative flex w-full cursor-default select-none items-center rounded-sm !py-1.5 !pl-8 !pr-2 text-sm outline-none focus:bg-accent focus:bg-blue-400 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[state=checked]:bg-lightBlueBg data-[state=checked]:text-blue-500 data-[disabled]:opacity-50 dark:data-[state=checked]:bg-darkBlueBg',
        props.class,
      )
    "
  >
    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
