<template>
	<LoggedInHeaderShad />
	<div class="flex flex-row flex-1 relative overflow-y-auto h-[100vh]">
		<WorkspaceSidebar />
		<div class="w-full m-5">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({ middleware: ["auth"] });
</script>
