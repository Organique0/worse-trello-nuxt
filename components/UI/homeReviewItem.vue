<template>
  <div class="flex md:flex-row flex-col md:h-full justify-between text-left bg-white">

    <div class="flex flex-col h-full m-0 p-6 md:py-[2.5rem] md:px-[2rem] md:w-[60%] bg-download bg-no-repeat">
      <div class="m-0 text-2xl leading-loose font-medium">
        {{ reviewBody }}
      </div>
      <div class="
      before:block 
      before:h-[1px] 
      before:mb-[1rem] 
      before:max-w-[9rem] 
      before:bg-black
      md:pt-[3.25rem]
      pt-[1rem]
      mt-auto
      ">
        <p class="font-medium">{{ reviewFooter.name }}</p>
        <p class="font-medium">{{ reviewFooter.position }}</p>
        <div class="block md:inline-flex justify-between w-full">
          <NuxtImg :src="reviewFooter.logo" sizes="1000px" class="h-[2.45em] w-auto my-3" />
          <nuxtLink to="/" class="underline text-blue-700 font-medium content-center">Read the story
          </nuxtLink>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-bl from-surveyPink to-surveyPurple md:w-[40%] px-[2rem] py-[2.5rem] p-2 flex flex-col">
      <h1 class="customTitle text-white mb-auto h-full">{{ surveyBody }}</h1>
      <nuxtLink to="/" class="underline text-neutral-300 pb-4">{{ surveyFooter }}
      </nuxtLink>
    </div>

  </div>

</template>

<script setup lang="ts">
  interface HomeReviewItemProps {
    reviewBody: string;
    reviewFooter: { name: string, position: string, logo: string };
    surveyBody: string;
    surveyFooter: string;
  }

  const props = defineProps<HomeReviewItemProps>();
</script>