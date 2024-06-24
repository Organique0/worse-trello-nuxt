<template>
	<LoggedInHeaderShad />
	<div class="m-auto flex max-w-[75em]">
		<LoggedInSideBar class="hidden sm:block max-h-[90vh] w-[256px] mt-[40px]" />
		<slot />
	</div>
</template>

<script lang="ts" setup></script>
