import React, { useEffect, useState } from "react";
import "./style.css";
import ToggleAdmin from "../toggle";
import { createNewVenue } from "../../lib/api";
import { useForm } from "react-hook-form";

const ManageVen = () => {
  const [showForm, setShowForm] = useState(false);
  const [profileVenues, setProfileVenues] = useState([]);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    createNewVenue(data);
  }

  useEffect(() => {
    const getVenuesByProfile = async (profileName) => {
      const url = new URL(
        `https://v2.api.noroff.dev/holidaze/profiles/${profileName}/venues`
      );
      const accessToken = localStorage.getItem("token");
      const apiKey = localStorage.getItem("apiKey");

      let options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProfileVenues(data.data);
      } catch (error) {
        console.error("Error fetching venues:", error);
        setError(error.message);
      }
    };

    const profileName = localStorage.getItem("name");
    if (profileName) {
      getVenuesByProfile(profileName);
    } else {
      setError("Profile name not found in localStorage");
    }
  }, []);

  const handleAddVenue = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="flex">
        <ToggleAdmin />
        <div className="venueslist">
          <div className="btn">
            <button type="button" onClick={handleAddVenue}>
              + Add a new venue
            </button>
            <h2>Admin dashboard</h2>
          </div>
          {error && <div>Error: {error}</div>}
          {!profileVenues.length && !error && <div>Loading...</div>}
          {profileVenues.length > 0 && (
            <div>
              {profileVenues.map((venue) => (
                <div key={venue.id} className="venueslistcard">
                  <img src={venue.media[0].url} alt={venue.media[0].alt || venue.name} />
                  <h4>{venue.name}</h4>
                  <p>Active bookings: {venue._count.bookings}</p>
                  <div className="buttons">
                    <button type="button">
                      <i className="fa-regular fa-pen-to-square"></i> Edit
                    </button>
                    <div className="deletebtn">
                      <button type="button">
                        <i className="fa-regular fa-trash-can"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showForm && (
        <div className="formparent">
          <div className="overlay">
            <div className="form-container">
              <span className="close-btn" onClick={handleCloseForm}>
                &times;
              </span>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  placeholder="Venue title"
                  {...register("name", { required: true, min: 2 })}
                />
                <input
                  type="text"
                  placeholder="Description"
                  {...register("description", { required: true })}
                />
                <input
                  type="url"
                  placeholder="Media URL"
                  {...register("media[0].url", {})}
                />
                <input
                  type="number"
                  placeholder="Price"
                  {...register("price", {
                    setValueAs: (v) => parseInt(v),
                    required: true,
                  })}
                />
                <input
                  type="number"
                  placeholder="Max guests"
                  {...register("maxGuests", {
                    setValueAs: (v) => parseInt(v),
                    required: true,
                  })}
                />
                <input
                  type="text"
                  placeholder="City"
                  {...register("location.city", {})}
                />

                <input type="submit" />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageVen;
