import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Autocomplete } from '@material-ui/lab';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';


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
        width: '520px',
    },
    keskitys: {
        color: "black",
        top: -40,
        position: "absolute",
        left: '23%',
        transform: 'translate(-50%)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
    createRes: {
        minHeight: '60vh',
        maxHeight: '60vh',
    },
    endTimePicker: {
        marginLeft: '20px',
    }
}));




const CreateRes = (props) => {

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

    const classes = useStyles();
    const open = props.open;
    const handleClose = props.handleClose;

    const [info, setInfo] = useState('');
    const [location, setLocation] = useState('')
    const [date, setDate] = useState({
        selDate: new Date(),
        startTime: new Date(),
        endTime: new Date()
    });

    const handleSelect = (event) => {
        setLocation(event.target.value);
    }

    const handleDateChange = newDate => {
        setDate({...date, selDate: newDate})
    };

    const handleStartTimeChange = newDate => {
        setDate({...date, startTime: newDate});
    };

    const handleEndTimeChange = newDate => {
        setDate({...date, endTime: newDate});
    };

    const handleSubmit = async() => {
        let startDate = new Date(date.selDate.getFullYear(), date.selDate.getMonth(), date.selDate.getDate(), date.startTime.getHours(), date.startTime.getMinutes());
        let endDate = new Date(date.selDate.getFullYear(), date.selDate.getMonth(), date.selDate.getDate(), date.endTime.getHours(), date.endTime.getMinutes());
        const bodyData = {
            name: props.username,
            start: startDate,
            end: endDate,
            location: location,
            info: info
        };


        console.log(bodyData);
        try {
            let response = await fetch("http://localhost:8080/api/saveReservation", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            let newData = await response.json();
            props.updateCalendar(true);
        }
        catch (err) {
            console.log(err);
        }
        props.handleClose();
    }

    return (
        <div>
            <Dialog
                classes={{paper: classes.createRes}}
                fullWidth
                maxWidth='sm'
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">Uusi varaus</DialogTitle>
                <DialogContent>
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd.MM.yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Päivämäärä"
                            value={date.selDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <br />
                        <KeyboardTimePicker
                            /*margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}*/
                            disableToolbar
                            ampm={false}
                            variant="inline"
                            format="HH:mm"
                            margin="normal"
                            id="time-picker-start"
                            label="Varaus alkaa"
                            value={date.startTime}
                            onChange={handleStartTimeChange}
                            onAccept={() => console.log("test")}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                        <KeyboardTimePicker className={classes.endTimePicker}
                            /*margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}*/
                            disableToolbar
                            ampm={false}
                            variant="inline"
                            format="HH:mm"
                            margin="normal"
                            id="time-picker-end"
                            label="Varaus päättyy"
                            value={date.endTime}
                            onChange={handleEndTimeChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        /> 
                    </MuiPickersUtilsProvider>
                    <form noValidate autoComplete="off">
                        <br />
                        <TextField
                            className={classes.moreAbout}
                            id="outlined-multiline-static"
                            label="Lisätietoja"
                            multiline
                            rows="6"
                            variant="outlined"
                            value={info}
                            onChange={(event => setInfo(event.target.value))}
                        />
                        <br />
                        <Button className={classes.cancel} onClick={props.handleClose}color='inherit' variant="outlined">Peruuta</Button>
                        <Button className={classes.accept} onClick={handleSubmit} color='inherit' variant="outlined">Luo</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>)
};

export default CreateRes;