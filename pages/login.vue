<template>
	<!--   <div class="flex flex-col justify-center min-h-[calc(100%-100px)]">
    <UCard
      class="flex flex-col my-0 mx-auto w-[400px] px-[32px] py-[40px] bg-white rounded-sm shadow-lg box-border hover:shadow-xl  transition-all duration-200">
      <template #header>
        <p>Login to continue</p>
      </template>

<UForm ref="form" :schema="schema" :state="data" class="space-y-3" @submit="submit">

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
</div> -->

	<div class="bgImage">
		<div class="flex h-[100vh] flex-col justify-center">
			<UCard
				class="mx-auto my-0 box-border flex w-[400px] flex-col rounded-sm bg-white px-[32px] py-[40px] shadow-lg transition-all duration-200 hover:shadow-xl"
			>
				<FormKit
					id="loginForm"
					type="form"
					submit-label="Login"
					:actions="false"
					@submit="submit"
				>
					<FormKit
						v-model="data.username"
						type="text"
						name="username"
						label="Username"
						placeholder="username"
						validation="required"
					/>

					<FormKit
						v-model="data.password"
						type="password"
						name="password"
						label="Password"
						placeholder="password"
						validation="required"
					/>

					<UAlert
						v-if="validationErrors.error"
						title="Incorrect credentials"
						variant="outline"
						color="red"
						:ui="{ padding: 'p-3', wrapper: 'mb-2' }"
					/>

					<UButton
						type="submit"
						class="mb-2 h-10"
						block
						variant="solid"
						color="primary"
					>
						Login
					</UButton>

					<SocialAuth
						class="mt-12"
						:for="'google'"
					/>
					<SocialAuth
						class="mt-[12px]"
						:for="'github'"
					/>
				</FormKit>

				<nuxt-link
					to="/forgot-password"
					class="block w-[100%] text-right text-sm font-light text-gray-400"
					>Don't remember your password?</nuxt-link
				>
			</UCard>

			<!--     <NuxtImg src="trello-left.svg" sizes="" />
    <NuxtImg src="trello-right.svg" /> -->
		</div>
	</div>
</template>
<script setup lang="ts">
	//import { z } from 'zod';
	//import type { FormError, FormSubmitEvent } from '#ui/types';
	/*   const schema = z.object({
      email: z.string().email('Invalid email'),
      password: z.string().min(8, 'Must be at least 8 characters'),
      remember: z.boolean(),
    }) */

	//type Schema = z.output<typeof schema>

	import { reset } from "@formkit/core";
	definePageMeta({ middleware: ["guest"], layout: "no-header" });

	const router = useRouter();
	const route = useRoute();
	const { login } = useMyUserStore();

	const data = reactive({
		username: "",
		password: "",
	});

	const status = ref(
		(route.query.reset ?? "").length > 0
			? atob(route.query.reset as string)
			: ""
	);

	const { submit, succeeded, validationErrors, error, inProgress } = useSubmit(
		() => {
			status.value = "";
			return login(data);
		},
		{
			onSuccess: (res) => {
				//reset('loginForm', { username: null, password: null });
				router.push("/");
			},

			onError: (res) => {
				console.log(res);
			},
		}
	);

	// { "username": [ "Incorrect username" ], "password": [ "Incorrect password" ] }
</script>
