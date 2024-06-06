<template>
  <!--SLIDER BUTTONS-->
  <div class="homeCenterContainer hidden justify-end md:flex">
    <div
      class="mr-7 h-9 w-9 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
      @click="goBackwardReview"
    >
      <Icon
        name="material-symbols:arrow-back-ios-rounded"
        size="20px"
        class="translate-x-3 translate-y-1"
      />
    </div>
    <div
      class="h-9 w-9 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
      @click="goForwardReview"
    >
      <Icon
        name="material-symbols:arrow-forward-ios-rounded"
        size="20px"
        class="translate-x-2 translate-y-1"
      />
    </div>
  </div>

  <div class="h-auto bg-gradient-to-b from-white to-wierdGreen">
    <!--ReviewsCarousel-->
    <div class="homeCenterContainer mt-5">
      <UCarousel
        ref="reviewCarouselRef"
        :items="reviewItems"
        :ui="{
          item: 'basis-full snap-end',
          container: '!h-full rounded-lg shadow-xl',
          indicators: {
            wrapper: 'bottom-0 mt-4 relative mt-[30px]',
          },
        }"
        class="mx-auto w-full overflow-hidden p-0 md:h-[30em]"
        indicators
      >
        <template #default="{ item }">
          <!-- Render carousel items here -->
          <UIHomeReviewItem
            :review-body="item.reviewBody"
            :review-footer="item.reviewFooter"
            :survey-body="item.surveyBody"
            :survey-footer="item.surveyFooter"
          />
        </template>

        <template #indicator="{ onClick, page, active }">
          <UButton
            class="m-0 block justify-center !bg-transparent p-0 after:block after:h-[var(--vc-pgn-height)] after:w-[var(--vc-pgn-width)] after:rounded-full after:bg-[var(--vc-pgn-background-color)]"
            :class="
              active &&
              'after:w-[60px] after:rounded-full after:!bg-[var(--vc-pgn-active-color)]'
            "
            disabled
            @click="onClick(page)"
          />
        </template>
      </UCarousel>
    </div>
  </div>
</template>

<script setup>
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
const reviewItems = [
  {
    reviewBody:
      "[Trello is] great for simplifying complex processes. As a manager, I can chunk [processes] down into bite-sized pieces for my team and then delegate that out, but still keep a bird's-eye view.",
    reviewFooter: {
      name: "Joey Rosenberg",
      position: "Global Leadership Director at Women Who Code",
      logo: "https://images.ctfassets.net/rz1oowkt5gyp/2f3keSvy7vtldV4YDFKkE2/5ed788fb5257c342995d25ba8e8e313d/WomenWhoCode_logo.svg",
    },
    surveyBody:
      "75% of organizations report that Trello delivers value to their business within 30 days.",
    surveyFooter: "Trello TechValidate Survey",
  },
  {
    reviewBody:
      "Whether someone is in the office, working from home, or working on-site with a client, everyone can share context and information through Trello.",
    reviewFooter: {
      name: "Sumeet Moghe",
      position: "Product Manager at ThoughWorks",
      logo: "https://images.ctfassets.net/rz1oowkt5gyp/2kIh1cWqsxjtHwWHWJJPsJ/d8436f3979be6cab7931f4d276c2d5ce/thoughtworks.svg",
    },
    surveyBody: "81% of customers chose Trello for its ease of use.",
    surveyFooter: "Trello TechValidate Survey",
  },
  {
    reviewBody:
      "We used Trello to provide clarity on steps, requirements, and procedures. This was exceptional when communicating with teams that had deep cultural and language differences.",
    reviewFooter: {
      name: "Jefferson Scomacao",
      position: "Development Manager at IKEA/PTC",
      logo: "https://images.ctfassets.net/rz1oowkt5gyp/3X64fxSs4ek9A0ex45BUNI/911daed79127cb2f8a021da93fb68b9f/ptc-logo.svg",
    },
    surveyBody:
      "74% of customers say Trello has improved communication with their co-workers and teams.",
    surveyFooter: "Trello TechValidate Survey",
  },
];
</script>
