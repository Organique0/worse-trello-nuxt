<template>
  <div class="p-[8px] max-h-12  overflow-hidden flex box-border border-b-[1px] transition-colors bg-white space-x-2">
    <div class="flex w-full">

      <UDropdown>
        <nuxt-link class="block relative mt-0 flex-shrink-0 py-2 px-2 h-[32px] rounded-sm hover:bg-slate-200">
          <PhDotsNineBold />
        </nuxt-link>
      </UDropdown>

      <nuxt-link @mouseenter="addHoverClass" @mouseleave="removeHoverClass"
        class="block relative mt-0 flex-shrink-0 py-2 px-2 h-[32px] rounded-sm hover:bg-slate-200">
        <div :class="currentGif" class="logoBeforeAfter ">
          <div class="h-[16px] w-[75px] py-[8px] px-0 opacity-100 m-0" />
        </div>
      </nuxt-link>

      <UDropdown class="block relative mt-0 px-2 h-[32px]" :items=workspaceItems>
        <UButton color="white" label="Recent" trailing-icon="i-heroicons-chevron-down-20-solid"
          class="hover:bg-slate-200 text-opacity-65" variant="ghost" :ui="{ rounded: 'rounded-sm' }" />


        <template #item="{ item }">
          <div class="inline-flex w-full">
            <NuxtImg :src="item.src" class=" h-4 w-4" />
            <p class="font-semibold ml-1 float-left">{{ item.title }}</p>
          </div>
        </template>

      </UDropdown>

      <UDropdown class="block relative mt-0 px-2 h-[32px]" :items=recentItems>
        <UButton color="white" label="Recent" trailing-icon="i-heroicons-chevron-down-20-solid"
          class="hover:bg-slate-200 text-opacity-65" variant="ghost" :ui="{ rounded: 'rounded-sm' }" />


        <template #item="{ item }">
          <div class="inline-flex w-full">
            <NuxtImg :src="item.src" class=" h-4 w-4" />
            <p class="font-semibold ml-1 float-left">{{ item.title }}</p>
          </div>
        </template>

      </UDropdown>

      <UDropdown class="block relative mt-0  px-2 h-[32px]" :items="starredItems"
        :ui="{ item: { disabled: 'cursor-default bg-white opacity-100' } }">
        <UButton color="white" label="Starred" trailing-icon="i-heroicons-chevron-down-20-solid"
          class="hover:bg-slate-200 text-opacity-65" variant="ghost" :ui="{ rounded: 'rounded-sm' }" />

        <template #item="{ item }">
          <div>
            <NuxtImg src="/starred.svg" />
            <p>
              Star important boards to access them quicly and easily.
            </p>
          </div>
        </template>
      </UDropdown>

      <UDropdown :items="templatesItems"
        :ui="{ item: { base: 'block', disabled: 'cursor-default bg-white opacity-100' }, container: 'w-72' }"
        class="block relative mt-0 px-2 h-[32px]">
        <UButton color="white" label="Templates" trailing-icon="i-heroicons-chevron-down-20-solid"
          class="hover:bg-slate-200 text-opacity-65" variant="ghost" :ui="{ rounded: 'rounded-sm' }" />

        <!--         <template #item="{ item }">
          <div class="inline-flex w-full">
            <NuxtImg :src="item.src" class=" h-4 w-4" />
            <p class="font-semibold ml-1 float-left">{{ item.title }}</p>
          </div>
        </template>

        <template #ExploreTemplates="{ item }">
          <div class="inline-flex w-full items-center">
            <iconify-icon :icon="item.icon" class=" h-4 w-4" />
            <p class="font-semibold text-left ml-1">
              {{ item.title }}
            </p>
          </div>
          <UButton block color="gray" variant="soft" class="mt-2">Explore templates</UButton>
        </template> -->

        <template>
          <UContainer>
            <Placeholder class="h-32" />
          </UContainer>
        </template>
      </UDropdown>


      <UDropdown :items="createItems" :ui="{ item: { base: 'block' }, container: 'w-72' }"
        :popper="{ placement: 'bottom-start' }" class="px-2">
        <UButton :ui="{ rounded: 'rounded-sm' }" class="bg-primary ring-0">
          Create
        </UButton>

        <template #item="{ item }">
          <div class="inline-flex w-full">
            <iconify-icon :icon="item.icon" class="flex-shrink-0 h-4 w-4" />
            <p class="font-semibold ml-1">{{ item.label }}</p>
          </div>
          <div class="text-left">
            <p>{{ item.body }}</p>
          </div>
        </template>
      </UDropdown>

    </div>
    <div class="flex space-x-1">
      <UInput class="min-w-60" placeholder="Search" icon="i-heroicons-magnifying-glass-20-solid" />

      <UDropdown>
        <UButton color="blue" :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-bell-alert" />
      </UDropdown>

      <UDropdown>
        <UButton color="white" :ui="{ rounded: 'rounded-full', border: 'none' }" icon="i-heroicons-information-circle"
          variant="ghost" class="hover:bg-slate-300" />
      </UDropdown>

      <UDropdown :items="items"
        :ui="{ width: 'w-[20em]', padding: 'py-3 px-0', item: { rounded: 'rounded-none', padding: 'px-4', disabled: 'opacity-100 bg-white hover:bg-white cursor-default' } }">
        <UButton color="white" :ui="{ rounded: 'rounded-full' }" class="w-8 bg-white ring-0 hover:bg-slate-300">
          <img src="/favicon.ico" class="w-6" />
        </UButton>

        <template #user="{ item }">
          <div class="text-left h-10 flex space-x-2">
            <div class="bg-orange-400 rounded-full h-10 w-10 font-bold text-lg text-center flex justify-center">
              <p class="m-auto">LG</p>
            </div>
            <div class="w-[70%]">
              <p class="text-gray-900 dark:text-white font-medium">
                {{ item.name }}
              </p>
              <p class="font-light text-gray-900 dark:text-white">
                {{ item.email }}
              </p>
            </div>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>
          <iconify-icon :icon="item.icon" class="flex-shrink-0 h-4 w-4 ms-auto" />
        </template>

      </UDropdown>

    </div>
  </div>

