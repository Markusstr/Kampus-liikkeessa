import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import LanguageIcon from '@material-ui/icons/Language';
import HomeIcon from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: "white",
    height: 70
  },
  languageButton: {
    color: "black",
    marginLeft: theme.spacing(1),
  },
  login: {
    color: "black",
    marginLeft: theme.spacing(1),
  },
  make: {
    color: "black",
    marginLeft: theme.spacing(1),
  },
  support: {
    color: "black",
    edge: "start"
  },
  Home: {
    color: "black",
    marginLeft: 0,
  },
  Logo: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%)',
  },
  appBarColor: {
    color: 'white',
    position: "static",
  },
  makeGOright: {
    color: "black",
    marginLeft: "auto",
    marginRight: 0,
  },
  flagSize: {
  },
}));

function ComponentCreate() {
  const classes = useStyles();
  return (
  <Link to="/createAccount" className={classes.make}>
    <Button color="inherit">Luo tili</Button>
  </Link>)
}

function ComponentLogin() {
  const classes = useStyles();
  return (
  <Link to="/login" className={classes.login}>
    <Button color="inherit">Kirjaudu</Button>
  </Link>)
}

function ComponentLanguage() {
  const classes = useStyles();
  return (

    <IconButton className={classes.languageButton} color="inherit" aria-label="Language"> 
      <SvgIcon viewBox="0 0 1800 1100">
        <svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1100">
          <rect width="1800" height="1100" fill="#fff"/>
          <rect width="1800" height="300" y="400" fill="#003580"/>
          <rect width="300" height="1100" x="500" fill="#003580"/>
        </svg>
      </SvgIcon>
    </IconButton>
  );
}


export default function ButtonAppBar(props) {

  const classes = useStyles();
  const handleLogout = () => {
    props.setLoggedStatus(false);
  }

  function AppBarContent() {
    if (props.loggedStatus) {
      return (<Button 
        className={classes.login}
        color="inherit"
        onClick={() => {handleLogout()}}>
        Kirjaudu ulos</Button>);
    }
    else {
      if (props.currentPage.localeCompare("login")===0) {
        return (
          <div>
            <ComponentCreate/>
            <ComponentLanguage />
          </div>
        );
      }
      else if (props.currentPage.localeCompare("createAccount")===0) {
        return (
          <div>
          <ComponentLogin />
          <ComponentLanguage />
          </div>);
      }
      else {
        return(
          <div>
            <ComponentLogin />
            <ComponentCreate />
            <ComponentLanguage />
          </div>
        );
      }
    }
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBarColor} color="inherit">
        <Toolbar>
          <Link to="/" className={classes.Home}>
            <IconButton className={classes.Home} color="inherit" aria-label="Home">
                <HomeIcon />
            </IconButton>
          </Link>
          {props.currentPage.localeCompare("support")===0 ? <p className={classes.support}></p> : 
            <Link to="/support" className={classes.support}>
              <Button color="inherit">Tuki</Button>
            </Link>
          }
          <Link to="/" className={classes.Logo}>
            <IconButton aria-label="Logo">
              <img src={`${process.env.PUBLIC_URL}/KampusLiikkessaLogo.svg`} />
            </IconButton>
          </Link>
          <div className={classes.makeGOright}>
            <AppBarContent />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}