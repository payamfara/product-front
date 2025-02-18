import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import $ from "jquery";
import "select2";
import {baseApiAuth} from "../api/baseApi";
import {IconPencil} from "@tabler/icons-react";
import GalleryModal from "./GalleryModal";
import AddFromLinkModal from "./AddFromLinkModal";
import {modifyUrl} from "../utils/funcs";
import FrmModal from "./FrmModal";

const Select2Component = forwardRef(({
                                         options = [],
                                         asyncUrl,
                                         onChange,
                                         placeholder,
                                         value,
                                         multiple = false,
                                         updatability = false,
                                         ...props
                                     }, ref) => {
    const selectRef = useRef();
    const modalRef = useRef();
    const isInternalChange = useRef(false);

    useImperativeHandle(ref, () => ({
        showModal: (id, url) => modalRef.current.showModal(id, url),
        onChange: handleSubmit
    }));

    const fetchOptions = async (searchTerm = '') => {
        const separator = asyncUrl.includes("?") ? "&" : "?";
        const requestUrl = `${asyncUrl}${separator}title_en__icontains=${searchTerm}`;
        const response = await baseApiAuth.get(requestUrl);
        const data = response.data.results.map((item) => ({
            id: item.id || item.pk || item.value,
            text: item.title_en || item.title || item.value || item.label || item.name,
        }));
        const modifiedData = updatability && !data.some((item) => item.text === searchTerm) ? [{
            id: 0,
            add: true,
            text: 'افزودن'
        }, ...data] : data;
        return modifiedData.map((item) => ({...item, asyncUrl, requestUrl}));
    };

    const convertData = (value) => {
        return value
            ? multiple
                ? value.map(item => ({
                    ...item,
                    selected: true
                }))
                : [{...value, selected: true}]
            : null
    }

    const templateResult = (item) => {
        if (!updatability || item.loading) {
            return item.text;
        }
        const $container = $('<div>', {
            class: `${item.add ? 'text-primary' : ''} w-100 d-flex gap-2 justify-content-between align-items-center`
        });
        const $text = $('<span>', {
            class: 'text-truncate',
        }).text(item.text);
        const $button = item.add ? $('<button>', {
            class: 'z-2 btn btn-primary p-1 opacity-70',
            html: '<svg width="16" height="16"><use href="#icon-plus"></use></svg>'
        }) : $('<button>', {
            class: 'z-2 btn btn-light p-1 opacity-70',
            html: '<svg width="16" height="16"><use href="#icon-pencil"></use></svg>'
        });
        $button.on('mouseup', function (e) {
            e.stopPropagation();
            const url = item.add ? item.requestUrl : item.asyncUrl;
            modalRef.current.showModal(item.id, url)
        });
        $container.append($text, $button);
        return $container;
    }
    const select2Config = (value) => ({
        templateResult,
        placeholder: placeholder || "Select an option",
        allowClear: true,
        width: "100%",
        data: asyncUrl
            ? convertData(value)
            : options.map((item) => ({
                id: item.id || item.pk || item.value,
                text: item.title_en || item.title || item.value || item.label || item.name,
            })),
        multiple: multiple,
        cache: false,
        ajax: asyncUrl ? {
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
        } : null
    });

    const updateValue = () => {
        if (onChange) {
            const selectedValue = $(selectRef.current).select2("data");
            isInternalChange.current = false;
            onChange(multiple ? selectedValue : selectedValue[0]);
        }
    }

    useEffect(() => {
        const $select = $(selectRef.current);

        $select.on('select2:selecting', function (e) {
            var selectedItem = e.params.args.data;
            if (selectedItem.add) {
                e.preventDefault();
            }
        });

        $select.select2(select2Config(value));

        if (!asyncUrl && value) {
            const selectedValue = multiple ? value.map((item) => item.id) : value.id;
            $select.val(selectedValue).trigger("change");
        }

        $select.on("change", updateValue);

        return () => {
            $select.select2("destroy");
        };
    }, []);

    const handleSubmit = (value) => {
        const $select = $(selectRef.current);
        if (asyncUrl) {
            console.log('valval', value)
            $select.empty()
            $select.select2('destroy');
            console.log('config', select2Config(value))
            $select.select2(select2Config(value));
            updateValue();
        } else {
            if (value) {
                const selectedValue = multiple
                    ? value.map((item) => item.id)
                    : value.id;
                $select.val(selectedValue).trigger("change.select2");
            } else {
                $select.val(null).trigger("change.select2");
            }
        }
    }

    return (
        <>
            <select ref={selectRef} {...props}></select>
            <FrmModal
                ref={modalRef}
                onSubmit={handleSubmit}
            />
        </>
    );
});

export default Select2Component;
