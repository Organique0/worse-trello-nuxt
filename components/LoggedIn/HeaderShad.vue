<template>
  <div class="max-h-[48px] min-h-[48px]">
    <ConfigProvider :use-id="useIdFunction">
      <div class="box-border flex max-h-12 overflow-hidden border-b-[1px] p-[8px] transition-colors">
        <div class="flex w-full space-x-1">
          <!---more button-->
          <DropdownMenu>
            <DropdownMenuTrigger
              class="relative mt-0 block h-[32px] w-[32px] flex-shrink-0 rounded-sm py-2 hover:bg-slate-200 dark:hover:bg-opacity-10">
              <Icon name="gravity-ui:dots-9" :ssr="true" class="p-auto m-auto !block" />
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
          <div @mouseenter="addHoverClass" @mouseleave="removeHoverClass"
            class="relative mt-0 block h-[32px] flex-shrink-0 rounded-sm px-2 py-2 hover:bg-slate-200 dark:hover:bg-opacity-10">
            <div :class="currentGif" class="logoBeforeAfter">
              <div class="m-0 h-[16px] w-[75px] px-0 py-[8px] opacity-100" />
            </div>
          </div>

          <!--workspaces-->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button class="relative mt-0 block h-[32px] rounded-sm px-2 py-0" variant="ghost">
                Workspaces

                <Icon name="tabler:chevron-down" :ssr="true" class="inline-flex text-opacity-65 dark:text-white" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent class="w-[20rem] p-3">
              <DropdownMenuLabel class="mb-2 text-[12px] font-normal leading-4">Your Workspaces
              </DropdownMenuLabel>

              <DropdownMenuItem v-for="item in workspaceItems" class="h-[4rem]">
                <div class="inline-flex w-full">
                  <NuxtImg :src="item.src" class="h-10 w-10 rounded-sm" />
                  <p class="ml-3 content-center font-semibold">
                    {{ item.title }}
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <!--recent-->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button class="relative mt-0 block h-[32px] rounded-sm px-2 py-0" variant="ghost">
                Recent
                <Icon name="tabler:chevron-down" :ssr="true" class="inline-flex text-opacity-65 dark:text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-[20rem] p-3">
              <DropdownMenuItem v-for="item in recentItems" class="group">
                <div class="group inline-flex w-full items-center">
                  <NuxtImg :src="item.src" class="h-8 w-10 rounded-sm" />
                  <div class="ml-3">
                    <p class="font-semibold">{{ item.title }}</p>
                    <p class="text-xs font-light">{{ item.type }}</p>
                  </div>
                  <Icon name="material-symbols-light:star-outline" :ssr="true"
                    class="group-hover:color-blue-400 ml-auto hidden h-6 w-6 hover:text-orange-400 group-hover:block"
                    @click="() => console.log('star clicked')" />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <!--starred-->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button class="relative mt-0 block h-[32px] rounded-sm px-2 py-0" variant="ghost">
                Starred
                <Icon name="tabler:chevron-down" :ssr="true" class="inline-flex text-opacity-65 dark:text-white" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent class="w-[20rem] p-3">
              <div v-if="starredItems.length > 0">
                <DropdownMenuItem v-for="item in starredItems">
                  <div class="inline-flex w-full">
                    <NuxtImg :src="item.src" class="h-8 w-8" />
                    <p class="ml-1 font-semibold">{{ item.title }}</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <div v-else>
                <NuxtImg src="/starred.svg" />
                <p class="py-3 text-center text-sm font-light">
                  Star important boards to access them quicly and easily.
                </p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <!--Templates-->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button class="relative mt-0 block h-[32px] rounded-sm px-2 py-0" variant="ghost">
                Templates
                <Icon name="tabler:chevron-down" :ssr="true" class="inline-flex text-opacity-65 dark:text-white" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent class="w-[20rem] p-3">
              <p class="px-2 py-1 text-xs">Top templates</p>
              <DropdownMenuItem v-for="item in templatesItems">
                <div class="inline-flex w-full">
                  <NuxtImg :src="item.src" class="h-8 w-10 rounded-sm" />

                  <p class="ml-3 align-middle font-semibold">
                    {{ item.title }}
                  </p>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div class="inline-flex w-full py-1">
                <span class="content-end pl-5">
                  <LogosTrelloIcon class="text-primary" />
                </span>
                <p class="align-end ml-3 text-sm font-normal">
                  See hundreds of templates from the Trello comunity
                </p>
              </div>

              <Button
                class="mt-2 h-8 w-full rounded-sm bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:brightness-125">Explore
                templates</Button>
            </DropdownMenuContent>
          </DropdownMenu>

          <!--create-->
          <DropdownMenu @update:open="updateCreateInHeaderOpen" v-model:open="createDropdownOpen">
            <DropdownMenuTrigger as-child>
              <Button class=" relative mt-0 block h-[32px] rounded-sm px-2 py-0 hover:bg-primary hover:brightness-110
            dark:text-[#1d2125]">
                Create
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent class="w-[20rem] p-3" v-if="!createInHeaderOpen">
              <DropdownMenuItem class="max-w-72" @click="toggleCreateInHeaderOpen" @select="(e) => e.preventDefault()">
                <div class="block">
                  <div class="inline-flex w-full">
                    <Icon name="lucide:trello" class="inline-flex h-4 w-4" />
                    <p class="ml-1 font-semibold">Create board</p>
                  </div>
                  <div class="text-left text-xs leading-4">
                    <p>
                      A board made up of cards ordered on lists. Use it to
                      manage projects, track information, or organize anything.
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem class="max-w-72">
                <div class="block">
                  <div class="inline-flex w-full">
                    <Icon name="lucide:layout-template" class="inline-flex h-4 w-4" />
                    <p class="ml-1 font-semibold">Start with a template</p>
                  </div>
                  <div class="text-left text-xs leading-4">
                    <p>Get started with a bord template.</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem class="max-w-72">
                <div class="block">
                  <div class="inline-flex w-full">
                    <Icon name="lucide:users-round" class="inline-flex h-4 w-4" />
                    <p class="ml-1 font-semibold">Create workspace</p>
                  </div>
                  <div class="text-left text-xs leading-4">
                    <p>
                      A workspace is a group of boards and people. Use it to
                      organize your company, side hustle, family, or friends.
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
            <DropdownMenuContent class="w-[304px] p-4" v-else>
              <Button size="icon" variant="ghost" class="
                hoverButton
                absolute 
                left-[15px] 
                top-[15px] 
                inline-flex 
                h-[30px] 
                w-[30px] 
                cursor-pointer 
                items-center 
                justify-center 
                rounded-md 
                outline-none 
                " aria-label="Close" @click="toggleCreateInHeaderOpen">
                <Icon name="tabler:chevron-left" class="w-5 h-5" />
              </Button>
              <Button size="icon" variant="ghost" class="
                hoverButton
                absolute 
                right-[15px] 
                top-[15px] 
                inline-flex 
                h-[30px] 
                w-[30px] 
                cursor-pointer 
                items-center 
                justify-center 
                rounded-md 
                outline-none 
                " aria-label="Close" @click="closeDropdown">
                <Icon name="bitcoin-icons:cross-filled" class="h-5 w-5" />
              </Button>
              <LoggedInNewBoard />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <!--user-->
        <div class=" flex space-x-1">
          <div class="relative min-w-60">
            <Input id="search" type="text" placeholder="Search..." class="h-full pl-10" />
            <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
              <Icon name="tabler:search" :ssr="true" class="text-black dark:text-slate-400" />
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              class="flex h-8 w-8 items-center justify-center rounded-full bg-transparent hover:bg-slate-300 dark:hover:bg-gray-600">
              <Icon name="tabler:school-bell" class="text-lg text-slate-600 dark:text-slate-200" />
            </DropdownMenuTrigger>
            <DropdownMenuContent class="h-[25rem] w-[432px] p-3">
              <div class="flex h-[3rem] items-center justify-between">
                <h1 class="text-xl font-bold">Notifications</h1>

                <div class="flex items-center">
                  <span for="only-unread" class="text-xs font-light text-gray-600 dark:text-slate-200">Only show
                    unread</span>
                  <Switch id="only-unread" class="ml-2 mr-4 h-[15px] w-[28px]" />
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Icon name="mdi:dots-vertical" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-[310px]">
                      <DropdownMenuLabel class="mb-3 mt-0 w-full text-center text-gray-900">
                        Notification settings
                      </DropdownMenuLabel>
                      <DropdownMenuLabel class="text-xs font-normal text-gray-900">
                        Notification email frequency
                      </DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Periodically" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="never" class="rounded-none focus:bg-blue-300">
                                Never
                              </SelectItem>
                              <SelectItem value="periodically" class="rounded-none focus:bg-blue-300">
                                Periodically
                              </SelectItem>
                              <SelectItem value="instantly" class="rounded-none focus:bg-blue-300">
                                Instantly
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </DropdownMenuItem>
                      <DropdownMenuItem class="flex justify-between">
                        <p>How to disable desktop notifications</p>
                        <Icon name="heroicons-solid:arrow-sm-up" class="rotate-45" />
                      </DropdownMenuItem>
                      <DropdownMenuItem class="flex justify-between">
                        <p>All notification settings</p>
                        <Icon name="heroicons-solid:arrow-sm-up" class="rotate-45" />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <DropdownMenuSeparator class="bg-gray-300" />

              <div v-for="notification in notificationItems" v-if="notificationItems.length > 0"
                class="h-[calc(100%-3rem)]">
                <NotificationListItem :title="notification.title" :body="notification.body"
                  :additional="notification.additional" />
                <DropdownMenuSeparator class="bg-gray-300" />
              </div>

              <div class="h-[calc(100%-3rem)] pt-11" v-else>
                <img src="../../public/sleepyWolf.svg" class="m-auto" />
                <h1 class="text-md pt-5 text-center font-medium">
                  No unread notifications
                </h1>
              </div>

              <div></div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              class="flex h-8 w-8 items-center justify-center rounded-full bg-transparent hover:bg-slate-300 dark:hover:bg-gray-600 dark:hover:brightness-110">
              <Icon name="ph:question" class="text-xl text-slate-700 dark:text-slate-200" />
            </DropdownMenuTrigger>

            <DropdownMenuContent class="w-[384px] px-5">
              <div class="group w-full py-2">
                <div class="m-auto min-h-[15rem] rounded-md group-hover:bg-gray-100 dark:group-hover:bg-opacity-10">
                  <NuxtImg :src="tipItems[tipItem].imgSrc" class="mb-2 w-full rounded-sm" />

                  <p class="mx-8 pb-2 text-center font-semibold group-hover:bg-gray-100 dark:group-hover:bg-opacity-0">
                    {{ tipItems[tipItem].body }}
                  </p>
                </div>
              </div>
              <NuxtLink :onclick="changeTipItem"
                class="mb-2 block w-full cursor-pointer text-center text-sm text-blue-600 hover:underline">Get a
                new tip
              </NuxtLink>
              <DropdownMenuSeparator class="bg-gray-300" />

              <div class="mx-10 flex flex-wrap items-center justify-center">
                <Button variant="ghost"
                  class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5">Pricing</Button>
                <Button variant="ghost"
                  class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5">Apps</Button>
                <Button variant="ghost"
                  class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5">Blog</Button>
                <Button variant="ghost"
                  class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5">Privacy</Button>
                <Button variant="ghost"
                  class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5">Notice
                  at Collection</Button>
                <Button variant="ghost"
                  class="h-[2rem] rounded-sm px-2 py-0 text-sm font-light hover:bg-gray-300 dark:hover:bg-opacity-5">More...</Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <LoggedInUserDropdown />
        </div>
      </div>
    </ConfigProvider>
  </div>
</template>

<script lang="ts" setup>
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/shadComponents/ui/dropdown-menu";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/shadComponents/ui/select";
  import { Input } from "@/shadComponents/ui/input";
  import { Button } from "@/shadComponents/ui/button";
  import { Switch } from "@/shadComponents/ui/switch";
  import { ConfigProvider } from "radix-vue";
  import NotificationListItem from "../UI/NotificationListItem.vue";
  import AllowMarketingEmailsNotificationItem from "~/components/UI/AllowMarketingEmailsNotificationItem.vue";

  const useIdFunction = () => useId();

  const isHovered = ref(false);
  const staticGif = "logoBeforeAfter";
  var currentGif = ref("logoBeforeAfter");
  const animatedGif = "logoBeforeAfterAnimated";

  const createInHeaderOpen = ref(false);
  const updateCreateInHeaderOpen = (payload: Boolean) => {
    if (payload == false) {
      createInHeaderOpen.value = false;
    }
  };
  const toggleCreateInHeaderOpen = () => {
    createInHeaderOpen.value = !createInHeaderOpen.value
  };


  const createDropdownOpen = ref(false);
  const closeDropdown = () => {
    createDropdownOpen.value = false;
    createInHeaderOpen.value = false;
  };


  async function create(action: string) {
    const data = await $larafetch(action, {
      method: "post",
      body: { title: "" },
    });
  }

  const templatesItems = [
    {
      title: "1-on-1 Meeting Agenda",
      src: "templatesExample.jpg",
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
    /*     {
            src: "/templatesExample.jpg",
            title: "1-on-1 Meeting Agenda",
            type: "Trello workspace"
          } */
  ];

  const recentItems = [
    {
      src: "/templatesExample.jpg",
      title: "1-on-1 Meeting Agenda",
      type: "Trello workspace",
    },
  ];

  const workspaceItems = [
    {
      src: "/templatesExample.jpg",
      title: "Trello Workspace",
    },
    {
      src: "/templatesExample.jpg",
      title: "Trello Workspace",
    },
  ];

  const notificationItems = [
    {
      title: "Hey there!",
      body: "Trello and Atlassian (Trello’s parent company) would love to keep in touch. Can we send occasional marketing emails?",
      additional: AllowMarketingEmailsNotificationItem,
    },
    {
      title: "Normal notification",
      body: "This is a regular text notification",
      additional: undefined,
    },
  ];

  const tipItem = ref(0);
  const changeTipItem = () => {
    if (tipItem.value >= tipItems.length - 1) {
      tipItem.value = 0;
    } else {
      tipItem.value = tipItem.value + 1;
    }
  };

  const tipItems = [
    {
      imgSrc: "/tip1.png",
      body: "It’s easy to get your team up and running with Trello playbooks",
    },
    {
      imgSrc: "/tip4.png",
      body: "Make boards more powerful with Trello Power-Ups",
    },
    {
      imgSrc: "/tip2.png",
      body: "New to Trello? Check out the guide",
    },
    {
      imgSrc: "/tip3.png",
      body: "Get inspired by dozens of different Trello workflows",
    },
  ];

  function addHoverClass() {
    isHovered.value = true;
    currentGif.value = animatedGif;
  }

  function removeHoverClass() {
    isHovered.value = false;
    currentGif.value = staticGif;
  }
</script>
<style>
.logoBeforeAfter::before,
.logoBeforeAfter::after {
  content: "";
  background-image: url("/public/logoStatic.gif");
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
  background-image: url("/public/logoGif.gif");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  content: "";
}

.logoBeforeAfter {
  filter: invert(49%) sepia(8%) saturate(866%) hue-rotate(180deg) brightness(84%) contrast(97%);
}

div[data-radix-select-viewport]>div {
  padding: 0px;
}

div[data-radix-select-viewport] {
  padding: 0px;
}
</style>
