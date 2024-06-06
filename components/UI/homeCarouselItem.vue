<template>
  <div
    class="homeCarouselItem relative my-4 ml-1 overflow-hidden text-left"
    style="border-radius: 1em"
  >
    <div class="block h-12 text-left" :class="headerClass"/>

    <div
      class="absolute left-4 top-5 flex w-12 items-center justify-center rounded-md bg-white"
    >
      <Icon :name="props.icon" class="h-10 w-10" :class="iconClass" />
    </div>

    <div class="select-none px-4 pt-6">
      <h1 class="pb-2 text-lg font-bold">{{ props.title }}</h1>
      <p class="leading-7">{{ props.body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const headerClass = computed(() => "bg-" + props.color + "-400");
const iconClass = computed(() => "text-" + props.color + "-400");
</script>
