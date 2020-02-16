import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const Information = () => {
    const [values, setValues] = useState({
        username: '',
        passwordOld: '',
        passwordNew: '',
        phoneNum: '',
        studentNum: ''
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    }

    const checkFields = () => {
        if (values.username.length < 6) {
            return (
                <div>
                    <Alert variant="filled" severity="error">
                        Käyttäjänimi on liian lyhyt!
                    </Alert>
                </div>
            )
        }
        if (values.password.length < 6) {
            return (
                <div>
                    <Alert variant="filled" severity="error">
                        Salasana ei täytä ehtoja!
                    </Alert>
                </div>
            )
        }
    }

    const onClickSubmit = async() => {
        checkFields();
    }

    return (
        <div className="profile">
            Omat tiedot:
            <form className="profile-form" noValidate autoComplete="off">
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
                <TextField
                    position='absolute'
                    margin="normal"
                    id="outlined-passwordOld"
                    type="password"
                    value={values.password}
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
                    value={values.password}
                    label="Uusi salasana"
                    InputLabelProps={{ shrink: true }} 
                    variant="outlined"
                    onChange={handleChange("passwordNew")}
                    />
                <TextField
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
        </div>
    )

}

export default Information;