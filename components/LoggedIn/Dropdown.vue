<template>
  <UDropdown :items="props.items" :ui="{ item: { base: 'block' }, container: 'w-72' }"
    :popper="{ placement: 'bottom-start' }" class="px-2">
    <UButton :ui="{ rounded: 'rounded-sm' }" class="bg-primary ring-0">
      {{ props.title }}
    </UButton>

    <template #item="{ item }">
      <div class="inline-flex w-full">
        <iconify-icon :icon="item.icon" class="flex-shrink-0 h-4 w-4" />
        <p class="font-semibold ml-1">{{ item.label }}</p>
      </div>
      <div class="text-left">
        <p>{{ item.body }}</p>
      </div>
    </template>

  </UDropdown>
</template>

<script lang="ts" setup>
  export interface CreateItem {
    label: string;
    icon: string;
    body: string;
  };

  const props = defineProps<{
    items: CreateItem[][],
    title: String
  }>()
</script>