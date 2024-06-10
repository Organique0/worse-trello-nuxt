import { defineStore } from 'pinia'
import type { CreateWorkspaceValues, Workspace } from '~/lib/types';

export const useMyWorkspaceStore = defineStore({
  id: 'myWorkspaceStore',
  state: () => {
    return {
      workspaces: [] as Workspace[] | []
    }
  },
  actions: {
    async loadWorkspaces() {
      const response = await $larafetch("api/workspaces", {
        method: "get",
      });

      this.workspaces = await response;
    },

    async createWorkspace(values: CreateWorkspaceValues) {
      await $larafetch("api/workspaces/create", {
        method: "post",
        body: values,
      });
      await this.loadWorkspaces();
    }
  }
})
