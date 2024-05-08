<template>
  <div class="flex flex-col justify-center min-h-[calc(100%-100px)]">
    <UCard
      class="flex flex-col my-0 mx-auto w-[400px] px-[32px] py-[40px] bg-white rounded-sm shadow-lg box-border hover:shadow-xl  transition-all duration-200">
      <template #header>
        <p>Login to continue</p>
      </template>

      <UForm :schema="schema" :state="data" class="space-y-4" @submit="submit">

        <UFormGroup label="Email" name="email">
          <UInput v-model="data.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="data.password" type="password" />
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
  //import type { FormError, FormSubmitEvent } from '#ui/types';

  definePageMeta({ middleware: ["guest"] });


  const router = useRouter();
  const route = useRoute();
  const { login } = useAuth();

  const data = reactive({
    email: "",
    password: "",
  });

  const status = ref(
    (route.query.reset ?? "").length > 0 ? atob(route.query.reset as string) : ""
  );

  const schema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Must be at least 8 characters'),
    remember: z.boolean(),
  })

  //type Schema = z.output<typeof schema>


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
      return login(data);
    },
    {
      onSuccess: (res) => {
        form.value.clear();
        alert("logged in");
        console.log(res);
        //router.push("/dashboard");
      },

      onError: (res) => {
        alert(res);
      }
    }
  );
</script>