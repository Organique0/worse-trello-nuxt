<template>
  <div class="w-[25%] bg-inherit">
    <Button
      class="mb-1 block h-10 w-full rounded-md text-left"
      :class="
        $router.currentRoute.value.path.includes('boards') &&
        'bg-lightBlueBg text-primary hover:bg-lightBlueBg hover:text-primary dark:bg-accent dark:hover:bg-accent'
      "
      variant="ghost"
      ><Icon name="i-mingcute:trello-board-fill" />
      Boards
    </Button>
    <Button
      class="mb-1 block h-10 w-full rounded-md text-left"
      :class="
        $router.currentRoute.value.path.includes('templates') &&
        'bg-lightBlueBg text-primary hover:bg-lightBlueBg hover:text-primary dark:bg-accent dark:hover:bg-accent'
      "
      variant="ghost"
    >
      <Icon name="LogoIcon" />
      Templates</Button
    >
    <Button
      class="mb-1 block h-10 w-full rounded-md text-left"
      :class="
        $router.currentRoute.value.path == '/' &&
        'bg-lightBlueBg text-primary hover:bg-lightBlueBg hover:text-primary dark:bg-accent dark:hover:bg-accent'
      "
      variant="ghost"
      ><Icon name="fluent:pulse-24-regular" /> Home</Button
    >

    <Separator class="my-4 h-[2px]" />

    <h1 class="p-3 text-xs font-bold">Workspaces</h1>

    <Accordion type="single" collapsible v-for="workspace in workspaces">
      <AccordionItem value="item-1" class="mb-4 border-b-0">
        <AccordionTrigger
          class="hoverButton h-10 rounded-md p-3 text-left hover:no-underline"
        >
          <div class="inline-flex gap-x-3">
            <NuxtImg
              :src="workspace.src"
              width="24"
              height="24"
              class="rounded-sm"
            />
            <p class="text-sm">{{ workspace.title }}</p>
          </div>
        </AccordionTrigger>
        <AccordionContent
          v-for="item in workspaceItems"
          class="hoverButton py-0"
          asChild
        >
          <button
            class="group relative flex h-8 w-full items-center justify-start gap-3 rounded-md pl-12 text-left"
          >
            <Icon :name="item.icon" class="h-5 w-5 pl-1" />
            {{ item.title }}
            <Icon
              name="ic:baseline-plus"
              class="ease ml-auto h-5 w-5 translate-x-[2rem] transform transition-transform duration-300 group-hover:translate-x-0"
              v-if="item.title == 'Members'"
            />
            <Icon
              name="mingcute:right-line"
              class="ml-auto h-5 w-5"
              :class="item.class"
              v-if="item.class != ''"
            />
          </button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>
<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadComponents/ui/accordion";

const router = useRouter();
router.currentRoute.value;

const workspaces = [
  {
    src: "/templatesExample.jpg",
    title: "Trello Workspace",
  },
  {
    src: "/templatesExample.jpg",
    title: "Trello Workspace",
  },
];

const workspaceItems = [
  {
    title: "Boards",
    icon: "i-mingcute:trello-board-fill",
    class: "",
  },
  {
    title: "Highlights",
    icon: "la:heart",
    class: "",
  },
  {
    title: "Views",
    icon: "LogoViews",
    class:
      "transform translate-x-full group-hover:translate-x-[-0.7rem] transition-transform duration-300 ease",
  },
  {
    title: "Members",
    icon: "LogoMembers",
    class:
      "transform translate-x-full group-hover:translate-x-[-0.7rem] transition-transform duration-300 ease",
  },
  {
    title: "Settings",
    icon: "LogoSettings",
    class:
      "transform translate-x-full group-hover:translate-x-[-0.7rem] transition-transform duration-300 ease",
  },
];
</script>
