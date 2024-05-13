import React, { useState } from "react";
import "./style.css";
import ToggleAdmin from "../toggle";

const ManageVen = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddVenue = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <ToggleAdmin />
      <div className="flex">
        <div className="venueslist">
          <div className="btn">
            <button type="button" onClick={handleAddVenue}>
              + Add a new venue
            </button>
          </div>
          <div className="venueslistcard">
            <img
              src="https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A sample image"
            />
            <h4>Name</h4>
            <p>Active bookings</p>
            <div className="buttons">
              <button type="button"><i class="fa-regular fa-pen-to-square"></i>  Edit</button>
              <div className="deletebtn">
                <button type="button">
                  <i class="fa-regular fa-trash-can"></i> Delete
                </button>
              </div>
            </div>
          </div>
          <div className="venueslistcard">
            <img
              src="https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A sample image"
            />
            <h4>Name</h4>
            <p>Active bookings</p>
            <div className="buttons">
              <button type="button"><i class="fa-regular fa-pen-to-square"></i>  Edit</button>
              <div className="deletebtn">
                <button type="button">
                  <i class="fa-regular fa-trash-can"></i> Delete
                </button>
              </div>
            </div>
          </div>
          <div className="venueslistcard">
            <img
              src="https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A sample image"
            />
            <h4>Name</h4>
            <p>Active bookings</p>
            <div className="buttons">
              <button type="button"><i class="fa-regular fa-pen-to-square"></i>  Edit</button>
              <div className="deletebtn">
                <button type="button">
                  <i class="fa-regular fa-trash-can"></i> Delete
                </button>
              </div>
            </div>
          </div>
          <div className="venueslistcard">
            <img
              src="https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A sample image"
            />
            <h4>Name</h4>
            <p>Active bookings</p>
            <div className="buttons">
              <button type="button"><i class="fa-regular fa-pen-to-square"></i>  Edit</button>
              <div className="deletebtn">
                <button type="button">
                  <i class="fa-regular fa-trash-can"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <span className="close-btn" onClick={handleCloseForm}>
              &times;
            </span>
            <form>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />

              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description"></textarea>

              <label htmlFor="media">Media:</label>
              <input type="file" id="media" name="media" accept="image/*" />

              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price" />

              <label htmlFor="maxGuests">Max Guests:</label>
              <input type="number" id="maxGuests" name="maxGuests" />

              <label htmlFor="location">Location:</label>
              <input type="text" id="location" name="location" />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageVen;
