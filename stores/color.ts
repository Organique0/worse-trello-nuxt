// stores/colorStore.ts
import { defineStore } from 'pinia';

export const useColorStore = defineStore('color', {
  state: () => ({
    dominantColor: '#ffffff', // default to white
  }),
  actions: {
    setDominantColor(color: string) {
      this.dominantColor = color;
    },
  },
});
