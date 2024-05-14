import React from "react";
import "./style.css";
import ToggleAdmin from "../toggle";

const OwnerProfile = () => {
  /* const { name } = useParams(); */

  return (
    <>
      <ToggleAdmin />
      <div className="userheader">
          <img
            src="https://www.brit.co/media-library/jennifer-aniston-rachel-green-friends.jpg?id=35237685&width=600&height=600&quality=90&coordinates=0%2C0%2C0%2C3"
            alt="A sample image"
          />
      </div>
      <div className="usercard">
        <div className="profilecardparent">
          <h4>Hi, username</h4>
          <p>Bio skal inn her tenkte jeg, heihei her er jeg.</p>
        </div>
        <div className="profile-edit">
          <h4>Profile Settings</h4>
          <form>
            <label htmlFor="editName">Name:</label>
            <input type="text" id="editName" name="editName" />

            <label htmlFor="editBio">Bio:</label>
            <textarea id="editBio" name="editBio"></textarea>

            <label htmlFor="editAvatar">Avatar:</label>
            <input type="file" id="editAvatar" name="editAvatar" accept="image/*" />

            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OwnerProfile;
