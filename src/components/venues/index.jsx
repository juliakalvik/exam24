import { useState, useEffect } from "react";
import "./style.css";
import { Link } from "@tanstack/react-router";

const FetchVenues = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    fetch("https://v2.api.noroff.dev/holidaze/venues?_owner=true")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setVenues(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="cardparent">
      {venues.map((data) => (
        <div key={data.id}>
          <div key={data.id} className="venuescard">
            <Link to={`../venueDetails?venueId=${data.id}`}> Click here </Link>
            <div class="cardflex">
              <h2>{data.name}</h2>
              <p>Price per day: {data.price}</p>
              <p>
                Owner:{" "}
                <a href={`../ownerprofile/${data.owner.name}`}>
                  {data.owner.name}
                </a>
              </p>

              {data.media && data.media.length > 0 && (
                <img src={data.media[0].url} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchVenues;

