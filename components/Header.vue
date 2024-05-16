<template>
	<div
		class="bg-white flex h-[60px] w-full dark:bg-slate-400 px-4 border-b-2 transition-all duration-400 hover:shadow-lg z-50 fixed"
	>
		<img
			src="public/icon-green.svg"
			class="hover:cursor-pointer group"
			@click="handleHomeClick"
		/>
		<div class="flex flex-grow justify-end items-center">
			<div class="h-[calc(100%+3px)] flex items-center gap-4">
				<Button
					v-if="!store.isLoggedIn"
					variant="homeMenu"
					@click="() => router.push('login')"
					>Login</Button
				>
				<Button
					v-if="!store.isLoggedIn"
					variant="default"
					class="h-full rounded-none text-lg"
					@click="() => router.push('register')"
					>Get Trello for free</Button
				>

				<Button
					v-if="store.isLoggedIn"
					variant="homeMenu"
					@click="store.logout"
					>Log out</Button
				>
			</div>
		</div>
	</div>
</template>

<script setup>
const router = useRouter();
const store = useMyUserStore();

function handleHomeClick() {
	router.push("/");
}
</script>
