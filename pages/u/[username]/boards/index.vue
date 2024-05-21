<template>
	<div class="">
		user board
		{{ user }}
	</div>
</template>

<script setup lang="ts">
definePageMeta({
	layout: "logged-in-home",
});
const { user } = useMyUserStore();
</script>
