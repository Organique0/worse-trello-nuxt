<script setup lang="ts">
  import { object, z } from 'zod';
  import type { FormSubmitEvent } from '#ui/types'

  //definePageMeta({ middleware: ["guest"] });

  const { forgotPassword } = useAuth();

  const resetEmailSent = ref(false);
  const status = ref("asdfasdf");

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

    <template #header>
      <h1 class="text-center text-xl font-medium mb-11">Reset password</h1>
    </template>

    <template #form>
      <UForm @submit="submit" :state="state" :schema="schema" class="space-y-4">
        <UFormGroup label="We'll send a recovery link to" name="email">
          <UInput v-model="state.email" placeholder="Enter email" />
        </UFormGroup>

        <UButton type="submit" class="mb-2 h-10 mt-12" block variant="solid" color="primary">
          Submit
        </UButton>
      </UForm>

    </template>

  </AuthCard>

</template>
