import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import styled from "styled-components";
import Login from "./components/Login";
import "./styles.scss";
import Logout from "./components/Logout";

const NewNav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 10vh;
`;

function App() {
  return (
    <Router>
      <NewNav>
        <Link to="/">Login</Link>
        <Link to="/bubblepage">Bubble Page</Link>
        <Link to="/logout">Logout</Link>
      </NewNav>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
          <PrivateRoute path="/bubblepage" component={BubblePage} />
          <PrivateRoute path="/logout" component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
