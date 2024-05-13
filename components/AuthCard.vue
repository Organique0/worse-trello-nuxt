<template>
  <div class="min-h-[calc(100%-100px)] bgImage">
    <div class="flex flex-col justify-center h-[100vh]">

      <UCard
        class="flex flex-col my-0 mx-auto w-[400px] px-[32px] py-[40px] bg-white rounded-sm shadow-lg box-border hover:shadow-xl  transition-all duration-200">
        <slot name="header" />
        <slot name="form" />
      </UCard>


    </div>
  </div>
</template>