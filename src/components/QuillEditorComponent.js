import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import GalleryModal from "../components/GalleryModal";

Quill.register("modules/imageResize", ImageResize);
window.Quill = Quill;
const QuillEditor = ({ id, name, value, toolbarOptions, placeholder, apiSaveImagesUrl }) => {
    const editorRef = useRef(null);
    const textareaRef = useRef(null);
    const qeInstanceRef = useRef(null);
    const isInitialized = useRef(false);

    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const handleOpenGalleryModal = () => setIsGalleryModalOpen(true);
    const handleCloseGalleryModal = () => setIsGalleryModalOpen(false);
    const handleGallerySubmit = (urls) => {
        if (qeInstanceRef.current) {
            const range = qeInstanceRef.current.getSelection();
            let insertPosition = range ? range.index : qeInstanceRef.current.getLength();
            urls.forEach((url) => {
                qeInstanceRef.current.insertEmbed(insertPosition, "image", url);
                insertPosition++;
            });
        }
    }

    useEffect(() => {
        if (!editorRef.current || isInitialized.current) return;
        isInitialized.current = true;

        const customIcons = Quill.import("ui/icons");
        customIcons["image"] = `
            <svg viewBox="0 0 18 18">
                <circle class="ql-stroke" cx="9" cy="9" r="7"></circle>
                <line class="ql-stroke" x1="9" y1="6" x2="9" y2="12"></line>
                <line class="ql-stroke" x1="6" y1="9" x2="12" y2="9"></line>
            </svg>
        `;
        customIcons["gallery"] = `
            <svg viewBox="0 0 18 18"> 
                <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect> 
                <circle class="ql-fill" cx="6" cy="7" r="1"></circle> 
                <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> 
            </svg>
        `;

        const FileBlot = Quill.import("blots/block/embed");
        class CustomFileBlot extends FileBlot {
            static create(data) {
                const node = super.create();
                node.setAttribute("href", data.url);
                node.setAttribute("target", "_blank");
                node.setAttribute("style", "white-space: normal !important;");
                node.innerHTML = `<i class="fs-1 fa-solid fa-file"></i>`;
                return node;
            }
        }
        CustomFileBlot.blotName = "file";
        CustomFileBlot.tagName = "a";
        Quill.register(CustomFileBlot);

        const imageHandler = () => {
            const fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.click();

            fileInput.onchange = () => {
                const file = fileInput.files[0];
                const formData = new FormData();
                formData.append("file", file);
                console.log('url', apiSaveImagesUrl);

                fetch(apiSaveImagesUrl, {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.url) {
                            if (qeInstanceRef.current) {

                                const range = qeInstanceRef.current.getSelection();
                                const insertPosition = range ? range.index : qeInstanceRef.current.getLength();
                                if (file.type.startsWith("image/")) {
                                    qeInstanceRef.current.insertEmbed(insertPosition, "image", data.url);
                                } else {
                                    qeInstanceRef.current.insertEmbed(insertPosition, "file", {
                                        url: data.url,
                                        filename: file.name,
                                    });
                                }
                            }
                        } else {
                            alert("Failed to upload image");
                        }
                    })
                    .catch((error) => {
                        console.error("Error uploading image:", error);
                        alert("Failed to upload image");
                    });
            };
        };
        const galleryHandler = () => {
            handleOpenGalleryModal();
        };

        const editor = new Quill(editorRef.current, {
            theme: "snow",
            modules: {
                toolbar: {
                    container: toolbarOptions,
                    handlers: {
                        image: imageHandler,
                        gallery: galleryHandler
                    },
                },
                imageResize: {},
            },
            placeholder,
        });
        qeInstanceRef.current = editor;

        const toolbar = editor.getModule("toolbar");
        if (toolbar) {
            const toolbarContainer = toolbar.container;
            toolbarContainer.classList.add("border-0", "border-bottom");
        }

        editor.root.innerHTML = value;
        editor.on("text-change", () => {
            textareaRef.current.value = editor.root.innerHTML;
        });


        // return () => {
        //     editor.off("text-change");
        //     qeInstanceRef.current = null;
        // };
    }, [toolbarOptions, value, apiSaveImagesUrl, placeholder]);

    return (
        <div className="form-control p-0 pt-1">
            <div ref={editorRef} id={id} className="comment-editor border-0 pb-4"></div>
            <textarea ref={textareaRef} name={name} style={{ display: "none" }} defaultValue={value}></textarea>
            <GalleryModal
                show={isGalleryModalOpen}
                onHide={handleCloseGalleryModal}
                onSubmit={handleGallerySubmit}
            />
        </div>
    );
};

export default QuillEditor;
