<template>
  <div
    class="bg-white flex h-[60px] w-full dark:bg-slate-400 px-4 border-b-2 transition-all duration-400 hover:shadow-md z-50 fixed">
    <img src="public/favicon.ico" class="hover:cursor-pointer group" @click="handleHomeClick" />
    <div class="flex flex-grow justify-end items-center">
      <div class="h-full flex items-center gap-4">
        <UButton :ui="{ rounded: 'rounded-none' }" class="h-full" label="Login" size="xl" to="/login" variant="ghost"
          color="blue" />
        <UButton :ui="{ rounded: 'rounded-none' }" class=" h-full" label="Register" size="xl" to="/register"
          variant="ghost" color="blue" />
      </div>
    </div>
  </div>


</template>

<script setup>
  const router = useRouter();
  function handleHomeClick() {
    router.push("/");
  }

</script>