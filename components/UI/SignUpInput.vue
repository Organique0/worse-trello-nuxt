<template>
	<div
		class="block w-full homeCenterContainer"
		:id="id"
	>
		<div
			class="mx-auto w-full md:w-full md:flex md:items-center md:justify-center md:gap-6"
		>
			<UInput
				size="xl"
				class="w-64 hidden md:block lg:w-[70%] text-center"
				placeholder="Email"
			/>
			<UButton
				size="xl"
				class="w-full md:w-44 mt-5 lg:w-[10rem] md:mt-0 justify-center"
				color="primary"
				>Sign up - it's free
			</UButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
const id = useId();
</script>
