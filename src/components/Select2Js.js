import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "select2";
import { baseApiAuth } from "../api/baseApi";

const Select2Component = ({
                              options = [],
                              asyncUrl,
                              onChange,
                              placeholder,
                              value, // مقدار پیش‌فرض
                              ...props
                          }) => {
    const selectRef = useRef();
    const [loadedData, setLoadedData] = useState([]); // داده‌های بارگذاری‌شده

    // تابع برای بارگذاری گزینه‌ها به صورت async
    const fetchOptions = async (searchTerm = '') => {
        const separator = asyncUrl.includes("?") ? "&" : "?";
        const requestUrl = `${asyncUrl}${separator}title_en__icontains=${searchTerm}`;
        const response = await baseApiAuth.get(requestUrl);
        const formattedData = response.data.results.map((item) => ({
            value: item.id,
            label: item.title_en,
        }));
        setLoadedData(formattedData);
        return formattedData;
    };

    console.log('value', value)
    useEffect(() => {
        const $select = $(selectRef.current);

        // تنظیمات اولیه Select2
        const select2Config = {
            placeholder: placeholder || "Select an option",
            allowClear: true,
            width: "100%",
            data: loadedData
        };

        if (asyncUrl) {
            select2Config.ajax = {
                delay: 300,
                transport: async (params, success, failure) => {
                    try {
                        const response = await fetchOptions(params.data.term);
                        success(response);
                    } catch (error) {
                        failure(error);
                    }
                },
                processResults: (data) => ({
                    results: data.map((item) => ({
                        id: item.value,
                        text: item.label,
                    })),
                }),
            };
        }

        // بارگذاری Select2
        $select.select2(select2Config);

        $select.select2('data', value)

        $select.on("change", (e) => {
            if (onChange) {
                const selectedValue = $select.select2("data");
                onChange(selectedValue);
            }
        });

        // پاکسازی هنگام تغییرات یا انصراف
        return () => {
            $select.select2("destroy");
        };
    }, [placeholder, onChange, asyncUrl]);

    // اگر داده‌ها به صورت استاتیک باشند، آنها را نمایش می‌دهیم
    return (
        <select ref={selectRef} {...props}>
            {
                loadedData.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
        </select>
    );
};

export default Select2Component;
