import React, {useState, useEffect, Fragment} from "react";
import {Modal, Button} from "react-bootstrap";
import {mediaUrl} from "../utils/funcs";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import DynamicAttributeField from "./DynamicAttributeField";
import Loading from "./Loading";

const GalleryModal = ({show, onHide, onSubmit}) => {
    const [dataList, setDataList] = useState([]);
    const [selectedUrls, setSelectedUrls] = useState([]);
    const [searchQ, setSearchQ] = useState('');
    const [debounceSearch, setDebounceSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const loadData = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/save_images/products/?search_q=${searchQ}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setDataList(data.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setDebounceSearch(searchQ);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQ]);

    useEffect(() => {
        if (show) {
            loadData();
        }
    }, [show, debounceSearch]);

    const handleCheckboxChange = (urls) => {
        setSelectedUrls((prev) => {
            const notExistUrls = urls.filter((url) => !prev.includes(url));
            console.log('urls', urls, notExistUrls);
            return notExistUrls.length ? [...prev, ...notExistUrls] : prev.filter((p) => !urls.includes(p))
        })
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
            <Modal.Header className={'gap-2 align-items-center'} closeButton>
                <div className="flex flex-col gap-1">
                    <h3 className={'text-primary m-0'}>انتخاب تصویر یا فایل</h3>
                    <p className="m-0 text-muted">(تصاویر یا فایل‌های دلخواهتان را انتخاب کنید)</p>
                </div>
                <DynamicAttributeField
                    onChange={(value) => setSearchQ(value)}
                    data={{
                        attribute_name_en: "search_q",
                        attribute_name_fa: "جستجو ...",
                        attr_type: {
                            type: "string",
                        },
                        attribute_value: searchQ,
                    }}
                />
            </Modal.Header>
            <Modal.Body className={'px-0'}>
                <div className="position-relative">
                    <div
                        className={`d-flex flex-column gap-2 spec-scroll overflow-auto h-400p`}>
                        {dataList
                            .filter(
                                (product) =>
                                    (product.images && product.images.length) ||
                                    (product.files && product.files.length)
                            )
                            .map((product, key) => (
                                <div key={key} id={product.product_id}
                                     className={`${key % 2 === 1 ? 'bg-label-light' : 'bg-label-secondary'} p-2 mx-3 pt-1 rounded-3 d-flex flex-column`}>
                                        <div className={'small text-primary align-items-center gap-2 d-flex p-1'}>
                                            <Button
                                                onClick={() => handleCheckboxChange(product.images)}
                                                className={'btn btn-sm p-1 rounded-pill'}
                                            >
                                                {product.images.some(url => !selectedUrls.includes(url)) ? '' : '✔'}
                                            </Button>
                                            <div className={'text-break text-justify'}>{product.part_number_en}</div>
                                            <hr className={'border-label-primary flex-grow-1 opacity-50'}/>

                                        </div>
                                        <Flickity className={'w-100'} options={flickityOptions}>
                                            {product.images.map((image, idx) => (
                                                <div className={'p-1 img-lg'}>
                                                    <label
                                                        className="border-1 border-label-primary bg-white w-100 h-100 rounded p-2"
                                                        style={{cursor: "pointer", display: "block"}}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="gallery-checkbox"
                                                            style={{display: "none"}}
                                                            checked={selectedUrls.includes(image)}
                                                            onChange={() => handleCheckboxChange([image])}
                                                        />
                                                        <img
                                                            src={mediaUrl(image)}
                                                            alt={product.part_number_en}
                                                            className="shadow-sm rounded w-100 h-100"
                                                        />
                                                        {selectedUrls.includes(image) && (
                                                            <div
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
                            ))}

                    </div>
                    <div
                        className={`${loading ? 'opacity-100' : 'opacity-0'} blur top-0 z-1 d-flex justify-content-center align-items-center transition bg-transparent position-absolute w-100 h-100`}>
                        <Loading/>
                    </div>

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
