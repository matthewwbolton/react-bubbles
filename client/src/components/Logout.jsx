import React, { useEffect } from "react";
import styled from "styled-components";

const NewDiv = styled.div`
  display: flex;
  width: inherit;
  justify-content: center;
`;

const Logout = () => {
  const logout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <NewDiv>
      <h1>Thanks for playing with Bubbles!!!</h1>
    </NewDiv>
  );
};

export default Logout;
