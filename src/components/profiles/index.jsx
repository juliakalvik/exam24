import React, { useState, useEffect } from "react";
import "./style.css";




const FetchProfiles = ({ searchQuery }) => {
  const [profiles, setProfiles] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
        const accessToken = localStorage.getItem("token");
        const url = "https://v2.api.noroff.dev/holidaze/profiles/";
        const options = {
          method: "GET",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": localStorage.getItem("apiKey"),
          },
        };
      
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error("Failed to create API key");
          }
          const profilesData = await response.json();
          console.log(profilesData);
          setProfiles(profilesData.data);
        }
        catch (error) {
        console.error("Error fetching data:", error);
        }
      }

    fetchData();
  }, []);

  

  return (
    <div className="cardparent">
      {profiles.map((data) => (
        <div key={data.name}>
          <div className="venuescard">
          <img src={data.avatar.url}/>
          <div className="flexprofiles">
            <p>Username: {data.name}</p>
            <p>Contact: {data.email}</p>
            <p className="role">Role: {data.venueManager? "Host":"Guest"  } </p>

          </div>
         
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default FetchProfiles;



  
