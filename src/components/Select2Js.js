import React, {useEffect, useRef, useState} from "react";
import $ from "jquery";
import "select2";
import {baseApiAuth} from "../api/baseApi";
import {IconPencil} from "@tabler/icons-react";
import GalleryModal from "./GalleryModal";
import AddFromLinkModal from "./AddFromLinkModal";
import {modifyUrl} from "../utils/funcs";
import FrmModal from "./FrmModal";

const Select2Component = ({
                              options = [],
                              asyncUrl,
                              onChange,
                              placeholder,
                              value,
                              multiple = false,
                              updatability = true,
                              ...props
                          }) => {
    const selectRef = useRef();
    const modalRef = useRef();
    const isInternalChange = useRef(false);

    const fetchOptions = async (searchTerm = '') => {
        const separator = asyncUrl.includes("?") ? "&" : "?";
        const requestUrl = `${asyncUrl}${separator}title_en__icontains=${searchTerm}`;
        const response = await baseApiAuth.get(requestUrl);
        return response.data.results.map((item) => ({
            id: item.id || item.pk || item.value,
            text: item.title_en || item.title || item.value || item.label || item.name,
        }));
    };

    useEffect(() => {
        const $select = $(selectRef.current);

        const select2Config = {
            templateResult: (item) => {
                if (!updatability || item.loading) {
                    return item.text;
                }
                const $container = $('<div>', {
                    class: 'w-100 d-flex justify-content-between align-items-center'
                });
                const $text = $('<span>').text(item.text);
                const $button = $('<button>', {
                    class: 'z-2 btn btn-light p-1 opacity-70',
                    html: '<svg width="16" height="16"><use href="#icon-pencil"></use></svg>',
                });
                $button.on('mouseup', function (e) {
                    e.stopPropagation();
                    modalRef.current.showModal(item.id)
                });
                $container.append($text, $button);

                return $container;
            },
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
                    results: data,
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
                const selectedValue = $select.select2("data");
                isInternalChange.current = false;
                onChange(multiple ? selectedValue : selectedValue[0]);
                isInternalChange.current = true;
            }
        });

        return () => {
            $select.select2("destroy");
        };
    }, []);

    useEffect(() => {
        if (!isInternalChange.current) return;
        const $select = $(selectRef.current);
        if (value) {
            const selectedValue = multiple
                ? value.map((item) => item.id)
                : value.id;
            $select.val(selectedValue).trigger("change.select2");
        } else {
            $select.val(null).trigger("change.select2");
        }
    }, [value, multiple]);

    return (
        <>
            <select ref={selectRef} {...props}></select>
            <FrmModal
                url={asyncUrl}
                ref={modalRef}
                // onHide={handleCloseAddFromLinkModal}
                // onSubmit={handleAddFromLinkSubmit}
            />
        </>
    );
};

export default Select2Component;
