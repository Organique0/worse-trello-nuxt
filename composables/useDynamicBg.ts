import { computed } from 'vue'
import { useColorStore } from '@/stores/color'
import { useRouter } from 'vue-router'

export const useDynamicBg = (opacity?: string | null) => {
  const myColorStore = useColorStore();
  const myWorkspaceStore = useMyWorkspaceStore();
  const colorMode = useColorMode();
  const router = useRouter();
  const colorStore = useColorStore();
  const route = useRoute();

  const dynamicBg = computed(() => {
    if (myWorkspaceStore.currentBoard) {
      return `background-color: ${myWorkspaceStore.currentBoard.dominant_color}${opacity ? opacity : 'ff'};`
    } else {
      return ''
    }
  });

  const dynamicText = computed(() => {
    if (myWorkspaceStore.currentBoard) {
      if (myWorkspaceStore.currentBoard.text_color == "#FFFFFF") {
        myColorStore.setDominantColor("white");
      } else {
        myColorStore.setDominantColor("black");
      }
      return `color: ${myWorkspaceStore.currentBoard.text_color}`
    } else {
      return ''
    }
  });

  const dynamicHover = computed(() => {
    if (route.path.includes('/w/')) {
      return 'hover:!bg-gray-200/80'
    }
    if (
      colorStore.dominantColor === 'white'
    ) {
      return 'hover:!bg-white/20 hover:!text-white '
    } else {
      return 'hover:!bg-black/20 '
    }
  });

  const dynamicCurrentRoute = computed(() => {
    if (
      colorStore.dominantColor === 'white'
    ) {
      return '!bg-white/30 dark:!bg-gray-300/30 dark:hover:!bg-gray-300/20'
    } else {
      return '!bg-black/30 dark:!bg-gray-300/30 dark:hover:!bg-gray-300/20'
    }
  });

  const dynamicBorder = computed(() => {
    if (route.path.includes('/w/')) {
      return 'border-gray-200'
    }
    if (colorStore.dominantColor === 'white') {
      return 'border-white/20'
    } else {
      return 'border-black/20'
    }
  });

  const dynamicIcons = computed(() => {
    if (route.path.includes('/w/')) {
      return 'text-gray-600 hover:!text-gray-600 dark:text-gray-400 w-[18px] h-[18px]'
    }
    if (colorStore.dominantColor === 'white') {
      return 'text-white hover:!text-white dark:text-gray-400 w-[18px] h-[18px]'
    } else {
      return 'text-gray-600 hover:!text-gray-600 dark:text-gray-400 w-[18px] h-[18px]'
    }
  });

  const dynamicHiddenIcons = computed(() => {
    if (route.path.includes('/w/')) {
      return 'w-[18px] h-[18px] text-transparent group-hover:!text-gray-600 dark:group-hover:!text-gray-400'
    }
    if (colorStore.dominantColor === 'white') {
      return 'w-[18px] h-[18px] text-transparent group-hover:!text-white dark:group-hover:!text-gray-400'
    } else {
      return 'w-[18px] h-[18px] text-transparent group-hover:!text-gray-600 dark:group-hover:!text-gray-400'
    }
  });

  const dynamicFavoriteFull = computed(() => {
    if (route.path.includes('/w/')) {
      return 'fill-gray-600 dark:fill-gray-400 stroke-gray-600 dark:stroke-gray-400 stroke-2 hover:fill-none'
    }
    if (colorStore.dominantColor === 'white') {
      return 'fill-white dark:fill-gray-400 stroke-white dark:stroke-gray-400 stroke-2 hover:fill-none'
    } else {
      return 'fill-gray-600 dark:fill-gray-400 stroke-gray-600 dark:stroke-gray-400 stroke-2 hover:fill-none'
    }
  });

  const dynamicFavoriteEmpty = computed(() => {
    if (route.path.includes('/w/')) {
      return 'fill-transparent stroke-gray-600 dark:stroke-gray-400 stroke-2 transition-transform duration-100'
    }
    if (colorStore.dominantColor === 'white') {
      return 'fill-transparent stroke-white dark:stroke-gray-400 stroke-2 transition-transform duration-100'
    } else {
      return 'fill-transparent stroke-gray-600 dark:stroke-gray-400 stroke-2 transition-transform duration-100'
    }
  })


  return {
    dynamicBg,
    dynamicText,
    dynamicHover,
    dynamicCurrentRoute,
    dynamicBorder,
    dynamicIcons,
    dynamicHiddenIcons,
    dynamicFavoriteFull,
    dynamicFavoriteEmpty
  }
}
