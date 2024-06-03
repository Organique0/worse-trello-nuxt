<template>
  <div class="homeCenterContainer block w-full" :id="id">
    <div
      class="mx-auto w-full md:flex md:w-full md:items-center md:justify-center md:gap-6"
    >
      <UInput
        size="xl"
        class="hidden w-64 text-center md:block lg:w-[70%]"
        placeholder="Email"
      />
      <UButton
        size="xl"
        class="mt-5 w-full justify-center md:mt-0 md:w-44 lg:w-[10rem]"
        color="primary"
        >Sign up - it's free
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const id = useId();
</script>
