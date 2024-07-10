import { defineStore } from 'pinia';

export const useColorStore = defineStore('color', {
  state: () => ({
    dominantColor: 'white',
  }),
  actions: {
    setDominantColor(color: string) {
      this.dominantColor = color;
    },
  },
});
