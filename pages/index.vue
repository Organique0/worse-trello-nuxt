<template>
  <div>
    <div class="bg-gradient-to-r from-purple-800 to-pink-500 w-full h-[53em] pt-16 relative">
      <div class="bg-cover bg-center bg-whiteCurves absolute bottom-[-17px] w-full h-[25%]"></div>
      <div class="mx-auto md:pl-[1rem] md:pr-[1rem] max-w-[1140px] px-[1rem]">
        <div class="items-center justify-center flex flex-wrap ">

          <div class="lg:pt-32 text-white md:flex-1 pt-24">
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

          <div class="sm:ml-11 relative block md:flex-1 text-center pt-8 md:pt-32 mb-0 pb-0 mt-0">
            <NuxtImg format="webp" src="/TrelloUICollage_4x.webp" sizes="2100px" />
          </div>

        </div>
      </div>
    </div>
    <!--PRODUCTIVITY POWERHOUSE-->
    <Trello101 />


    <!--TRELLO IN ACTION-->
    <div class="">
      <div class="homeCenterContainer">
        <div class="relative text-left order-1 w-full block pt-12">
          <h3 class="">TRELLO IN ACTION</h3>
          <h1 class="customTitle mt-2 mb-4">Workflows for any project, big or small</h1>
        </div>
      </div>


      <!---carousel new-->
      <div class="hidden lg:flex justify-end homeCenterContainer">
        <div @click="goBackwardNew" class="bg-gray-200 text-gray-800  hover:bg-gray-300 rounded-full mr-7 w-9 h-9">
          <Icon name="material-symbols:arrow-back-ios-rounded" size="20px" class="translate-x-3 translate-y-1" />
        </div>
        <div @click="goForwardNew" class="bg-gray-200 text-gray-800  hover:bg-gray-300 rounded-full w-9 h-9">
          <Icon name="material-symbols:arrow-forward-ios-rounded" size="20px" class="translate-x-2 translate-y-1" />
        </div>
      </div>


      <div class="w-full overflow-hidden hidden lg:block" @dragend="endDrag($event)" @dragstart="startDrag($event)"
        @drag="logDrag($event)" draggable="true">
        <div class="md:mb-8 homeCenterContainer transition-all ease-out duration-700" :style="mxValue"
          :class="isTransition && 'transition-none'">
          <div class="flex relative gap-[2em]">
            <component v-for="item in items" :is="item.component" :title="item.title" :body="item.body"
              :color="item.color" :icon="item.icon" class="w-[calc(33%-1em)] flex-shrink-0" />
          </div>
        </div>
      </div>

      <!--invisible image to display when dragging-->
      <img ref="imageRef" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        alt="Example Image">


      <!--carousel mobile-->
      <div class="w-full overflow-auto lg:hidden">
        <div class="homeCenterContainer lg:mb-8">
          <UCarousel :items="items" :ui="{
            item: 'basis-[80%]  h-[16em]',
            container: 'gap-x-[2em] ',
            indicators: {
              wrapper: 'gap-0 bg-gray-100 relative bottom-0 rounded-full lg:hidden mt-4',
            }
          }" class="" indicators>
            <template #default="{ item }">
              <!-- Render carousel items here -->
              <component :is="item.component" :title="item.title" :body="item.body" :color="item.color"
                :icon="item.icon" />
            </template>

            <template #indicator="{ onClick, page, active }">
              <UButton :variant="active && 'solid'" class="rounded-full justify-center w-1/6 h-5" @click="onClick(page)"
                :class="active && '!bg-gray-500'" disabled />
            </template>

          </UCarousel>
        </div>
      </div>


      <!--EXPLORE ALL USE CASES-->
      <div class="homeCenterContainer pt-11">
        <div class="block sm:flex">
          <p class="w-full leading-loose font-medium text-lg sm:w-[70%] sm:mr-auto">
            No need to start from scratch. Jump-start your workflow with a proven playbook designed for different teams.
            Customize it to make it yours.
          </p>
          <div class="relative pb-16 pt-6">
            <UButton variant="outline" color="gray" size="md" class="p-[1em] ring-blue-700">
              Explore all Use Cases
            </UButton>
          </div>
        </div>
      </div>

    </div>

    <!--See work in a whole new way-->
    <div class="bg-gradient-to-l from-cyan-500 to-blue-500 h-[85em] relative md:h-[62em]">
      <div class="absolute left-16 w-1/6 h-full bg-cover bg-center bg-viewsBgLeft"></div>
      <div class="absolute right-16 w-1/6 h-full bg-cover bg-center bg-viewsBgRight"></div>
      <div class="homeCenterContainer">

        <!--HEADER-->
        <div class="text-center pt-14 text-white">
          <h1 class="text-2xl md:text-4xl font-bold">See work in a whole new way</h1>
          <p class="py-4 md:text-xl font-medium m-auto md:w-[60%] text-lg">
            View your team’s projects from every angle and bring a fresh perspective to the task at hand.
          </p>
          <UButton color="white" variant="solid" size="md" class="p-[1em] ring-blue-700 mt-4">
            Discover all Trello views
          </UButton>
        </div>

        <!--VERTICAL CARD CALENDAR-->
        <div class="verticalCardsHome">
          <NuxtImg src="TrelloBoard_Timeline.webp" sizes="606px" />

          <div class="md:px-11 mt-8 md:mt-0">
            <div class="verticalCardsHomeSidetextTitle">
              <LogosCalloutIcon class="hidden md:block" />
              <h3>HIT DEADLINES EVERY TIME</h3>
            </div>
            <div class="verticalCardsHomeSidetextBody">
              From weekly sprints to annual planning, Timeline view keeps all tasks on track. Quickly get a glimpse of
              what’s coming down the pipeline and identify any gaps that might impede your team’s progress.
            </div>
            <NuxtLink to="/" class="learnMoreLink">Learn more</NuxtLink>
          </div>
        </div>

        <!--VERTICAL CARD TIMELINE-->
        <div class="verticalCardsHome">
          <NuxtImg src="TrelloBoard_Calendar.webp" sizes="606px" class="md:order-2" />
          <div class="md:px-14 mt-8 md:mt-0">
            <div class="verticalCardsHomeSidetextTitle">
              <div class="hidden md:block">
                <Icon name="bx:calendar" class="w-[2rem] h-auto" color="rgb(0, 199, 229)" />
              </div>
              <h3>STAY ON TOP OF TASKS</h3>
            </div>
            <div class="verticalCardsHomeSidetextBody">
              Start each day without any surprises. Whether scheduling an editorial calendar or staying on top of
              to-dos, Calendar view is like a crystal ball giving you a clear vision of what work lies ahead.
            </div>
            <NuxtLink to="/" class="learnMoreLink">Learn more</NuxtLink>
          </div>

        </div>

      </div>
    </div>

    <div class="bg-transparent h-36 z-0" />

    <div class="homeCenterContainer">
      <!--DO MORE INTRO-->
      <div class="homeSectionIntro mb-8">
        <h3>POWERFUL WAYS TO GROW</h3>
        <h1 class="customTitle my-2">Do more with Trello</h1>
        <p class="leading-loose">
          Trello’s intuitive features give any team the ability to quickly set up and customize workflows for just about
          anything.
        </p>
      </div>

      <!--DO MORE 3 CARDS-->
      <div class="md:grid md:grid-cols-3 md:gap-11 rounded-lg block">

        <div class="doMoreCard">
          <NuxtImg src="Integrations_Puzzle.svg" sizes="100px" />
          <div>
            <h2>Intregrations</h2>
            <p>
              Connect the apps your team already uses into your Trello workflow or add a Power-Up to fine-tune your
              specific needs.
            </p>
            <UButton color="white" variant="solid" size="md" class="p-[1em] ring-blue-700 mt-4">
              Browse Intregrations
            </UButton>
          </div>
        </div>

        <div class="doMoreCard">
          <NuxtImg src="Gears.svg" sizes="100px" />
          <div>
            <h2>Butler Automation</h2>
            <p>
              No-code automation is built into every Trello board. Focus on the work that matters most and let the
              robots do the rest.
            </p>
            <UButton color="white" variant="solid" size="md" class="p-[1em] ring-blue-700 mt-4">
              Get to know Automation
            </UButton>
          </div>
        </div>

        <div class="doMoreCard">
          <NuxtImg src="Search_Value.svg" sizes="100px" />
          <div>
            <h2>Trello Enterprise</h2>
            <p>
              The productivity tool teams love, paired with the features and security needed for scale.
            </p>
            <UButton color="white" variant="solid" size="md" class="p-[1em] ring-blue-700">
              Explore Enterprise
            </UButton>
          </div>
        </div>

      </div>
    </div>

    <div class="h-[3em]" />

    <Testamonials />


    <div class="bg-gradient-to-t from-white to-wierdGreen h-auto">
      <!--Price-->
      <div class="homeCenterContainer">
        <div class="pt-16 flex flex-col items-center gap-y-3">
          <h1 class="customTitle">Trello priced your way</h1>
          <h3 class="md:text-xl font-medium text-wierdBlue text-lg leading-8 text-center">Trusted by millions, Trello
            powers
            teams
            all
            around
            the
            world.</h3>
          <UButton color="blue" size="xl" class="p-4">Compare plans</UButton>
        </div>
        <UIPriceCompare />
      </div>
    </div>

    <div class="homeCenterContainer ">
      <div class="ml-[8%] w-[83%] my-14">
        <h3 class="text-center font-medium text-2xl leading-8  my-8">Join over 2,000,000 teams worldwide that are using
          Trello
          to
          get
          more
          done.
        </h3>
        <NuxtImg src="logos-horizontal-visa-coinbase-john-deere-zoom-grand-hyatt-fender.svg"
          class="w-full hidden md:block" />
        <NuxtImg src="logos-3x3-visa-coinbase-john-deere-zoom-grand-hyatt-fender.svg" class="w-full md:hidden" />
      </div>
    </div>

    <!--PAGE END-->
    <Footer />
  </div>
