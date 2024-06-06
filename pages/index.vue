<template>
	<div>
		<div
			class="relative h-[53em] w-full bg-gradient-to-r from-purple-800 to-pink-500 pt-16"
		>
			<div
				class="absolute bottom-[-17px] h-[25%] w-full bg-whiteCurves bg-cover bg-center"
			/>
			<div class="mx-auto max-w-[1140px] px-[1rem] md:pl-[1rem] md:pr-[1rem]">
				<div class="flex flex-wrap items-center justify-center">
					<div class="pt-24 text-white md:flex-1 lg:pt-32">
						<h1 class="customHeader">
							Trello brings all your tasks, teammates, and tools together
						</h1>
						<h3 class="font-semibold md:my-8 md:text-xl lg:my-12 lg:text-2xl">
							Keep everything in the same place—even if your team isn’t.
						</h3>
						<UISignUpInput />
					</div>

					<div
						class="relative mb-0 mt-0 block pb-0 pt-8 text-center sm:ml-11 md:flex-1 md:pt-32"
					>
						<NuxtImg
							format="webp"
							src="/TrelloUICollage_4x.webp"
							sizes="2100px"
						/>
					</div>
				</div>
			</div>
		</div>
		<!--PRODUCTIVITY POWERHOUSE-->
		<Trello101 />

		<!--TRELLO IN ACTION-->
		<div class="">
			<div class="homeCenterContainer">
				<div class="relative order-1 block w-full pt-12 text-left">
					<h3 class="">TRELLO IN ACTION</h3>
					<h1 class="customTitle mb-4 mt-2">
						Workflows for any project, big or small
					</h1>
				</div>
			</div>

			<!---carousel new-->
			<div class="homeCenterContainer hidden justify-end lg:flex">
				<div
					class="mr-7 h-9 w-9 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
					@click="goBackwardNew"
				>
					<Icon
						name="material-symbols:arrow-back-ios-rounded"
						size="20px"
						class="translate-x-3 translate-y-1"
					/>
				</div>
				<div
					class="h-9 w-9 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
					@click="goForwardNew"
				>
					<Icon
						name="material-symbols:arrow-forward-ios-rounded"
						size="20px"
						class="translate-x-2 translate-y-1"
					/>
				</div>
			</div>

			<div
				class="hidden w-full overflow-hidden lg:block"
				draggable="true"
				@dragend="endDrag($event)"
				@dragstart="startDrag($event)"
				@drag="logDrag($event)"
			>
				<div
					class="homeCenterContainer transition-all duration-700 ease-out md:mb-8"
					:style="mxValue"
					:class="isTransition && 'transition-none'"
				>
					<div class="relative flex gap-[2em]">
						<component
							:is="item.component"
							v-for="item in items"
							:key="item.title"
							:title="item.title"
							:body="item.body"
							:color="item.color"
							:icon="item.icon"
							class="w-[calc(33%-1em)] flex-shrink-0"
						/>
					</div>
				</div>
			</div>

			<!--invisible image to display when dragging-->
			<img
				ref="imageRef"
				src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
				alt="Example Image"
			/>

			<!--carousel mobile-->
			<div class="w-full overflow-auto lg:hidden">
				<div class="homeCenterContainer lg:mb-8">
					<UCarousel
						:items="items"
						:ui="{
							item: 'basis-[80%]  h-[16em]',
							container: 'gap-x-[2em] ',
							indicators: {
								wrapper:
									'gap-0 bg-gray-100 relative bottom-0 rounded-full lg:hidden mt-4',
							},
						}"
						class=""
						indicators
					>
						<template #default="{ item }">
							<!-- Render carousel items here -->
							<component
								:is="item.component"
								:title="item.title"
								:body="item.body"
								:color="item.color"
								:icon="item.icon"
							/>
						</template>

						<template #indicator="{ onClick, page, active }">
							<UButton
								:variant="active && 'solid'"
								class="h-5 w-1/6 justify-center rounded-full"
								:class="active && '!bg-gray-500'"
								disabled
								@click="onClick(page)"
							/>
						</template>
					</UCarousel>
				</div>
			</div>

			<!--EXPLORE ALL USE CASES-->
			<div class="homeCenterContainer pt-11">
				<div class="block sm:flex">
					<p
						class="w-full text-lg font-medium leading-loose sm:mr-auto sm:w-[70%]"
					>
						No need to start from scratch. Jump-start your workflow with a
						proven playbook designed for different teams. Customize it to make
						it yours.
					</p>
					<div class="relative pb-16 pt-6">
						<UButton
							variant="outline"
							color="gray"
							size="md"
							class="p-[1em] ring-blue-700"
						>
							Explore all Use Cases
						</UButton>
					</div>
				</div>
			</div>
		</div>

		<!--See work in a whole new way-->
		<div
			class="relative h-[85em] bg-gradient-to-l from-cyan-500 to-blue-500 md:h-[62em]"
		>
			<div
				class="absolute left-16 h-full w-1/6 bg-viewsBgLeft bg-cover bg-center"
			/>
			<div
				class="absolute right-16 h-full w-1/6 bg-viewsBgRight bg-cover bg-center"
			/>
			<div class="homeCenterContainer">
				<!--HEADER-->
				<div class="pt-14 text-center text-white">
					<h1 class="text-2xl font-bold md:text-4xl">
						See work in a whole new way
					</h1>
					<p class="m-auto py-4 text-lg font-medium md:w-[60%] md:text-xl">
						View your team’s projects from every angle and bring a fresh
						perspective to the task at hand.
					</p>
					<UButton
						color="white"
						variant="solid"
						size="md"
						class="mt-4 p-[1em] ring-blue-700"
					>
						Discover all Trello views
					</UButton>
				</div>

				<!--VERTICAL CARD CALENDAR-->
				<div class="verticalCardsHome">
					<NuxtImg
						src="TrelloBoard_Timeline.webp"
						sizes="606px"
					/>

					<div class="mt-8 md:mt-0 md:px-11">
						<div class="verticalCardsHomeSidetextTitle">
							<LogosCalloutIcon class="hidden md:block" />
							<h3>HIT DEADLINES EVERY TIME</h3>
						</div>
						<div class="verticalCardsHomeSidetextBody">
							From weekly sprints to annual planning, Timeline view keeps all
							tasks on track. Quickly get a glimpse of what’s coming down the
							pipeline and identify any gaps that might impede your team’s
							progress.
						</div>
						<NuxtLink
							to="/"
							class="learnMoreLink"
							>Learn more</NuxtLink
						>
					</div>
				</div>

				<!--VERTICAL CARD TIMELINE-->
				<div class="verticalCardsHome">
					<NuxtImg
						src="TrelloBoard_Calendar.webp"
						sizes="606px"
						class="md:order-2"
					/>
					<div class="mt-8 md:mt-0 md:px-14">
						<div class="verticalCardsHomeSidetextTitle">
							<div class="hidden md:block">
								<Icon
									name="bx:calendar"
									class="h-auto w-[2rem]"
									color="rgb(0, 199, 229)"
								/>
							</div>
							<h3>STAY ON TOP OF TASKS</h3>
						</div>
						<div class="verticalCardsHomeSidetextBody">
							Start each day without any surprises. Whether scheduling an
							editorial calendar or staying on top of to-dos, Calendar view is
							like a crystal ball giving you a clear vision of what work lies
							ahead.
						</div>
						<NuxtLink
							to="/"
							class="learnMoreLink"
							>Learn more</NuxtLink
						>
					</div>
				</div>
			</div>
		</div>

		<div class="z-0 h-36 bg-transparent" />

		<div class="homeCenterContainer">
			<!--DO MORE INTRO-->
			<div class="homeSectionIntro mb-8">
				<h3>POWERFUL WAYS TO GROW</h3>
				<h1 class="customTitle my-2">Do more with Trello</h1>
				<p class="leading-loose">
					Trello’s intuitive features give any team the ability to quickly set
					up and customize workflows for just about anything.
				</p>
			</div>

			<!--DO MORE 3 CARDS-->
			<div class="block rounded-lg md:grid md:grid-cols-3 md:gap-11">
				<div class="doMoreCard">
					<NuxtImg
						src="Integrations_Puzzle.svg"
						sizes="100px"
					/>
					<div>
						<h2>Intregrations</h2>
						<p>
							Connect the apps your team already uses into your Trello workflow
							or add a Power-Up to fine-tune your specific needs.
						</p>
						<UButton
							color="white"
							variant="solid"
							size="md"
							class="mt-4 p-[1em] ring-blue-700"
						>
							Browse Intregrations
						</UButton>
					</div>
				</div>

				<div class="doMoreCard">
					<NuxtImg
						src="Gears.svg"
						sizes="100px"
					/>
					<div>
						<h2>Butler Automation</h2>
						<p>
							No-code automation is built into every Trello board. Focus on the
							work that matters most and let the robots do the rest.
						</p>
						<UButton
							color="white"
							variant="solid"
							size="md"
							class="mt-4 p-[1em] ring-blue-700"
						>
							Get to know Automation
						</UButton>
					</div>
				</div>

				<div class="doMoreCard">
					<NuxtImg
						src="Search_Value.svg"
						sizes="100px"
					/>
					<div>
						<h2>Trello Enterprise</h2>
						<p>
							The productivity tool teams love, paired with the features and
							security needed for scale.
						</p>
						<UButton
							color="white"
							variant="solid"
							size="md"
							class="p-[1em] ring-blue-700"
						>
							Explore Enterprise
						</UButton>
					</div>
				</div>
			</div>
		</div>

		<div class="h-[3em]" />

		<Testamonials />

		<div class="h-auto bg-gradient-to-t from-white to-wierdGreen">
			<!--Price-->
			<div class="homeCenterContainer">
				<div class="flex flex-col items-center gap-y-3 pt-16">
					<h1 class="customTitle">Trello priced your way</h1>
					<h3
						class="text-center text-lg font-medium leading-8 text-wierdBlue md:text-xl"
					>
						Trusted by millions, Trello powers teams all around the world.
					</h3>
					<UButton
						color="primary"
						size="xl"
						class="p-4"
						>Compare plans</UButton
					>
				</div>
				<UIPriceCompare />
			</div>
		</div>

		<div class="homeCenterContainer">
			<div class="my-14 ml-[8%] w-[83%]">
				<h3 class="my-8 text-center text-2xl font-medium leading-8">
					Join over 2,000,000 teams worldwide that are using Trello to get more
					done.
				</h3>
				<NuxtImg
					src="logos-horizontal-visa-coinbase-john-deere-zoom-grand-hyatt-fender.svg"
					class="hidden w-full md:block"
				/>
				<NuxtImg
					src="logos-3x3-visa-coinbase-john-deere-zoom-grand-hyatt-fender.svg"
					class="w-full md:hidden"
				/>
			</div>
		</div>

		<!--PAGE END-->
		<Footer />
	</div>
