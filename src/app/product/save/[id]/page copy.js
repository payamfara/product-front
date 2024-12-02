"use client"

// import Select from 'react-select';


// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];
// const CreateProductPage = () => {
//     const handleChange = (selectedOption) => {
//         console.log('Selected:', selectedOption);
//     };

//     return (
//         <div>
//             <h1>Select2 in React</h1>
//             <Select options={options} onChange={handleChange} />
//         </div>
//     );
// }

// export default CreateProductPage;

import React from 'react';
import AsyncSelect from 'react-select/async';

// تابع برای دریافت داده‌ها از سرور
const fetchOptions = async (inputValue) => {
    // اینجا درخواست ایجکس خود را تعریف کنید (مانند استفاده از fetch یا axios)
    const response = await fetch(`http://localhost:8000/autocomplete/attrs/3/?query=${inputValue}`);
    const data = await response.json();
    console.log(data);
    // داده‌ها را به فرمت قابل قبول برای react-select تبدیل کنید
    return data.results.map(item => ({ value: item.id, label: item.text }));
};

const AjaxSelect = () => {
    return (
        <div>
            <h1>Async Select with react-select</h1>
            <AsyncSelect
                cacheOptions // کش کردن درخواست‌های قبلی
                loadOptions={fetchOptions} // تابع ایجکس
                defaultOptions // نمایش گزینه‌های پیش‌فرض
                placeholder="Search..."
            />
        </div>
    );
};

export default AjaxSelect;