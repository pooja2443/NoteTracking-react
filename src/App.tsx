import React from 'react';
import Sidebar from './Components/Layout/Sidebar';
import NotesList from './Components/Notes/NoteList';
import { NoteProvider } from './Context/NoteContext';
import './App.css';

const App: React.FC = () => {
  return (
    <NoteProvider>
      <div className="app">
        <Sidebar />
        <NotesList />
      </div>
    </NoteProvider>
  );
};

export default App;