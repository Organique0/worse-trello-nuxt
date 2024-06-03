<template>
  <div class="m-auto mt-8 flex w-[75rem]">
    <LoggedInSideBar />

    <div class="ml-12 w-full">
      <div class="flex gap-x-3">
        <Icon name="mdi:clock-outline" width="25" height="25" />
        <h1 class="mb-3">Recently viewed</h1>
      </div>
      <div class="inline-flex gap-6">
        <LoggedInBoardPreview
          :title="board.title"
          :link="board.link"
          :src="board.src"
          :starred="board.starred"
          v-for="board in recentBoards"
        />
      </div>

      <h1 class="mb-6 mt-16 font-bold">YOUR WORKSPACES</h1>

      <div v-for="workspace in workspaces" class="mb-14">
        <div class="flex justify-between">
          <div class="flex items-center">
            <NuxtImg
              :src="workspace.src"
              width="40"
              height="40"
              class="rounded-sm"
            />
            <h1 class="ml-3 font-semibold">{{ workspace.title }}</h1>
          </div>

          <div class="flex gap-x-2">
            <Button class="hoverButtonWithBg"
              ><Icon
                name="i-mingcute:trello-board-fill"
                class="mr-1"
              />Boards</Button
            >
            <Button class="hoverButtonWithBg"
              ><Icon name="LogoViews" class="mr-1" />Views</Button
            >
            <Button class="hoverButtonWithBg"
              ><Icon name="LogoMembers" class="mr-1" />Members</Button
            >
            <Button class="hoverButtonWithBg"
              ><Icon name="LogoSettings" class="mr-1" />Settings</Button
            >
          </div>
        </div>
        <div class="mt-5 inline-flex gap-6">
          <LoggedInBoardPreview
            :src="board.src"
            :starred="board.starred"
            :link="board.link"
            :title="board.title"
            v-for="board in boards"
          />
          <LoggedInEmptyBoard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "logged-in-home",
});

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

const boards = [
  {
    src: "/boardExample.jpg",
    link: "",
    title: "1-on-1 Meeting Agenda",
    starred: true,
  },
  {
    src: "/boardExample2.jpg",
    link: "",
    title: "2-on-1 Meeting Agenda",
    starred: false,
  },
];

const recentBoards = [
  {
    src: "/boardExample.jpg",
    link: "",
    title: "1-on-1 Meeting Agenda",
    starred: true,
  },
  {
    src: "/boardExample2.jpg",
    link: "",
    title: "2-on-1 Meeting Agenda",
    starred: false,
  },
  {
    src: "/boardExample3.jpg",
    link: "",
    title: "3-on-1 Meeting Agenda",
    starred: true,
  },
  {
    src: "/boardExample4.jpg",
    link: "",
    title: "4-on-1 Meeting Agenda",
    starred: false,
  },
];
</script>
