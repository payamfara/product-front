import React, { useEffect, useRef, useState } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

const DropzoneComponent = ({ uploadedFiles = [], uploadUrl }) => {
  const dropzoneRef = useRef(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (dropzoneRef.current) {
      const options = {
        url: uploadUrl,
        maxFilesize: 5,
        acceptedFiles: ".jpg,.jpeg,.png,.gif,.webp",
        addRemoveLinks: true,
        autoProcessQueue: true,
        init: function () {
          uploadedFiles.forEach((url) => {
            const mockFile = {
              name: url.split("/").pop(),
              size: 12345,
              type: getFileTypeFromURL(url),
              url,
            };
            this.emit("addedfile", mockFile);
            this.emit("thumbnail", mockFile, url);
            this.emit("complete", mockFile);
            setFiles((prevFiles) => [...prevFiles, mockFile]);
          });
        },
        success: function (file, response) {
          const newImageUrl = response?.url || file.url;
          file.previewElement.querySelector("img[data-dz-thumbnail]").src = newImageUrl;
          setFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.name === file.name ? { ...f, url: newImageUrl } : f
            )
          );
        },
        removedfile: function (file) {
          setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
          if (file.previewElement) file.previewElement.remove();
        },
      };

      const dz = new Dropzone(dropzoneRef.current, options);

      return () => dz.destroy(); // Cleanup Dropzone instance on unmount
    }
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

  return (
    <div>
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
  );
};

export default DropzoneComponent;
