import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';
import TextField from '@material-ui/core/TextField';
    


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        color: "white",
        height: 70,
        '& .MuiTextField-root': {
        },
    },
    languageButton: {
        color: "black",
    },
    make: {
        color: "black",
        marginLeft: "auto",
        marginRight: -12,
        marginRight: theme.spacing(1)
    },
    support: {
        color: "black",
        edge: "start"
    },
}));

export default function Login(props) {
  const classes = useStyles();

  return (
    <div>
        <div className={classes.root}>
        <AppBar position="static" color="white">
            <Toolbar>
            <Button className={classes.support} color="inherit">Tuki</Button>
            <Button className={classes.make} color="inherit">Luo tili</Button>
            <IconButton className={classes.languageButton} color="inherit" aria-label="Language">
                <LanguageIcon onClick={props.prop1} />
            </IconButton>
            </Toolbar>
        </AppBar>
        </div>
        <form noValidate autoComplete="off">
            <TextField fullWidth margin="normal" id="outlined-username" label="Käyttäjätunnus/sähköposti" type="text" InputLabelProps={{ shrink: true, }} variant="outlined"/>
            <TextField fullWidth margin="normal" id="outlined-username" label="Salasana" type="text" InputLabelProps={{ shrink: true, }} variant="outlined"/>
        </form>
        {props.prop2 ? <p>totta</p> : <p>ei totta</p>}
    </div>
    );
}