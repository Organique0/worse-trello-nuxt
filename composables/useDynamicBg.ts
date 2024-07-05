import { computed } from 'vue'
import { useColorStore } from '@/stores/color'

export const useDynamicBg = (opacity?: string | null) => {
  const myColorStore = useColorStore();
  const myWorkspaceStore = useMyWorkspaceStore();
  const colorMode = useColorMode();

  const dynamicBg = computed(() => {
    if (myWorkspaceStore.currentBoard) {
      return `background-color: ${myWorkspaceStore.currentBoard.dominant_color}${opacity ? opacity : 'ff'};`
    } else {
      return ''
    }
  });

  const dynamicText = computed(() => {
    if (myWorkspaceStore.currentBoard && colorMode.value != "dark") {
      return `color: ${myWorkspaceStore.currentBoard.text_color}`
    } else {
      return ''
    }
  });



  return {
    dynamicBg,
    dynamicText
  }
}
