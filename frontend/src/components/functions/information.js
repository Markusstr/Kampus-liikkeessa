import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './information.css';
import URL from '../general/config.js';

const Information = (props) => {
    const [loadingUser, setLoadingUser] = useState(true)
    const [values, setValues] = useState({
        username: '',
        passwordOld: '',
        passwordNew: '',
        phoneNum: '',
        studentNum: ''
    });
    const [errors, setErrors] = useState({
        username: false,
        passwordOld: false,
        phoneNum: false,
        studentNum: false
    })
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const bodyData = {
                username: props.username
            }
            try {
                let response = await fetch(URL + "api/loadUser", {
                    method: 'post',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify(bodyData)
                });
                response = await response.json();
                setValues({
                    username: response.username,
                    passwordOld: values.passwordOld,
                    passwordNew: values.passwordNew,
                    studentNum: response.studentNum,
                    phoneNum: response.phoneNum
                });
                setLoadingUser(false);
            }
            catch(err) {
                console.log(err)
            }
        }

        fetchData();
    },[loadingUser]);

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
        setErrors({...errors, [prop]: false});
    }

    const checkFields = () => {
        let usernameError = false,
            passwordOldError = false,
            studentNumError = false,
            phoneNumError = false;

        if (values.username === "") {
            usernameError = true;
        }
        if (values.passwordOld === "") {
            passwordOldError = true;
        }
        if (values.studentNum === "") {
            studentNumError = true;
        }
        if (values.phoneNum === "") {
            phoneNumError = true;
        }
        setErrors({
            username: usernameError,
            passwordOld: passwordOldError,
            phoneNum: phoneNumError,
            studentNum: studentNumError
        });

        if (usernameError || passwordOldError || studentNumError || phoneNumError) {
            return false;
        }
        return true;
    }

    const onClickSubmit = async() => {
        if (checkFields()) {
            let checkUser;
            const bodyData = {
                username: values.username,
                password: values.passwordOld
            }
            try {
                checkUser = await fetch(URL + "api/checkUser", {
                    method: 'post',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify(bodyData)
                });
                checkUser = await checkUser.json();
            }
            catch(err) {
                console.log(err)
            }


            if (checkUser) {
                console.log("User correct!");
                let sendPassword;
                if (values.passwordNew.length === 0) {
                    sendPassword = values.passwordOld;
                }
                else {
                    sendPassword = values.passwordNew;
                }
                const bodyData = {
                    username: values.username,
                    password: sendPassword,
                    studentNum: values.studentNum,
                    phoneNum: values.phoneNum
                }
                console.log(bodyData);
                try {
                    let response = await fetch(URL + "api/modifyUser", {
                        method: 'post',
                        headers: { 'Content-Type':'application/json'},
                        body: JSON.stringify(bodyData)
                    });
                    response = await response.json();
                    console.log("Done");
                    setValues({...values, passwordOld: '', passwordNew: ''});
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 3000);
                }
                catch(err) {
                    console.log(err);
                }
            }
            else {
                console.log("User wrong!");
            }
        }
    }

    return (
        <div className="profile">
            Omat tiedot:
            <form className="profile-form" noValidate autoComplete="off">
                <TextField
                    error={errors.username}
                    helperText={errors.username ? "Käyttäjänimi ei voi olla tyhjä" : ""}
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
                <TextField
                    error={errors.passwordOld}
                    helperText={errors.passwordOld ? "Vanha salasana ei voi olla tyhjä" : ""}
                    position='absolute'
                    margin="normal"
                    id="outlined-passwordOld"
                    type="password"
                    value={values.passwordOld}
                    label="Vanha salasana"
                    InputLabelProps={{ shrink: true }} 
                    variant="outlined"
                    onChange={handleChange("passwordOld")}
                    />
                <TextField
                    position='absolute'
                    margin="normal"
                    id="outlined-passwordNew"
                    type="password"
                    value={values.passwordNew}
                    label="Uusi salasana"
                    InputLabelProps={{ shrink: true }} 
                    variant="outlined"
                    onChange={handleChange("passwordNew")}
                    />
                <TextField
                    error={errors.studentNum}
                    helperText={errors.studentNum ? "Opiskelijanumero ei voi olla tyhjä" : ""}
                    position='absolute'
                    margin="normal"
                    id="outlined-studentNum"
                    type="text"
                    value={values.studentNum}
                    label="Opiskelijanumero"
                    InputLabelProps={{ shrink: true }} 
                    variant="outlined"
                    onChange={handleChange("studentNum")}
                    />
                <TextField
                    error={errors.phoneNum}
                    helperText={errors.phoneNum ? "Puhelinnumero ei voi olla tyhjä" : ""}
                    position='absolute'
                    margin="normal"
                    id="outlined-phoneNum"
                    type="tel"
                    value={values.phoneNum}
                    label="Puhelinnumero"
                    InputLabelProps={{ shrink: true }} 
                    variant="outlined"
                    onChange={handleChange("phoneNum")}
                    />
                <Button variant="contained" color="primary" onClick={onClickSubmit} >Tallenna muutokset</Button>
            </form>
            <div className="success">
                {success ? 
                <Alert variant="filled" severity="success" >
                    Tietojen vaihtaminen onnistui!
                </Alert> : ""}
            </div>
        </div>
    )

}

export default Information;