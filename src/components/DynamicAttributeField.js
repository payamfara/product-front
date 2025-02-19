"use client";
import Select2 from "./Select2Component";
import DatePicker from "./DatePicker";
import {useEffect, useRef, useState} from "react";
import {IconPencil, IconPlus, IconX} from "@tabler/icons-react";
import RippleButton from "./RippleButton/RippleButton";
import Select2Js from "./Select2Js";

const DynamicAttributeField = ({data, onChange, parentClassName}) => {
    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const attribute_type = localData.attr_type ?? localData.meta_datas?.attr_value;
    const attribute_select2Frm = attribute_type.select_2_form;
    const attribute_error = localData.attribute_error;
    const attribute_name_en = localData.attribute_name_en ?? localData.title_en;
    const attribute_name_fa = localData.attribute_name_fa ?? localData.title_fa;
    const attribute_value = localData.attribute_value ?? localData.attr_value ?? "";
    const attribute_value_str = localData.attribute_value_str ?? "";
    const attribute_priority = localData.attribute_priority ?? localData.priority;
    const attribute_id = localData.attribute_id ?? attribute_name_en;
    const attribute_placeholder = localData.attribute_placeholder ?? attribute_name_fa;
    const attribute_description = localData.description;
    const attribute_readonly = localData.attribute_readonly ?? attribute_type.type === "readonly";
    const select2Ref = useRef(null);

    switch (attribute_type?.type) {
        case "select_2": // Select_2
            return (
                <div title={attribute_name_fa} className={'d-flex flex-column gap-1'}>
                    <div className={`${parentClassName} form-floating`}>
                        {attribute_value ? <RippleButton
                            className="position-absolute end-0 top-0 z-3 rounded-circle mn-1 btn btn-secondary btn-sm p-01 clear-btn"
                            title="Clear"
                            onClick={() => select2Ref.current.onChange(null)}
                        >
                            <IconX size={10}/>
                        </RippleButton> : undefined}
                        <input
                            id={`${attribute_id}_fake`}
                            readOnly
                            type="text"
                            className="form-control"
                        />
                        <label className={'bg-transparent w-100 d-flex justify-content-between gap-2'}
                               htmlFor={`${attribute_id}_fake`}>
                            <span className={'d-block text-truncate px-2 bg-white'}>{attribute_name_fa}</span>
                            {attribute_select2Frm && attribute_select2Frm !== "None" ? <div
                                className="bg-white d-flex gap-1 z-3 rounded-circle px-2"
                            >
                                <RippleButton
                                    className="rounded-circle btn btn btn-primary p-1"
                                    title="Add"
                                    onClick={() => select2Ref.current.showModal(0, attribute_type.url)}
                                >
                                    <IconPlus size={10}/>
                                </RippleButton>
                                <RippleButton
                                    disabled={!attribute_value}
                                    className="rounded-circle btn btn btn-label-primary p-1"
                                    title="Edit"
                                    onClick={() => select2Ref.current.showModal(attribute_value, attribute_type.url)}
                                >
                                    <IconPencil size={10}/>
                                </RippleButton>
                            </div> : null}
                        </label>
                        <Select2Js
                            updatability={attribute_select2Frm && attribute_select2Frm !== "None"}
                            ref={select2Ref}
                            id={attribute_id}
                            name={attribute_name_en}
                            asyncUrl={attribute_type.url}
                            placeholder={attribute_placeholder}
                            onChange={onChange}
                            value={{'id': attribute_value, 'text': attribute_value_str}}
                        />
                        {/*<Select2*/}
                        {/*    id={attribute_id}*/}
                        {/*    name={attribute_name_en}*/}
                        {/*    asyncUrl={attribute_type.url}*/}
                        {/*    isAsync={true}*/}
                        {/*    placeholder={attribute_placeholder}*/}
                        {/*    onChange={onChange}*/}
                        {/*    value={{'id': attribute_value, 'value': attribute_value_str}}*/}
                        {/*    className={`position-absolute bottom-0 w-100 custom-select--nobrorder`}*/}
                        {/*/>*/}
                    </div>
                    {attribute_description ? <div
                        className="text-justify invalid-feedback text-gray d-block">{attribute_description}</div> : undefined}
                    {Object.values(attribute_error || {}).map((err, key) => (
                        <div key={key} className="invalid-feedback d-block">{JSON.stringify(err)}</div>
                    ))}
                </div>
            );
        case "list": // Select_2
            return (
                <div title={attribute_name_fa} className={'d-flex flex-column gap-1'}>
                    <div className={`${parentClassName} form-floating`}>
                        {attribute_value ? <RippleButton
                            className="position-absolute end-0 top-0 z-3 rounded-circle mn-1 btn btn-secondary btn-sm p-01 clear-btn"
                            title="Clear"
                            onClick={() => select2Ref.current.onChange(null)}
                        >
                            <IconX size={10}/>
                        </RippleButton> : undefined}
                        <input
                            id={`${attribute_id}_fake`}
                            readOnly
                            type="text"
                            className="form-control"
                        />
                        <label htmlFor={`${attribute_id}_fake`}>{attribute_name_fa}</label>
                        <Select2Js
                            ref={select2Ref}
                            id={attribute_id}
                            name={attribute_name_en}
                            options={attribute_type.choice}
                            placeholder={attribute_placeholder}
                            onChange={onChange}
                            value={{'id': attribute_value, 'text': attribute_value_str}}
                        />
                        {/*<Select2*/}
                        {/*    options={attribute_type.choice}*/}
                        {/*    id={attribute_id}*/}
                        {/*    name={attribute_name_en}*/}
                        {/*    isAsync={false}*/}
                        {/*    placeholder={attribute_placeholder}*/}
                        {/*    onChange={onChange}*/}
                        {/*    value={{'id': attribute_value, 'value': attribute_value_str}}*/}
                        {/*    className={`position-absolute bottom-0 w-100 custom-select--nobrorder`}*/}
                        {/*/>*/}
                    </div>
                    {attribute_description ? <div
                        className="text-justify invalid-feedback text-gray d-block">{attribute_description}</div> : undefined}
                    {Object.values(attribute_error || {}).map((err, key) => (
                        <div key={key} className="invalid-feedback d-block">{JSON.stringify(err)}</div>
                    ))}
                </div>
            );
        case "string": // Text
        case "other": // Text
            return (
                <div title={attribute_name_fa} className={'d-flex flex-column gap-1'}>
                    <div className={`${parentClassName} form-floating`}>
                        {attribute_value ? <RippleButton
                            className="position-absolute end-0 top-0 z-3 rounded-circle mn-1 btn btn-secondary btn-sm p-01 clear-btn"
                            title="Clear"
                            onClick={() => onChange(undefined)}
                        >
                            <IconX size={10}/>
                        </RippleButton> : undefined}
                        <input
                            readOnly={attribute_readonly}
                            onChange={(e) => onChange(e.target.value)}
                            id={attribute_id}
                            name={attribute_name_en}
                            className={`form-control`}
                            placeholder={attribute_placeholder}
                            value={attribute_value}
                        />
                        <label htmlFor={attribute_id}>{attribute_name_fa}</label>
                    </div>
                    {attribute_description ? <div
                        className="text-justify invalid-feedback text-gray d-block">{attribute_description}</div> : undefined}
                    {Object.values(attribute_error || {}).map((err, key) => (
                        <div key={key} className="invalid-feedback d-block">{JSON.stringify(err)}</div>
                    ))}
                </div>
            );
        case "float": // Input type=number
        case "int": // Input type=number
            return (
                <div title={attribute_name_fa} className={'d-flex flex-column gap-1'}>
                    <div className={`${parentClassName} form-floating`}>
                        {attribute_value ? <RippleButton
                            className="position-absolute end-0 top-0 z-3 rounded-circle mn-1 btn btn-secondary btn-sm p-01 clear-btn"
                            title="Clear"
                            onClick={() => onChange(undefined)}
                        >
                            <IconX size={10}/>
                        </RippleButton> : undefined}
                        <input
                            onChange={(e) => onChange(parseFloat(e.target.value))}
                            type="number"
                            id={attribute_id}
                            name={attribute_name_en}
                            className={`form-control`}
                            placeholder={attribute_placeholder}
                            value={attribute_value}
                        />
                        <label htmlFor={attribute_id}>{attribute_name_fa}</label>
                    </div>
                    {attribute_description ? <div
                        className="text-justify invalid-feedback text-gray d-block">{attribute_description}</div> : undefined}
                    {Object.values(attribute_error || {}).map((err, key) => (
                        <div key={key} className="invalid-feedback d-block">{JSON.stringify(err)}</div>
                    ))}
                </div>
            );
        case "bool":
        case "boolean":
            // For checkbox or radio based on priority
            if (attribute_priority === "mandatory" || attribute_type.required) {
                return (
                    <div title={attribute_name_fa} className={'d-flex flex-column gap-1'}>
                        <div className={`${parentClassName} position-relative form-floating`}>
                            <input
                                id={`${attribute_id}_fake`}
                                readOnly
                                type="text"
                                className="form-control"
                            />
                            <label htmlFor={`${attribute_id}_fake`}>
                                {attribute_name_fa}
                            </label>
                            <input
                                type="checkbox"
                                onChange={(e) => onChange(e.target.value)}
                                id={attribute_id}
                                name={attribute_name_en}
                                className={`position-absolute bottom-0 mx-3 m-2 form-check-input`}
                                defaultChecked={!!attribute_value}
                            />
                        </div>
                        {attribute_description ? <div
                            className="text-justify invalid-feedback text-gray d-block">{attribute_description}</div> : undefined}
                        {Object.values(attribute_error || {}).map((err, key) => (
                            <div key={key} className="invalid-feedback d-block">{JSON.stringify(err)}</div>
                        ))}
                    </div>
                );
            } else {
                return (
                    <div title={attribute_name_fa} className={'d-flex flex-column gap-1'}>
                        <div className={`${parentClassName} form-floating`}>
                            <input
                                id={`${attribute_id}_fake`}
                                readOnly
                                type="text"
                                className="form-control"
                            />
                            <label htmlFor={`${attribute_id}_fake`}>
                                {attribute_name_fa}
                            </label>
                            <div
                                className="flex-nowrap row row-cols-auto w-100 gap-2 position-absolute bottom-0 m-2 mx-3">
                                <div className="flex-nowrap row max-w-50">
                                    <input
                                        onChange={(e) => onChange(true)}
                                        type="radio"
                                        id={`${attribute_name_en}_true`}
                                        name={attribute_name_en}
                                        className={`form-check-input p-0`}
                                        defaultChecked={attribute_value === true}
                                    />
                                    <label className={'text-truncate'}
                                           htmlFor={`${attribute_name_en}_true`}>بله</label>
                                </div>
                                <div className="flex-nowrap row max-w-50">
                                    <input
                                        onChange={(e) => onChange(false)}
                                        type="radio"
                                        id={`${attribute_name_en}_false`}
                                        name={attribute_name_en}
                                        className={`form-check-input p-0`}
                                        defaultChecked={attribute_value === false}
                                    />
                                    <label className={'text-truncate'}
                                           htmlFor={`${attribute_name_en}_false`}>خیر</label>
                                </div>
                            </div>
                        </div>
                        {attribute_description ? <div
                            className="text-justify invalid-feedback text-gray d-block">{attribute_description}</div> : undefined}
                        {Object.values(attribute_error || {}).map((err, key) => (
                            <div key={key} className="invalid-feedback d-block">{JSON.stringify(err)}</div>
                        ))}
                    </div>
                );
            }
        case "date_time":
            return (
                <div title={attribute_name_fa} className={'d-flex flex-column gap-1'}>
                    <div className={`${parentClassName} form-floating`}>
                        <RippleButton
                            className="position-absolute end-0 top-0 z-3 rounded-circle mn-1 btn btn-secondary btn-sm p-01 clear-btn"
                            title="Clear"
                            onClick={() => onChange(undefined)}
                        >
                            <IconX size={10}/>
                        </RippleButton>
                        <DatePicker name={attribute_name_en}/>
                        <label htmlFor={attribute_id}>{attribute_name_en}</label>
                    </div>
                    {attribute_description ? <div
                        className="text-justify invalid-feedback text-gray d-block">{attribute_description}</div> : undefined}
                    {Object.values(attribute_error || {}).map((err, key) => (
                        <div key={key} className="invalid-feedback d-block">{JSON.stringify(err)}</div>
                    ))}
                </div>
            )
        default:
            return undefined;
    }
};

export default DynamicAttributeField;
