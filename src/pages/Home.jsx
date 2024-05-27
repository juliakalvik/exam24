import React, { useState } from 'react';
import HomeHero from '../components/homeHero';
import FetchVenues from '../components/venues';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleCityButtonClick = (city) => {
    setSearchQuery(city);
  };

  const handleClearFilter = () => {
    setSearchQuery('');
  };

  return (
    <div>
      <HomeHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage} handleCityButtonClick={handleCityButtonClick} handleClearFilter={handleClearFilter} />
      <FetchVenues searchQuery={searchQuery} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;