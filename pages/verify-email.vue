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
});
</script>

<template>
  <AuthCard>
    <template #header>
      <h1 class="mb-11 text-center text-xl font-medium">
        Verify your email address
      </h1>
    </template>

    <template #form>
      <template v-if="verificationIsSent">
        <div class="mb-4 text-sm font-medium text-primary">
          A new verification link has been sent to the email address you
          provided during registration.
        </div>
      </template>

      <div class="mt-14 flex justify-end">
        <UButton
          @click="handleResendVerification"
          :disabled="verificationIsSent"
          size="xs"
        >
          Resend Verification Email
        </UButton>
      </div>
    </template>
  </AuthCard>
</template>
