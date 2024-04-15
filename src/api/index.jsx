import { useState, useEffect } from 'react';

const Fetch = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch('https://v2.api.noroff.dev/holidaze/venues')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setVenues(data.data); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {venues.map((data) => (
        <div key={data.id}>
          <p>{data.id}, {data.name}, {data.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Fetch;
