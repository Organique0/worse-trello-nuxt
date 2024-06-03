<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const verified = !!route.query.verified;

onMounted(() => {
  if (!verified) return;

  router.replace({
    query: { ...route.query, verified: undefined },
  });
});
</script>

<template>
  <!-- Email Verification Success Message -->
  <div v-if="verified" class="mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div
      class="my-12 bg-gray-900 p-6 font-semibold text-white shadow-sm sm:rounded-lg"
    >
      Your email has been verified, thank you!
    </div>
  </div>
</template>
