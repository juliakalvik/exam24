import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "@tanstack/react-router";

const FetchVenues = ({ searchQuery, currentPage, setCurrentPage }) => {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);

  const venuesPerPage = 21;

  useEffect(() => {
    const fetchData = async (query) => {
      try {
        let response;
        if (!query) {
          response = await fetch(
            `https://v2.api.noroff.dev/holidaze/venues?_owner=true&sort=created&page=${currentPage}&limit=${venuesPerPage}`
          );
        } else {
          response = await fetch(
            `https://v2.api.noroff.dev/holidaze/venues/search?q=${query}&_owner=true&sort=created&page=${currentPage}&limit=${venuesPerPage}`
          );
        }
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const { data, meta } = await response.json();
        setFilteredVenues(data);
        setIsLastPage(meta.isLastPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(searchQuery);
  }, [searchQuery, currentPage, venuesPerPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="cardparent">
        {filteredVenues?.map((data) => (
          <div key={data.id}>
            <div key={data.id} className="venuescard">
              <Link to={`../venueDetails?venueId=${data.id}`}>
                {" "}
                {data.media && data.media.length > 0 && (
                  <img src={data.media[0].url} alt="Venue" />
                )}{" "}
              </Link>
              <div className="cardflex">
                <h2>{data.name}</h2>
                <div className="ownerflex">
                  <p>Price per night: {data.price}</p>
                  <p>
                    Owner:{" "}
                    <a href={`../ownerprofile/${data.owner.name}`}>
                      {data.owner.name}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          <i className="fas fa-angle-left"></i> Previous
        </button>
        <button
          className="pagination-btn"
          disabled={isLastPage}
          onClick={handleNextPage}
        >
          Next <i className="fas fa-angle-right"></i>
        </button>
      </div>
    </>
  );
};

export default FetchVenues;
