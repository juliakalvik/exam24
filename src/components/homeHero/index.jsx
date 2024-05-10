import React from 'react';
import "./style.css";

const HomeHero = ({ searchQuery, setSearchQuery }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header>
      <h1>Venues for any event or happening</h1>
      <p>Weddings, birthday parties, proms</p>
      <div className="search-bar">
        <input type="text" placeholder="Search by name" value={searchQuery} onChange={handleSearchChange} />
      </div>
      <div className="city-buttons">
        <button>City1</button>
        <button>City2</button>
        <button>City3</button>
        <button>City4</button>
        <button>City5</button>
      </div>
    </header>
  );
};

export default HomeHero;
