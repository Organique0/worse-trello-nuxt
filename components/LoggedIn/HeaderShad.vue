<template>
  <div class="p-[8px] max-h-12  overflow-hidden flex box-border border-b-[1px] transition-colors bg-white ">
    <div class="flex w-full space-x-1">
      <ConfigProvider :use-id="useIdFunction">
        <!---more button-->
        <DropdownMenu>
          <DropdownMenuTrigger
            class="block relative mt-0 flex-shrink-0 py-2 h-[32px] w-[32px] rounded-sm hover:bg-slate-200">
            <iconify-icon icon="gravity-ui:dots-9" style="color: black"></iconify-icon>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


        <!--gif logo-->
        <nuxt-link @mouseenter="addHoverClass" @mouseleave="removeHoverClass"
          class="block relative mt-0 flex-shrink-0 py-2 px-2 h-[32px] rounded-sm hover:bg-slate-200">
          <div :class="currentGif" class="logoBeforeAfter ">
            <div class="h-[16px] w-[75px] py-[8px] px-0 opacity-100 m-0" />
          </div>
        </nuxt-link>

        <!--workspaces-->
        <DropdownMenu>
          <DropdownMenuTrigger class=" hover:bg-slate-200 text-opacity-65 rounded-sm" as-child>
            <Button class="hover:bg-slate-200 text-opacity-65 rounded-sm block relative mt-0 px-2 h-[32px]"
              variant="ghost">
              Workspaces
              <iconify-icon icon="heroicons-outline:chevron-down" style="color: black"></iconify-icon>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Your Workspaces</DropdownMenuLabel>

            <DropdownMenuItem v-for="item in workspaceItems">
              <div class="inline-flex w-full">
                <NuxtImg :src="item.src" class="h-4 w-4" />
                <p class="font-semibold ml-1">{{ item.title }}</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>

        </DropdownMenu>

        <!--recent-->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button class="hover:bg-slate-200 text-opacity-65 rounded-sm block relative mt-0 px-2 h-[32px]"
              variant="ghost">
              Recent
              <iconify-icon icon="heroicons-outline:chevron-down" style="color: black"></iconify-icon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem v-for="item in recentItems">
              <div class="inline-flex w-full">
                <NuxtImg :src="item.src" class="h-4 w-4" />
                <p class="font-semibold ml-1">{{ item.title }}</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!--starred-->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button class="hover:bg-slate-200 text-opacity-65 rounded-sm block relative mt-0 px-2 h-[32px]"
              variant="ghost">
              Starred
              <iconify-icon icon="heroicons-outline:chevron-down" style="color: black"></iconify-icon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="max-w-72">
            <div v-if="starredItems.length > 0">
              <DropdownMenuItem v-for="item in starredItems">
                <div class="inline-flex w-full">
                  <NuxtImg :src="item.src" class="h-4 w-4" />
                  <p class="font-semibold ml-1">{{ item.title }}</p>
                </div>
              </DropdownMenuItem>
            </div>
            <div v-else>
              <NuxtImg src="/starred.svg" />
              <p>
                Star important boards to access them quicly and easily.
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <!--Templates-->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button class="hover:bg-slate-200 text-opacity-65 rounded-sm block relative mt-0 px-2 h-[32px]"
              variant="ghost">
              Templates
              <iconify-icon icon="heroicons-outline:chevron-down" style="color: black"></iconify-icon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="max-w-72">
            <DropdownMenuItem v-for="item in templatesItems">
              <div class="inline-flex w-full">
                <NuxtImg :src="item.src" class="h-4 w-4" />
                <p class="font-semibold ml-1">{{ item.title }}</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <iconify-icon icon="icon-park:page-template" class="flex-shrink-0 h-4 w-4" />
              <p class="font-semibold ml-1">See hundreds of templates from the Trello comunity</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UButton block color="gray" variant="soft" class="mt-2">Explore templates</UButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!--create-->
        <DropdownMenu>

          <DropdownMenuTrigger as-child>
            <Button class="bg-primary text-opacity-65 rounded-sm block relative mt-0 px-2 h-[32px]">
              Create
            </Button>
          </DropdownMenuTrigger>


          <DropdownMenuContent class=" p-2">
            <DropdownMenuItem v-for="item in createItems" class="max-w-72">
              <div class="block">
                <div class="inline-flex w-full">
                  <iconify-icon :icon="item.icon" class="flex-shrink-0 h-4 w-4" />
                  <p class="font-semibold ml-1">{{ item.label }}</p>
                </div>
                <div class="text-left text-xs leading-4">
                  <p>{{ item.body }}</p>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ConfigProvider>
    </div>

    <!--user-->
    <div class="flex space-x-1">
      <div class="relative min-w-60">
        <Input id="search" type="text" placeholder="Search..." class="h-full pl-10" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <iconify-icon icon="material-symbols-light:search" width="1.2rem" height="1.2rem"
            style="color: black"></iconify-icon>
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger class="h-8 w-8 bg-primary rounded-full" as-child>
          <Button size="icon" :id="id">
            <iconify-icon icon="tabler:bell-ringing-2" width="1.2rem" height="1.2rem"
              style="color: black"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger class="h-8 w-8 text-white rounded-full border-none hover:bg-slate-300" as-child>
          <Button size="icon" variant="ghost" :id="id">
            <iconify-icon icon="ph:question" width="1.2rem" height="1.2rem" style="color: black"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button class="bg-transparent hover:bg-slate-300 border-none block h-8 p-1 relative w-8 rounded-full">
            <div class="flex items-center justify-center h-full w-full">
              <span class="bg-orange-300 h-6 w-6 rounded-full flex items-center justify-center">LG</span>
            </div>
          </Button>
        </DropdownMenuTrigger>


        <DropdownMenuContent class="p-2 max-w-72">
          <DropdownMenuLabel>ACCOUNT</DropdownMenuLabel>
          <div class="text-left h-10 flex space-x-2">
            <div class="bg-orange-400 rounded-full h-10 w-10 font-bold text-lg text-center flex justify-center">
              <p class="m-auto">LG</p>
            </div>
            <div class="w-[70%]">
              <p class="text-gray-900 dark:text-white font-medium" v-if="isLoggedIn">
                {{ user.name }}
              </p>
              <p class="text-gray-900 dark:text-white font-medium" v-else>
                Luka Grabnar
              </p>
              <p class="font-light text-gray-900 dark:text-white" v-if="isLoggedIn">
                {{ user.email }}
              </p>
              <p class="font-light text-gray-900 dark:text-white" v-else>
                grabnar.luka@gmail.com
              </p>
            </div>
          </div>

          <DropdownMenuItem>
            <UButton>
              Switch accounts
            </UButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UButton>
              Manage account
            </UButton>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuLabel>TRELLO</DropdownMenuLabel>
          <DropdownMenuItem>
            <UButton>
              Profile and visibility
            </UButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UButton>
              Activity
            </UButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UButton>
              Cards
            </UButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UButton>
              Settings
            </UButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UButton>
              Theme
            </UButton>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <UButton>
              Help
            </UButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UButton>
              Shortcuts
            </UButton>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <UButton>
              Log out
            </UButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>



  </div>

