import React, {useState} from 'react';
import RippleButton from "./RippleButton/RippleButton";
import {baseApiAuthFrm} from "../api/baseApi";
import {IconTrash} from "@tabler/icons-react";
import {mediaUrl} from "../utils/funcs";

const ButtonImageUpload = ({
                               fillOnly= false,
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
    console.log('value', value)
    return (
        <div className={'position-relative'}>
            <RippleButton
                className={className + ` ${!fillOnly && value ? 'p-0' : ''}`}>
                <div
                    className={`bg-success cursor-pointer position-absolute start-0 bottom-0 ${isUploading ? verticalProgress ? `h-${uploadProgress} w-100` : `w-${uploadProgress} h-100` : (fillOnly && value) ? `h-100 w-100` : ''} opacity-50`}>
                </div>
                <label className={'cursor-pointer position-absolute w-100 h-100 opacity-0'}>
                    <input
                        type="file"
                        onInput={handleFileChange}
                        className={'d-none'}
                        disabled={isUploading}
                    />
                </label>

                {!fillOnly && value ? <img className={'img-sm'} src={mediaUrl(value)}/> : icon}
                {text ? <span className="col-4">{text} </span> : undefined}
            </RippleButton>
            <RippleButton
                onClick={() => {
                    onChange('');
                }}
                className={'overflow-hidden btn btn-danger rounded-circle position-absolute top-0 end-0 p-01 translate -translate-x-middle translate-y-middle'}
            >
                <IconTrash size={16}/>
            </RippleButton>
        </div>
    );
};

export default ButtonImageUpload;