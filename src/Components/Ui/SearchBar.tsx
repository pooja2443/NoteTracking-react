import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  className = ''
}) => {
  const [query, setQuery] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={`search-bar ${className}`}>
      <span className="search-icon">search</span>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button 
          className="clear-button" 
          onClick={handleClear}
          title="Clear search"
        >
          close
        </button>
      )}
    </div>
  );
};

export default SearchBar;