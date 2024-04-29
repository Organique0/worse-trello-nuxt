<template>
  <div class="bg-white flex h-[80px] w-full dark:bg-slate-400 px-4">
    <img src="public/favicon.ico" />
    <div class="flex flex-grow justify-end items-center">
      <div class="h-full flex items-center gap-4">
        <UIButton class="h-full text-xl" label="Login" color="transparent" size="xl" @click="handleLoginClick" />

        <UIButton class="h-full text-xl" label="Register" color="transparent" size="xl" @click="handleRegisterClick" />
      </div>
    </div>
  </div>


</template>

<script setup>

</script>