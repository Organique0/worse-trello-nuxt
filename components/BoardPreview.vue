<template>
	<NuxtLink
		class="relative w-full group overflow-hidden"
		:to="link"
	>
		<NuxtImg
			:src="src"
			width="200"
			height="100"
			class="rounded-md group-hover:brightness-90 cursor-pointer"
		/>
		<p
			class="absolute top-2 left-3 text-medium font-bold text-white w-[170px] cursor-pointer select-none"
		>
			{{ title }}
		</p>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class="absolute bottom-2 right-2 cursor-pointer hover:scale-125 w-[15px]"
			:class="
				starred
					? 'fill-yellow-600 stroke-yellow-600 hover:fill-none stroke-2'
					: 'transform translate-x-[150%] group-hover:translate-x-0 transition-transform duration-300 ease fill-transparent stroke-white stroke-2'
			"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
			/>
		</svg>
	</NuxtLink>
</template>

<script lang="ts" setup>
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	src: {
		type: String,
		required: true,
	},
	link: {
		type: String,
	},
	starred: {
		type: Boolean,
	},
});
</script>
