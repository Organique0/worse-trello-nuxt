<template>
  <div class="inline-flex h-56 bg-gradient-to-r from-purple-800 to-pink-500">
    <div
      class="hidden md:block lg:h-full lg:w-[20vw] lg:bg-footerLeft lg:bg-no-repeat"
    />

    <div class="m-auto w-[100vw] lg:w-[60vw]">
      <div class="flex-block m-auto sm:w-[80vw] lg:w-[35vw]">
        <h1 class="customTitle pb-10 text-center text-white">
          Get started with Trello today
        </h1>
        <UISignUpInput />
      </div>
    </div>

    <div
      class="hidden bg-right md:block lg:h-full lg:w-[20vw] lg:bg-footerRight lg:bg-no-repeat"
    />
  </div>
</template>

<script lang="ts" setup></script>
