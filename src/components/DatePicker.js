import React, { useRef, useEffect } from "react";
import flatpickr from "flatpickr";
import { Persian } from "../../public/js/flatpickr-fa";
import {JDate} from "../../public/js/jdate"; 
import "../../public/js/flatpickr-jalali"; 
import "../../public/css/flatpickr.css"; 

const DatePicker = ({ name, value, onChange }) => {
  const datepickerRef = useRef(null);

  useEffect(() => {
    flatpickr.localize(Persian);

    const fp = flatpickr(datepickerRef.current, {
      disableMobile: "true",
      altInput: true,
      altFormat: 'j F Y',
      dateFormat: 'Y/m/d',
      locale: 'fa',
      defaultDate: value,
      onChange: ([selectedDate]) => {
        onChange(selectedDate);
      },
    });

    return () => {
      fp.destroy(); 
    };
  }, [value, onChange]);

  return (
    <input
      ref={datepickerRef}
      type="text"
      name={name}
      id={name}
      className='form-control'
      placeholder="تاریخ را انتخاب کنید"
    />
  );
};

export default DatePicker;
