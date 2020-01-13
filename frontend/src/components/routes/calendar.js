import { Calendar, momentLocalizer } from 'react-big-calendar'
import React from 'react';
import moment from 'moment';

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect } from 'react';

const BigCalendar = () => {
  let localizer;

  useEffect(() => {
  });

  moment.locale('fi', {
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
  const events = [
    {
        title: 'All Day Event very long title',
        start: new Date(2020, 0, 15, 12, 30),
        end: new Date(2020, 0, 15, 14, 30),
    }
  ];

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
        <Calendar messages={messages}
          localizer={localizer}
          events={events}
          views={["week", "month"]}
          defaultView={"week"}
          scrollToTime={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8)}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700 }}
        />
    </div>
  );
}

export default BigCalendar;

