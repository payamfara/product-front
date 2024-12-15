import React, { useEffect, useRef, useState } from "react";
import Dropzone from "dropzone";
import AddFromLinkModal from "./AddFromLinkModal";
import GalleryModal from "./GalleryModal";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";

const DropzoneComponent = ({ urls = [], updateUrls, uploadUrl }) => {
  console.log(urls);

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

  const [files, setFiles] = useState(
    urls.map((url) => {
      const fileType = getFileTypeFromURL(url);

      var mockFile = {
        name: url.split("/").pop(),
        size: 12345,
        type: fileType,
        url: url,
        complete: true,
      };

      return mockFile;
    })
  );
  const dropzoneRef = useRef(null);
  const dzInstanceRef = useRef(null);
  const isInitialized = useRef(false);

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
      const url = response?.url || file.url;
      file.previewElement.querySelector("img[data-dz-thumbnail]").src = url;
      file.url = url;
      file.success = true;
      return file;
    });

    dz.on("complete", function (file, response) {
      file.complete = true;
      addFile(file);
    });
    
    dz.on("addedFile", function (file, response) {
      if (file.previewElement) file.previewElement.remove();
    });

    // return () => dz.destroy();
  }, []);

  const addLocalImage = (url) => {
    if (!isInitialized.current || !isDuplicateFile(url)) {
      const fileType = getFileTypeFromURL(url);

      var mockFile = {
        name: url.split("/").pop(),
        size: 12345,
        type: fileType,
        url: url,
        complete: true,
      };

      addFile(mockFile);
    }
  };

  const handleAddFromLinkSubmit = (selectedFiles) => {
    // selectedFiles.forEach(
    //   dzInstanceRef.current.addFile.bind(dzInstanceRef.current)
    // );
    console.log('ssssssss', selectedFiles);
    
    selectedFiles.forEach(addFile);
  };

  const handleGallerySubmit = (selectedUrls) => {
    selectedUrls.forEach(addLocalImage);
  };
  const flickityOptions = {
    freeScroll: true,
    pageDots: false,
    prevNextButtons: false,
  };
  return (
    <div className="card mb-4 h-100">
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
          <button type="button" onClick={() => console.log(files)}>
            sfdfsd
          </button>
        </a>
      </div>
      <div className="card-body">
        <div ref={dropzoneRef} className="dropzone">
          <div
            className={`dz-message needsclick ${pages.length ? "d-none" : ""}`}
          >
            <p className="fs-4 note needsclick pt-3 mb-1">کشیدن و رهاکردن</p>
            <p className="text-muted d-block fw-normal mb-2">یا</p>
            <span className="note needsclick btn bg-label-primary d-inline">
              انتخاب از فایل‌ها
            </span>
          </div>

          <Flickity className="carousel" options={flickityOptions}>
            {pages.map((page, pageIndex) => (
              <div key={pageIndex} className="row row-cols-2">
                {page.map((item, index) => (
                  <div key={index} className="p-2">
                    <div
                      className={`dz-preview ${
                        item.success ? "dz-success" : ""
                      } ${
                        item.complete ? "dz-complete" : ""
                      } dz-file-preview m-0 w-100`}
                    >
                      <div className="dz-details">
                        <div className="dz-thumbnail w-100">
                          <img src={item.url} className="w-100" />
                          <span className="dz-nopreview">بدون پیشنمایش</span>
                          <div className="dz-success-mark"></div>
                          <div className="dz-error-mark"></div>
                          <div className="dz-error-message">
                            <span data-dz-errormessage></span>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-primary"
                              role="progressbar"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              data-dz-uploadprogress
                            ></div>
                          </div>
                        </div>
                        <div className="dz-filename" data-dz-name>
                          {item.name}
                        </div>
                        <div className="dz-size" data-dz-size>
                          {item.size} KB
                        </div>
                      </div>
                      <a
                        class="dz-remove"
                        role="button"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFile(item.url);
                        }}
                      >
                        حذف فایل
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </Flickity>
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
