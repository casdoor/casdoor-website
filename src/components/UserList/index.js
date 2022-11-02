import React from "react";
import users from "/data/users.json";

export function UserList() {
  const User = users.map((user) => {
    return (
      <a className="showcaseLogo" href={user.infolink} target="_blank" key={user.caption} rel="noreferrer">
        <img src={"/img/" + user.image} title={user.caption} alt={user.caption} />
      </a>
    );
  });
  return (
    <div className="showcaseLogos">
      {User}
    </div>
  );
}
