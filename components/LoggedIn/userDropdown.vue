<template>
	<div>
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<Button
					class="relative block h-8 w-8 !rounded-full border-none !bg-transparent p-1 workspaceHeaderShadButtonDark"
					:class="!dark && dynamicHover"
				>
					<div class="flex h-full w-full items-center justify-center">
						<span
							class="flex h-6 w-6 items-center justify-center rounded-full bg-orange-400 text-xs font-bold text-slate-700"
							>{{
								user?.first_name[0].toUpperCase() +
								"" +
								user?.last_name[0].toUpperCase()
							}}</span
						>
					</div>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent class="w-80 p-4">
				<DropdownMenuLabel class="px-0 py-2 text-xs text-muted-foreground">
					ACCOUNT
				</DropdownMenuLabel>

				<!--userInfo-->
				<div class="my-2 inline-flex h-10 space-x-2 text-left">
					<!--userIcon-->
					<div
						class="flex h-10 w-10 justify-center rounded-full bg-orange-400 text-center text-lg font-bold"
					>
						<p class="m-auto dark:text-black">LG</p>
					</div>

					<div class="leading-4">
						<!--username-->
						<p
							v-if="user"
							class="text-gray-900 dark:text-muted-foreground"
						>
							{{ user.first_name }}
						</p>
						<p
							v-else
							class="text-gray-900 dark:text-muted-foreground"
						>
							Luka Grabnar
						</p>
						<!--email-->
						<p
							v-if="user"
							class="text-xs text-gray-900 dark:text-muted-foreground"
						>
							{{ user.email }}
						</p>
						<p
							v-else
							class="text-xs text-gray-900 dark:text-muted-foreground"
						>
							grabnar.luka@gmail.com
						</p>
					</div>
				</div>

				<DropdownMenuItem
					class="relative left-[-1rem] w-[calc(100%+2.1rem)] rounded-none"
				>
					<span class="w-full cursor-pointer pl-2"> Switch accounts </span>
				</DropdownMenuItem>

				<DropdownMenuItem
					class="relative left-[-1rem] w-[calc(100%+2.1rem)] rounded-none"
				>
					<span class="w-full cursor-pointer pl-2"> Manage account </span>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuLabel class="px-0 py-2 text-xs text-muted-foreground"
					>TRELLO</DropdownMenuLabel
				>
				<DropdownMenuItem
					class="relative left-[-1rem] w-[calc(100%+2.1rem)] rounded-none"
				>
					<span class="w-full cursor-pointer pl-2">Profile and visibility</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					class="relative left-[-1rem] w-[calc(100%+2.1rem)] rounded-none"
				>
					<span class="w-full cursor-pointer pl-2"> Activity </span>
				</DropdownMenuItem>
				<DropdownMenuItem
					class="relative left-[-1rem] w-[calc(100%+2.1rem)] rounded-none"
				>
					<span class="w-full cursor-pointer pl-2"> Cards </span>
				</DropdownMenuItem>
				<DropdownMenuItem
					class="relative left-[-1rem] w-[calc(100%+2.1rem)] rounded-none"
				>
					<span class="w-full cursor-pointer pl-2"> Settings </span>
				</DropdownMenuItem>

				<DropdownMenuSub>
					<DropdownMenuSubTrigger class="userDropdownThemeSubTrigger">
						<span
							class="w-full cursor-pointer pl-2"
							as-child
							>Theme</span
						>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent class="mr-1 h-[13rem] w-[13rem] px-0 py-3">
							<DropdownMenuRadioGroup
								v-model="theme"
								class="h-full w-full"
							>
								<DropdownMenuRadioItemTheme
									value="light"
									class=""
								>
									<NuxtImg
										src="lightMode.svg"
										width="60"
										class="rounded-lg border shadow-sm"
									/>
									<p class="ml-3">Light</p>
								</DropdownMenuRadioItemTheme>
								<DropdownMenuRadioItemTheme
									value="dark"
									class=""
								>
									<NuxtImg
										src="darkMode.svg"
										width="60"
										class="rounded-lg border shadow-sm"
									/>
									<p class="ml-3">Dark</p>
								</DropdownMenuRadioItemTheme>
								<DropdownMenuRadioItemTheme
									value="system"
									class=""
								>
									<NuxtImg
										src="matchMode.svg"
										width="60"
										class="rounded-lg border shadow-sm"
									/>
									<p class="ml-3">Match browser</p>
								</DropdownMenuRadioItemTheme>
							</DropdownMenuRadioGroup>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					class="relative left-[-1rem] w-[calc(100%+2.1rem)] rounded-none"
				>
					<span class="w-full cursor-pointer pl-2"> Help </span>
				</DropdownMenuItem>
				<DropdownMenuItem
					class="relative left-[-1rem] w-[calc(100%+2.1rem)] rounded-none"
				>
					<span class="w-full cursor-pointer pl-2"> Shortcuts </span>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					class="relative left-[-1rem] w-[calc(100%+2.1rem)] rounded-none"
					@click="logout"
				>
					<span class="w-full cursor-pointer pl-2"> Log out </span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</template>

<script lang="ts" setup>
	const colorMode = useColorMode();
	const { user, isLoggedIn, logout } = useMyUserStore();
	//@click="colorMode.preference = 'light'"
	const theme = ref("theme");

	watch(theme, (newTheme) => {
		colorMode.preference = newTheme;
	});
	const colorStore = useColorStore();

	defineProps<{
		dynamicHover: String;
		dark: boolean;
	}>();
</script>
