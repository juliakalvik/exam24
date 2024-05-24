import React, { useState } from 'react';
import HomeHero from '../components/homeHero';
import FetchVenues from '../components/venues';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCityButtonClick = (city) => {
    setSearchQuery(city);
  };

  const handleClearFilter = () => {
    setSearchQuery('');
  };

  return (
    <div>
      <HomeHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleCityButtonClick={handleCityButtonClick} handleClearFilter={handleClearFilter} />
      <FetchVenues searchQuery={searchQuery} />
    </div>
  );
};

export default App;