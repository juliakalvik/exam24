import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "@tanstack/react-router";

const FetchVenues = ({ searchQuery }) => {
  const [filteredVenues, setFilteredVenues] = useState([]);

  useEffect(() => {
    const fetchData = async (query) => {
      try {
        let response;
        if (!query) {
          response = await fetch(
            `https://v2.api.noroff.dev/holidaze/venues?_owner=true&sort=created`
          );
        } else {
          response = await fetch(
            `https://v2.api.noroff.dev/holidaze/venues/search?q=${query}&_owner=true&sort=created`
          );
        }
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const { data } = await response.json();
        setFilteredVenues(data); // Update to setFilteredVenues(data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(searchQuery);
  }, [searchQuery]);

  return (
    <div className="cardparent">
      {filteredVenues?.map((data) => (
        <div key={data.id}>
          <div key={data.id} className="venuescard">
            <Link to={`../venueDetails?venueId=${data.id}`}>
              {" "}
              {data.media && data.media.length > 0 && (
                <img src={data.media[0].url} alt="Venue" />
              )}{" "}
            </Link>
            <div className="cardflex">
              <h2>{data.name}</h2>
              <div className="ownerflex">
                <p>Price per night: {data.price}</p>
                <p>
                  Owner:{" "}
                  <a href={`../ownerprofile/${data.owner.name}`}>
                    {data.owner.name}
                  </a> 
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchVenues;
