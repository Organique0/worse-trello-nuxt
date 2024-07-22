<template>
	<div class="">
		<p class="text-sm">{{ element.title }}</p>
	</div>
</template>

<script lang="ts" setup>
	import type { Card } from "~/lib/types";

	const props = defineProps<{ element: Card }>();
</script>
