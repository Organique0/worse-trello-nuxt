<template>
  <div class="flex flex-col justify-center min-h-[calc(100%-100px)]">
    <UCard
      class="flex flex-col my-0 mx-auto w-[600px] px-[32px] py-[40px] bg-white rounded-sm shadow-lg box-border hover:shadow-xl transition-all duration-200">
      <template #header>
        <p class="text-center text-xl font-medium">Sign up to continue</p>
      </template>

      <UForm ref="form" :schema="schema" :state="data" class="space-y-3" @submit="submit">
        <div class="flex gap-3">
          <UFormGroup label="Username" name="username" class="w-[50%]">
            <UInput v-model="data.username" class="w-full" />
          </UFormGroup>

          <UFormGroup label="Email" name="email" class="w-[50%]">
            <UInput v-model="data.email" class="w-full" />
          </UFormGroup>
        </div>

        <div class="flex gap-3">
          <UFormGroup label="Name" name="first_name" class="w-[50%]">
            <UInput v-model="data.first_name" />
          </UFormGroup>

          <UFormGroup label="Surname" name="last_name" class="w-[50%]">
            <UInput v-model="data.last_name" class="w-full" />
          </UFormGroup>
        </div>

        <div class="flex gap-3">
          <UFormGroup label="Password" name="password" class="w-[50%]">
            <UInput v-model="data.password" type="password" class="w-full" />
          </UFormGroup>

          <UFormGroup label="Confirm password" name="password_confirmation" class="w-[50%]">
            <UInput v-model="data.password_confirmation" type="password" class="w-full" />
          </UFormGroup>
        </div>


        <div class="">
          <UButton type="submit" color="white" class="mt-12" block>
            Sign up
          </UButton>

          <SocialAuth class="mt-[12px]" />
        </div>

      </UForm>
    </UCard>
  </div>
</template>


<script setup lang="ts">
  import { z } from 'zod';
  //import type { FormSubmitEvent } from '#ui/types';

  definePageMeta({ middleware: ["guest"] });

  const route = useRoute();
  const { register } = useAuth();
  const status = ref(
    (route.query.reset ?? "").length > 0 ? atob(route.query.reset as string) : ""
  );

  const schema = z.object({
    username: z.string().min(6, 'Must be at least 6 characters'),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    password_confirmation: z.string().min(8, 'Must be at least 8 characters'),
  })
    .refine((val) => val.password === val.password_confirmation, {
      message: "Passwords do not match",
    });

  //type RegisterSchema = z.output<typeof schema>

  const data = reactive({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const form = ref()

  const {
    submit,
    succeeded,
    validationErrors: errors,
    error,
    inProgress

  } = useSubmit(
    () => {
      status.value = "";
      return register(data);
    },
    {
      onSuccess: (res) => {
        form.value.clear();
        alert("registered");
        console.log(res);
      },
      onError: (res) => {
        alert(res);
      }
    }
  );


</script>