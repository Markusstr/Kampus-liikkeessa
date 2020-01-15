import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: "white",
    height: 70
  },
  languageButton: {
    color: "black",
  },
  login: {
    color: "black",
    marginLeft: "auto",
    marginRight: -12
  },
  make: {
    color: "black",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(4),
  },
  support: {
    color: "black",
    edge: "start"
  },
  Home: {
    color: "black",
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
}));


export default function ButtonAppBar(props) {

  const classes = useStyles();

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
          {props.currentPage.localeCompare("login")===0 ? <p className={classes.login}></p> : 
            <Link to="/login" className={classes.login}>
              <Button color="inherit">Kirjaudu</Button>
            </Link>
          }
          {props.currentPage.localeCompare("createAccount")===0 ? <p className={classes.make}></p> : 
            <Link to="/createAccount" className={classes.make}>
              <Button color="inherit">Luo tili</Button>
            </Link>
          }
          <IconButton className={classes.languageButton} color="inherit" aria-label="Language">
              <LanguageIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}