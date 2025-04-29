import React from 'react'

interface HeaderProps {
    title: string,
    onRefresh: () => void;
    onViewToggle: () => void;
    onSort: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onRefresh, onViewToggle, onSort}) => {
    return (
        <div className="header">
          <h2>{title}</h2>
          <div className="header-actions">
            <button className="header-button" onClick={onViewToggle} title="Toggle view">
              view_list
            </button>
            <button className="header-button" onClick={onSort} title="Sort">
              sort
            </button>
            <button className="header-button" onClick={onRefresh} title="Refresh">
              refresh
            </button>
          </div>
        </div>
      );
    
}
