import React from 'react';
import { Note } from '../../Types/Type'
import { useNoteContext } from '../../Context/NoteContext';
import './NoteItem.css';
import {  FiPaperclip, FiStar  } from 'react-icons/fi';
import { RiAttachment2,RiStarFill } from 'react-icons/ri';


interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { setActiveNote, updateNote } = useNoteContext();

  const handleClick = () => {
    setActiveNote(note);
  };

  const handleTogglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateNote(note.id, { isPinned: !note.isPinned });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateNote(note.id, { isFavorite: !note.isFavorite });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="note-item" onClick={handleClick}>
      <div className="note-header">
        <h3 className="note-title">{note.title || 'Untitled'}</h3>
        <div className="note-actions">
          <button 
            className={`action-button ${note.isPinned ? 'active' : ''}`}
            onClick={handleTogglePin}
          >
            {note.isPinned ? <span className="icon"><RiAttachment2 /></span> : <span className="icon"><FiPaperclip /></span>}
          </button>
          <button 
            className={`action-button ${note.isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
          >
            {note.isFavorite ? <span className="icon"><FiStar /></span> : <span className="icon"><RiStarFill /></span>}
          </button>
        </div>  
      </div>
      
      <div className="note-content">
        {note.content || 'No content'}
      </div>
      
      <div className="note-footer">
        <span className="note-date">
          {formatDate(note.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default NoteItem;