</template>
<script setup lang="jsx">
  import homeCarouselItem from "@/components/UI/homeCarouselItem";

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

  //const carouselMarginLeft = ref("!ml-[calc(-1140px+(100%+1140px)/2)]");

  const mxValue = ref(`margin-left: calc(-1140px + (100% + 1140px) / 2) !important;`)

  const goBackwardNew = () => {
    if (mxValue.value != null) {
      mxValue.value = `margin-left: calc(-1140px + (100% + 1140px) / 2) !important;`;
    }
  };

  const goForwardNew = () => {
    if (mxValue.value != null) {
      mxValue.value = `margin-left: calc(50% - 1780px) !important`;
    }
  };

  const mx = ref(2550);
  const vrednost = ref(0);
  const startX = ref(0);
  const imageRef = ref(null);
  const isTransition = ref(null);


  const endDrag = (e) => {
    mx.value = vrednost.value;
    isTransition.value = false;
  }

  const startDrag = (e) => {
    e.dataTransfer.setDragImage(imageRef.value, 0, 0);
    isTransition.value = true;
    startX.value = e.offsetX;
  }

  const logDrag = (e) => {
    if (e.screenX !== 0) {
      const delta = (e.clientX - startX.value) * 2;
      const newValue = mx.value + delta;

      // Restricting movement to the left beyond the initial value
      if (newValue < 170) {
        vrednost.value = 170;
      }
      // Restricting movement to the right beyond the initial value
      else if (newValue > 2550) {
        vrednost.value = 2550; // Set the maximum allowed value
      } else {
        vrednost.value = newValue; // Allow movement within the limits
      }

      requestAnimationFrame(() => {
        mxValue.value = `margin-left: calc(-1140px + (100% - 1440px + ${vrednost.value}px) / 2) !important;`;
      });
    }
  }
  //carouselMarginLeft.value = '!ml-[calc(-1140px+(100%-' + e.screenX + 'px)/2)]';
</script>