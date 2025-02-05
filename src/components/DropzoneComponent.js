import React, {forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState} from "react";
import Dropzone from "dropzone";
import AddFromLinkModal from "./AddFromLinkModal";
import GalleryModal from "./GalleryModal";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import RippleButton from "./RippleButton/RippleButton";
import {IconDownload, IconTrash, IconUpload} from "@tabler/icons-react";
import ButtonImageUpload from "./ButtonImageUpload";
import {mediaUrl} from "../utils/funcs";

const DropzoneComponent = forwardRef(({
                                          urls = [],
                                          updateUrls,
                                          uploadUrl = mediaUrl('/api/save_images/products/')
                                      }, ref) => {

    useImperativeHandle(ref, () => ({
        handleOpenAddFromLinkModal,
        handleOpenGalleryModal
    }));

    const [isAddFromLinkModalOpen, setIsAddFromLinkModalOpen] = useState(false);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const handleOpenAddFromLinkModal = () => setIsAddFromLinkModalOpen(true);
    const handleCloseAddFromLinkModal = () => setIsAddFromLinkModalOpen(false);
    const handleOpenGalleryModal = () => setIsGalleryModalOpen(true);
    const handleCloseGalleryModal = () => setIsGalleryModalOpen(false);
    const getFileTypeFromURL = (url) => {
        const extension = url.split(".").pop().toLowerCase();
        switch (extension) {
            case "jpg":
            case "jpeg":
                return "image/jpeg";
            case "png":
                return "image/png";
            case "gif":
                return "image/gif";
            case "webp":
                return "image/webp";
            default:
                return "application/octet-stream";
        }
    };

    const [activeFile, setActiveFile] = useState(0);
    const [files, setFiles] = useState(urls.map((url) => {
        const fileType = getFileTypeFromURL(url);

        var mockFile = {
            name: url.split("/").pop(), size: 12345, type: fileType, url: url, complete: true,
        };

        return mockFile;
    }));
    const dropzoneRef = useRef(null);
    const dzInstanceRef = useRef(null);
    const isInitialized = useRef(false);

    const previewTemplate = `<div class="dz-preview dz-file-preview">
  <div class="dz-details">
    <div class="dz-thumbnail">
      <img data-dz-thumbnail>
      <span class="dz-nopreview">بدون پیشنمایش</span>
      <div class="dz-success-mark"></div>
      <div class="dz-error-mark"></div>
      <div class="dz-error-message"><span data-dz-errormessage></span></div>
      <div class="progress">
        <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
      </div>
    </div>
    <div class="dz-filename" data-dz-name></div>
    <div class="dz-size" data-dz-size></div>
  </div>
</div>`;

    const faOption = {
        dictDefaultMessage: "فایل‌ها را برای ارسال اینجا رها کنید",
        dictFallbackMessage: "مرورگر شما از کشیدن و رهاکردن پشتیبانی نمی‌کند.",
        dictFallbackText: "لطفا از فرم زیر برای ارسال فایل های خود مانند دوران های گذشته استفاده کنید.",
        dictFileTooBig: "فایل خیلی بزرگ است ({{filesize}}MB). حداکثر اندازه فایل: {{maxFilesize}}MB.",
        dictInvalidFileType: "ارسال این نوع فرمت فایل‌ها مجاز نیست.",
        dictResponseError: "سرور با کد {{statusCode}} پاسخ داد.",
        dictCancelUpload: "لغو ارسال",
        dictCancelUploadConfirmation: "آیا از لغو کردن این ارسال اطمینان دارید؟",
        dictRemoveFile: "حذف فایل",
        dictMaxFilesExceeded: "امکان ارسال فایل دیگری وجود ندارد.",
    };

    const addFile = (file) => {
        // if (isInitialized.current) {
        // }
        updateUrls((urls) => [file.url, ...urls]);
        setFiles((files) => [file, ...files]);
    };
    const removeFile = (fileUrl) => {
        updateUrls((urls) => urls.filter((f) => f !== fileUrl));
        setFiles((files) => files.filter((f) => f.url !== fileUrl));
    };
    const isDuplicateFile = (fileUrl) => {
        return urls.some((f) => f === fileUrl);
    };

    const itemsPerPage = 4;
    const pages = [];
    for (let i = 0; i < files.length; i += itemsPerPage) {
        pages.push(files.slice(i, i + itemsPerPage));
    }

    useEffect(() => {
        if (!dropzoneRef.current || isInitialized.current) return;

        const options = {
            url: uploadUrl,
            previewTemplate: previewTemplate,
            maxFilesize: 5,
            acceptedFiles: ".jpg,.jpeg,.png,.gif,.webp",
            addRemoveLinks: true,
            autoProcessQueue: true,
            removedfile: function (file) {
                removeFile(file.url);
                if (file.previewElement) file.previewElement.remove();
            },
        };

        Object.assign(options, faOption);
        const dz = new Dropzone(dropzoneRef.current, options);
        dzInstanceRef.current = dz;
        isInitialized.current = true;

        dz.on("success", function (file, response) {
            console.log(file.size)
            const prevUrl = file.url;
            file.url = response?.url || file.url;
            file.success = true;
            file.complete = true;
            setFiles((files) => files.map((f) => f.url === prevUrl ? file : f));
            updateUrls((urls) => [file.url, ...urls]);
            return file;
        });
        dz.on("error", function (file, response) {
            file.error = response;
            file.complete = true;
            setFiles((files) => files.map((f) => f.url === file.url ? file : f));
        });

        dz.on("addedfile", function (file, response) {
            if (file.previewElement) file.previewElement.remove();
            file.url = URL.createObjectURL(file);
            setFiles((files) => [file, ...files]);
        });

        dz.on("uploadprogress", function (file, progress) {
            console.log(file, progress);
            file.progress = progress;
            setFiles((files) => files.map((f) => f.url === file.url ? file : f));
        });
        // return () => dz.destroy();
    }, []);

    const addLocalImage = (url) => {
        if (!isInitialized.current || !isDuplicateFile(url)) {
            const fileType = getFileTypeFromURL(url);

            var mockFile = {
                name: url.split("/").pop(), size: 12345, type: fileType, url: url, complete: true, success: true,
            };

            addFile(mockFile);
        }
    };

    const handleAddFromLinkSubmit = (selectedFiles) => {
        selectedFiles.forEach(dzInstanceRef.current.addFile.bind(dzInstanceRef.current));
    };

    const handleGallerySubmit = (selectedUrls) => {
        selectedUrls.forEach(addLocalImage);
    };
    const flickityOptions = {
        freeScroll: true, pageDots: false, prevNextButtons: false,
    };

    const handleDelete = (item) => {
        if (!item.complete) dzInstanceRef.current.cancelUpload(item)
        removeFile(item.url);
        setActiveFile((activeFile) => Math.max(0, activeFile - 1));
    };

    return (<Fragment>
        <div ref={dropzoneRef} className="d-flex flex-column justify-content-between flex-grow-1 dropzone">
            <div className={`flex-grow-1 dz-message needsclick ${pages.length ? "d-none" : "d-block"}`}>
                <p className="fs-4 note needsclick pt-3 mb-1">کشیدن و رهاکردن</p>
                <p className="text-muted d-block fw-normal mb-2">یا</p>
                <span className="note needsclick btn bg-label-primary d-inline">
                  انتخاب از فایل‌ها
                </span>
            </div>

            {pages.length ? (<Fragment>
                <img className="w-100 img-medium rounded-2" src={mediaUrl(files[activeFile].url)}/>
                <Flickity className="carousel" options={flickityOptions}>
                    {files.map((item, index) => {
                        return <div key={index} className="p-2">
                            <div
                                className={`dz-preview ${item.success ? "dz-success" : ""} ${item.complete ? "dz-complete" : ""} ${item.error ? "dz-error" : ""} dz-file-preview m-0 w-100`}
                            >
                                <div
                                    className="dz-details position-relative"
                                    onClick={() => setActiveFile(index)}
                                >
                                    <div className="dz-thumbnail border-0">
                                        <img src={mediaUrl(item.url)} className="w-100 img-small rounded-2"/>
                                        <span className="dz-nopreview">بدون پیشنمایش</span>
                                        <div className="dz-success-mark"></div>
                                        <div className="dz-error-mark"></div>
                                        <div className="dz-error-message">
                                            <span>{item.error}</span>
                                        </div>
                                        <div className="progress">
                                            <div
                                                className="progress-bar progress-bar-primary"
                                                role="progressbar"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{width: `${item.progress}%`}}
                                                data-dz-uploadprogress
                                            ></div>
                                        </div>
                                    </div>
                                    <div
                                        className={'position-absolute top-50 start-50 translate-middle w-50 rounded-2 shadow-md overflow-hidden hover-opacity'}>
                                        <div className="dz-filename">
                                            {item.name}
                                        </div>
                                        <div className="dz-size bg-white">
                                            <strong>{Math.round((item.size / 1000) * 10) / 10}</strong> KB
                                        </div>
                                    </div>
                                </div>
                                <RippleButton
                                    className="z-50 btn btn-danger dz-remove position-absolute top-0 text-white p-1 mn-1 border-0"
                                    onClick={() => handleDelete(item)}
                                >
                                    <IconTrash size={18}/>
                                </RippleButton>
                            </div>
                        </div>
                    })}
                </Flickity>
            </Fragment>) : undefined}
        </div>
        <AddFromLinkModal
            show={isAddFromLinkModalOpen}
            onHide={handleCloseAddFromLinkModal}
            onSubmit={handleAddFromLinkSubmit}
        />
        <GalleryModal
            show={isGalleryModalOpen}
            onHide={handleCloseGalleryModal}
            onSubmit={handleGallerySubmit}
        />
    </Fragment>);
});

export default DropzoneComponent;
