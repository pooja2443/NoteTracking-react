import React, { useState } from 'react';
import { useNoteContext } from '../../Context/NoteContext';
import './Sidebar.css';
import { Folder } from '../../Types/Type';
import { RiStickyNoteLine } from 'react-icons/ri';
import { FiFileText, FiPaperclip, FiStar, FiArchive, FiPlus, FiRefreshCw, FiFolder } from 'react-icons/fi';

const Sidebar: React.FC = () => {
  const {  
    folders, 
    addFolder, 
    notes, 
    getPinnedNotes, 
    getFavoriteNotes 
  } = useNoteContext();
  
  const [newFolderName, setNewFolderName] = useState<string>('');
  const [showNewFolderInput, setShowNewFolderInput] = useState<boolean>(false);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName);
      setNewFolderName('');
      setShowNewFolderInput(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="app-title">
        <span className="icon"><RiStickyNoteLine /></span>
        <h1>NoteMaster</h1>
      </div>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search notes..." 
          className="search-input"
        />
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-item">
          <span className="icon"><FiFileText /></span>
          <span>All Notes</span>
          <span className="count">{notes.length}</span>
        </div>
        
        <div className="nav-item">
          <span className="icon"><FiPaperclip /></span>
          <span>Pinned</span>
          <span className="count">{getPinnedNotes().length}</span>
        </div>
        
        <div className="nav-item">
          <span className="icon"><FiStar /></span>
          <span>Favorites</span>
          <span className="count">{getFavoriteNotes().length}</span>
        </div>
        
        <div className="folders-section">
          <div className="section-header">
            <h3>FOLDERS</h3>
            <button 
              className="add-button"
              onClick={() => setShowNewFolderInput(true)}
            >
              <span className="icon"><FiPlus /></span>
            </button>
          </div>
          
          {showNewFolderInput && (
            <div className="new-folder-input">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Folder name"
                autoFocus
              />
              <button onClick={handleCreateFolder}>Create</button>
              <button onClick={() => setShowNewFolderInput(false)}>Cancel</button>
            </div>
          )}
          
          {folders.length === 0 ? (
            <div className="empty-message">No folders yet</div>
          ) : (
            <div className="folders-list">
              {folders.map((folder: Folder) => (
                <div key={folder.id} className="folder-item">
                    <span className="icon"><FiFolder /></span>
                  <span className="folder-name">{folder.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="nav-item archive">
          <span className="icon"><FiArchive /></span>
          <span>Archive</span>
        </div>
      </nav>
      
      <div className="user-section">
        <div className="user-avatar">DU</div>
        <div className="user-info">
          <div className="user-name">Demo User</div>
          <div className="user-email">demo@example.com</div>
        </div>
        <button className="refresh-button">
        <span className="icon"><FiRefreshCw /></span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;