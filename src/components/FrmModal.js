"use client";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Modal, Button, Form} from "react-bootstrap";
import {baseApiAuth} from "../api/baseApi";
import {modifyUrl} from "../utils/funcs";
import DynamicAttributeField from "./DynamicAttributeField";

const FrmModal = forwardRef(({url, onSubmit}, ref) => {

    const [show, setShow] = useState(false);
    const [pageData, setPageData] = useState({});
    const [requestUrl, setRequestUrl] = useState("");
    const onHide = () => setShow(show => false)
    useImperativeHandle(ref, () => ({
        showModal: async (id) => {
            setShow(show => true)
            const requestUrl = modifyUrl(url, id);
            setRequestUrl(requestUrl);
            console.log('modifyUrl', requestUrl);
            try {
                const response = await baseApiAuth.get(requestUrl);
                setPageData(response.data);
                console.log('response', response.data);
            } catch (err) {
                console.error("Error fetching tags:", err);
            } finally {
            }
        },
    }));

    const handleSubmitLinks = async () => {
        const validFiles = [];

        try {
            const response = await baseApiAuth.post(requestUrl, pageData);
            console.log('response', response.data);
        } catch (err) {
            console.error("Error fetching tags:", err);
        } finally {
        }
        // onSubmit(validFiles);
        // onHide();
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
                            onChange={(value) => updateData([...prevArr, item.id], 'title_en', value)}
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
                <Button variant="primary" onClick={handleSubmitLinks}>
                    تایید
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default FrmModal;