"use client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddFromLinkModal = ({ show, onHide, onSubmit }) => {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const handleAddLink = () => {
    if (newLink) {
      setLinks((prevLinks) => [...prevLinks, newLink]);
      setNewLink("");
    }
  };

  const handleSubmitLinks = async () => {
    const validFiles = [];
    
    for (const link of links) {
      try {
        const response = await fetch(link);
        const contentType = response.headers.get("content-type");

        if (!response.ok) throw new Error("Invalid response");

        const supportedFormats = {
          "image/jpeg": "jpg",
          "image/png": "png",
          "image/gif": "gif",
          "image/webp": "webp",
        };

        const blob = await response.blob();
        let [fileName, extension] = link.split("/").pop().split("?")[0].split(".");

        if (!extension) {
          extension = supportedFormats[contentType];
          fileName += `.${extension}`;
        }
        console.log(fileName);
        
        if (supportedFormats[contentType]) {
          const file = new File([blob], fileName, { type: contentType });
          validFiles.push(file);
        } else {
          console.error(`Invalid file format: ${contentType}`);
          alert(`Invalid file format: ${contentType}`);
        }
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }

    onSubmit(validFiles);
    setLinks([]);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>افزودن از لینک</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="mediaLink" className="mb-3">
            <Form.Label>لینک فایل</Form.Label>
            <Form.Control
              type="url"
              placeholder="لینک را وارد کنید"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddLink}>
            افزودن به لیست
          </Button>
        </Form>
        <hr />
        <div className="mt-2">
          <h6>لینک‌ها:</h6>
          {links.length > 0 ? (
            links.map((link, index) => <p key={index} className="text-truncate">{link}</p>)
          ) : (
            <p>هیچ لینکی اضافه نشده است.</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          لغو
        </Button>
        <Button variant="primary" onClick={handleSubmitLinks}>
          ارسال لینک‌ها
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddFromLinkModal;