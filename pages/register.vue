<template>
	<div class="bgImage">
		<div class="flex flex-col justify-center h-[100vh]">
			<UCard
				class="flex flex-col my-0 mx-auto w-[600px] px-[32px] py-[40px] bg-white rounded-sm shadow-lg box-border hover:shadow-xl transition-all duration-200"
			>
				<template #header>
					<p class="text-center text-xl font-medium">Sign up to continue</p>
				</template>

				<UForm
					ref="form"
					:schema="schema"
					:state="data"
					class="space-y-3"
					@submit="submit"
				>
					<div class="flex gap-3">
						<UFormGroup
							label="Username"
							name="username"
							class="w-[50%]"
						>
							<UInput
								v-model="data.username"
								class="w-full"
							/>
						</UFormGroup>

						<UFormGroup
							label="Email"
							name="email"
							class="w-[50%]"
						>
							<UInput
								v-model="data.email"
								class="w-full"
							/>
						</UFormGroup>
					</div>

					<div class="flex gap-3">
						<UFormGroup
							label="Name"
							name="first_name"
							class="w-[50%]"
						>
							<UInput v-model="data.first_name" />
						</UFormGroup>

						<UFormGroup
							label="Surname"
							name="last_name"
							class="w-[50%]"
						>
							<UInput
								v-model="data.last_name"
								class="w-full"
							/>
						</UFormGroup>
					</div>

					<div class="flex gap-3">
						<UFormGroup
							label="Password"
							name="password"
							class="w-[50%]"
						>
							<UInput
								v-model="data.password"
								type="password"
								class="w-full"
							/>
						</UFormGroup>

						<UFormGroup
							label="Confirm password"
							name="password_confirmation"
							class="w-[50%]"
						>
							<UInput
								v-model="data.password_confirmation"
								type="password"
								class="w-full"
							/>
						</UFormGroup>
					</div>

					<div class="">
						<UButton
							type="submit"
							class="mb-2 h-10"
							block
							variant="solid"
							color="primary"
						>
							Sign Up
						</UButton>

						<SocialAuth
							class="mt-12"
							:for="'google'"
						/>
						<SocialAuth
							class="mt-[12px]"
							:for="'github'"
						/>
					</div>
				</UForm>
			</UCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { z } from "zod";

definePageMeta({ middleware: ["guest"] });
definePageMeta({
	layout: "no-header",
});

const route = useRoute();
const { register } = useMyUserStore();

const status = ref(
	(route.query.reset ?? "").length > 0 ? atob(route.query.reset as string) : ""
);

const schema = z
	.object({
		username: z.string().min(6, "Must be at least 6 characters"),
		first_name: z.string(),
		last_name: z.string(),
		email: z.string().email("Invalid email"),
		password: z.string().min(8, "Must be at least 8 characters"),
		password_confirmation: z.string().min(8, "Must be at least 8 characters"),
	})
	.refine((val) => val.password === val.password_confirmation, {
		message: "Passwords do not match",
	});

const data = reactive({
	username: "",
	first_name: "",
	last_name: "",
	email: "",
	password: "",
	password_confirmation: "",
});

//{ "username": ["The username has already been taken."], "email": ["The email has already been taken."] }

const form = ref();
const router = useRouter();

const { submit, succeeded, validationErrors, error, inProgress } = useSubmit(
	() => {
		status.value = "";
		return register(data);
	},
	{
		onSuccess: () => {
			form.value.clear();
			router.push("/verify-email");
		},
		onError: () => {
			form.value.setErrors(
				Object.entries(validationErrors.value).map(([key, value]) => ({
					path: key,
					message: value[0],
				}))
			);
		},
	}
);
/*       : input - errors="{
    username: validationErrors.username,
      password: validationErrors.password
        }"
   */
</script>
