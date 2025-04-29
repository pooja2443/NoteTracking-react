import React, { createContext, useState, useContext, ReactNode } from "react";
import { Note, Folder } from '../Types/Type';

interface NoteContextType {
    notes: Note[];
    folders: Folder[];
    activeNote: Note | null;
    addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateNote: (id: string, updates:Partial<Note>) => void;
    deleteNote: (id: string) => void;
    setActiveNote: (note: Note | null) => void;
    addFolder: (name: string) => void;
    deleteFolder: (id: string) => void;
    getPinnedNotes: () => Note[];
    getFavoriteNotes: () => Note[];
    getNotesByFolder: (folderId: string) => Note[];
}

interface NoteProviderProps {
    children: ReactNode;
  }

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {

    const [notes, setNotes] = useState<Note[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [activeNote, setActiveNote] = useState<Note | null>(null);

    const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newNote: Note = {
            ...note,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setNotes([...notes, newNote]);
        setActiveNote(newNote);
    }

    const updateNote = (id: string, updates: Partial<Note>) => {
        const updateNotes = notes.map(note => 
            note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note
        );
        setNotes(updateNotes);

        if (activeNote && activeNote.id === id) {
            setActiveNote({ ...activeNote, ...updates, updatedAt: new Date() });
        }
    }

    const deleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !==id));
        if(activeNote && activeNote.id === id) {
            setActiveNote(null);
        }
    }

    const addFolder = (name: string) => {
        const newFolder: Folder = {
            id: Date.now().toString(),
            name
        };
        setFolders([...folders, newFolder]);
    };


    const deleteFolder = (id: string) => {
        setFolders(folders.filter(folder => folder.id ! == id));
        const updatedNotes = notes.map(note => 
            note.folderId === id? {...note, folderId: undefined} : note
        )
        setNotes(updatedNotes)
    }

    const getPinnedNotes = () => {
        return notes.filter(note => note.isPinned);
    }

    const getFavoriteNotes = () => {
        return notes.filter(note => note.isFavorite);
    }

    const getNotesByFolder = (folderId: string) =>{
        return notes.filter(note => note.folderId === folderId);
    } 
    

    return(
       <NoteContext.Provider value={{
            notes,
            folders,
            activeNote,
            addNote,
            updateNote,
            deleteNote,
            setActiveNote,
            addFolder,
            deleteFolder,
            getPinnedNotes,
            getFavoriteNotes,
            getNotesByFolder
       }}>
            {children}
       </NoteContext.Provider>
    )
}

export const useNoteContext = (): NoteContextType => {
    const context = useContext(NoteContext);
    if (context === undefined) {
        throw new Error('useNoteContext must be used within a NoteProvider');
    }
    return context;
};