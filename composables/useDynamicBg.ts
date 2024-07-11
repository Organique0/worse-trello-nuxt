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
    if (
      router.currentRoute.value.path.includes('/b/') &&
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


  return {
    dynamicBg,
    dynamicText,
    dynamicHover,
    dynamicCurrentRoute
  }
}
