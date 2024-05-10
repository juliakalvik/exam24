import { useEffect, useState } from "react";
import { fetchVenueById } from "../../lib/api";
import './style.css';


const VenueDetails = () => {
  const [venue, setVenue] = useState();
  const params = new URLSearchParams(new URL(window.location.href).search);
  const venueId = params.get("venueId");


  useEffect(() => {
    fetchData();
    
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchVenueById(venueId);
      setVenue(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  if (!venue) {
    return <div>Loading...</div>;
  }


  return (
    <>
    <div className="header">
      <h1>Venue: {venue.data.name} </h1>
      <p>Location: {venue.data.location.city}</p>

    </div>
    <div className="content1">
      {venue.data.media && venue.data.media.length > 0 && (
                <img src={venue.data.media[0].url} />
              )}
       <h2>a map here</h2> 
    </div>
    <div className="content2">
    <p>Info about the owner: {venue.data.owner.name}</p>
    </div>
    

    </>
  );
};

export default VenueDetails;
