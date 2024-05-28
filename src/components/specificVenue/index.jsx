import { useEffect, useState } from "react";
import { fetchVenueById } from "../../lib/api";
import Calendar from "react-calendar";
import { isWithinInterval, format, isSameDay } from "date-fns";
import "./style.css";
import MapContainer from "../map";

const VenueDetails = () => {
  const [venue, setVenue] = useState();
  const [bookingRange, setBookingRange] = useState([]);
  const [guests, setGuests] = useState(1);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [bookingRequested, setBookingRequested] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const params = new URLSearchParams(new URL(window.location.href).search);
  const venueId = params.get("venueId");
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchVenueById(venueId);
      setVenue(data);
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  const createBooking = async () => {
    const accessToken = localStorage.getItem("token");
    const url = "https://v2.api.noroff.dev/holidaze/bookings";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": localStorage.getItem("apiKey"),
      },
      body: JSON.stringify({
        dateFrom: bookingRange[0].toISOString(),
        dateTo: bookingRange[1].toISOString(),
        guests: guests,
        venueId: venueId,
      }),
    };

    try {
      const response = await fetch(url, options);
      if (response.status == 409) {
        setErrorMessage(
          "Conflict: The selected dates are already booked. Please select a new timeframe."
        );
        setBookingRequested(false);
      }
      if (!response.ok) {
        throw new Error("Failed to create booking");
      }
      const bookingData = await response.json();
      setBookingConfirmation(bookingData);
      setBookingRequested(false);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const isDateBooked = (date) => {
    if (!venue || !venue.data.bookings) return false;
    return venue.data.bookings.some((booking) => {
      const bookingStart = new Date(booking.dateFrom);
      const bookingEnd = new Date(booking.dateTo);

      return (
        isWithinInterval(date, { start: bookingStart, end: bookingEnd }) ||
        isSameDay(date, bookingStart)
      );
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const isValidRange =
      bookingRange && bookingRange.length === 2 && guests > 0;
    if (!isValidRange) {
      setErrorMessage(
        "Please select a valid date range (Click one more time on a selected date) and enter the number of guests (above one)."
      );
      return;
    }

    const isAnyDateBooked = bookingRange.some((date) => isDateBooked(date));
    if (isAnyDateBooked) {
      setErrorMessage(
        "Cannot submit booking. Some dates within the selected range are already booked."
      );
      return;
    }

    setBookingRequested(true);
    await createBooking();
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

  const { wifi, parking, breakfast, pets } = venue.data.meta;

  return (
    <>
      <div className="flexspecven">
        <div className="ven-specific-parent">
          <div className="header">
            <h1>{venue.data.name}</h1>
            <div className="content1">
              {venue.data.media && venue.data.media.length > 0 && (
                <img
                  src={venue.data.media[0].url}
                  alt={venue.data.media[0].alt}
                />
              )}
            </div>
            <div className="included-flex">
              <div className="included">
                <p>
                  {" "}
                  <i class="fa-solid fa-location-dot"></i> Location:{" "}
                  {venue.data.location.city}
                </p>
                <p>
                  {" "}
                  <i class="fa-solid fa-user-group"></i> Capacity:{" "}
                  {venue.data.maxGuests} people
                </p>
                <p>
                  {" "}
                  <i class="fa-solid fa-hand-holding-dollar"></i> Price per
                  night: {venue.data.price}
                </p>
              </div>
            </div>
          </div>

          <div className="venue-host">
            <div className="host-details">
              {venue.data.owner.avatar && venue.data.owner.avatar.url && (
                <img
                  src={venue.data.owner.avatar.url}
                  alt={venue.data.owner.avatar.alt || "Host's avatar"}
                />
              )}
              <p>{venue.data.owner.name} is your host</p>
            </div>
            <p>Ratings: {venue.data.rating}</p>
          </div>

          <div className="hr">
            <hr></hr>
          </div>

          <div className="included-flex">
            <div className="included">
              <p>
                {" "}
                <i class="fa-solid fa-wifi"></i> Wifi:{" "}
                {wifi ? "Available" : "Not Available"}
              </p>
              <p>
                {" "}
                <i class="fa-solid fa-square-parking"></i> Parking:{" "}
                {parking ? "Available" : "Not Available"}
              </p>
              <p>
                {" "}
                <i class="fa-solid fa-mug-hot"></i> Breakfast:{" "}
                {breakfast ? "Available" : "Not Available"}
              </p>
              <p>
                {" "}
                <i class="fa-solid fa-paw"></i> Pets:{" "}
                {pets ? "Allowed" : "Not Allowed"}
              </p>
            </div>
          </div>

          <div className="calendar-text">
            <h4>Check availability and pick your dates here</h4>

            
          </div>

          <div className="cal-flex">
          {bookingRequested ? (
            <div className="confirmation">
              <p>Booking being requested...</p>
            </div>
          ) : (
            <div className="calendar-form-wrapper">
              {accessToken && !bookingConfirmation && (
                <>
                  <p>{errorMessage}</p>
                  <form onSubmit={(e) => handleBookingSubmit(e)}>
                    <div className="guest-input">
                      <strong>
                        <label htmlFor="guests">Number of guests:</label>
                      </strong>
                      <input
                        max={venue.data.maxGuests}
                        type="number"
                        id="guests"
                        min="1"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                      />
                    </div>
                    <button
                      type="submit"
                      className="submit-booking"
                      disabled={!venue.data.bookings}
                    >
                      Confirm booking
                    </button>
                    <p>Capacity: {venue.data.maxGuests} people</p>
                    <p>Price per night: {venue.data.price}</p>
                  </form>
                </>
              )}

              <div className="cal">
                {!bookingConfirmation && venue.data.bookings && (
                  <Calendar
                    selectRange={true}
                    tileDisabled={({ date }) => isDateBooked(date)}
                    onChange={setBookingRange}
                    value={bookingRange}
                  />
                )}
              </div>
            </div>
          )}

          </div>


          <div className="conf-parent">

          {accessToken && !bookingConfirmation
            ? null
            : !bookingConfirmation && (
                <strong>You need to be logged in to book.</strong>
              )}

          {bookingConfirmation && (
        
            <div className="confirmation">
              <p>Booking Confirmation:</p>
              <p>
                You have successfully booked from{" "}
                <strong>
                  {format(
                    new Date(bookingConfirmation.data.dateFrom),
                    "dd.MM.yyyy"
                  )}
                </strong>{" "}
                to{" "}
                <strong>
                  {format(
                    new Date(bookingConfirmation.data.dateTo),
                    "dd.MM.yyyy"
                  )}
                </strong>{" "}
                for{" "}
                <strong>
                  {bookingConfirmation.data.guests} guest
                  {bookingConfirmation.data.guests > 1 ? "s" : ""}
                </strong>
                .
              </p>
              <p>
                Booking ID: <strong>{bookingConfirmation.data.id}</strong>
              </p>
              <p>
                Booking created:{" "}
                <strong>
                  {format(
                    new Date(bookingConfirmation.data.created),
                    "dd.MM.yyyy"
                  )}
                </strong>
              </p>
              <p>
                Booking last updated:{" "}
                <strong>
                  {format(
                    new Date(bookingConfirmation.data.updated),
                    "dd.MM.yyyy"
                  )}
                </strong>
              </p>
            </div>
          )}
          </div>




          <div className="hr">
            <hr></hr>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenueDetails;
