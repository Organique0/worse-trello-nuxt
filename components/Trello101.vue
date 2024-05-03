<template>
  <div class="bg-gradient-to-b from-white to-[#b2deff] h-[800px] mx-auto px-[5rem] w-full">
    <div class="homeCenterContainer">
      <div class="mt-[3rem]">
        <div class="homeSectionIntro">
          <h3 class="">TRELLO 101</h3>
          <h1 class="customTitle my-8">A productivity powerhouse</h1>
          <p class="text-wierdBlue text-lg leading-9 font-medium">
            Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s
            doing
            what and what needs to get done.
          </p>
        </div>
        <!-- RIGHT SLIDING GALLERY -->
        <div class="inline-flex w-full mt-12">

          <div class="flex flex-col gap-4 justify-between w-[40%]">
            <button class="homeTabButton" :class="{ 'homeTabButtonActive': item === 0 }" @click="navigateToItem(0)">
              <div>
                <h3>Boards</h3>
                <p>Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things
                  to do” to “aww yeah, we did it!”</p>
              </div>
            </button>
            <button class="homeTabButton" :class="{ 'homeTabButtonActive': item === 1 }" @click="navigateToItem(1)">
              <div>
                <h3>Lists</h3>
                <p>The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom
                  fit to your team’s needs. There’s no wrong way to Trello.</p>
              </div>
            </button>
            <button class="homeTabButton" :class="{ 'homeTabButtonActive': item === 2 }" @click="navigateToItem(2)">
              <div>
                <h3>Cards</h3>
                <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make
                  progress, move cards across lists to show their status.</p>
              </div>
            </button>
          </div>

          <div class="block md:w-[70%] h-72 md:ml-12 w-full">
            <carousel ref="myCarousel" @slide-start="handleSlideStart">
              <slide v-for="(slide, index) in slides" :key="index">
                <NuxtImg :src="slide" />
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const myCarousel = ref(null);
  const item = ref(0);

  const slides = [
    '/Carousel_Image_Boards.webp',
    '/Carousel_Image_Lists.webp',
    '/Carousel_Image_Cards.webp',
  ]

  function navigateToItem(index) {
    myCarousel.value.slideTo(index);
    updateActiveItem(index);
  }

  function updateActiveItem(index) {
    item.value = index;
  }

  function handleSlideStart(data) {
    updateActiveItem(data.slidingToIndex);
  }
</script>

<style scoped></style>
