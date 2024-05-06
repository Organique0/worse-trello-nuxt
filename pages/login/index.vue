<template>
  <div class="flex flex-col justify-center min-h-[calc(100%-100px)]">
    <UCard
      class="flex flex-col my-0 mx-auto w-[400px] px-[32px] py-[40px] bg-white rounded-sm shadow-lg box-border hover:shadow-xl  transition-all duration-200">
      <template #header>
        <p>Login to continue</p>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <div class="">
          <UButton type="submit" color="white" class="mt-8 mb-2" block>
            Login
          </UButton>

          <SocialAuth />
        </div>
      </UForm>
    </UCard>
  </div>
</template>
<script setup lang="ts">
  import { z } from 'zod';
  import type { FormError, FormSubmitEvent } from '#ui/types';

  const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters')
  })

  type Schema = z.output<typeof schema>

  const state = reactive({
    email: undefined,
    password: undefined
  })

  const form = ref()

  async function onSubmit(event: FormSubmitEvent<any>) {
    form.value.clear()
    try {
      const response = await $fetch('')
      // ...
    } catch (err: any) {
      if (err.statusCode === 422) {
        form.value.setErrors(err.data.errors.map((err: { message: any; path: any; }) => ({
          // Map validation errors to { path: string, message: string }
          message: err.message,
          path: err.path,
        })))
      }
    }
  }



  /*   const { login } = useAuth();
    const data = reactive({
      username: '',
      password: '',
      loading: false
    });
  
    async function handleLogin() {
      data.loading = true;
      try {
        await login({
          username: data.username,
          password: data.password
        });
      } catch (error) {
        console.error(error);
      } finally {
        data.loading = false;
      }
    } */
</script>