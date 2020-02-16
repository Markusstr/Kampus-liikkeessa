import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "./Calendar.css";

import AutocompleteComponent from '../functions/autocomplete';
import CreateRes from '../functions/createRes';
import { Chip } from '@material-ui/core';
import URL from '../general/config.js';

const BigCalendar = (props) => {
    let localizer;

    const [events, setEvents] = useState([]);
    const [location, setLocation] = useState('');
    const [update, setUpdate] = useState(false);
    const [open, setOpen] = useState(false);
    const [openReservation, setOpenReservation] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventInfo, setEventInfo] = useState({
        name: '',
        info: '',
        start: new Date(),
        end: new Date(),
        location: '',
        id: ''
    });

    useEffect(() => {
        
        if (!update) {
            return undefined;
        }

        async function fetchData() {
            const bodyData = {
                location: location
            };
            try {
                let response = await fetch(URL +"api/getReservations", {
                    method: "post",
                    headers: {"Content-Type":"application/json"},
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
                setEvents(parsedResponse);
                console.log(parsedResponse);
            }
            catch (err) {
                console.log(err);
            }
            setCalendarUpdate(false);
        }

        fetchData();

    },[update, location]);

    const setCalendarUpdate = params1 => {
        setUpdate(params1);
    }

    const handleClickOpen = event => {
        setOpen(true);
        setEventInfo(event);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleOpenRes = () => {
        setOpenReservation(true);
    }

    const handleCloseRes = () => {
        setOpenReservation(false);
    };

    const removeReservation = async () => {
        const bodyData = {
            id: eventInfo.id
        };
        console.log(bodyData);
        try {
            let response = await fetch("http://localhost:8080/api/removeReservation", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            response = await response.json();
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
        setCalendarUpdate(true);
        setOpen(false);
    }
    
    moment.updateLocale('fi', {
        months: 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
        monthsShort: 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
        monthsParseExact: true,
        weekdays: 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
        weekdaysShort: 'su_ma_ti_ke_to_pe_la'.split('_'),
        weekdaysMin: 'Su_Ma_Ti_Ke_To_Pe_La'.split('_'),
        weekdaysParseExact: true,

        longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
        },
        calendar : {
        sameDay : '[Tänään klo] LT',
        nextDay : '[Huomenna klo] LT',
        nextWeek : 'dddd [klo] LT',
        lastDay : '[Eilen klo] LT',
        lastWeek : 'dddd [Viime viikolla klo] LT',
        sameElse : 'L'
        },
        relativeTime : {
        future : '%s/s kuluttua',
        past : '%s/s sitten',
        s : 'muutama sekunti',
        m : 'minuutti',
        mm : '%d minuuttia',
        h : 'tunti',
        hh : '%d tuntia',
        d : 'päivä',
        dd : '%d päivää',
        M : 'kuukausi',
        MM : '%d kuukautta',
        y : 'vuosi',
        yy : '%d vuotta'
        },
        week: {
        dow : 1,
        }
    });


    /* const ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
        }) */
    /*const events = [
        {
            name: 'Markus',
            info: 'Koripallovuoro',
            start: new Date(2020, 0, 16, 12, 30),
            end: new Date(2020, 0, 16, 14, 30),
            location: "Monitoimisali"
        },
        {
            name: 'Markus',
            info: 'Jalkapallo',
            start: new Date(2020, 0, 14, 10, 0),
            end: new Date(2020, 0, 14, 11, 0),
            location: "Monitoimisali"
        },
        {
            name: 'Markus',
            info: 'Amerikkalainen jalkapallo',
            start: new Date(2020, 0, 15, 11, 0),
            end: new Date(2020, 0, 15, 13, 0),
            location: "Monitoimisali"
        }
    ];*/

    const messages = {
        allDay: 'Koko päivä',
        previous: '<',
        next: '>',
        today: 'Tänään',
        month: 'Kuukausi',
        week: 'Viikko',
        day: 'Päivä',
        agenda: 'Agenda',
        date: 'Päivämäärä',
        time: 'Aika',
        event: 'Tapahtuma',
        showMore: total => `+ Näytä lisää (${total})`
    };

    let date = new Date()
    
    localizer = momentLocalizer(moment);

    return(
        <div>
            <AutocompleteComponent prop={setLocation} loggedStatus={props.loggedStatus} prop2={setCalendarUpdate} setOpen={handleOpenRes}/>

            {/*<p>Valittu tila: {locatiosn}</p>*/}
            <div className="colours-container">
                Varausten värit:
                <br />
                <Chip size="small" color="primary" style={{backgroundColor: "#cf970c", marginTop: "10px"}}label="Omat varaukset" />
                <Chip size="small" color="primary" style={{backgroundColor: "#3165ac", marginLeft: "5px", marginTop: "10px"}}label="Muut varaukset" />
            </div>
            <Calendar className="calendar-container"
                messages={messages}
                localizer={localizer}
                events={events}
                views={["week", "month"]}
                defaultView={"week"}
                date={selectedDate}
                onNavigate={date => {setSelectedDate(date)}}
                onSelectEvent={handleClickOpen}
                titleAccessor={'info'}
                scrollToTime={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8)}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={
                    (event, start, end, isSelected) => {
                      let newStyle = {
                        backgroundColor: "#3165ac",
                        color: 'white',
                        borderRadius: "5px",
                        border: "none"
                      };
                      if (props.username === event.name){
                        newStyle.backgroundColor = "#cf970c"
                      }
                
                      return {
                        className: "",
                        style: newStyle
                      };
                    }
                }
                style={{ height: 750 }}
                />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle disableTypography className="top-buttons">
                    {eventInfo.location}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aika: {eventInfo.start.getDate()}.{eventInfo.start.getMonth()+1}.{eventInfo.start.getFullYear()} klo {eventInfo.start.getHours()}:{eventInfo.start.getMinutes()} - {eventInfo.end.getHours()}:{eventInfo.end.getMinutes()}<br />
                        Varaaja: {eventInfo.name}<br />
                        Lisätietoja: {eventInfo.info}
                        
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="bottom-buttons">
                    {/*<IconButton>
                        <DeleteIcon />
                    </IconButton>*/}
                    <Button onClick={() => setOpen(false)}>Peruuta</Button>
                    {props.username === eventInfo.name ? <Button onClick={removeReservation}>Poista</Button> : ''}
                </DialogActions>
            </Dialog>

            <CreateRes updateCalendar={setCalendarUpdate} open={openReservation} handleClose={handleCloseRes} username={props.username} setSelectedDate={setSelectedDate} />
        </div>
    );
}

export default BigCalendar;

