<script setup lang="ts">
  //definePageMeta({ middleware: ["unverified"] });

  const { logout, resendEmailVerification } = useAuth();
  const verificationIsSent = ref(false);

  async function handleResendVerification() {
    const status = (await resendEmailVerification()).status;
    if (status === "verification-link-sent") {
      verificationIsSent.value = true;
    }
  }

  onBeforeMount(async () => {
    //await handleResendVerification();
  })

</script>

<template>
  <AuthCard>
    <template #logo>
      <NuxtLink to="/">
        <img src="/public/favicon.ico" />
      </NuxtLink>
    </template>

    <div class="mb-4 text-sm text-gray-600">
      Thanks for signing up! Before getting started, could you verify your email
      address by clicking on the link we just emailed to you? If you didn't
      receive the email, we will gladly send you another.
    </div>

    <template v-if="verificationIsSent">
      <div class="mb-4 font-medium text-sm text-green-600">
        A new verification link has been sent to the email address you provided
        during registration.
      </div>
    </template>

    <div class="mt-4 flex items-center justify-between">
      <UButton @click="handleResendVerification" :disabled="verificationIsSent">
        Resend Verification Email
      </UButton>

      <UButton type="button" class="underline text-sm" @click="logout">
        Logout
      </UButton>
    </div>
  </AuthCard>
</template>
