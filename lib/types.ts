export interface Workspace {
    created_at: string;
    description: string;
    id_str: string;
    title: string;
    type: string;
    updated_at: string;
    workspaceBoards: Board[] | [];

};

export interface Board {
    title: string;
    imgThumb: string;
    imgFull: string;
    imgAuthor: string;
    imgSite: string;
    visibility: string;
    workspace_id: string;
};

export interface CreateWorkspaceValues {
    title: string,
    type: string,
    description?: string | undefined,
}