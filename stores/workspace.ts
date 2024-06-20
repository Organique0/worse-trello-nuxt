import { defineStore } from 'pinia'
import type { CreateWorkspaceValues, Workspace } from '~/lib/types';

export const useMyWorkspaceStore = defineStore({
  id: 'myWorkspaceStore',
  state: () => {
    return {
      workspaces: [] as Workspace[] | [],
    }
  },
  getters: {
    getWorkspace: (state) => {
      return (paramId: String) => state.workspaces.find((workspace: Workspace) => workspace.id_str == paramId) as Workspace
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
    },
  }
})