</template>
<script setup lang="jsx">
	import homeCarouselItem from "@/components/UI/homeCarouselItem";
	definePageMeta({ middleware: ["guest"] });

	const items = [
		{
			component: homeCarouselItem,
			title: "Project management",
			body: "Keep tasks in order, deadlines on track, and team members aligned with Trello.",
			icon: "uil:twitter",
			color: "blue",
		},
		{
			component: homeCarouselItem,
			title: "Meetings",
			body: "Empower your team meetings to be more productive, empowering, and dare we say—fun.",
			icon: "mdi:calendar",
			color: "green",
		},
		{
			component: homeCarouselItem,
			title: "Onboarding",
			body: "Onboarding to a new company or project is a snap with Trello’s visual layout of to-do’s, resources, and progress tracking.",
			icon: "mdi:account-multiple",
			color: "purple",
		},
		{
			component: homeCarouselItem,
			title: "Task management",
			body: "Use Trello to track, manage, complete, and bring tasks together like the pieces of a puzzle, and make your team’s projects a cohesive success every time.",
			icon: "mdi:briefcase-outline",
			color: "yellow",
		},
		{
			component: homeCarouselItem,
			title: "Brainstorming",
			body: "Unleash your team’s creativity and keep ideas visible, collaborative, and actionable.",
			icon: "mdi:lightbulb-on-outline",
			color: "orange",
		},
		{
			component: homeCarouselItem,
			title: "Resource hub",
			body: "Save time with a well-designed hub that helps teams find information easily and quickly.",
			icon: "mdi:database",
			color: "teal",
		},
	];

	//const carouselMarginLeft = ref("!ml-[calc(-1140px+(100%+1140px)/2)]");

	const mxValue = ref(
		`margin-left: calc(-1140px + (100% + 1140px) / 2) !important;`
	);

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
	};

	const startDrag = (e) => {
		e.dataTransfer.setDragImage(imageRef.value, 0, 0);
		isTransition.value = true;
		startX.value = e.offsetX;
	};

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
	};
	//carouselMarginLeft.value = '!ml-[calc(-1140px+(100%-' + e.screenX + 'px)/2)]';
</script>
