"use client";
import React, { useState } from "react";
import Select2Js from "../../components/Select2Js";
import {baseApiAuth} from "../../api/baseApi";

const App = () => {
    const [selectedValue, setSelectedValue] = useState([{'id': "13", 'text': "IC"}]);

    return (
        <div style={{ width: 300 }}>
            <h3>Async Select2</h3>
            <Select2Js
                asyncUrl={'/api2/category/'}
                placeholder="یک گزینه جستجو کنید"
                value={selectedValue}
                onChange={setSelectedValue}
            />
        </div>
    );
};

export default App;