</template>

<script lang="ts" setup>
  import { Icon } from '@iconify/vue';
  const isHovered = ref(false);
  const staticGif = 'logoBeforeAfter';
  var currentGif = ref('logoBeforeAfter');
  const animatedGif = 'logoBeforeAfterAnimated';

  const items = [
    [{
      label: 'ACCOUNT',
      disabled: true
    },
    {
      name: 'Luka Grabnar',
      email: 'grabnar.luka@gmail.com',
      image: 'icon-green',
      slot: 'user',
      disabled: true
    },
    {
      label: 'Switch accounts',
    }, {
      label: 'Manage account',
      icon: 'formkit:linkexternal',
      click: () => {
        console.log('Edit')
      }
    }],
    [{
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
    ],
    [
      {
        label: "Help"
      },
      {
        label: "Shortcuts"
      }
    ],
    [
      {
        label: "Log out"
      }
    ]
  ];

  const createItems = [
    [{
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
    }]
  ];

  const templatesItems = [
    [
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
    ], [
      {
        icon: "icon-park:page-template",
        title: "See hundreds of templates from the Trello community",
        slot: "ExploreTemplates",
        disabled: true
      },
    ],
  ];

  const starredItems = [

    [
      {
        disabled: true,
      }
    ]

  ];

  const recentItems = [
    [
      {
        src: "/templatesExample.jpg",
        title: "1-on-1 Meeting Agenda",
        type: "Trello workspace",
      }
    ]
  ];

  const workspaceItems = [
    [
      {

      }
    ]
  ]

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