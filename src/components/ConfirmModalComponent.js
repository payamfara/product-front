import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Button, Modal} from "react-bootstrap";

let resolvePromise;

const ConfirmModal = ({isOpen, title, message, cancelText, confirmText, onClose}) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        resolvePromise(true);
        onClose();
    };

    const handleCancel = () => {
        resolvePromise(false);
        onClose();
    };

    return ReactDOM.createPortal(
        <Modal show centered onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{title || "تأیید عملیات"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message || "آیا از انجام این عملیات مطمئن هستید؟"}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    {cancelText || "لغو"}
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    {confirmText || "تأیید"}
                </Button>
            </Modal.Footer>
        </Modal>,
        document.body
    );
};

export const confirm = ({title, message}) => {
    return new Promise((resolve) => {
        resolvePromise = resolve; // ذخیره تابع Resolve Promise
        const event = new CustomEvent("open-confirm-modal", {
            detail: {title, message},
        });
        window.dispatchEvent(event);
    });
};

const ConfirmProvider = () => {
    const [modalProps, setModalProps] = useState({
        isOpen: false,
        title: "",
        message: "",
        cancelText: "",
        confirmText: "",
    });

    const handleClose = () => {
        setModalProps((prev) => ({...prev, isOpen: false}));
    };

    React.useEffect(() => {
        const handleOpen = (event) => {
            const {title, message, cancelText, confirmText} = event.detail;
            setModalProps({isOpen: true, title, message, cancelText, confirmText});
        };

        window.addEventListener("open-confirm-modal", handleOpen);
        return () => window.removeEventListener("open-confirm-modal", handleOpen);
    }, []);

    return <ConfirmModal {...modalProps} onClose={handleClose}/>;
};

export default ConfirmProvider;
