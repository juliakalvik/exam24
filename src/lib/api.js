import { API_URL } from "./constants";

//* Specific venue:

export async function fetchVenueById(venueId) {
  const url = new URL(`${API_URL}/${venueId}`);
  url.searchParams.append("_owner", "true");
  url.searchParams.append("_bookings", "true");

  try {
    const response = await fetch(url.href);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

//* Register:


export async function registerUser({ email, password, username, avatar }) {
  const url = new URL(`https://v2.api.noroff.dev/auth/register`);

  const userData = {
    name: username,
    email,
    password,
    avatar: { url: avatar }, 
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

