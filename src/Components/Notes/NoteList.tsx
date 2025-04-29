import React, { useState } from 'react';
import { useNoteContext } from '../../Context/NoteContext';
import NoteItem from './NoteItem';
import  { Header } from '../Layout/Header';
import './NoteList.css';
import { FiPlus } from 'react-icons/fi';

const NotesList: React.FC = () => {
  const { notes, addNote } = useNoteContext();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const handleRefresh = () => {
    console.log('Refreshing notes');
  };

  const handleViewToggle = () => {
    setViewMode(viewMode === 'list' ? 'grid' : 'list');
  };

  const handleSort = () => {
    console.log('Sorting notes');
  };

  const handleAddNote = () => {
    addNote({
      title: 'New Note',
      content: '',
      isPinned: false,
      isFavorite: false,
    });
  };

  return (
    <div className="notes-container">
      <Header 
        title="All Notes" 
        onRefresh={handleRefresh}
        onViewToggle={handleViewToggle}
        onSort={handleSort}
      />
      
      <div className="notes-header">
        <h3>ALL NOTES</h3>
      </div>
      
      {notes.length === 0 ? (
        <div className="empty-notes">
          <div className="empty-icon"></div>
          <p>No notes yet</p>
          <p className="empty-subtext">Click the + button to create your first note</p>
        </div>
      ) : (
        <div className={`notes-list ${viewMode === 'grid' ? 'grid-view' : ''}`}>
          {notes.map(note => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      )}
      
      <button className="add-note-button" onClick={handleAddNote}>
      <span className="icon"><FiPlus  size={30} /></span>
      </button>
    </div>
  );
};

export default NotesList;