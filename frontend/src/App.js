
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router,
  Switch,
  Route }
from "react-router-dom";
import './App.css';
import AppBar from './components/general/AppBar';
import Calendar from './components/routes/calendar';
import Login from './components/routes/login';
import Create from './components/routes/createAccount';
import About from './components/routes/about';

/* Current page -variable shows the current page to the AppBar. */

function App() {

  const [loggedStatus, setLoggedStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  function handleLogin(boolean) {
    console.log("Successful function call.");
    setLoggedStatus(boolean);
  }
  function handleCurrentPage(parameter1) {
    console.log("Successful function call.");
    setCurrentPage(parameter1);
  }

  return (
  <Router>
    {/* Navbar is a specific class and a component, rendered before the router */}
    <div>
      <AppBar loggedStatus={loggedStatus} currentPage={currentPage}/>
        <Switch>
          <Route exact path="/">
            <DefaultPort handleCurrentPage={handleCurrentPage}/>
          </Route>
          <Route path="/login">
            <Login setLoggedStatus={handleLogin} loggedStatus={loggedStatus} handleCurrentPage={handleCurrentPage}/>
          </Route>
          <Route path="/support">
            <About handleCurrentPage={handleCurrentPage}/>
          </Route>
          <Route path="/createAccount">
            <Create handleCurrentPage={handleCurrentPage}/>
          </Route>
          <Route path="/activity">
            <p>Activity page</p>
          </Route>
        </Switch>
    </div>
  </Router>
  );
}

// Routers rendered as functions. Replace these with function or class components when components ready 

function DefaultPort(props) {
  const handleCurrentPageVar = props.handleCurrentPage;
  useEffect(() => {
    handleCurrentPageVar("home");
  },[]);
  
  return (
    <Calendar />
  )
}

export default App;
