import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { styled } from "@mui/material";
import { localStorageUsersKey } from "./constants/index";

const LoginWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

async function loginUser({ username, password }) {
  const users = JSON.parse(localStorage.getItem(localStorageUsersKey)) || [];
  const user = users.find((user) => {
    return user.email === username && user.password === password;
  });

  return Promise.resolve(user);
}

export const LoginForm = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    if (token) {
      setToken(token);
    } else {
      alert("User not found");
    }
  };

  return (
    <LoginWrapper>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </LoginWrapper>
  );
};

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired
};
