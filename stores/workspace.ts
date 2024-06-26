import { defineStore } from 'pinia'
import type { Board, CreateWorkspaceValues, Workspace } from '~/lib/types';

export const useMyWorkspaceStore = defineStore({
  id: 'myWorkspaceStore',
  state: () => {
    return {
      workspaces: [] as Workspace[],
      recentBoards: [] as Board[],
    }
  },
  getters: {
    getWorkspace: (state) => {
      return (paramId: string) => state.workspaces.find((workspace: Workspace) => workspace.id_str == paramId) as Workspace
    },
    getRecentBoards: (state) => {
      return () => state.recentBoards
    },
    getBoardById: (state) => {
      return (bid: string) => state.workspaces.flatMap(workspace => workspace.workspace_boards).find(board => board.id_str === bid) as Board
    }
  },
  actions: {
    async loadWorkspaces() {
      const response = await $larafetch("api/workspaces", {
        method: "get",
      });

      this.workspaces = await response;
    },

    async loadWorkspace(wid: string) {
      const response = await $larafetch(`api/workspaces/${wid}`, {
        method: "get",
      });

      this.workspaces.push(response as never);

      return await response;
    },

    async createWorkspace(values: CreateWorkspaceValues) {
      await $larafetch("api/workspaces/create", {
        method: "post",
        body: values,
      });
      await this.loadWorkspaces();
    },

    async createBoard(values: any) {
      const response = await $larafetch("api/boards/create", {
        method: "post",
        body: values,
      });
      await this.loadWorkspaces();

      return response;
    },

    async deleteBoard(bid: string) {
      const response = await $larafetch("api/boards/delete", {
        method: "delete",
        body: {
          'board_id': bid
        }
      });
      await this.loadWorkspaces();

      return response;
    },

    async closeBoard(bid: string) {
      const response = await $larafetch("api/boards/close", {
        method: "put",
        body: {
          'board_id': bid
        }
      });
      await this.loadWorkspaces();

      return response;
    },

    addRecentId(id: string) {
      const recentBoardsCookie = useCookie<String[]>("recentBoards", {
        default: () => [],
        sameSite: true,
      });

      const rbc = recentBoardsCookie.value;
      const index = rbc.indexOf(id);

      if (index != -1) {
        rbc.splice(index, 1);
      }

      rbc.unshift(id);

      if (rbc.length > 4) {
        rbc.pop();
      }
    },

    async loadRecentBoards() {
      const boardIdsCookieRef = useCookie<String[]>("recentBoards");
      const boardIds = boardIdsCookieRef.value || [];
      const allBoards = this.workspaces.flatMap(workspace => workspace.workspace_boards);

      const boards = boardIds
        .map(boardId => allBoards.find(board => board.id_str === boardId))
        .filter(board => board !== undefined) as Board[];

      this.recentBoards = boards;
    }
  }
})
