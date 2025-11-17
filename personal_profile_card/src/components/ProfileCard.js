import React from "react";

const ProfileCard = ({ name, bio, email, imageUrl }) => {
  return (
    <div className="profile-card">
      <img src={imageUrl} alt={`${name}'s profile`} className="profile-image" width={300} height={400} style={{borderRadius: "10px"}} />
      <div className="profile-content">
        <h2 className="profile-name">{name}</h2>
        <p className="profile-bio">{bio}</p>
        <a href={`mailto:${email}`} className="profile-email">
          {email}
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
