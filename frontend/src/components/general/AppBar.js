import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';

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
    marginRight: -12,
    marginRight: theme.spacing(1)
  },
  make: {
    color: "black",
    marginRight: theme.spacing(1)
  },
  support: {
    color: "black",
    edge: "start"
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="white">
        <Toolbar>
          <Button className={classes.support} color="inherit">Tuki</Button>
          <Link to="/login" className={classes.login}>
            <Button color="inherit">Kirjaudu</Button>
          </Link>
          <Button className={classes.make} color="inherit">Luo tili</Button>
          <IconButton className={classes.languageButton} color="inherit" aria-label="Language">
              <LanguageIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}