import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import {Redirect} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        color: "white",
        height: 70,
        '& .MuiTextField-root': {
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            margin: theme.spacing(2),
        },
    },
    login: {
        color: "black",
        position: "absolute",
        left: '50%',
        top: 200,
        transform: 'translate(-50%, -50%)',
        width: '120px',
        height: '40px',
    },
    box: {
        position: "absolute",
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));

export default function Login(props) {
    const classes = useStyles();
/*     const handlePage = props.handleCurrentPage; */

    useEffect(() => {
        props.handleCurrentPage("login");
        if (props.loggedStatus) {
            return <Redirect to="/"/>
        }
    }, []);

    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    }

    const handleClickPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }

    return (
        <div className={classes.root}>
            <Box className={classes.box}>
                <form noValidate autoComplete="off">
                    <TextField
                        position='absolute'
                        margin="normal" 
                        id="outlined-username" 
                        value={values.username}
                        label="Käyttäjätunnus/sähköposti" 
                        type="text" 
                        InputLabelProps={{ shrink: true }} 
                        variant="outlined"
                        onChange={handleChange("username")}
                    />
                    <br/>
                    <TextField
                        position='absolute'
                        margin="normal"
                        id="outlined-password" 
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        label="Salasana"
                        InputLabelProps={{ shrink: true }} 
                        variant="outlined"
                        onChange={handleChange("password")}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password"
                                    onClick={handleClickPassword}
                                    edge="end">
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                            </InputAdornment>
                            ),
                        }}
                        />
                </form>
                {props.loggedStatus ? <p>totta</p> : <p>ei totta</p>}
                    <Button className={classes.login} color="inherit" variant="outlined">Kirjaudu</Button>
                </Box>
        </div>  
    );
}