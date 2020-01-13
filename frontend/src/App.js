
import React, {useState} from 'react';
import {BrowserRouter as Router,
  Switch,
  Route,
  Link }
from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './App.css';
import AppBar from './components/general/AppBar';
import Calendar from './components/routes/calendar';
import Login from './components/routes/login';

function App() {

  const [loggedStatus, setLoggedStatus] = useState(false);

  function handleLogin() {
    console.log("Successful function call.");
    setLoggedStatus(!loggedStatus);
  }

  return (
  <Router>
    {/* Navbar is a specific class and a component, rendered before the router */}
    <div>
        <Switch>
          <Route exact path="/">
            <AppBar prop1={loggedStatus}/>
            <DefaultPort />
          </Route>
          <Route path="/login">
            <Login prop1={handleLogin} prop2={loggedStatus}/>
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
const testList = [
  { title: 'Test1' },
  { title: 'Lappeenranta' },
  { title: 'Testi' },
  { title: 'Testaus' },
];

function DefaultPort() {
  return (<Calendar/>);
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
