<template>
  <div class="bgImage min-h-[calc(100%-100px)]">
    <div class="flex h-[100vh] flex-col justify-center">
      <UCard
        class="mx-auto my-0 box-border flex w-[400px] flex-col rounded-sm bg-white px-[32px] py-[40px] shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        <slot name="header" />
        <slot name="form" />
      </UCard>
    </div>
  </div>
</template>
