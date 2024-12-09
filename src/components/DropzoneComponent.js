import React, { useEffect, useRef, useState } from "react";
import Dropzone from "dropzone";
import AddFromLinkModal from "./AddFromLinkModal";
import GalleryModal from "./GalleryModal";

const DropzoneComponent = ({ files = [], updateFiles, uploadUrl }) => {
  const [isAddFromLinkModalOpen, setIsAddFromLinkModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const handleOpenAddFromLinkModal = () => setIsAddFromLinkModalOpen(true);
  const handleCloseAddFromLinkModal = () => setIsAddFromLinkModalOpen(false);
  const handleOpenGalleryModal = () => setIsGalleryModalOpen(true);
  const handleCloseGalleryModal = () => setIsGalleryModalOpen(false);

  const dropzoneRef = useRef(null);
  const dzInstanceRef = useRef(null);
  const isInitialized = useRef(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

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
    dictFallbackText:
      "لطفا از فرم زیر برای ارسال فایل های خود مانند دوران های گذشته استفاده کنید.",
    dictFileTooBig:
      "فایل خیلی بزرگ است ({{filesize}}MB). حداکثر اندازه فایل: {{maxFilesize}}MB.",
    dictInvalidFileType: "ارسال این نوع فرمت فایل‌ها مجاز نیست.",
    dictResponseError: "سرور با کد {{statusCode}} پاسخ داد.",
    dictCancelUpload: "لغو ارسال",
    dictCancelUploadConfirmation: "آیا از لغو کردن این ارسال اطمینان دارید؟",
    dictRemoveFile: "حذف فایل",
    dictMaxFilesExceeded: "امکان ارسال فایل دیگری وجود ندارد.",
  };

  const addFile = (fileUrl) => {
    const newFiles = [...files, fileUrl];
    updateFiles(newFiles);
  };
  const removeFile = (fileUrl) => {
    const newFiles = files.filter((f) => f !== fileUrl);
    updateFiles(newFiles);
  };
  const isDuplicateFile = (fileUrl) => {
    return files.some((f) => f === fileUrl);
  };

  useEffect(() => {
    if (!dropzoneRef.current || isInitialized.current) return;
    isInitialized.current = true;

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
    files.forEach(addLocalImage);
    setIsFirstRender(firstRender=>!firstRender)
    dz.on("success", function (file, response) {
      const url = response?.url || file.url;
      file.previewElement.querySelector("img[data-dz-thumbnail]").src = url;
      addFile(url);
    });

    // return () => dz.destroy();
  }, []);

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

  const addLocalImage = (url) => {
    if (isFirstRender || !isDuplicateFile(url)) {
      const fileType = getFileTypeFromURL(url);

      var mockFile = {
        name: url.split("/").pop(),
        size: 12345,
        type: fileType,
        url: url,
      };

      dzInstanceRef.current.emit("addedfile", mockFile);
      dzInstanceRef.current.emit("thumbnail", mockFile, url);
      dzInstanceRef.current.emit("complete", mockFile);
      addFile(url);
    }
  };

  const handleAddFromLinkSubmit = (selectedFiles) => {
    selectedFiles.forEach(
      dzInstanceRef.current.addFile.bind(dzInstanceRef.current)
    );
  };

  const handleGallerySubmit = (selectedUrls) => {
    selectedUrls.forEach(addLocalImage);
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0 card-title">رسانه ها</h5>
        <a className="d-flex align-items-center gap-1 fw-medium ql-snow">
          افزودن از
          <button
            onClick={handleOpenAddFromLinkModal}
            id="showAddLinkModal"
            type="button"
            className="rounded-pill lh-sm px-1 border"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              {" "}
              <line
                className="ql-stroke"
                x1="7"
                x2="11"
                y1="7"
                y2="11"
              ></line>{" "}
              <path
                className="ql-even ql-stroke"
                d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"
              ></path>{" "}
              <path
                className="ql-even ql-stroke"
                d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"
              ></path>{" "}
            </svg>
          </button>
          <button
            onClick={handleOpenGalleryModal}
            id="showAddFromGalleryModal"
            type="button"
            className="rounded-pill lh-sm px-1 border"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              {" "}
              <rect
                className="ql-stroke"
                height="10"
                width="12"
                x="3"
                y="4"
              ></rect>{" "}
              <circle className="ql-fill" cx="6" cy="7" r="1"></circle>{" "}
              <polyline
                className="ql-even ql-fill"
                points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
              ></polyline>{" "}
            </svg>
          </button>
        </a>
      </div>
      <div className="card-body">
        <div ref={dropzoneRef} className="dropzone">
          <div className="dz-message needsclick">
            <p className="fs-4 note needsclick pt-3 mb-1">کشیدن و رهاکردن</p>
            <p className="text-muted d-block fw-normal mb-2">یا</p>
            <span className="note needsclick btn bg-label-primary d-inline">
              انتخاب از فایل‌ها
            </span>
          </div>
        </div>
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
    </div>
  );
};

export default DropzoneComponent;
