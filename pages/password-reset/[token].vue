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
	} = useSubmit(
		() => resetPassword({ token: token.value as string, ...data }),
		{
			onSuccess: (result) =>
				router.push({
					path: "/login",
					query: { reset: btoa(result?.status ?? "") },
				}),
		}
	);

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
		<template #header>
			<h1 class="mb-11 text-center text-xl font-medium">Enter new password</h1>
		</template>

		<template #form>
			<UForm
				:state="data"
				:schema="schema"
				class="space-y-4"
				@submit="submit"
			>
				<UFormGroup
					label="Password"
					name="password"
				>
					<UInput
						v-model="data.password"
						type="password"
					/>
				</UFormGroup>

				<UFormGroup
					label="Password again"
					name="password"
				>
					<UInput
						v-model="data.password_confirmation"
						type="password"
					/>
				</UFormGroup>

				<UButton type="submit"> Submit </UButton>
			</UForm>
		</template>
	</AuthCard>
</template>
