<template>
	<div class="space-x-4 pt-4">
		<Button @click="handleButtonClick('Button 1')">Button 1</Button>
		<Button @click="handleButtonClick('Button 2')">Button 2</Button>
	</div>
</template>

<script>
	export default {
		methods: {
			handleButtonClick(buttonName) {
				console.log(buttonName + " clicked");
			},
		},
	};
</script>
