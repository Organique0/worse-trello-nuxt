<template>
  <div
    class="bg-white flex h-[60px] w-full dark:bg-slate-400 px-4 border-b-2 transition-all duration-400 hover:shadow-md z-50 fixed">
    <img src="public/icon-green.svg" class="hover:cursor-pointer group" @click="handleHomeClick" />
    <div class="flex flex-grow justify-end items-center">
      <div class="h-full flex items-center gap-4">

        <UButton v-if="!store.isLoggedIn" :ui="{ rounded: 'rounded-none' }" class="h-full" label="Login" size="xl"
          to="/login" variant="ghost" color="primary" />
        <UButton v-if="!store.isLoggedIn" :ui="{ rounded: 'rounded-none' }" class=" h-full" label="Register" size="xl"
          to="/register" variant="ghost" color="primary" />

        <UButton v-if="store.isLoggedIn" :ui="{ rounded: 'rounded-none' }" class=" h-full" label="Log out" size="xl"
          to="/" color="primary" @click="store.logout" />

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