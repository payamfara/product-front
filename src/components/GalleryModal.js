import React, {useState, useEffect} from "react";
import {Modal, Button} from "react-bootstrap";
import {mediaUrl} from "../utils/funcs";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import DynamicAttributeField from "./DynamicAttributeField";
import Loading from "./Loading";
import {baseApiAuth} from "../api/baseApi";
import RippleButton from "./RippleButton/RippleButton";
import {IconEye, IconFile} from "@tabler/icons-react";

const GalleryModal = ({show, onHide, onSubmit, displayKeys = {single: 'data_sheet', multi: 'images'}}) => {
    const displayList = Object.values(displayKeys)
    const [pageData, setPageData] = useState([]);
    const [selectedUrls, setSelectedUrls] = useState([]);
    const [searchQ, setSearchQ] = useState('');
    const [debounceSearch, setDebounceSearch] = useState('');
    const [changeLoading, setChangeLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);

    const loadData = () => {
        const requestUrl = `/api2/product/?search_q=${searchQ}`
        setFetchLoading(true);
        baseApiAuth
            .get(requestUrl)
            .then((res) => {
                console.log('res', res.data.results);
                setPageData(res.data.results);
                setFetchLoading(false);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    useEffect(() => {
        setChangeLoading(true);
        const timer = setTimeout(() => {
            setDebounceSearch(searchQ);
            setChangeLoading(false);
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
        freeScroll: true,
        pageDots: false,
        prevNextButtons: false,
        cellAlign: "left",
        contain: true,
        wrapAround: false,
        groupCells: 2,
    };

    return (<Modal show={show} onHide={onHide} centered>
        <Modal.Header className={'gap-2 align-items-center'} closeButton>
            <div className="flex flex-col gap-1">
                <h3 className={'text-primary m-0'}>انتخاب تصویر یا فایل</h3>
                <p className="m-0 text-muted">(تصاویر یا فایل‌های دلخواهتان را انتخاب کنید)</p>
            </div>
            <DynamicAttributeField
                onChange={(value) => setSearchQ(value)}
                data={{
                    attribute_name_en: "search_q", attribute_name_fa: "جستجو ...", attr_type: {
                        type: "string",
                    }, attribute_value: searchQ,
                }}
            />
        </Modal.Header>
        <Modal.Body className={'px-0'}>
            <div className="position-relative">
                <div
                    className={`d-flex flex-column gap-2 spec-scroll overflow-auto h-400p`}>
                    {pageData
                        .filter((product) => (displayList.some(item=>Array.isArray(product[item]) ? product[item].length : product[item])))
                        .map((product, key) => (<div key={key} id={product.product_id}
                                                     className={`${key % 2 === 1 ? 'bg-label-light' : 'bg-label-secondary'} p-2 mx-3 pt-1 rounded-3 d-flex flex-column`}>
                            <div className={'small text-primary align-items-center gap-2 d-flex p-1'}>
                                <Button
                                    onClick={() => {
                                        handleCheckboxChange(displayList.flatMap(key => Array.isArray(product[key]) ? product[key] : product[key] ? [product[key]] : []))
                                    }}
                                    className={'btn btn-sm p-1 rounded-pill'}
                                >
                                    {displayList.every(item => Array.isArray(product[item]) ? product[item].every(url => selectedUrls.includes(url)) : product[item] ? selectedUrls.includes(product[item]) : true) ? '✔' : ''}
                                </Button>
                                <div className={'text-break text-justify'}>{product.part_number_en}</div>
                                <hr className={'border-label-primary flex-grow-1 opacity-50'}/>
                                {displayKeys['single'] && product.data_sheet ? <div className={'overflow-visible position-relative'}>
                                    <RippleButton
                                        className="btn btn-light p-01"
                                        onClick={() => handleCheckboxChange([product.data_sheet])}
                                    >
                                        <div
                                            className={'rounded bg-primary text-white p-2'}
                                        >
                                            <IconFile size={16}/>
                                        </div>
                                        {selectedUrls.includes(product.data_sheet) && (<div
                                            style={{
                                                display: "flex",
                                                position: "absolute",
                                                top: "0",
                                                right: "0",
                                                background: "rgba(0, 128, 0, 0.8)",
                                                color: "white",
                                                borderRadius: "50%",
                                                width: "14px",
                                                height: "14px",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "14px",
                                                zIndex: 2,
                                            }}
                                        >
                                            ✔
                                        </div>)}

                                    </RippleButton>
                                    <RippleButton
                                        className={'-m-01 position-absolute top-0 end-0 btn btn-sm rounded-circle btn-label-primary p-0'}
                                        href={mediaUrl(product.data_sheet)} target={'_blank'}
                                    >
                                        <IconEye size={13}/>
                                    </RippleButton>
                                </div> : null}
                            </div>

                            {displayKeys['multi'] ? <Flickity className={'w-100'} options={flickityOptions}>
                                {product[displayKeys['multi']].map((image, idx) => (<div key={idx} className={'p-1 img-lg'}>
                                    <div
                                        role={'button'}
                                        onClick={() => handleCheckboxChange([image])}
                                        className="border-1 border-label-primary bg-white w-100 h-100 rounded p-2"
                                    >
                                        <img
                                            src={mediaUrl(image)}
                                            alt={product.part_number_en}
                                            className="shadow-sm rounded w-100 h-100"
                                        />
                                        {selectedUrls.includes(image) && (<div
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
                                        </div>)}
                                    </div>
                                </div>))}
                            </Flickity> : null}

                        </div>))}

                </div>
                <div
                    className={`${changeLoading || fetchLoading ? 'opacity-100' : 'opacity-0'} blur top-0 z-1 d-flex justify-content-center align-items-center transition position-absolute w-100 h-100`}>
                    {changeLoading ? <Loading text={'در حال اعمال تغییرات ...'}/> : null}
                    {fetchLoading ? <Loading /> : null}
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
    </Modal>);
};

export default GalleryModal;
