<template>
	<div>
		<p>{{ props.title }}</p>
		<p>{{ props.body }}</p>
		<component :is="props.additional" />
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from "vue";

	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		additional: {
			type: Object,
			required: false,
			default: () => {},
		},
	});
</script>
