import React, {useState} from 'react';
import RippleButton from "./RippleButton/RippleButton";
import {baseApiAuthFrm} from "../api/baseApi";
import {
    IconEye, IconFile,
    IconHeart,
    IconImageInPicture,
    IconPhoto,
    IconTrash,
    IconUpload,
    IconZoom,
    IconZoomIn
} from "@tabler/icons-react";
import {mediaUrl} from "../utils/funcs";
import Link from "next/link";
import GalleryModal from "./GalleryModal";

const ButtonImageUpload = ({
                               hasGallery = false,
                               disabled,
                               openOnly = false,
                               verticalProgress = false,
                               uploadPath = 'products/',
                               uploadUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/save_images/products/`,
                               icon,
                               text,
                               onChange,
                               value,
                               className = 'btn btn-label-dark bg-secondary-subtle d-flex justify-content-center align-items-center'
                           }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
    const handleOpenGalleryModal = () => setIsGalleryModalOpen(true);
    const handleCloseGalleryModal = () => setIsGalleryModalOpen(false);
    const handleGallerySubmit = (selectedUrls) => {
        selectedUrls.length > 0 && onChange(selectedUrls[0])
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_to", uploadPath);
        console.log('uploading...')
        setUploadProgress(0);
        setIsUploading(true)
        try {
            const response = await baseApiAuthFrm
                .post(uploadUrl, formData, {
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    }
                })
            onChange(response.data.url)
        } catch (err) {
            console.error("Error fetching tags:", err);
        } finally {
            setIsUploading(false)
        }
    };

    return (
        <>
            <div className={`${disabled ? 'disabled' : ''} position-relative`}>
                <RippleButton
                    className={className + ` ${value || isUploading ? 'pe-none' : ''} ${!openOnly && value ? 'p-0' : ''}`}>
                    <div
                        className={`bg-success cursor-pointer position-absolute start-0 bottom-0 ${isUploading ? verticalProgress ? `h-${uploadProgress} w-100` : `w-${uploadProgress} h-100` : ''} opacity-50`}>
                    </div>
                    <label className={'cursor-pointer position-absolute w-100 h-100 opacity-0'}>
                        <input
                            type="file"
                            onInput={handleFileChange}
                            className={'d-none'}
                        />
                    </label>

                    {!openOnly && value ? <img className={'img-sm'} src={mediaUrl(value)}/> : icon}
                    {text ? <span className="col-4">{text} </span> : undefined}
                </RippleButton>

                {value ? <div
                        className={`d-flex ${openOnly ? "bg-white p-01 mx-2 translate-middle-y" : "-translate-middle"} rounded-2 gap-1 position-absolute top-0 end-0`}>
                        {openOnly ? <RippleButton
                            className={'btn btn-success rounded-circle p-01'}
                        >
                            <Link className={'text-white'} href={mediaUrl(value)} target={'_blank'}>
                                <IconEye size={16}/>
                            </Link>
                        </RippleButton> : undefined}
                        <RippleButton
                            onClick={() => {
                                onChange('');
                            }}
                            className={'btn btn-danger rounded-circle p-01'}
                        >
                            <IconTrash size={16}/>
                        </RippleButton>
                    </div> :
                    hasGallery ? <div
                        className={`d-flex ${openOnly ? "bg-white p-01 mx-2 translate-middle-y" : "-translate-middle"} rounded-2 gap-1 position-absolute top-0 end-0`}>
                        <RippleButton
                            onClick={handleOpenGalleryModal}
                            className={'btn btn-success rounded-circle p-01'}
                        >
                            <IconFile size={16}/>
                        </RippleButton>
                    </div> : null
                }
            </div>
            {hasGallery ? <GalleryModal
                displayKeys={{single: 'data_sheet'}}
                show={isGalleryModalOpen}
                onHide={handleCloseGalleryModal}
                onSubmit={handleGallerySubmit}
            /> : null}
        </>
    );
};

export default ButtonImageUpload;