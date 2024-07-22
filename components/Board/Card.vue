<template>
	<div
		class="h-9 p-2 my-2 border rounded-lg shadow-sm hover:outline hover:outline-primary flex items-center"
	>
		<p class="text-sm">{{ element.title }}</p>
	</div>
</template>

<script lang="ts" setup>
	import type { Card } from "~/lib/types";

	const props = defineProps<{ element: Card }>();
</script>
