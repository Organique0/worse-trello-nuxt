<template>

  <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
    <div class="w-full sm:max-w-md mt-6 px-6 py-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
      <NuxtLink to="/">
        <img src="/public/icon-green.svg" class="w-16 h-16 m-auto">
      </NuxtLink>
      <slot />
    </div>
  </div>
</template>