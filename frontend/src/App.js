import React from 'react';
import {BrowserRouter as Router,
  Switch,
  Route,
  Link }
from "react-router-dom";
import './App.css';

function App() {
  return (
  <Router>
    {/* Navbar is a specific class and a component, rendered before the router */}
    <div>

      <nav>
        <ul>
          <Link to="/home">
            Home
          </Link>
        </ul>
        <ul>
          <Link to="/about">
            About
          </Link>
        </ul>
        <ul>
          <Link to="/activity">
            Activity
          </Link>
        </ul>
      </nav>

      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/activity">
          <Activity />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

// Routers rendered as functions. Replace these with function or class components when components ready 
function Home () {
  return (
    <div>Homepage</div>
  )
}
function About () {
  return (
    <div>About page</div>
  )
}
function Activity () {
  return (
    <div>Activity page</div>
  )
}
export default App;
