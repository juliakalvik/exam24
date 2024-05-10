import React from 'react';
import "./style.css";

const HomeHero = ({ setSearchQuery, handleCityButtonClick, handleClearFilter }) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header>
      <h1>Venues for any event or happening</h1>
      <p>Weddings, birthday parties, proms</p>
      <div className="search-bar">
        <input type="text" placeholder="Search by name" onChange={handleSearchChange} />
      </div>
      <div className="city-buttons">
        <button onClick={() => handleCityButtonClick('Oslo')}>Oslo</button>
        <button onClick={() => handleCityButtonClick('Vilajoyhosa')}>Vilajoyhosa</button>
        <button onClick={() => handleCityButtonClick('Kristiansand')}>Kristiansand</button>
        <button onClick={() => handleCityButtonClick('Berlin')}>Berlin</button>
        <button onClick={() => handleCityButtonClick('Bergen')}>Bergen</button>
        <button onClick={handleClearFilter}>Clear Filter</button>
      </div>
    </header>
  );
};

export default HomeHero;
