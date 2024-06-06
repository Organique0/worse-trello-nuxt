<script setup lang="ts">
import { z } from "zod";

definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const route = useRoute();
const { resetPassword } = useAuth();

if (!route.query.email) {
  router.push("/");
}

const data = reactive({
  email: route.query.email as string,
  password: "",
  password_confirmation: "",
});

const token = computed(() => route.params.token);
const {
  submit,
  inProgress,
  validationErrors: errors,
} = useSubmit(() => resetPassword({ token: token.value as string, ...data }), {
  onSuccess: (result) =>
    router.push({
      path: "/login",
      query: { reset: btoa(result?.status ?? "") },
    }),
});

const schema = z
  .object({
    password: z.string().min(8, "Must be at least 8 characters"),
    password_confirmation: z.string().min(8, "Must be at least 8 characters"),
  })
  .refine((val) => val.password === val.password_confirmation, {
    message: "Passwords do not match",
  });

type Schema = z.output<typeof schema>;
</script>

<template>
  <AuthCard>
    <template #logo>
      <NuxtLink to="/">
        <img src="/icon-green.svg" class="h-16 w-16" >
      </NuxtLink>
    </template>

    <UForm :state="data" :schema="schema" class="space-y-4" @submit="submit">
      <UFormGroup label="Password" name="password">
        <UInput v-model="data.password" type="password" />
      </UFormGroup>

      <UFormGroup label="Password again" name="password">
        <UInput v-model="data.password_confirmation" type="password" />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </AuthCard>
</template>
