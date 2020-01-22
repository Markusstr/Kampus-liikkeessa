import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        padding: '5px',
    },
    center: {
        display: 'inline-block',
    },
    buttonMargin: {
        top: "5px",
    }
}));

const AutocompleteComponent = props => {

    const classes = useStyles();

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!loading) {
            return undefined;
        }

        async function fetchData() {
            try {
                let response = await fetch("http://localhost:8080/api/getLocations");
                let jsonData = await response.json()
                setData(jsonData);
                setLoading(false);
            }
            catch (err) {
                console.log("Error while loading data");
            }
            
        }
        fetchData();
    },[loading]);

    const handleSelect = (event) => {
        props.prop(event.target.value);
        props.prop2(true);
    }

    const onClickOpen = (event) => {
        props.setOpen(true);
    } 

    return (
        <div className={classes.root}>
            <Autocomplete
                className={classes.center}
                id="combo-box"
                options={data}
                getOptionLabel={option => option.name}
                loading={loading}
                onSelect={handleSelect}
                loadingText="Ladataan..."
                style={{ width: '50%' }}
                renderInput={params => (
                    <TextField {...params} label="Haku" variant="outlined" fullWidth />
                )}
            />
            <br />
            {props.loggedStatus ? 
            <Button 
                className={classes.buttonMargin}
                style={{ width: 300 }}
                variant="contained" 
                color="primary"
                onClick={(event) => onClickOpen()}>
                Uusi varaus
            </Button>
            :
            <div></div>
            }
        </div>
    );
}

export default AutocompleteComponent;