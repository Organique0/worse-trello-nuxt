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
    prefs_background_url_regular: string | null;
    prefs_background: string | null;
    dominant_color: string;
    text_color: string;
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

export interface board_list {
    title: string,
    order: number,
    id_str: string,
    board_list_card: Card[]
}

export interface Card {
    title: string,
    order: number,
    list_id_str: string,
    id_str: string,
    description?: string | null,
}

export interface FullBoard extends Board {
    board_list: board_list[],
}


/* export interface Pallete {
    DarkMuted: PalleteObject,
    DarkVibrant: PalleteObject,
    LightMuted: PalleteObject,
    LightVibrant: PalleteObject,
    Muted: PalleteObject,
    Vibrant: PalleteObject
}

interface PalleteObject {
    _hsl: Array<number>,
    _population: number,
    _rgb: Array<{ key: number; value: number }>,
    b: number,
    bodyTextColor: string | undefined,
    g: number,
    hex: string,
    hsl: Array<{ key: number, value: number }>,
    population: number,
    r: number,
    rgb: Array<{ key: number, value: number }>
    titleTextColor: string | undefined
} */