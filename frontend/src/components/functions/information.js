import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';

const Information = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        phoneNum: '',
        studentNum: ''
    });

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
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
                    id="outlined-password"
                    type="password"
                    value={values.password}
                    label="Salasana"
                    InputLabelProps={{ shrink: true }} 
                    variant="outlined"
                    onChange={handleChange("password")}
                    />
                <TextField
                    position='absolute'
                    margin="normal"
                    id="outlined-password"
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
                    id="outlined-password"
                    type="tel"
                    value={values.phoneNum}
                    label="Puhelinnumero"
                    InputLabelProps={{ shrink: true }} 
                    variant="outlined"
                    onChange={handleChange("phoneNum")}
                    />
                <Button variant="contained" color="primary">Tallenna muutokset</Button>
            </form>
        </div>
    )

}

export default Information;