
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router,
  Switch,
  Route,
  Redirect }
from "react-router-dom";
import './App.css';
import AppBar from './components/general/AppBar';
import Calendar from './components/routes/calendar';
import Login from './components/routes/login';
import Create from './components/routes/createAccount';
import About from './components/routes/about';
import Profile from './components/routes/profile';
import crypto from 'crypto';
import sessionIdAccess from './components/general/sessionId';
import sessionIdChecker from './components/general/checkSession';

/* Current page -variable shows the current page to the AppBar. */

function App() {

  const [loggedStatus, setLoggedStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [username, setUsername] = useState('');
  const SESSID = sessionIdAccess();


  function handleLogin(boolean) {
    //console.log("Successful function call.");
    setLoggedStatus(boolean);
  }
  function handleCurrentPage(parameter1) {
    //console.log("Successful function call.");
    setCurrentPage(parameter1);
  }
  function handleUsernameChange(username) {
    //console.log("Username changed.");
    setUsername(username);
  }
  useEffect(() => {
    sessionIdChecker(handleLogin, handleUsernameChange);
  }, []);

  

  return (
  <Router>
    {/* Navbar is a specific class and a component, rendered before the router */}
    <div>
      <AppBar loggedStatus={loggedStatus} 
      currentPage={currentPage} 
      setLoggedStatus={handleLogin} 
      setUsername={handleUsernameChange} 
      currUsername={username}
      SESSID={SESSID}/>
        <Switch>
          <Route exact path="/">
            <DefaultPort handleCurrentPage={handleCurrentPage} loggedStatus={loggedStatus} username={username} />
          </Route>
          <Route path="/login">
            {loggedStatus ? 
            <Redirect to="/"/> 
            : <Login 
              setLoggedStatus={handleLogin} 
              loggedStatus={loggedStatus} 
              setUsername={handleUsernameChange} 
              handleCurrentPage={handleCurrentPage}
              SESSID={SESSID}/>}
          </Route>
          <Route path="/support">
            <About handleCurrentPage={handleCurrentPage}/>
          </Route>
          <Route path="/createAccount">
            <Create handleCurrentPage={handleCurrentPage}
              SESSID={SESSID}/>
          </Route>
          <Route path="/activity">
            <p>Activity page</p>
          </Route>
          <Route path="/profile">
            <Profile username={username}
              SESSID={SESSID}/>
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
    <Calendar loggedStatus={props.loggedStatus} username={props.username} handleCurrentPage={props.handleCurrentPage} />
  )
}

export default App;
