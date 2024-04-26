import React from "react";
import { useParams } from "react-router-dom";

const OwnerProfile = () => {
  const { username } = useParams();

  return (
    <div>
      <h2>Owner Profile</h2>
      <p>Username: {username}</p>
    </div>
  );
};

export default OwnerProfile;