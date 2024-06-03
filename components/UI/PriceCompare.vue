<template>
  <div class="mt-16 md:grid md:grid-cols-4 md:divide-x-2">
    <div class="priceCompareItem !border-r-0">
      <p>FREE</p>
      <p>$<span class="text-4xl">0</span>USD</p>
      <p>Free for your whole team</p>
      <p>For individuals or teams looking to organize any project</p>
      <UButton
        color="cyan"
        variant="ghost"
        size="xl"
        class="priceCompateItemButton"
      >
        Get started
      </UButton>
    </div>
    <div class="priceCompareItem">
      <p>STANDARD</p>
      <p>$<span class="text-4xl">5</span>USD</p>
      <p>Per user/month if billed annually ($6 billed montly)</p>
      <p>For small teams that need to manage work and scale collaboration.</p>
      <UButton
        color="cyan"
        variant="ghost"
        size="xl"
        class="priceCompateItemButton"
      >
        Sign up now
      </UButton>
      <NuxtLink to="/">Learn more about Standard</NuxtLink>
    </div>
    <div class="priceCompareItem border-cyan-500 md:border-2">
      <p>PREMIUM</p>
      <p>$<span class="text-4xl">10</span>USD</p>
      <p>Per user/month if billed annually ($12.50 billed montly)</p>
      <p>
        For teams that need to track and visualize multiple projects in several
        ways, including boards, timelines, calendars, etc.
      </p>
      <UButton
        color="cyan"
        variant="ghost"
        size="xl"
        class="priceCompateItemButton"
      >
        Try for free
      </UButton>
      <NuxtLink to="/">Learn more about Premium</NuxtLink>
    </div>
    <div class="priceCompareItem md:!border-r-2 md:border-l-cyan-500">
      <p>ENTERPRISE</p>
      <p>$<span class="text-4xl">17.50</span>USD</p>
      <p>Per user/month - billed annually ($210.00 annual price per user)</p>
      <p>
        For organizations that need to connect work across teams with more
        security and controls.
      </p>
      <UButton
        color="cyan"
        variant="ghost"
        size="xl"
        class="priceCompateItemButton"
      >
        Contact sales
      </UButton>
      <NuxtLink to="/">Learn more about Enterprise</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
