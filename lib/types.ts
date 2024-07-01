export interface Workspace {
    created_at: string;
    description: string;
    id_str: string;
    title: string;
    type: string;
    updated_at: string;
    visibility: string;
    workspace_boards: Board[] | [];

};

export interface Board {
    title: string;
    prefs_background_url: string | null;
    prefs_background_url_full: string | null;
    prefs_background: string | null;
    created_at: string;
    updated_at: string;
    id_str: string;
    workspace_id_str: string;
    is_favorited: boolean;
    visibility: string;
    closed: boolean
};

export interface CreateWorkspaceValues {
    title: string,
    type: string,
    description?: string | undefined,
}

export interface List {
    title: string,
    order: number,
    board_id: string,
    cards: Card
}

export interface Card {
    title: string,
    order: number,
    list_id: string
    description?: string | undefined,
}

export interface FullBoard extends Board {
    lists: List[],
}