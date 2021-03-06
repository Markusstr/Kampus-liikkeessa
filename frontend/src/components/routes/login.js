import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import {Redirect} from 'react-router-dom';
import URL_DB from '../general/config'
import crypto from 'crypto';


const useStyles = makeStyles(theme => ({
    alignCenter: {
        height: '50%',
        alignContent: 'center',
    },
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
        left: '50%',
        margin: theme.spacing(4),
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
    errMsg: {
        color: "red",
        textAlign: "center",
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
    const [errMsg, setErrMsg] = useState({
        errorMessage: 'Username or password incorrect',
        isErr: false,
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    }

    const handleClickPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const loginAwait = async () => {
        //hash password
        let newPassword = crypto.createHash('sha512').update(values.password).digest('hex');
        // console.log(props.SESSID);
        const bodyData = {
            name: values.username,
            password: newPassword,
            sessionID: props.SESSID,
        };
        try {
            let response = await fetch(URL_DB +"api/login", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            response = await response.json();
            if (response) {
                // console.log(response);
                return true;
            }

            return false;
        }
        catch (err) {
            console.log(err);
        }

    }


    const handleLogin = async () => {
        // checking with the database
        const loginBoolean = await loginAwait();
        if (loginBoolean) {
            props.setLoggedStatus(true);
            props.setUsername(values.username);
            // console.log("Success handle");
        }
        else {
            // console.log("Login failed!");
            setErrMsg({...errMsg,
                isErr: true,
            });
        }
    }

    return (
        <div className={classes.root}>
            <Box className={classes.box}>
                <div className={classes.alignCenter}>
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
                    {errMsg.isErr ? <div className={classes.errMsg}>Invalid username or password!<br/></div> : <div></div>}
                    <Button className={classes.login} 
                        onClick={() => {handleLogin()}}
                        color="inherit" 
                        variant="outlined">
                        Kirjaudu
                    </Button>
                </div>
                </Box>
        </div>  
    );
}