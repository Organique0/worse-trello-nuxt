<template>
  <div>
    <div class="bg-gradient-to-r from-purple-800 to-pink-500 w-full h-full pt-12">
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

          <div class="ml-11 relative block md:flex-1 text-center pt-16 md:pt-32 mb-0 pb-0 mt-0">
            <NuxtImg format="webp" src="/TrelloUICollage_4x.webp" sizes="2100px" />
          </div>

        </div>
      </div>
    </div>
    <!--PRODUCTIVITY POWERHOUSE-->
    <div class="bg-gradient-to-b from-white to-blue-200 h-[900px] mx-auto px-[5rem] w-full">
      <div class="homeCenterContainer">
        <!--LEFT CARDS-->
        <div class=" mt-[3rem] ">
          <div class="homeSectionIntro">
            <h3 class="">TRELLO 101</h3>
            <h1 class="customTitle my-8">A productivity powerhouse</h1>
            <p>
              Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who’s
              doing
              what and what needs to get done.
            </p>
          </div>

          <!--RIGHT SLIDING GALLERY-->
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
      </div>
    </div>


    <!--TRELLO IN ACTION-->
    <div class="">
      <div class="homeCenterContainer">
        <div class="relative text-left order-1 w-full block  pt-12">
          <h3 class="">TRELLO IN ACTION</h3>
          <h1 class="customTitle mt-5">Workflows for any project, big or small</h1>
        </div>
      </div>

      <!--SLIDER BUTTONS-->
      <div class="flex justify-end homeCenterContainer">
        <div @click="goBackward" class="bg-gray-200 text-gray-800  hover:bg-gray-300 rounded-full mr-7 w-9 h-9">
          <Icon name="material-symbols:arrow-back-ios-rounded" size="20px" class="translate-x-3 translate-y-1" />
        </div>
        <div @click="goForward" class="bg-gray-200 text-gray-800  hover:bg-gray-300 rounded-full w-9 h-9">
          <Icon name="material-symbols:arrow-forward-ios-rounded" size="20px" class="translate-x-2 translate-y-1" />
        </div>
      </div>

      <!--CAROUSEL-->
      <div class="w-full overflow-hidden">
        <div class="homeCenterContainer md:mb-8">
          <UCarousel ref="carouselRef" :items="items" :ui="{ item: 'basis-1/4', container: 'gap-x-[2em]' }" class="">
            <template #default="{ item }">
              <!-- Render carousel items here -->
              <component :is="item.component" :title="item.title" :body="item.body" :color="item.color"
                :icon="item.icon" />
            </template>
          </UCarousel>
        </div>
      </div>

      <!--EXPLORE ALL USE CASES-->
      <div class="homeCenterContainer mb-16 block md:flex md:flex-wrap md:justify-items-center md:items-stretch">
        <p class="md:w-[60%] w-full font-medium leading-relaxed mb-6 md:mb-0 md:mr-auto">
          No need to start from scratch. Jump-start your workflow with a proven playbook designed for different teams.
          Customize it to make it yours.
        </p>
        <UButton variant="outline" color="gray" size="md" class="p-[1em] ring-blue-700">
          Explore all Use Cases
        </UButton>
      </div>
    </div>

    <div class="bg-gradient-to-l from-cyan-400 to-blue-400 h-[85em] md:h-[60em]">
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

    <div class="bg-transparent h-44 z-0" />

    <div class="homeCenterContainer">
      <!--DO MORE INTRO-->
      <div class="homeSectionIntro mb-8">
        <h3>POWERFUL WAYS TO GROW</h3>
        <h1 class="customTitle my-4">Do more with Trello</h1>
        <p>
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

    <!--SLIDER BUTTONS-->
    <div class="flex justify-end homeCenterContainer">
      <div @click="goBackwardReview" class="bg-gray-200 text-gray-800  hover:bg-gray-300 rounded-full mr-7 w-9 h-9">
        <Icon name="material-symbols:arrow-back-ios-rounded" size="20px" class="translate-x-3 translate-y-1" />
      </div>
      <div @click="goForwardReview" class="bg-gray-200 text-gray-800  hover:bg-gray-300 rounded-full w-9 h-9">
        <Icon name="material-symbols:arrow-forward-ios-rounded" size="20px" class="translate-x-2 translate-y-1" />
      </div>
    </div>

    <div class="bg-gradient-to-b from-white to-wierdGreen h-[100vh]">
      <!--ReviewsCarousel-->
      <div class="homeCenterContainer mt-5">
        <UCarousel ref="reviewCarouselRef" :items="reviewItems" :ui="{ item: 'basis-full', container: '!h-full' }"
          class="w-full mx-auto rounded-lg shadow-lg h-[30em]  p-0 overflow-hidden">
          <template #default="{ item }">
            <!-- Render carousel items here -->
            <HomeReviewItem :reviewBody="item.reviewBody" :reviewFooter="item.reviewFooter"
              :surveyBody="item.surveyBody" :surveyFooter="item.surveyFooter" />
          </template>
        </UCarousel>
      </div>
    </div>



    <!--PAGE END-->
    <Footer />
  </div>
</template>
<script setup lang="jsx">
  import homeCarouselItem from "@/components/UI/homeCarouselItem.vue";
  import HomeReviewItem from "~/components/UI/homeReviewItem.vue";
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

  const reviewItems = [
    {
      reviewBody: "[Trello is] great for simplifying complex processes. As a manager, I can chunk [processes] down into bite-sized pieces for my team and then delegate that out, but still keep a bird's-eye view.",
      reviewFooter: {
        name: "Joey Rosenberg",
        position: "Global Leadership Director at Women Who Code",
        logo: "https://images.ctfassets.net/rz1oowkt5gyp/2f3keSvy7vtldV4YDFKkE2/5ed788fb5257c342995d25ba8e8e313d/WomenWhoCode_logo.svg",
      },
      surveyBody: "75% of organizations report that Trello delivers value to their business within 30 days.",
      surveyFooter: "Trello TechValidate Survey",
    },
    {
      reviewBody: "Whether someone is in the office, working from home, or working on-site with a client, everyone can share context and information through Trello.",
      reviewFooter: {
        name: "Sumeet Moghe",
        position: "Product Manager at ThoughWorks",
        logo: "https://images.ctfassets.net/rz1oowkt5gyp/2kIh1cWqsxjtHwWHWJJPsJ/d8436f3979be6cab7931f4d276c2d5ce/thoughtworks.svg",
      },
      surveyBody: "81% of customers chose Trello for its ease of use.",
      surveyFooter: "Trello TechValidate Survey",
    },
    {
      reviewBody: "We used Trello to provide clarity on steps, requirements, and procedures. This was exceptional when communicating with teams that had deep cultural and language differences.",
      reviewFooter: {
        name: "Jefferson Scomacao",
        position: "Development Manager at IKEA/PTC",
        logo: "https://images.ctfassets.net/rz1oowkt5gyp/3X64fxSs4ek9A0ex45BUNI/911daed79127cb2f8a021da93fb68b9f/ptc-logo.svg",
      },
      surveyBody: "74% of customers say Trello has improved communication with their co-workers and teams.",
      surveyFooter: "Trello TechValidate Survey",
    },
  ];

  const reviewCarouselRef = ref(null);

  const goBackwardReview = () => {
    if (reviewCarouselRef.value) {
      reviewCarouselRef.value.prev();
    }
  };

  const goForwardReview = () => {
    if (reviewCarouselRef.value) {
      reviewCarouselRef.value.next();
    }
  };

</script>