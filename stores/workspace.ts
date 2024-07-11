import { get } from '@vueuse/core';
import { defineStore } from 'pinia'
import type { Board, CreateWorkspaceValues, FullBoard, List, Workspace } from '~/lib/types';
import workspace from '~/plugins/workspace';

export const useMyWorkspaceStore = defineStore({
  id: 'myWorkspaceStore',
  state: () => {
    return {
      workspaces: [] as Workspace[],
      recentBoards: [] as Board[],
      currentWorkspace: null as Workspace | null,
      currentBoard: {} as Board | null,
      starredBoards: [] as Board[],
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
      return (bid: string) => state.workspaces.flatMap(workspace => workspace.workspace_boards).find(board => board.id_str === bid) as FullBoard
    },
    setCurrentWorkspace: (state) => {
      return (workspace: Workspace | null) => state.currentWorkspace = workspace
    },
    setCurrentBoard: (state) => {
      return (board: Board | null) => state.currentBoard = board
    },
  },
  actions: {
    async loadWorkspaces() {
      const response = await $larafetch("api/workspaces", {
        method: "get",
      });

      const workspaces = await response;
      this.workspaces = workspaces;
      this.$state.starredBoards = workspaces.flatMap((workspace: Workspace) => workspace.workspace_boards).filter((board: Board) => board.is_favorited)
    },

    async loadWorkspace(wid: string) {
      const response = await $larafetch(`api/workspaces/${wid}`, {
        method: "get",
      });

      this.workspaces = await response;
    },

    async createWorkspace(values: CreateWorkspaceValues) {
      const response = await $larafetch("api/workspaces/create", {
        method: "post",
        body: values,
      });

      this.workspaces = [...this.workspaces, response.workspace];
    },

    async createBoard(values: any) {
      const response = await $larafetch("api/boards/create", {
        method: "post",
        body: values,
      });

      this.$patch((state) => {
        if (state.currentWorkspace) {
          state.currentWorkspace.workspace_boards = [
            ...state.currentWorkspace.workspace_boards,
            response.board,
          ];
        } else {
          console.error("Current workspace is not set");
        }
      });

      return response;
    },

    async favorite(id: string) {
      const board = this.getBoardById(id);
      const workspace = this.getWorkspace((board as FullBoard).workspace_id_str);

      const boardIndex = workspace.workspace_boards.findIndex(
        (board: Board) => board.id_str === id
      );

      const workspaceIndex = this.workspaces.findIndex(
        (w: Workspace) => w.id_str === workspace.id_str
      );

      if (boardIndex === -1) {
        console.error(`Board with id ${id} not found`);
        return;
      };

      const updatedBoard = {
        ...this.workspaces[workspaceIndex].workspace_boards[boardIndex],
        is_favorited: !this.workspaces[workspaceIndex].workspace_boards[boardIndex].is_favorited,
      };

      this.workspaces[workspaceIndex].workspace_boards.splice(boardIndex, 1, updatedBoard);

      const existing = this.starredBoards.find((b: Board) => b.id_str == board.id_str);

      if (!existing) {
        board.is_favorited = true;
        this.starredBoards.unshift(board);
      } else {
        this.starredBoards = this.starredBoards.filter((b: Board) => b.id_str != board.id_str);
      }


      if (this.recentBoards.length > 0) {
        const recentBoardIndex = this.recentBoards.findIndex(
          (board: Board) => board.id_str === id
        );

        if (recentBoardIndex !== -1) {
          this.recentBoards.splice(recentBoardIndex, 1);
          this.removeRecentId(board.id_str);
        }
      }



      try {
        await $larafetch("api/boards/favorite", {
          method: "post",
          body: { id_str: id },
        });
      } catch (error) {
        console.error("Error favoriting board:", error);
        /*         this.currentWorkspace.workspace_boards.splice(
                  boardIndex,
                  1,
                  this.currentWorkspace.workspace_boards[boardIndex]
                ); */
      }
    },

    async deleteBoard(bid: string) {
      const response = await $larafetch("api/boards/delete", {
        method: "delete",
        body: {
          'board_id': bid
        }
      });

      this.$patch((state) => {
        if (state.currentWorkspace) {
          state.currentWorkspace.workspace_boards = state.currentWorkspace.workspace_boards.filter(board => board.id_str !== bid);
        }
      });

      return response;
    },


    async closeBoard(bid: string) {
      const response = await $larafetch("api/boards/close", {
        method: "put",
        body: {
          'board_id': bid
        }
      });

      // Find the index of the board in the workspace_boards array
      const boardIndex = this.currentWorkspace!.workspace_boards.findIndex(board => board.id_str === bid);

      if (boardIndex !== -1) {
        // Create a new object with the closed property set to true
        const updatedBoard = {
          ...this.currentWorkspace!.workspace_boards[boardIndex],
          closed: true
        };

        // Replace the existing board with the updated board
        this.$patch((state) => {
          if (state.currentWorkspace) {
            state.currentWorkspace.workspace_boards.splice(boardIndex, 1, updatedBoard);
          }
        });
      } else {
        console.error(`Board with id ${bid} not found`);
      }

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

    removeRecentId(id: string) {
      const recentBoardsCookie = useCookie<String[]>("recentBoards", {
        default: () => [],
        sameSite: true,
      });

      const rbc = recentBoardsCookie.value;
      const index = rbc.indexOf(id);

      if (index != -1) {
        rbc.splice(index, 1);
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
    },

    async addList(values: List) {
      const response = await $larafetch("api/lists/create", {
        method: "post",
        body: values,
      });
    },

    async fetchBoard<T>(bid: string): Promise<T> {
      const response = await $larafetch(`api/boards/${bid}`, {
        method: "get",
      });

      return response;
    }
  }
})
