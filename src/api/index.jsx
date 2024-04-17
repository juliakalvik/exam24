import { useState, useEffect } from 'react';
import "../venues/style.css";

const FetchVenues = () => {
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
            <div className="venuescard">
                <div class="cardflex">
                     <h2>{data.name}</h2>
                     <p>Price per day: {data.price}</p>
                         <img
                      src={data.media[0].url}
                      />
                </div>
                    
            </div>
        </div>
      ))}
    </div>
  );
};

export default FetchVenues;
