import React from "react";
import "./style.css";
import ToggleAdmin from "../toggle";

const OwnerProfile = () => {
  /* const { name } = useParams(); */

  return (
    <>
      
      <ToggleAdmin />
      <div className="usercard">
        <div className="profilecardparent">
          <h4>Hi, username</h4>
          <p>Bio skal inn her tenkte jeg, heihei her er jeg.</p>
          <img
              src="https://www.brit.co/media-library/jennifer-aniston-rachel-green-friends.jpg?id=35237685&width=600&height=600&quality=90&coordinates=0%2C0%2C0%2C3"
              alt="A sample image"
            />
        </div>
      </div>
      
      
    </>
  );
};

export default OwnerProfile;
