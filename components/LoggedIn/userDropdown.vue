<template>
	<div>
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<Button
					class="bg-transparent hover:bg-slate-300 border-none block h-8 p-1 relative w-8 rounded-full"
				>
					<div class="flex items-center justify-center h-full w-full">
						<span
							class="bg-orange-300 h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs text-black"
							>LG</span
						>
					</div>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent class="p-4 w-80">
				<DropdownMenuLabel class="text-xs text-muted-foreground px-0 py-2">
					ACCOUNT
				</DropdownMenuLabel>

				<!--userInfo-->
				<div class="text-left h-10 inline-flex space-x-2 my-2">
					<!--userIcon-->
					<div
						class="bg-orange-400 rounded-full h-10 w-10 font-bold text-lg text-center flex justify-center"
					>
						<p class="m-auto">LG</p>
					</div>

					<div class="leading-4">
						<!--username-->
						<p
							class="text-gray-900 dark:text-muted-foreground"
							v-if="isLoggedIn"
						>
							{{ user.name }}
						</p>
						<p
							class="text-gray-900 dark:text-muted-foreground"
							v-else
						>
							Luka Grabnar
						</p>
						<!--email-->
						<p
							class="text-gray-900 dark:text-muted-foreground text-xs"
							v-if="isLoggedIn"
						>
							{{ user.email }}
						</p>
						<p
							class="text-gray-900 dark:text-muted-foreground text-xs"
							v-else
						>
							grabnar.luka@gmail.com
						</p>
					</div>
				</div>

				<DropdownMenuItem
					class="relative w-[calc(100%+2.1rem)] left-[-1rem] rounded-none"
				>
					<span class="w-full pl-4 cursor-pointer"> Switch accounts </span>
				</DropdownMenuItem>

				<DropdownMenuItem
					class="relative w-[calc(100%+2.1rem)] left-[-1rem] rounded-none"
				>
					<span class="w-full pl-4 cursor-pointer"> Manage account </span>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuLabel class="text-xs text-muted-foreground px-0 py-2"
					>TRELLO</DropdownMenuLabel
				>
				<DropdownMenuItem
					class="relative w-[calc(100%+2.1rem)] left-[-1rem] rounded-none"
				>
					<span class="w-full pl-4 cursor-pointer">Profile and visibility</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					class="relative w-[calc(100%+2.1rem)] left-[-1rem] rounded-none"
				>
					<span class="w-full pl-4 cursor-pointer"> Activity </span>
				</DropdownMenuItem>
				<DropdownMenuItem
					class="relative w-[calc(100%+2.1rem)] left-[-1rem] rounded-none"
				>
					<span class="w-full pl-4 cursor-pointer"> Cards </span>
				</DropdownMenuItem>
				<DropdownMenuItem
					class="relative w-[calc(100%+2.1rem)] left-[-1rem] rounded-none"
				>
					<span class="w-full pl-4 cursor-pointer"> Settings </span>
				</DropdownMenuItem>

				<DropdownMenuSub>
					<DropdownMenuSubTrigger
						class="relative w-[calc(100%+2.1rem)] left-[-1rem] rounded-none"
					>
						<span
							class="w-full pl-4 cursor-pointer"
							as-child
							>Theme</span
						>
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem @click="colorMode.preference = 'light'">
								Light
							</DropdownMenuItem>
							<DropdownMenuItem @click="colorMode.preference = 'dark'">
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem @click="colorMode.preference = 'system'">
								System
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					class="relative w-[calc(100%+2.1rem)] left-[-1rem] rounded-none"
				>
					<span class="w-full pl-4 cursor-pointer"> Help </span>
				</DropdownMenuItem>
				<DropdownMenuItem
					class="relative w-[calc(100%+2.1rem)] left-[-1rem] rounded-none"
				>
					<span class="w-full pl-4 cursor-pointer"> Shortcuts </span>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					class="relative w-[calc(100%+2.1rem)] left-[-1rem] rounded-none"
					@click="logout"
				>
					<span class="w-full pl-4 cursor-pointer"> Log out </span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
</template>

<script lang="ts" setup>
const colorMode = useColorMode();
const { user, isLoggedIn, logout } = useMyUserStore();
</script>
