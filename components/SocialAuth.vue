<template>
	<div>
		<UButton
			color="white"
			class="mb-4 h-10"
			block
			@click="onSubmit"
		>
			<LogosGithubIcon v-if="props.for === 'github'" />
			<LogosGoogleIcon v-if="props.for === 'google'" />
			{{ props.for.charAt(0).toUpperCase() + props.for.slice(1) }}
		</UButton>
	</div>
</template>

<script lang="ts" setup>
	const { backendUrl } = useRuntimeConfig().public;
	const props = defineProps({
		for: {
			type: String,
			required: true,
		},
	});

	const onSubmit = async () => {
		await initiateOAuthFlow();
	};

	const initiateOAuthFlow = async () => {
		const redirectUri = encodeURIComponent(
			`${window.location.origin}/auth/google/callback`
		);
		const authUrl = `${backendUrl}/auth/google?redirect_uri=${redirectUri}`;
		window.location.href = authUrl;
	};
</script>
