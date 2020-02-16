import React, {useState, useEffect} from 'react';
import './profile.css';
import { List, ListItem, ListItemText, Divider, ListItemSecondaryAction, IconButton, Typography, TextField, DialogActions } from '@material-ui/core';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Autocomplete } from '@material-ui/lab';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Information from "../functions/information"

const Profile = (props) => {

    //Profile
    const [loading, setLoading] = useState(true);
    const [loadingLocations, setLoadingLocations] = useState(true);
    const [locationsData, setLocationsData] = useState([]);
    const [data, setData] = useState([]);

    //List view
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState('');
    const [location, setLocation] = useState('')
    const [autocomplete, setAutocomplete] = useState('')
    const [id, setId] = useState('')
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
            info: info,
            id: id
        };

        try {
            let response = await fetch("http://192.168.100.20:8080/api/modifyReservation", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            let newData = await response.json();
            setLoading(true);
            setOpen(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

    const onClickEdit = (elem) => {
        setInfo(elem.info);
        setDate({
            selDate: elem.start,
            startTime: elem.start,
            endTime: elem.end
        })
        setLocation(elem.location)
        setAutocomplete(elem.location);
        setId(elem.id);
        setOpen(true);
    }

    const onClickDelete = async(id) => {
        const bodyData = {
            id: id
        };

        try {
            let response = await fetch("http://192.168.100.20:8080/api/removeReservation", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            let newData = await response.json();
            setData(data.filter(item => item.id !== id));
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (!loading) {
            return undefined;
        }

        async function fetchData() {
            const bodyData = {
                name: props.username
            }
            try {
                let response = await fetch('http://192.168.100.20:8080/api/getReservationsByUser', {
                    method: 'post',
                    headers: { 'Content-Type':'application/json'},
                    body: JSON.stringify(bodyData)
                });
                response = await response.json();
                let parsedResponse = response.map(elem => ({
                    name: elem.name,
                    start: new Date(elem.start),
                    end: new Date(elem.end),
                    location: elem.location,
                    info: elem.info,
                    id: elem._id
                }));
                parsedResponse.sort((a,b)=>a.start.getTime()-b.start.getTime());
                setData(parsedResponse);
                setLoading(false);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, [loading, props.username]);

    useEffect(() => {

        if (!loadingLocations) {
            return undefined;
        }

        async function fetchData() {
            try {
                let response = await fetch("http://192.168.100.20:8080/api/getLocations");
                let jsonData = await response.json()
                setLocationsData(jsonData);
                setLoadingLocations(false);
            }
            catch (err) {
                console.log("Error while loading data");
            }
            
        }
        fetchData();
    },[loadingLocations]);


    return (
        <div>
            <div className="page-wrapper">
                <Information username={props.username} />
                <div className="list">
                    Omat varaukset:
                    {data.map(elem =>
                    <div key={elem.id}>
                        <List>
                            <ListItem button>
                                <ListItemText
                                    primary={elem.info}
                                    secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary">
                                        {elem.location}
                                    </Typography>
                                    {" — " + elem.start.getDate()}.{elem.start.getMonth()+1}.{elem.start.getFullYear()} klo {elem.start.getHours()}:
                                    {elem.start.getMinutes() < 10 ? String(0) + String(elem.start.getMinutes()) : elem.start.getMinutes()} - {elem.end.getHours()}:
                                    {elem.end.getMinutes() < 10 ? String(0) + String(elem.end.getMinutes()) : elem.end.getMinutes()}
                                    </React.Fragment>
                                    }
                                    />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={() => onClickEdit(elem)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => onClickDelete(elem.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                        <Divider />
                    </div>
                    )}
                    

                </div>
            </div>
            <Dialog
            fullWidth
            maxWidth='sm'
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title">
            <DialogTitle id="max-width-dialog-title">Varauksen muokkaaminen</DialogTitle>
            <DialogContent>
                <Autocomplete
                    id="combo-box"
                    options={locationsData}
                    getOptionLabel={option => option.name}
                    loading={loadingLocations}
                    onSelect={handleSelect}
                    defaultValue={{name: autocomplete}}
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
                        className="dialog-info"
                        id="outlined-multiline-static"
                        label="Lisätietoja"
                        multiline
                        rows="4"
                        variant="outlined"
                        value={info}
                        onChange={(event => setInfo(event.target.value))}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='inherit' variant="outlined">Peruuta</Button>
                <Button onClick={handleSubmit} color='inherit' variant="outlined">Tallenna</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}

export default Profile;