<script setup lang="ts">
  //definePageMeta({ middleware: ["unverified"] });

  const { resendEmailVerification } = useAuth();
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

    <h1 class="mb-8 text-lg font-semibold text-center mt-4">
      Verify your email address
    </h1>

    <template v-if="true">
      <div class="mb-4 font-medium text-sm text-primary">
        A new verification link has been sent to the email address you provided
        during registration.
      </div>
    </template>

    <div class="mt-14 flex justify-end">
      <UButton @click="handleResendVerification" :disabled="verificationIsSent" size="xs">
        Resend Verification Email
      </UButton>
    </div>
  </AuthCard>
</template>
