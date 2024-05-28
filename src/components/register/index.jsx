import { useState } from "react";
import { registerUser } from "../../lib/api";
import { useNavigate } from "@tanstack/react-router";
import "./style.css";
import { Link } from "@tanstack/react-router";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    venumanager: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registrationError, setRegistrationError] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = ["name", "email", "password"];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `Please enter ${field}.`;
      }
    });
  
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
  
    const emailRegex = /^(.+)@(stud\.noroff\.no|noroff\.no)$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Invalid email address. Use stud.noroff.no or noroff.no.";
    }
  
    const nameRegex = /^[^\W_]+$/;
    if (!nameRegex.test(formData.name)) {
      newErrors.name =
        "Name should not contain punctuation symbols apart from underscore.";
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  
    try {
      const response = await registerUser({
        username: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: formData.avatar,
        venueManager: formData.venumanager,
      });
  
      if (!response.error) {
        setRegistrationError(""); 
      
       
        setConfirmationMessage("Registration successful. Please proceed to login.");
       
        setFormData({
          name: "",
          email: "",
          password: "",
          avatar: "",
          venumanager: false,
        });
      } else {
        if (response.error.includes("already exists")) {
          setRegistrationError("User already exists with this email.");
        } else {
          setRegistrationError("Registration failed. Please try again later.");
        }
        setConfirmationMessage(""); 
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationError("Registration failed. Please try again later.");
      setConfirmationMessage("");
    }
  };
  

  return (
    <>
    <div className="signup-parent">

    <form
      className="signup-form"
      method="post"
      action="/auth/register"
      onSubmit={handleSubmit}
    >
      <h2 className="form-title">Create your account today</h2>
      {confirmationMessage && (
        <div className="success-message">{confirmationMessage}</div>
      )}
      {registrationError && (
        <span className="error-message">{registrationError}</span>
      )}
      <label className="form-label">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </label>

      <label className="form-label">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </label>

      <label className="form-label">
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-input"
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </label>

      <label className="form-label">
        Avatar URL:
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <div className="form-group">
        <input
          id="venumanager"
          name="venumanager"
          type="checkbox"
          onChange={handleChange}
          className="form-checkbox"
        />
        <label htmlFor="venumanager" className="form-label-inline">
          Check to register as a host.
        </label>
      </div>

      <button className="submit-button" type="submit">
        Sign Up
      </button>
      <p className="signup-prompt">
        Already have an account?{" "}
        <Link to="/login" className="signup-link">
          Log in here
        </Link>
      </p>
    </form>
    </div>
    </>
  );
};

export default SignUpForm;
