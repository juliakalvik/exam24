import { useState } from "react";
import { registerUser } from "../../lib/api";
import { useNavigate } from "@tanstack/react-router";
import "./style.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    venumanager: false, // Initial value for venuemanager checkbox
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    console.log(checked)
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

    setErrors({
      name: "",
      email: "",
      password: "",
    });

    try {
      const response = await registerUser({
        username: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: formData.avatar,
        venueManager: formData.venumanager,
      });
      if (response.id) {
        // If response have id, it was a success.
        console.log("Registration successful");
        await navigate({ to: "/login" });
      } else {
        const errorData = await response.errors[0].message;
        console.error("Registration failed:", errorData.message);
      }
    } catch (error) {
      console.log(error);
      console.error("Error during registration:");
    }
  };

  return (
    <form
      className="signup-form"
      method="post"
      action="/auth/register"
      onSubmit={handleSubmit}
    >
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </label>

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </label>

      <label>
        AvatarURL:
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
        />
      </label>

      <div>
        <input
          id="venumanager"
          name="venumanager"
          type="checkbox"
          onChange={handleChange}
        />
        <label htmlFor="venumanager">
          Check to register as a venuemanager.
        </label>
      </div>

      <button className="submit-btn" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
