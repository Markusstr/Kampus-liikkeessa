import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import HomeIcon from '@material-ui/icons/Home';
import URL_DB from './config';

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
  logout: {
    color: "black",
    marginLeft: theme.spacing(1),
  },
  profile: {
    marginTop: "6px",
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
    display: "flex",
    color: "black",
    marginLeft: "auto",
    marginRight: 0,
  },
  background: {
    backgroundColor: "lightGray",
  },
  notSel: {
    backgroundColor: "white",
  },
  flagSize: {
  },
}));

function ComponentCreate(props) {
  const classes = useStyles();
  return (
  <Link to="/createAccount" className={classes.make} disabled={props.disabled} style={{textDecoration: "none"}}>
    <Button color="inherit" disabled={props.disabled}>Luo tili</Button>
  </Link>)
}

function ComponentLogin(props) {
  const classes = useStyles();
  return (
  <Link to="/login" className={classes.login} disabled={props.disabled} style={{textDecoration: "none"}}>
    <Button color="inherit" disabled={props.disabled}>Kirjaudu</Button>
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

async function deleteSessId (props) {
  const bodyData = {
    name: props.currUsername,
    sessionID: props.SESSID,
    newSessId: "00",
  }
  console.log("Trying to log out: "+ bodyData.name);
  try {
    let response = await fetch(URL_DB + 'api/logout', {
        method: "post",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(bodyData)
    });
    response = await response.json();

}
catch (err) {
    console.log(err);
}
}


export default function ButtonAppBar(props) {

  const classes = useStyles();

  const handleLogout = (props) => {
    deleteSessId(props);
    props.setLoggedStatus(false);
    props.setUsername('');
  }

  function buttonClicked(inputString) {
    if (props.currentPage.localeCompare(inputString)===0) {
      return classes.background;
    }
    else {
      return classes.notSel;
    }
  }

  function AppBarContent() {
    if (props.loggedStatus) {
      return (
        <div>
          <Button 
            className={classes.logout}
            color="inherit"
            onClick={() => {handleLogout(props)}}>
            Kirjaudu ulos
            </Button>
          <ComponentLanguage />
        </div>);
    }
    else {
      return (      
      <div>
        <ComponentLogin disabled={props.currentPage.localeCompare("login")===0} />
        <ComponentCreate disabled={props.currentPage.localeCompare("createAccount")===0}/>
        <ComponentLanguage />
      </div>);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBarColor} color="inherit">
        <Toolbar>

          <Link to="/" className={classes.Home} style={{textDecoration: "none"}} >
            <IconButton className={classes.Home} color="inherit" aria-label="Home">
                <HomeIcon />
            </IconButton>
          </Link>

          <Link to="/support" className={classes.support} disabled={props.disabled} style={{textDecoration: "none"}}>
            <Button color="inherit">Tuki</Button>
          </Link>
          <Link to="/" className={classes.Logo} style={{textDecoration: "none"}}>
            <IconButton aria-label="Logo">
              <img src={`${process.env.PUBLIC_URL}/KampusLiikkessaLogo.svg`} />
            </IconButton>
          </Link>
          <div className={classes.makeGOright}>
            {props.loggedStatus ?
            <Link to="/profile" className={classes.profile} style={{textDecoration: "none"}}>
              <Button color="inherit" >Profiili</Button>
            </Link> : ""}
            <AppBarContent />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}