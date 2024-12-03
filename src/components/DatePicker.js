import React, { useState, useRef, useEffect } from "react";
import { Persian } from "../../public/js/flatpickr-fa";
import {JDate} from "../../public/js/jdate"; 
import "../../public/js/flatpickr-jalali"; 
import "../../public/css/flatpickr.css"; 

const DatePicker = ({ name, value, onChange }) => {
  
  const datepickerRef = useRef(null);
  const [isReady, setIsReady] = useState(false); 
  
  useEffect(() => {
    flatpickr.localize(Persian);

    const fp = flatpickr(datepickerRef.current, {
      disableMobile: "true",
      altInput: true,
      altFormat: 'j F Y',
      dateFormat: 'Y/m/d',
      locale: 'fa',
      defaultDate: new Date(),
      onChange: ([selectedDate]) => {
        onChange(selectedDate);
      },
      onReady: () => {
        setIsReady(true);
      },
    });

    return () => {
      fp.destroy(); 
    };
  }, [name, value, onChange]);

  return (
    <input
      ref={datepickerRef}
      type={isReady ? "hidden" : "text"}
      name={name}
      id={name}
      className='form-control'
      placeholder="تاریخ را انتخاب کنید"
    />
  );
};

export default DatePicker;
