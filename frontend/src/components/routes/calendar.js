import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, { useState } from 'react';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import "./Calendar.css";
import { IconButton, Divider } from '@material-ui/core';

import AutocompleteComponent from '../functions/autocomplete';
import { useEffect } from 'react';

const BigCalendar = () => {
    let localizer, events = [];

    const [location, setLocation] = useState('');
    const [open, setOpen] = useState(false);
    const [eventInfo, setEventInfo] = useState({
        name: '',
        info: '',
        start: new Date(),
        end: new Date(),
        location: ''
    });

    useEffect(() => {
        async function fetchData() {
            const bodyData = {
                location: location
            };
            try {
                let response = await fetch("http://localhost:8080/api/getReservations", {
                    method: "post",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(bodyData)
                });
                events = await response.json();
                console.log(events);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchData();

    },[location]);

    const setItemLocation = params1 => {
        setLocation(params1);
    }

    const handleClickOpen = event => {
        setOpen(true);
        setEventInfo(event);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
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
            <AutocompleteComponent prop={setItemLocation}/>

            <p>Valittu tila: {location}</p>

            <Calendar className="calendar-container"
                messages={messages}
                localizer={localizer}
                events={events}
                views={["week", "month"]}
                defaultView={"week"}
                defaultDate={new Date()}
                onSelectEvent={handleClickOpen}
                titleAccessor={'info'}
                scrollToTime={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8)}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 750 }}
                />
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle disableTypography className="top-buttons">
                        {eventInfo.location}
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Aika: {eventInfo.start.getDate()}.{eventInfo.start.getMonth()+1}.{eventInfo.start.getFullYear()} klo {eventInfo.start.getHours()}:{eventInfo.start.getMinutes()} - {eventInfo.end.getHours()}:{eventInfo.end.getMinutes()}<br />
                            Varaaja: {eventInfo.name}<br />
                            Lisätietoja: {eventInfo.info}
                            
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className="bottom-buttons">
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </DialogActions>
                </Dialog>
        </div>
    );
}

export default BigCalendar;

