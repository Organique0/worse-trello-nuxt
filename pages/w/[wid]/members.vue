<template>
	<div class="w-[100%-4vw] mx-[3vw]">
		<hr class="w-full p-0 my-[16px]" />
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		layout: "workspace",
		middleware: ["auth"],
	});
</script>
