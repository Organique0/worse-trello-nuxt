<script setup lang="ts">
  import { object, z } from 'zod';
  import type { FormSubmitEvent } from '#ui/types'

  //definePageMeta({ middleware: ["guest"] });

  const { forgotPassword } = useAuth();

  const resetEmailSent = ref(false);
  const status = ref("");

  const {
    submit,
    inProgress,
    validationErrors: errors,
  } = useSubmit(
    () => {
      status.value = "";
      return forgotPassword(state.email);
    },
    {
      onSuccess: (result) => {
        status.value = result?.status ?? "";
        resetEmailSent.value = true;
      },
    }
  );

  type Schema = z.output<typeof schema>

  const state = reactive({
    email: "",
  });

  const schema = object({
    email: z.string().email('Invalid email'),
  });


</script>

<template>
  <AuthCard>
    <template #logo>
      <NuxtLink to="/">
        <img src="/favicon.ico" />
      </NuxtLink>
    </template>

    <div class="mb-4 text-sm text-gray-600">
      Forgot your password? No problem. Just let us know your email address and
      we will email you a password reset link that will allow you to choose a
      new one.
    </div>

    <!-- Session Status -->
    <AuthSessionStatus class="mb-4" :status="status" />


    <UForm @submit="submit" :state="state" :schema="schema" class="space-y-4">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </AuthCard>
</template>
