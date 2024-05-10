import React, { useState } from 'react';
import HomeHero from '../components/homeHero';
import FetchVenues from '../components/venues';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <HomeHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FetchVenues searchQuery={searchQuery} />
    </div>
  );
};

export default App;
