import React, {useEffect, useRef, useState} from "react";
import $ from "jquery";
import "select2";
import {baseApiAuth} from "../api/baseApi";

const Select2Component = ({
                              options = [],
                              asyncUrl,
                              onChange,
                              placeholder,
                              value,
                              multiple = false,
                              ...props
                          }) => {
    const selectRef = useRef();

    const fetchOptions = async (searchTerm = '') => {
        const separator = asyncUrl.includes("?") ? "&" : "?";
        const requestUrl = `${asyncUrl}${separator}title_en__icontains=${searchTerm}`;
        const response = await baseApiAuth.get(requestUrl);
        return response.data.results.map((item) => ({
            value: item.id || item.pk || item.value,
            label: item.title_en || item.title || item.value || item.label || item.name,
        }));
    };

    useEffect(() => {
        const $select = $(selectRef.current);

        const select2Config = {
            placeholder: placeholder || "Select an option",
            allowClear: true,
            width: "100%",
            data: asyncUrl
                ? value
                    ? multiple
                        ? value.map(item => ({
                            ...item,
                            selected: true
                        }))
                        : [{...value, selected: true}]
                    : null
                : options,
            multiple: multiple,
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

        $select.select2(select2Config);

        if (!asyncUrl && value) {
            const selectedValue = multiple ? value.map((item) => item.id) : value.id;
            $select.val(selectedValue).trigger("change");
        }

        $select.on("change", (e) => {
            if (onChange) {
                console.log('testtt')
                const selectedValue = $select.select2("data");
                onChange(multiple ? selectedValue : selectedValue[0]);
            }
        });

        return () => {
            $select.select2("destroy");
        };
    }, []);

    return (
        <select ref={selectRef} {...props}></select>
    );
};

export default Select2Component;
