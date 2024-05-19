import React from "react";
import "./style.css";
import ToggleAdmin from "../toggle";
import { useState,useEffect } from "react";


const OwnerProfile = () => {
  const [profile, setProfile] = useState([]);

  /* const { name } = useParams(); */
  useEffect(() => {
    const fetchData = async () => {
        const accessToken = localStorage.getItem("token");
        const url = `https://v2.api.noroff.dev/holidaze/profiles/${localStorage.getItem("name")}`;
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
          const profileData = await response.json();
          console.log(profileData);
          setProfile(profileData.data);
        }
        catch (error) {
        console.error("Error fetching data:", error);
        }
      }
  
    fetchData();
  }, []);

  return (
    <>
      <ToggleAdmin />
      <div className="usercard">
        <div className="profilecardparent">
          <img
            src="https://www.brit.co/media-library/jennifer-aniston-rachel-green-friends.jpg?id=35237685&width=600&height=600&quality=90&coordinates=0%2C0%2C0%2C3"
            alt="A sample image"
          />
          <h4>Hi, {profile.name}</h4>
          <p>Bio: {profile.bio}</p>
          <p>Email: {profile.email}</p>
          <p>My bookings: {profile._count?._bookings}</p>
          <p className="role">Role: {profile.venueManager? "Host":"Guest"  } </p>
        </div>
        <div className="profile-edit">
          <h4>Profile Settings</h4>
          <form>
            <label htmlFor="editName">Name:</label>
            <input type="text" id="editName" name="editName" />

            <label htmlFor="editBio">Bio:</label>
            <textarea id="editBio" name="editBio"></textarea>

            <label htmlFor="editAvatar">Avatar:</label>
            <input type="file" id="editAvatar" name="editAvatar" accept="image/*" />

            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OwnerProfile;
