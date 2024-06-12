export interface Workspace {
    created_at: string;
    description: string;
    id_str: string;
    title: string;
    type: string;
    updated_at: string;
    workspace_boards: Board[] | [];

};

export interface Board {
    title: string;
    prefs_background_url: string;
    prefs_background: string;
    created_at: string;
    updated_at: string;
    id_str: string;
    workspace_id_str: string;
};

export interface CreateWorkspaceValues {
    title: string,
    type: string,
    description?: string | undefined,
}