<template>
  <div class="homeCarouselItem h-60 w-72 overflow-hidden text-left relative my-5" style="border-radius: 1em;">

    <div class="text-left block h-12" :class="headerClass">
    </div>

    <div class="bg-white left-4 w-12 absolute top-5 rounded-md flex justify-center items-center">
      <Icon :name="props.icon" class="h-8 w-8" />
    </div>

    <div class="pt-8 py-11">
      <h1 class="font-lg font-bold pb-4">{{ props.title }}</h1>
      <p>{{ props.body }}</p>
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
</script>
