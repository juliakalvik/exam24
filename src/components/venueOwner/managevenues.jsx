import React, { useState, useEffect } from "react";
import "./style.css";
import ToggleAdmin from "../toggle";
import { createNewVenue, updateVenue, deleteVenue } from "../../lib/api";
import { useForm } from "react-hook-form";

const ManageVen = () => {
  const [showForm, setShowForm] = useState(false);
  const [profileVenues, setProfileVenues] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentVenue, setCurrentVenue] = useState(null);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(data) {
    if (editMode) {
      await updateVenue(currentVenue.id, data)
        .then((updatedVenue) => {
          setProfileVenues((prevVenues) =>
            prevVenues.map((venue) =>
              venue.id === currentVenue.id ? updatedVenue : venue
            )
          );
          setEditMode(false);
          setCurrentVenue(null);
        })
        .catch((error) => console.error("Error updating venue:", error));
    } else {
      await createNewVenue(data)
        .then((newVenue) =>
          setProfileVenues((prevVenues) => [...prevVenues, newVenue])
        )
        .catch((error) => console.error("Error creating venue:", error));
    }
    setShowForm(false);
    reset();
    window.location.reload();
  }

  useEffect(() => {
    const getVenuesByProfile = async (profileName) => {
      const url = new URL(
        `https://v2.api.noroff.dev/holidaze/profiles/${profileName}/venues?_bookings=true`
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
    setEditMode(false);
    setCurrentVenue(null);
    reset();
  };

  const handleEditVenue = (venue) => {
    setCurrentVenue(venue);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDeleteVenue = async (venueId) => {
    await deleteVenue(venueId)
      .then(() => {
        setProfileVenues((prevVenues) =>
          prevVenues.filter((venue) => venue.id !== venueId)
        );
      })
      .catch((error) => console.error("Error deleting venue:", error));
  };

  const toggleDropdown = (venueId) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [venueId]: !prev[venueId],
    }));
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                  {venue?.media?.map((media) => (
                    <div key={media?.url}>
                      <img src={media?.url} alt={media?.alt || venue?.name} />
                    </div>
                  ))}
                  <h4>{venue.name}</h4>
                  <p>
                    Active bookings:{" "}
                    <button
                      type="button"
                      onClick={() => toggleDropdown(venue.id)}
                      className="dropdown-btn"
                    >
                      {venue._count.bookings}{" "}
                      <i
                        className={`fa-solid ${
                          dropdownOpen[venue.id]
                            ? "fa-angles-up"
                            : "fa-angles-down"
                        }`}
                      ></i>
                    </button>
                  </p>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => handleEditVenue(venue)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i> Edit
                    </button>
                    <div className="deletebtn">
                      <button
                        type="button"
                        onClick={() => handleDeleteVenue(venue.id)}
                      >
                        <i className="fa-regular fa-trash-can"></i> Delete
                      </button>
                    </div>
                  </div>
                  {dropdownOpen[venue.id] && (
                    <div className="bookings-dropdown">
                      {venue.bookings.length > 0 ? (
                        <div>
                          <h5>Upcoming Bookings:</h5>
                          {venue.bookings.map((booking) => (
                            <div key={booking.id} className="booking">
                              <p>
                                <strong>ID:</strong> {booking.id}
                              </p>
                              <p>
                                <strong>From:</strong>{" "}
                                {formatDate(booking.dateFrom)}
                              </p>
                              <p>
                                <strong>To:</strong>{" "}
                                {formatDate(booking.dateTo)}
                              </p>
                              <p>
                                <strong>Guests:</strong> {booking.guests}
                              </p>
                              <p>
                                <strong>Customer:</strong>{" "}
                                {booking.customer.name} (
                                {booking.customer.email})
                              </p>
                              <div className="hr">
                                <hr></hr>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No upcoming bookings</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {(showForm || editMode) && (
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
                  defaultValue={currentVenue?.name || ""}
                  {...register("name", { required: true, minLength: 2 })}
                />
                <input
                  type="text"
                  placeholder="Description"
                  defaultValue={currentVenue?.description || ""}
                  {...register("description", { required: true })}
                />
                <input
                  type="url"
                  placeholder="Media URL"
                  defaultValue={currentVenue?.media[0]?.url || ""}
                  {...register("media[0].url", {})}
                />
                <input
                  type="number"
                  placeholder="Price"
                  defaultValue={currentVenue?.price || ""}
                  {...register("price", {
                    setValueAs: (v) => parseInt(v),
                    required: true,
                  })}
                />
                <input
                  type="number"
                  placeholder="Max guests"
                  defaultValue={currentVenue?.maxGuests || ""}
                  {...register("maxGuests", {
                    setValueAs: (v) => parseInt(v),
                    required: true,
                  })}
                />
                <input
                  type="text"
                  placeholder="City"
                  defaultValue={currentVenue?.location?.city || ""}
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
