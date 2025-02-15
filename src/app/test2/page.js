"use client";
import React, { useState } from "react";
import Select2Js from "../../components/Select2Js";

const App = () => {
    const [selectedValue, setSelectedValue] = useState([{'id': "36", 'text': "ceramic"}]);

    return (
        <div style={{ width: 300 }}>
            <h3>Async Select2</h3>
            <Select2Js
                multiple
                asyncUrl={'/api2/category/'}
                // options={[{'id': "13", 'text': "IC"}, {'id': "36", 'text': "ceramic"}]}
                placeholder="یک گزینه جستجو کنید"
                value={selectedValue}
                onChange={setSelectedValue}
            />
        </div>
    );
};

export default App;