</template>

<script lang="ts" setup>
  const { user, isLoggedIn } = useMyUserStore();
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/shadComponents/ui/dropdown-menu';
  import { Input } from '@/shadComponents/ui/input'
  import { Button } from '@/shadComponents/ui/button';

  import { ConfigProvider } from 'radix-vue'
  const useIdFunction = () => useId();

  const isHovered = ref(false);
  const staticGif = 'logoBeforeAfter';
  var currentGif = ref('logoBeforeAfter');
  const animatedGif = 'logoBeforeAfterAnimated';
  const id = useId();

  const items = [

    {
      label: 'Switch accounts',
    }, {
      label: 'Manage account',
      icon: 'formkit:linkexternal',
      click: () => {
        console.log('Edit')
      }
    },
    {
      label: "TRELLO",
      disabled: true
    },
    {
      label: "Profile and visibility"
    },
    {
      label: "Activity"
    },
    {
      label: "Cards"
    },
    {
      label: "Settings",
    },
    {
      label: "Theme",
      icon: 'material-symbols:arrow-forward-ios-rounded'
    },

    {
      label: "Help"
    },
    {
      label: "Shortcuts"
    }

    ,
    {
      label: "Log out"
    }

  ];

  const createItems = [
    {
      label: 'Create board',
      icon: 'lucide:trello',
      body: 'A board made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.'
    },
    {
      label: 'Start with a template',
      icon: 'lucide:layout-template',
      body: 'Get started with a bord template.'
    },
    {
      label: 'Create Workspace',
      icon: 'lucide:users-round',
      body: 'A workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.'
    }
  ];

  const templatesItems = [
    {
      title: "1-on-1 Meeting Agenda",
      src: "/templatesExample.jpg",
    },
    {
      title: "Agile Board Template | Trello",
      src: "/templatesExample.jpg",
    },
    {
      title: "Company Overview",
      src: "/templatesExample.jpg",
    },
    {
      title: "Design Huddle",
      src: "/templatesExample.jpg",
    },
    {
      title: "Go To Market Strategy Template",
      src: "/templatesExample.jpg",
    },
  ];

  const starredItems: any[] = [

  ];

  const recentItems = [
    {
      src: "/templatesExample.jpg",
      title: "1-on-1 Meeting Agenda",
      type: "Trello workspace",
    }
  ];

  const workspaceItems = [
    {
      src: "/templatesExample.jpg",
      title: "Trello Workspace"
    }
  ];

  function addHoverClass() {
    isHovered.value = true;
    currentGif.value = animatedGif;
  };

  function removeHoverClass() {
    isHovered.value = false;
    currentGif.value = staticGif;
  };
</script>
<style>
.logoBeforeAfter::before,
.logoBeforeAfter::after {
  content: '';
  background-image: url('/public/logoStatic.gif');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.logoBeforeAfterAnimated::before,
.logoBeforeAfterAnimated::after {
  background-image: url('/public/logoGif.gif');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  content: '';
}

.logoBeforeAfter {
  filter: brightness(0) saturate(100%) invert(30%) sepia(53%) saturate(323%) hue-rotate(179deg) brightness(91%) contrast(88%);
}
</style>