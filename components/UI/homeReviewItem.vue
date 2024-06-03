<template>
  <div
    class="flex flex-col justify-between bg-white text-left md:h-full md:flex-row"
  >
    <div
      class="m-0 flex h-full flex-col bg-download bg-no-repeat p-6 md:w-[60%] md:px-[2rem] md:py-[2.5rem]"
    >
      <div class="m-0 text-2xl font-medium leading-loose">
        {{ reviewBody }}
      </div>
      <div
        class="mt-auto pt-[1rem] before:mb-[1rem] before:block before:h-[1px] before:max-w-[9rem] before:bg-black md:pt-[3.25rem]"
      >
        <p class="font-medium">{{ reviewFooter.name }}</p>
        <p class="font-medium">{{ reviewFooter.position }}</p>
        <div class="block w-full justify-between md:inline-flex">
          <NuxtImg
            :src="reviewFooter.logo"
            sizes="1000px"
            class="my-3 h-[2.45em] w-auto"
          />
          <nuxtLink
            to="/"
            class="content-center font-medium text-blue-700 underline"
            >Read the story
          </nuxtLink>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col bg-gradient-to-bl from-surveyPink to-surveyPurple p-2 px-[2rem] py-[2.5rem] md:w-[40%]"
    >
      <h1 class="customTitle mb-auto h-full text-white">{{ surveyBody }}</h1>
      <nuxtLink to="/" class="pb-4 text-neutral-300 underline"
        >{{ surveyFooter }}
      </nuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface HomeReviewItemProps {
  reviewBody: string;
  reviewFooter: { name: string; position: string; logo: string };
  surveyBody: string;
  surveyFooter: string;
}

const props = defineProps<HomeReviewItemProps>();
</script>
