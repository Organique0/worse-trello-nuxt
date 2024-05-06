<template>
  <div class="
  homeCarouselItem
  overflow-hidden 
  text-left 
  relative 
  my-4 
  ml-1
  " style="border-radius: 1em;">

    <div class="text-left block h-12" :class="headerClass">
    </div>

    <div class="bg-white left-4 w-12 absolute top-5 rounded-md flex justify-center items-center">
      <Icon :name="props.icon" class="h-10 w-10" :class="iconClass" />
    </div>

    <div class="pt-6 px-4">
      <h1 class="font-bold pb-2 text-lg">{{ props.title }}</h1>
      <p class="leading-7">{{ props.body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  });

  const headerClass = computed(() => "bg-" + props.color + "-400");
  const iconClass = computed(() => "text-" + props.color + "-400");
</script>
