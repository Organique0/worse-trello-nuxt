<template>
  <div>
    <div class="bg-gradient-to-r from-purple-800 to-pink-500 md:h-[90vh-80px] w-full h-full pt-12">
      <div class="mx-auto md:pl-[1rem] md:pr-[1rem] max-w-[1140px] px-[5rem]">
        <div class="items-center justify-start flex flex-wrap ">

          <div class="lg:pt-32 text-white md:flex-1">
            <h1 class="customHeader">Trello brings all
              your tasks,
              teammates, and tools together
            </h1>
            <h3 class="lg:my-12 md:my-8 font-semibold lg:text-2xl md:text-xl">Keep everything in the same
              place—even if
              your team isn’t.
            </h3>
            <UISignUpInput />
          </div>

          <div class="p-4 relative block md:flex-1 text-center pt-16 md:pt-32 mb-0 pb-0 mt-0">
            <NuxtImg format="webp" src="/TrelloUICollage_4x.webp" sizes="1000px" />
          </div>

        </div>
      </div>
    </div>
    <div class="bg-gradient-to-b from-white to-blue-200 h-[1000px] mx-auto px-[5rem] w-full">

      <div class="mt-[3rem]">
        <div class="relative text-left order-1 md:w-[58%] w-full block">
          <h3 class="">TRELLO 101</h3>
          <h1 class="customTitle my-8">A productivity powerhouse</h1>
          <p>
            Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing
            what and what needs to get done.
          </p>
        </div>
      </div>


      <div class="inline-flex w-full mt-12">
        <div class="flex flex-col gap-4 justify-between w-[30%]">
          <button class="homeTabButton">Boards</button>
          <button class="homeTabButton">Lists</button>
          <button class="homeTabButton">Cards</button>
        </div>
        <div class="block md:w-[70%] h-72 md:ml-24 w-full">
          <NuxtImg src="/TrelloUICollage_4x.webp" />
        </div>
      </div>
    </div>
    <div class="px-[5rem]">
      <div class="relative text-left order-1 md:w-[58%] w-full block  pt-12">
        <h3 class="">TRELLO IN ACTION</h3>
        <h1 class="customTitle my-8">Workflows for any project, big or small</h1>
        <p>
          Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s doing
          what and what needs to get done.
        </p>
      </div>
      <div>
        <div class="flex justify-end mt-4">
          <button @click="goBackward" class="px-4 py-2 bg-gray-200 text-gray-800  hover:bg-gray-300 rounded-full">
            <Icon name="material-symbols:arrow-back-ios-rounded" />
          </button>
          <button @click="goForward" class="px-4 py-2 bg-gray-200 text-gray-800  hover:bg-gray-300 rounded-full">
            <Icon name="material-symbols:arrow-forward-ios-rounded" />
          </button>
        </div>
      </div>
      <UCarousel ref="carouselRef" :items="items" :ui="{ item: 'basis-1/4', container: 'gap-[2.5em]' }"
        class="overflow-hidden">

        <template #default="{ item }">
          <!-- Render carousel items here -->
          <component :is="item.component" :title="item.title" :body="item.body" :color="item.color" :icon="item.icon" />
        </template>

      </UCarousel>
      <div>
        <p>
          No need to start from scratch. Jump-start your workflow with a proven playbook designed for different teams.
          Customize it to make it yours.
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup lang="jsx">
  import homeCarouselItem from "@/components/UI/homeCarouselItem.vue"; // Adjust the path as needed

  const items = [
    {
      component: homeCarouselItem,
      title: 'Project management',
      body: 'Keep tasks in order, deadlines on track, and team members aligned with Trello.',
      icon: 'uil:twitter',
      color: 'blue'
    },
    {
      component: homeCarouselItem,
      title: 'Meetings',
      body: 'Empower your team meetings to be more productive, empowering, and dare we say—fun.',
      icon: 'mdi:calendar',
      color: 'green'
    },
    {
      component: homeCarouselItem,
      title: 'Onboarding',
      body: 'Onboarding to a new company or project is a snap with Trello’s visual layout of to-do’s, resources, and progress tracking.',
      icon: 'mdi:account-multiple',
      color: 'purple'
    },
    {
      component: homeCarouselItem,
      title: 'Task management',
      body: 'Use Trello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team’s projects a cohesive success every time.',
      icon: 'mdi:briefcase-outline',
      color: 'yellow'
    },
    {
      component: homeCarouselItem,
      title: 'Brainstorming',
      body: 'Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.',
      icon: 'mdi:lightbulb-on-outline',
      color: 'orange'
    },
    {
      component: homeCarouselItem,
      title: 'Resource hub',
      body: 'Save time with a well-designed hub that helps teams find information easily and quickly.',
      icon: 'mdi:database',
      color: 'teal'
    }
  ];
  const carouselRef = ref(null);

  const goBackward = () => {
    if (carouselRef.value) {
      carouselRef.value.prev();
    }
  };

  const goForward = () => {
    if (carouselRef.value) {
      carouselRef.value.next();
    }
  };
</script>