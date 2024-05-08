import { API_URL } from "./constants";

//* Specific venue:

export async function fetchVenueById(venueId) {
    const url = new URL(`${API_URL}/${venueId}`);
    url.searchParams.append("_owner", "true");
    url.searchParams.append("_bookings", "true")
  
    try {
      const response = await fetch(url.href);
      if (!response.ok) throw new Error(response.statusText);
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
  