import { defineStore } from 'pinia'
import type { Board, CreateWorkspaceValues, Workspace } from '~/lib/types';

export const useMyWorkspaceStore = defineStore({
  id: 'myWorkspaceStore',
  state: () => {
    return {
      workspaces: [] as Workspace[] | [],
      recentBoards: [] as Board[] | [],
    }
  },
  getters: {
    getWorkspace: (state) => {
      return (paramId: String) => state.workspaces.find((workspace: Workspace) => workspace.id_str == paramId) as Workspace
    },
    getRecentBoards: (state) => {
      return () => state.recentBoards
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

    getBoardsByIds() {
      const recentBoardsCookie = useCookie<String[]>("recentBoards");
      const boardIds = recentBoardsCookie.value;
      const boards: Board[] = [];

      for (const workspace of this.workspaces) {
        for (const board of workspace.workspace_boards) {
          const index = boardIds.findIndex((id) => id == board.id_str);
          boards[index] = board;
        }
      }

      this.recentBoards = boards;
    }
  }
})
