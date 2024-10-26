<template>
	<div
		class="mx-auto w-full bg-gradient-to-b from-white to-[#b7f3ff87] pb-20 md:px-[2rem]"
	>
		<div class="homeCenterContainer">
			<div class="mt-[3rem]">
				<div class="homeSectionIntro">
					<h3 class="">TRELLO 101</h3>
					<h1 class="customTitle my-8">A productivity powerhouse</h1>
					<p class="text-lg font-medium leading-9 text-wierdBlue">
						Simple, flexible, and powerful. All it takes are boards, lists, and
						cards to get a clear view of who’s doing what and what needs to get
						done.
					</p>
				</div>
				<div class="mt-12 flex w-full flex-col gap-y-4 md:flex-row">
					<!-- Buttons Column -->
					<div
						class="hidden flex-col justify-between md:order-1 md:mr-8 md:flex md:w-[40%]"
					>
						<button
							class="homeTabButton"
							:class="{ homeTabButtonActive: item === 0 }"
							@click="navigateToItem(0)"
						>
							<div>
								<h3>Boards</h3>
								<p>
									Trello boards keep tasks organized and work moving forward. In
									a glance, see everything from “things to do” to “aww yeah, we
									did it!”
								</p>
							</div>
						</button>
						<button
							class="homeTabButton"
							:class="{ homeTabButtonActive: item === 1 }"
							@click="navigateToItem(1)"
						>
							<div>
								<h3>Lists</h3>
								<p>
									The different stages of a task. Start as simple as To Do,
									Doing or Done—or build a workflow custom fit to your team’s
									needs. There’s no wrong way to Trello.
								</p>
							</div>
						</button>
						<button
							class="homeTabButton"
							:class="{ homeTabButtonActive: item === 2 }"
							@click="navigateToItem(2)"
						>
							<div>
								<h3>Cards</h3>
								<p>
									Cards represent tasks and ideas and hold all the information
									to get the job done. As you make progress, move cards across
									lists to show their status.
								</p>
							</div>
						</button>
					</div>

					<!-- Image Carousel -->
					<div class="md:order-2 md:w-full">
						<carousel
							ref="myImagesCarousel"
							transition="100"
							@slide-end="handleSlideEnd"
						>
							<slide
								v-for="(slide, index) in slides"
								:key="index"
							>
								<NuxtImg
									:src="slide"
									class="h-auto w-full"
								/>
							</slide>
						</carousel>
					</div>

					<!-- Buttons Carousel -->
					<div class="w-full md:hidden">
						<carousel
							ref="myButtonsCarousel"
							transition="100"
							@slide-end="handleSlideEnd"
						>
							<slide
								v-for="(slide, index) in slideDesc"
								:key="index + 5"
							>
								<div class="homeTabButton homeTabButtonActive">
									<h3>{{ slide.title }}</h3>
									<p>{{ slide.body }}</p>
								</div>
							</slide>
							<template #addons>
								<pagination />
							</template>
						</carousel>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";

	const myButtonsCarousel = ref(null);
	const myImagesCarousel = ref(null);
	const item = ref(0);

	const slides = [
		"/Carousel_Image_Boards.webp",
		"/Carousel_Image_Lists.webp",
		"/Carousel_Image_Cards.webp",
	];

	const slideDesc = [
		{
			title: "Boards",
			body: "Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”",
		},
		{
			title: "Lists",
			body: "The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your teams needs.Theres no wrong way to Trello.",
		},
		{
			title: "Cards",
			body: "Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.",
		},
	];

	function navigateToItem(index) {
		myButtonsCarousel.value.slideTo(index);
		myImagesCarousel.value.slideTo(index);
		item.value = index;
	}

	function updateActiveItem(index) {
		item.value = index;
		navigateToItem(index);
	}

	function handleSlideStart(data) {
		updateActiveItem(data.currentSlideIndex);
	}

	function handleSlideEnd(data) {
		updateActiveItem(data.currentSlideIndex);
	}
</script>

<style>
	:root {
		/* Color */
		--vc-clr-primary: #696969;
		--vc-clr-secondary: #000000;
		--vc-clr-white: #ffffff;

		/* Icon */
		--vc-icn-width: 1.2em;

		/* Pagination */
		--vc-pgn-width: 9px;
		--vc-pgn-height: 9px;
		--vc-pgn-margin: 4px;
		--vc-pgn-border-radius: 100px;
		--vc-pgn-background-color: var(--vc-clr-secondary);
		--vc-pgn-active-color: var(--vc-clr-primary);
	}

	.carousel {
		position: relative;
		text-align: center;
		box-sizing: border-box;
		touch-action: pan-y;
		overscroll-behavior: none;
	}

	.carousel.is-dragging {
		touch-action: none;
	}

	.carousel * {
		box-sizing: border-box;
	}

	.carousel__track {
		display: flex;
		padding: 0 !important;
		position: relative;
	}

	.carousel__viewport {
		overflow: hidden;
	}

	.carousel__sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	.carousel__icon {
		width: var(--vc-icn-width);
		height: var(--vc-icn-width);
		fill: currentColor;
	}

	.carousel__prev,
	.carousel__next {
		box-sizing: content-box;
		background: var(--vc-nav-background);
		border-radius: var(--vc-nav-border-radius);
		width: var(--vc-nav-width);
		height: var(--vc-nav-height);
		text-align: center;
		font-size: var(--vc-nav-height);
		padding: 0;
		color: var(--vc-nav-color);
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		border: 0;
		cursor: pointer;
		margin: 0 10px;
		top: 50%;
		transform: translateY(-50%);
	}

	.carousel__next--disabled,
	.carousel__prev--disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.carousel__prev {
		left: 0;
	}

	.carousel__next {
		right: 0;
	}

	.carousel--rtl .carousel__prev {
		left: auto;
		right: 0;
	}

	.carousel--rtl .carousel__next {
		right: auto;
		left: 0;
	}

	@media (hover: hover) {
		.carousel__prev:hover,
		.carousel__next:hover {
			color: var(--vc-nav-color-hover);
		}
	}

	.carousel__pagination {
		display: flex;
		justify-content: center;
		list-style: none;
		line-height: 0;
		margin: 10px 0 0;
		padding: 0;
	}

	.carousel__pagination-button {
		display: block;
		border: 0;
		margin: 0;
		cursor: pointer;
		padding: var(--vc-pgn-margin);
		background: transparent;
	}

	.carousel__pagination-button::after {
		display: block;
		content: "";
		width: var(--vc-pgn-width);
		height: var(--vc-pgn-height);
		border-radius: var(--vc-pgn-border-radius);
		background-color: var(--vc-pgn-background-color);
	}

	.carousel__pagination-button--active::after {
		background-color: var(--vc-pgn-active-color);
		width: 60px;
	}

	@media (hover: hover) {
		.carousel__pagination-button:hover::after {
			background-color: var(--vc-pgn-active-color);
		}
	}

	.carousel__slide {
		scroll-snap-stop: auto;
		flex-shrink: 0;
		margin: 0;
		position: relative;

		display: flex;
		justify-content: center;
		align-items: center;

		/* Fix iOS scrolling #22 */
		transform: translateZ(0);
	}
</style>
