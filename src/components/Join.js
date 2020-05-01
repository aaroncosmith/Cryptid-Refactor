import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CTX } from "./Store";

export default function Join() {
  const { dispatch, user } = React.useContent(CTX);
  const changeUser = (user) => {
    // const user = Object.keys(state.user);
    dispatch({ type: "SET_USER_NAME", payload: user });
  };
  const [users, setUser] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <div>
        <h1>Join</h1>
        <input
          placeholder="Name"
          className="joinInput"
          type="text"
          onChange={(event) => setUser(event.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Room"
          className="joinInput mt-20"
          type="text"
          onChange={(event) => setRoom(event.target.value)}
        />
      </div>
      <Link
        onClick={() => {
          changeUser(`${state.users}`);
        }}
        to={`/chat?name=${users}&room=${room}`}
      >
        <button className={"button mt-20"} type="submit">
          Sign In
        </button>
      </Link>
    </div>
  );
}
