import React, { useEffect, useState } from "react";
import { fetchProfileByName } from "../../lib/api";

const UserProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatar"));
  const [profile, setProfile] = useState({
    avatar: localStorage.getItem("avatar"),
    listings: [],
    credits: 0,
  });
  const userName = localStorage.getItem("name");

  useEffect(() => {
    fetchData();
  }, []);
  

  const fetchData = async () => {
    try {
      const data = await fetchProfileByName(userName);
      setProfile(data);
      
      localStorage.setItem("avatar", data.avatar);
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  }

  return (
    <div>
      <h1>Welcome back, {userName}</h1>
      <h2> hi </h2>
      
    </div>
  );
}

export default UserProfile;
