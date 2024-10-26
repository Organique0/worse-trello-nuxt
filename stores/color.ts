import { defineStore } from 'pinia';

export const useColorStore = defineStore('color', {
  state: () => ({
    dominantColor: 'white',
  }),
  persist: { storage: piniaPluginPersistedstate.localStorage() },
  actions: {
    setDominantColor(color: string) {
      this.dominantColor = color;
    },
  },
});
