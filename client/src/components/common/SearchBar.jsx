import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = 'Search schemes...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 text-sm border border-border rounded focus:outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 text-sm bg-primary text-white rounded hover:bg-secondary"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
