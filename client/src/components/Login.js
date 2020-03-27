import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const NewDiv = styled.div`
  display: flex;
  width: inherit;
  justify-content: center;
`;

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", state)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        props.history.push("/bubblepage");
      })
      .catch(err => console.log(err.message));
  };

  return (
    <NewDiv>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            onChange={handleChange}
            type="text"
            name="username"
            value={state.username}
            placeholder="Username"
          />
        </label>
        <label>
          Password:
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={state.password}
            placeholder="Password"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </NewDiv>
  );
};

export default Login;
