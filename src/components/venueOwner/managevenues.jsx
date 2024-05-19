import React, { useState } from "react";
import "./style.css";
import ToggleAdmin from "../toggle";
import { createNewVenue } from "../../lib/api";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const ManageVen = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit(data) {
    console.log(data);
    createNewVenue(data) 

  } 

  /*function NewVenue() {
  const navigate = useNavigate();
 
}
*/
  const [mediaPreview, setMediaPreview] = useState("");



  /*const createVenue = async (e) => {
    e.preventDefault();
    console.log(e);

    const requiredFields = ["name", "description", "price", "maxGuests"];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `Please enter ${field}.`;
      }
    });
    try {
      const postData = {
        ...formData,
        media: formData.media.split(",").map((item) => item.trim()),
      };

      const response = await postNewVenue(postData);

      // If response have id, it was a success.
      navigate({
        to: "/listingdetails?productId=" + response.id,
      });
    } catch (error) {
      console.log(error);
      console.error("Error during registration:");
    }
  };*/

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
          <div className="venueslistcard">
            <img
              src="https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A sample image"
            />
            <h4>Name</h4>
            <p>Active bookings</p>
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
          <div className="venueslistcard">
            <img
              src="https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A sample image"
            />
            <h4>Name</h4>
            <p>Active bookings</p>
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
          <div className="venueslistcard">
            <img
              src="https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A sample image"
            />
            <h4>Name</h4>
            <p>Active bookings</p>
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
          <div className="venueslistcard">
            <img
              src="https://images.unsplash.com/photo-1521334726092-b509a19597c6?q=80&w=3301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="A sample image"
            />
            <h4>Name</h4>
            <p>Active bookings</p>
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
                  {...register("price", { setValueAs: v => parseInt(v), required: true })} 
                />
                <input
                  type="number"
                  placeholder="Max guests"
                  {...register("maxGuests", { setValueAs: v => parseInt(v), required: true })}
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
