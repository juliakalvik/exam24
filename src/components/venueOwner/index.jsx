import React, { useState, useEffect } from "react";
import "./style.css";
import ToggleAdmin from "../toggle";
import { updateProfile, createAPIKey } from "../../lib/api";

const OwnerProfile = (props) => {
  const {setisLoggedIn} = props
  const [profile, setProfile] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      
      const isPageRefreshed = localStorage.getItem("refreshpage");
      if (!isPageRefreshed) {
        localStorage.setItem("refreshpage", "true");
        window.location.reload(); // Hard refresh the page once
      }
      
      if(!localStorage.getItem("apiKey")){
        await createAPIKey()
      }
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
          throw new Error("Failed to fetch profile data");
        }
        const profileData = await response.json();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [localStorage.getItem("apiKey")]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const { value } = e.target;
    setAvatarUrl(value);
    setProfile((prevProfile) => ({
      ...prevProfile,
      avatar: { url: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile(profile);
      setProfile(updatedProfile);
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 4000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="ownerprofile-container">
      {Object.keys(profile).length > 0 && (
        <>
          {profile?.data?.venueManager  && <ToggleAdmin />}
          <div className="ownerprofile">
            {updateSuccess && (
              <div className="success-message">
                Information successfully updated!
              </div>
            )}
            <div className="">
              <p>hi {profile.data.name}</p>
            </div>
            <div className="ownerprofile-header">
              <div className="ownerprofile-info">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name || ""}
                    placeholder={profile.data.name || ""}
                    onChange={handleChange}
                  />

                  <label htmlFor="bio">Bio:</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profile.bio || ""}
                    placeholder={profile.data.bio || ""}
                    onChange={handleChange}
                  ></textarea>

                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email || ""}
                    placeholder={profile.data.email || ""}
                    onChange={handleChange}
                  />

                  <button type="submit" className="save-changes-btn">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
            <div className="ownerprofile-stats">
              <p>
                <strong>My Venues:</strong> {profile.data._count?.venues || 0}
              </p>
              <p>
                <strong>My Bookings:</strong>{" "}
                {profile.data._count?.bookings || 0}
              </p>
              <p className="role">
                <strong>Role:</strong>{" "}
                {profile.data.venueManager ? "Host" : "Guest"}
              </p>
            </div>
          </div>
          <div className="ownerprofile-sidebar">
            <img
              src={avatarUrl || profile.data.avatar?.url || ""}
              alt="Profile Avatar"
              className="ownerprofile-avatar"
            />
            <label htmlFor="avatar" className="urltext">
              Avatar URL:
            </label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              value={avatarUrl || profile.avatar?.url || ""}
              placeholder={profile.data.avatar?.url || ""}
              onChange={handleAvatarChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerProfile;
