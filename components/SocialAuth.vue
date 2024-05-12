<template>
  <div>
    <UButton color="white" class="mb-4" block @click="onSubmit">
      <LogosGithubIcon v-if="props.for === 'github'" />
      <LogosGoogleIcon v-if="props.for === 'google'" />
      {{ props.for.charAt(0).toUpperCase() + props.for.slice(1) }}

    </UButton>
  </div>
</template>


<script lang="ts" setup>
  const props = defineProps({
    for: {
      type: String,
      required: true,
    }
  });

  const onSubmit = async () => {
    window.location.href = `http://localhost:8000/login/${props.for}`;
  }
</script>
