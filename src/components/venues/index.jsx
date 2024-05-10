import React, { useState, useEffect } from 'react';
import "./style.css";
import { Link } from "@tanstack/react-router";

const FetchVenues = ({ searchQuery }) => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://v2.api.noroff.dev/holidaze/venues?_owner=true");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setVenues(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = venues.filter(venue =>
      venue.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVenues(filtered);
  }, [searchQuery, venues]);

  return (
    <div className="cardparent">
      {filteredVenues.map((data) => (
        <div key={data.id}>
          <div key={data.id} className="venuescard">
            <Link to={`../venueDetails?venueId=${data.id}`}> Click here </Link>
            <div className="cardflex">
              <h2>{data.name}</h2>
              <p>Price per day: {data.price}</p>
              <p>
                Owner:{" "}
                <a href={`../ownerprofile/${data.owner.name}`}>
                  {data.owner.name}
                </a>
              </p>

              {data.media && data.media.length > 0 && (
                <img src={data.media[0].url} alt="Venue" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchVenues;
