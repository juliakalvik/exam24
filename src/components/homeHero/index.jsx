import React from "react";
import "./style.css";

const HomeHero = ({
  setSearchQuery,
  handleCityButtonClick,
  handleClearFilter,
  setCurrentPage
}) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1)
  };

  return (
    <header className="herotext">
      <h1>Find your dream destination</h1>
      <p className="next-adv">Where will your next adventure be?</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          onChange={handleSearchChange}
        /> 
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
      </div>
      <div className="buttonssection">
        <p className="popular">Most popular:</p>
        <div className="city-buttons">
          <button onClick={() => handleCityButtonClick("Oslo")}>Oslo</button>
          <button onClick={() => handleCityButtonClick("Vilajoyhosa")}>
            Vilajoyhosa
          </button>
          <button onClick={() => handleCityButtonClick("Kristiansand")}>
            Kristiansand
          </button>
          <button onClick={() => handleCityButtonClick("Berlin")}>Berlin</button>
          <button onClick={() => handleCityButtonClick("Bergen")}>Bergen</button>
          <button onClick={handleClearFilter}>Clear Filter</button>
        </div>
      </div>
    </header>
  );
};

export default HomeHero;
