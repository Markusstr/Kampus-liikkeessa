import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
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
        width: '670px',
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
        minHeight: '80vh',
        maxHeight: '80vh',
    }
}));


const CreateRes = (props) => {
    const classes = useStyles();
    const open = props.open;
    const handleClose = props.handleClose;

    const [date, setDate] = useState({
        selDate: new Date(),
        startTime: new Date(),
        endTime: new Date()
    });

    const handleDateChange = date => {
        setDate({...date, selDate: date})
    };

    const handleStartTimeChange = date => {
        setDate({...date, startTime: date});
    };

    const handleEndTimeChange = date => {
        setDate({...date, endTime: date});
    };

    return (
        <div>
            <Dialog
                classes={{paper: classes.createRes}}
                fullWidth
                maxWidth='md'
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">Uusi varaus</DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd.MM.yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
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
                            variant="inline"
                            format="hh:mm"
                            margin="normal"
                            id="time-picker-inline"
                            label="Varaus alkaa"
                            value={date.startTime}
                            onChange={handleStartTimeChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
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
                            variant="inline"
                            margin="normal"
                            id="time-picker-inline"
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
                        />
                        <br />
                        <Button className={classes.cancel} color='inherit' variant="outlined">Peruuta</Button>
                        <Button className={classes.accept} color='inherit' variant="outlined">Luo</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>)
};

export default CreateRes;