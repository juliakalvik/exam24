import { API_URL } from "./constants";


//* Auth / create API key:

const createAPIKey = async () => {
  const accessToken = localStorage.getItem("token");
  const url = "https://v2.api.noroff.dev/auth/create-api-key";
  const options = {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      name : localStorage.getItem("name")
    } 
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to create API key");
    }
    const apiKeyData = await response.json();
    const apiKey = apiKeyData.data.key;
    localStorage.setItem("apiKey", apiKey);
    
  } catch (error) {
    console.error("Error creating API key:", error);
    return null;
  }
};


createAPIKey()

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


//* Login:

export async function loginUser({ email, password }) {
  const url = new URL(`https://v2.api.noroff.dev/auth/login`);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(response.statusText);

    const {data} = await response.json();
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("avatar", data.avatar);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}


// Get profile information with the access token
export async function fetchProfileByName(profileName) {
  const url = new URL(`https://v2.api.noroff.dev/holidaze/profiles/${profileName}`);
  const accessToken = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");
  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey
    } 
  };
  

  try {
    const response = await fetch(url.href, options);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

// Fetch single profile



