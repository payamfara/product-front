import React, {useState, useEffect, Fragment} from "react";
import {Modal, Button} from "react-bootstrap";
import {mediaUrl} from "../utils/funcs";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";

const GalleryModal = ({show, onHide, onSubmit}) => {
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
    const flickityOptions = {
        freeScroll: true, pageDots: false, prevNextButtons: false,
        cellAlign: "left",
        contain: true,
        wrapAround: false,
        groupCells: 2,
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>انتخاب تصویر یا فایل</Modal.Title>
            </Modal.Header>
            <Modal.Body className={'p-0'}>
                <div className="text-center mb-4">
                    <h3 className="mb-2">انتخاب تصویر یا فایل</h3>
                    <p className="text-muted">تصاویر یا فایل‌های دلخواهتان را انتخاب کنید</p>
                </div>
                <div
                    className={'d-flex flex-column gap-2 spec-scroll overflow-auto max-h-400p'}
                >
                    {dataList
                        .filter(
                            (product) =>
                                (product.images && product.images.length) ||
                                (product.files && product.files.length)
                        )
                        .map((product, key) => (
                            <Fragment key={key}>
                                <div id={product.product_id} className="d-flex flex-column gap-2" >
                                    <div
                                        className="align-self-center flex-wrap pe-none w-50 btn-group translate-y-middle mx-1 z-1">
                                        <Button className={'col-3 text-truncate d-block btn border-1 border-label-secondary shadow-sm bg-white text-secondary btn-sm p-1'}>پارت
                                            نامبر:</Button>
                                        <Button
                                            className={'col-9 text-truncate d-block btn border-1 border-label-secondary shadow-sm bg-white text-secondary btn-sm p-1'}>{product.part_number_en}</Button>
                                    </div>
                                    <div className={'border-1 bg-label-light'}>
                                        <Flickity className="carousel" options={flickityOptions}>
                                            {product.images.map((image, idx) => (
                                                <div
                                                    className={'shadow-lg p-2 img-lg'}
                                                    key={`${product.part_number_en}-image-${idx}`}
                                                >
                                                    <label
                                                        className="bg-white rounded p-2 w-100 h-100"
                                                        style={{cursor: "pointer", display: "block"}}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="gallery-checkbox"
                                                            style={{display: "none"}}
                                                            checked={selectedUrls.includes(image)}
                                                            onChange={() => handleCheckboxChange(image)}
                                                        />
                                                        <img
                                                            src={mediaUrl(image)}
                                                            alt={product.part_number_en}
                                                            className="shadow-lg rounded w-100 h-100"
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
                                                </div>
                                            ))}
                                        </Flickity>
                                    </div>

                                    {/* بخش فایل‌ها */}
                                    {/*{product.files && product.files.length > 0 && (*/}
                                    {/*    <div className="files-section mt-3">*/}
                                    {/*        <Row>*/}
                                    {/*            {product.files.map((file, idx) => (*/}
                                    {/*                <Col*/}
                                    {/*                    xs={4}*/}
                                    {/*                    className="mb-2 position-relative gallery-item"*/}
                                    {/*                    key={`${product.part_number_en}-file-${idx}`}*/}
                                    {/*                >*/}
                                    {/*                    <label*/}
                                    {/*                        className="gallery-img-wrapper"*/}
                                    {/*                        style={{cursor: "pointer", display: "block"}}*/}
                                    {/*                    >*/}
                                    {/*                        <input*/}
                                    {/*                            type="checkbox"*/}
                                    {/*                            className="gallery-checkbox"*/}
                                    {/*                            style={{display: "none"}}*/}
                                    {/*                            checked={selectedUrls.includes(file)}*/}
                                    {/*                            onChange={() => handleCheckboxChange(file)}*/}
                                    {/*                        />*/}
                                    {/*                        {file.match(/\.(jpeg|jpg|png|gif|bmp|svg|webp)$/i) ? (*/}
                                    {/*                            <img*/}
                                    {/*                                src={mediaUrl(file)}*/}
                                    {/*                                alt={product.part_number_en}*/}
                                    {/*                                className="img-thumbnail gallery-img"*/}
                                    {/*                                onError={(e) =>*/}
                                    {/*                                    (e.target.src = "/static/images/file-placeholder.png")*/}
                                    {/*                                }*/}
                                    {/*                            />*/}
                                    {/*                        ) : (*/}
                                    {/*                            <div className="file-icon-wrapper text-center">*/}
                                    {/*                                <i className="fs-1 fa-solid fa-file"></i>*/}
                                    {/*                                <p className="small text-truncate">*/}
                                    {/*                                    {file.split("/").pop()}*/}
                                    {/*                                </p>*/}
                                    {/*                            </div>*/}
                                    {/*                        )}*/}
                                    {/*                        {selectedUrls.includes(file) && (*/}
                                    {/*                            <div*/}
                                    {/*                                className="selected-tick"*/}
                                    {/*                                style={{*/}
                                    {/*                                    display: "flex",*/}
                                    {/*                                    position: "absolute",*/}
                                    {/*                                    top: "10px",*/}
                                    {/*                                    right: "10px",*/}
                                    {/*                                    background: "rgba(255, 128, 0, 0.8)",*/}
                                    {/*                                    color: "white",*/}
                                    {/*                                    borderRadius: "50%",*/}
                                    {/*                                    width: "20px",*/}
                                    {/*                                    height: "20px",*/}
                                    {/*                                    alignItems: "center",*/}
                                    {/*                                    justifyContent: "center",*/}
                                    {/*                                    fontSize: "14px",*/}
                                    {/*                                    zIndex: 2,*/}
                                    {/*                                }}*/}
                                    {/*                            >*/}
                                    {/*                                ✔*/}
                                    {/*                            </div>*/}
                                    {/*                        )}*/}
                                    {/*                    </label>*/}
                                    {/*                </Col>*/}
                                    {/*            ))}*/}
                                    {/*        </Row>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}
                                </div>
                                <hr className={'opacity-50'} />
                            </Fragment>
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
