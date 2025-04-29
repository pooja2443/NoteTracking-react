export interface Note{
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isPinned: boolean;
    isFavorite: boolean;
    folderId?: string;
}

export interface Folder{
    id: string;
    name: string;
}