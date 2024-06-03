<script setup lang="ts">
defineProps<{
  status: string;
}>();
</script>

<template>
  <div v-if="status" class="text-sm font-medium text-green-600">
    {{ status }}
  </div>
</template>
