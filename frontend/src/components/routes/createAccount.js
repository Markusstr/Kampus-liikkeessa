import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {Redirect} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';






const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        color: "white",
        height: 70,
        top: 200,
        position: "absolute",
        left: '50%',
        transform: 'translate(-50%)',
        '& .MuiTextField-root': {
            margin: theme.spacing(4),
        },
    },
    accept: {
        color: "black",
        position: "absolute",
        marginTop: theme.spacing(8),
        left: '75%',
        transform: 'translate(-50%)', 
        width: '120px',
        height: '40px',
    },
    cancel: {
        color: "black",
        position: "absolute",
        marginTop: theme.spacing(8),
        left: '25%',
        transform: 'translate(-50%)', 
        width: '120px',
        height: '40px',
    },
    small: {
        color: "black",
        width: '180px',
        height: '60px',
    },
    big: {
        color: "black",
        width: '300px',
        height: '60px',
    },
    moreAbout: {
        width: '670px',
    },
    keskitys: {
        color: "black",
        top: -40,
        position: "absolute",
        left: '23%',
        transform: 'translate(-50%)',
    },
}));

export default function Create(props) {
    const classes = useStyles();
    const handlePage = props.handleCurrentPage;

    useEffect(() => {
        handlePage("createAccount");
        if (props.loggedStatus) {
            return <Redirect to="/"/>
        }
    }, []);

    const [values, setValues] = useState({
        password: '',
        passwordCheck: '',
        showPassword: false,
        showPasswordCheck: false
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    }

    const handleChangeVerify = prop => event => {
        setValues({...values, [prop]: event.target.value});
    }

    const handleClickPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleClickPasswordCheck = () => {
        setValues({...values, showPasswordCheck: !values.showPasswordCheck});
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
            <div className={classes.root}>
            <form noValidate autoComplete="off">
                <p className={classes.keskitys}>* Tähdellä merkityt kentät ovat pakollisia.</p>
                <TextField
                className={classes.big}
                required
                margin="normal" 
                id="outlined-firstname"
                label="Etunimi"
                variant="outlined"
                />
                <TextField
                className={classes.big}
                required
                margin="normal" 
                id="outlined-surname"
                label="Sukunimi"
                variant="outlined"
                />
                <br/>
                <TextField
                className={classes.big}
                required
                margin="normal"
                input type="tel"
                id="outlined-phone"
                label="Puhelin"
                variant="outlined"
                />
                <TextField
                className={classes.big}
                required
                margin="normal" 
                id="outlined-nro"
                label="Opiskelijanumero"
                variant="outlined"
                />
                <br/>
                <TextField
                className={classes.big}
                required
                margin="normal"
                input type="email"
                id="outlined-email"
                label="Sähköposti"
                variant="outlined"
                />
                <TextField
                className={classes.big}
                required
                margin="normal"
                input type="email"
                id="outlined-emailAgain"
                label="Sähköpostin vahvistus"
                variant="outlined"
                />
                <br/>
                <TextField
                className={classes.big}
                required
                margin="normal" 
                id="outlined-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                label="Salasana"
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
                <TextField
                className={classes.big}
                required
                margin="normal" 
                id="outlined-passwordAgain"
                type={values.showPasswordCheck ? "text" : "password"}
                value={values.passwordCheck}
                label="Salasanan vahvistus"
                variant="outlined"
                onChange={handleChangeVerify("passwordCheck")}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password"
                                    onClick={handleClickPasswordCheck}
                                    edge="end">
                                        {values.showPasswordCheck ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                            </InputAdornment>
                            ),
                        }}
                />
                <br/>
                <TextField
                className={classes.moreAbout}
                id="outlined-multiline-static"
                label="Lisätietoja"
                multiline
                rows="6"
                variant="outlined"
                />
                <br/>
                <Button className={classes.cancel} color='inherit' variant="outlined">Peruuta</Button>
                <Button className={classes.accept} color='inherit' variant="outlined">Luo</Button>
            </form>
            </div>
            <Paper elevation={3}>
            <Typography component="div" style={{ backgroundColor: 'white', height: '100vh' }} />
            </Paper>
        </Container>
    </React.Fragment>  
    );
}