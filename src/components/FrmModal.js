"use client";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import {baseApiAuth} from "../api/baseApi";
import {modifyUrl, Toast} from "../utils/funcs";
import DynamicAttributeField from "./DynamicAttributeField";

const FrmModal = forwardRef(({url, onSubmit}, ref) => {

    const [show, setShow] = useState(false);
    const [pageData, setPageData] = useState({});
    const [requestUrl, setRequestUrl] = useState("");
    const onHide = () => setShow(show => false)
    useImperativeHandle(ref, () => ({
        showModal: async (id, url) => {
            setShow(show => true)
            const requestUrl = modifyUrl(url, id);
            setRequestUrl(requestUrl);
            try {
                const response = await baseApiAuth.get(requestUrl);
                console.log('response', response);
                setPageData(response.data);
            } catch (err) {
                console.error("Error fetching tags:", err);
            }
        },
    }));

    const handleSubmit = async () => {
        try {
            const response = await baseApiAuth.post(requestUrl, pageData);
            onSubmit({id: response.data.id, text: response.data.title_en})
            onHide();
            Toast.success("موفقیت آمیز بود!");
        } catch (err) {
            console.error("Error fetching tags:", err);
        }
    };

    const handleChange = (name, valueOrFunction) => {
        const getValue = (dep) => typeof valueOrFunction === 'function' ? valueOrFunction(dep) : valueOrFunction;

        const getValueDict = (dep) => {
            const val = getValue(dep);
            return typeof val === 'object' && !Array.isArray(val) ? {
                [name]: val.pk || val.id || val.value,
                [`${name}_str`]: val.text || val.label || val.name || val.title_en,
            } : {[name]: val};
        };
        setPageData((pageData) => ({...pageData, ...getValueDict(pageData[name])}));
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>افزودن از لینک</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className={'d-flex flex-column gap-3'}>
                    {Object.entries(pageData).filter(([key, value]) => pageData.meta_datas[key] && !pageData.meta_datas[key].read_only).map(([key, value]) => (
                        <DynamicAttributeField
                            key={key}
                            onChange={(value) => handleChange(key, value)}
                            className="p-2"
                            data={{
                                attribute_name_en: key,
                                attribute_name_fa: pageData.meta_datas[key].verbose_name,
                                attr_type: pageData.meta_datas[key],
                                attr_value: value,
                            }}
                        />
                    ))}
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    لغو
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    تایید
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default FrmModal;