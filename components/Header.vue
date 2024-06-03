<template>
  <div
    class="duration-400 fixed z-50 flex h-[60px] w-full border-b-2 bg-white px-4 transition-all hover:shadow-lg dark:bg-slate-400"
  >
    <img
      src="public/icon-green.svg"
      class="group hover:cursor-pointer"
      @click="handleHomeClick"
    />
    <div class="flex flex-grow items-center justify-end">
      <div class="flex h-[calc(100%+3px)] items-center gap-4">
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

        <Button v-if="store.isLoggedIn" variant="homeMenu" @click="store.logout"
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
