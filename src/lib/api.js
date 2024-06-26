import { API_URL } from "./constants";

//* Auth / create API key:

export const createAPIKey = async () => {
  const accessToken = localStorage.getItem("token");
  const url = "https://v2.api.noroff.dev/auth/create-api-key";
  const options = {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      name: localStorage.getItem("name"),
    },
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

createAPIKey();

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

export async function registerUser({ email, password, username, avatar, venueManager }) {
  const url = new URL(`https://v2.api.noroff.dev/auth/register`);

  const userData = {
    name: username,
    email,
    password,
    avatar: { url: avatar },
    venueManager
  };
  console.log(userData)

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

    const { data } = await response.json();
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
  const url = new URL(
    `https://v2.api.noroff.dev/holidaze/profiles/${profileName}`
  );
  const accessToken = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");
  const options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    },
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

// POST/create new venue:

export async function createNewVenue(newVenue) {
  const url = new URL(`https://v2.api.noroff.dev/holidaze/venues`);
  const accessToken = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  let options = {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(newVenue),
  };


  try {
    const response = await fetch(url, options);
    if (response.ok) return response.json();
  } catch (error) {
    throw new Error(error);
  }
}


// Update a profile:

export async function updateProfile(putProfile) {
  const profileName = localStorage.getItem("name");
  const url = `https://v2.api.noroff.dev/holidaze/profiles/${profileName}`;
  const accessToken = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  const options = {
    method: "PUT",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(putProfile),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}



//All venues by profile:


export async function venuesByProfile(hest) {
  const url = new URL(`https://v2.api.noroff.dev/holidaze/profiles/${hest}/venues`);
  const accessToken = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  let options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    }
  };


  try {
    const response = await fetch(url, options);
    if (response.ok) return response.json();
  } catch (error) {
    throw new Error(error);
  }
}


//Update a venue:

export async function updateVenue(venueId, putVenue) {
  const url = new URL(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`);
  const accessToken = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  let options = {
    method: "PUT",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(putVenue),
  };


  try {
    const response = await fetch(url, options);
    if (response.ok) return response.json();
  } catch (error) {
    throw new Error(error);
  }
}



//Delete a venue:


export async function deleteVenue(venueId) {
  const url = new URL(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`);
  const accessToken = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  let options = {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      
      const responseBody = await response.text();
      if (responseBody) {
        return JSON.parse(responseBody);
      } else {
       
        return null; 
      }
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(error);
  }
}


//Bookings by profile:

export async function usersBookings(upcoming) {
  const url = new URL(`https://v2.api.noroff.dev/holidaze/profiles/${upcoming}/bookings?_venue=true`);
  const accessToken = localStorage.getItem("token");
  const apiKey = localStorage.getItem("apiKey");

  let options = {
    method: "GET",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    }
  };


  try {
    const response = await fetch(url, options);
    if (response.ok) return response.json();
  } catch (error) {
    throw new Error(error);
  }
}