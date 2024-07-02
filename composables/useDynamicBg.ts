import { computed } from 'vue'
import { useColorStore } from '@/stores/color'

export const useDynamicBg = (opacity?: string | null) => {
  const myColorStore = useColorStore();
  const myWorkspaceStore = useMyWorkspaceStore();

  const dynamicBg = computed(() => {
    if (myWorkspaceStore.currentBoard) {
      return `background-color: ${myColorStore.dominantColor}${opacity ? opacity : 'ff'};`
    } else {
      return ''
    }
  })

  return {
    dynamicBg,
  }
}
