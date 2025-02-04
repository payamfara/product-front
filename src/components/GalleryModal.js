import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import {mediaUrl} from "../utils/funcs";

const GalleryModal = ({ show, onHide, onSubmit }) => {
    const [dataList, setDataList] = useState([]);
    const [selectedUrls, setSelectedUrls] = useState([]);

    useEffect(() => {
        if (show) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save_images/products/`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setDataList(data.data);
                })
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [show]);

    const handleCheckboxChange = (url) => {
        setSelectedUrls((prev) =>
            prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
        );
    };

    const handleInsert = () => {
        onSubmit(selectedUrls);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>انتخاب تصویر یا فایل</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center mb-4">
                    <h3 className="mb-2">انتخاب تصویر یا فایل</h3>
                    <p className="text-muted">تصاویر یا فایل‌های دلخواهتان را انتخاب کنید</p>
                </div>
                <div
                    id="productSections"
                    style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}
                >
                    {dataList
                        .filter(
                            (product) =>
                                (product.images && product.images.length) ||
                                (product.files && product.files.length)
                        )
                        .map((product) => (
                            <div className="product-section mb-4" key={product.part_number_en}>
                                <h5 className="mb-3">پارت نامبر: {product.part_number_en}</h5>

                                {/* بخش تصاویر */}
                                {product.images && product.images.length > 0 && (
                                    <div className="images-section">
                                        <h6>تصاویر محصول</h6>
                                        <Row>
                                            {product.images.map((image, idx) => (
                                                <Col
                                                    xs={4}
                                                    className="mb-2 position-relative gallery-item"
                                                    key={`${product.part_number_en}-image-${idx}`}
                                                >
                                                    <label
                                                        className="gallery-img-wrapper"
                                                        style={{ cursor: "pointer", display: "block" }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="gallery-checkbox"
                                                            style={{ display: "none" }}
                                                            checked={selectedUrls.includes(image)}
                                                            onChange={() => handleCheckboxChange(image)}
                                                        />
                                                        <img
                                                            src={mediaUrl(image)}
                                                            alt={product.part_number_en}
                                                            className="img-thumbnail gallery-img"
                                                        />
                                                        {selectedUrls.includes(image) && (
                                                            <div
                                                                className="selected-tick"
                                                                style={{
                                                                    display: "flex",
                                                                    position: "absolute",
                                                                    top: "10px",
                                                                    right: "10px",
                                                                    background: "rgba(0, 128, 0, 0.8)",
                                                                    color: "white",
                                                                    borderRadius: "50%",
                                                                    width: "20px",
                                                                    height: "20px",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    fontSize: "14px",
                                                                    zIndex: 2,
                                                                }}
                                                            >
                                                                ✔
                                                            </div>
                                                        )}
                                                    </label>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                )}

                                {/* بخش فایل‌ها */}
                                {product.files && product.files.length > 0 && (
                                    <div className="files-section mt-3">
                                        <h6>فایل‌های دیگر</h6>
                                        <Row>
                                            {product.files.map((file, idx) => (
                                                <Col
                                                    xs={4}
                                                    className="mb-2 position-relative gallery-item"
                                                    key={`${product.part_number_en}-file-${idx}`}
                                                >
                                                    <label
                                                        className="gallery-img-wrapper"
                                                        style={{ cursor: "pointer", display: "block" }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="gallery-checkbox"
                                                            style={{ display: "none" }}
                                                            checked={selectedUrls.includes(file)}
                                                            onChange={() => handleCheckboxChange(file)}
                                                        />
                                                        {file.match(/\.(jpeg|jpg|png|gif|bmp|svg|webp)$/i) ? (
                                                            <img
                                                                src={mediaUrl(file)}
                                                                alt={product.part_number_en}
                                                                className="img-thumbnail gallery-img"
                                                                onError={(e) =>
                                                                    (e.target.src = "/static/images/file-placeholder.png")
                                                                }
                                                            />
                                                        ) : (
                                                            <div className="file-icon-wrapper text-center">
                                                                <i className="fs-1 fa-solid fa-file"></i>
                                                                <p className="small text-truncate">
                                                                    {file.split("/").pop()}
                                                                </p>
                                                            </div>
                                                        )}
                                                        {selectedUrls.includes(file) && (
                                                            <div
                                                                className="selected-tick"
                                                                style={{
                                                                    display: "flex",
                                                                    position: "absolute",
                                                                    top: "10px",
                                                                    right: "10px",
                                                                    background: "rgba(255, 128, 0, 0.8)",
                                                                    color: "white",
                                                                    borderRadius: "50%",
                                                                    width: "20px",
                                                                    height: "20px",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    fontSize: "14px",
                                                                    zIndex: 2,
                                                                }}
                                                            >
                                                                ✔
                                                            </div>
                                                        )}
                                                    </label>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleInsert}>
                    درج انتخاب‌ها
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    بستن
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GalleryModal;
