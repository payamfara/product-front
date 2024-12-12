"use client"
import { Fragment, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { baseApiAuth } from '../../../../api/baseApi';
import AttrListComponent from './components/AttrListComponent';
import DynamicAttributeField from "@/src/components/DynamicAttributeField";


const CreateCategoryPage = () => {
    const [pageData, setPageData] = useState({});
    const [pageStruct, setPageStruct] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const { id = "" } = params;
    const updateAttrList = (updateAttrListFunction) => setPageData(pageData => ({ ...pageData, category_attrs: updateAttrListFunction(pageData.category_attrs) }))

    const handleChange = (name, value) => {
        setPageData(pageData => ({ ...pageData, [name]: value }))
    }
    useEffect(() => {
        baseApiAuth.get(`/api2/category/${id}`)
            .then((res) => {
                console.log('res', res.data);
                setPageData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setLoading(false);
            })
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = pageData;
        console.log(data);

        const url = `/category/${id}/`
        baseApiAuth.post(url, data)
            .then((res) => {
                console.log('ress', res);
            })
            .catch((err) => {
                console.error('Error fetching tags:', err);
            })

    }
    return (
        <Fragment>
            {/* Layout wrapper */}
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    {/* Menu */}

                    {/* / Menu */}
                    {/* Navbar */}
                    {/* / Navbar */}
                    {/* Content wrapper */}
                    <div className="content-wrapper">
                        {/* Content */}
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <form onSubmit={handleSubmit} className="app-ecommerce">
                                {/* Add category */}
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
                                    <div className="d-flex flex-column justify-content-center">
                                        <h4 className="mb-1 mt-3">یک دسته بندی جدید اضافه کنید</h4>
                                        <p className="text-muted">سفارش هایی که در سراسر فروشگاه شما ثبت می شود</p>
                                    </div>
                                    <div className="d-flex align-content-center flex-wrap gap-3">
                                        <div className="d-flex gap-3">
                                            <button className="btn btn-label-primary">ذخیره پیش نویس</button>
                                        </div>
                                        <button className="btn btn-primary" type="submit">انتشار دسته بندی</button>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* First colum */}
                                    <div className="col-12 col-lg-8">
                                        {/* category Information */}
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <h5 className="card-tile mb-0">اطلاعات دسته</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="mb-3 col ecommerce-select2-dropdown">
                                                    <DynamicAttributeField
                                                        onChange={(vals) => { console.log(vals) }}
                                                        data={{
                                                            attribute_name_en: 'parent',
                                                            attribute_name_fa: 'دسته بالاتر',
                                                            attr_type: pageData.meta_datas.parent,
                                                            attribute_value: pageData.parent,
                                                            attribute_value_str: pageData.parent_str,
                                                        }}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                        {/* /category Information */}
                                    </div>
                                    {/* {/* /Second column Second column */}
                                    <div className="col-12 col-lg-4">
                                        {/* {/* /Pricing Card Organize Card */}
                                        <div className="card mb-4">
                                            <div className="card-header">
                                                <h5 className="card-title mb-0">جزئیات</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="d-flex flex-column gap-3 border border-dashed p-3 mb-3">
                                                    {/* Part number en */}
                                                    <div>
                                                        <DynamicAttributeField
                                                            onChange={(value) => handleChange('title_en', value)}
                                                            className='p-2'
                                                            data={{
                                                                attribute_name_en: 'title_en',
                                                                attribute_name_fa: 'مقدار انگلیسی',
                                                                attr_type: pageData.meta_datas.title_en,
                                                                attr_value: pageData.title_en
                                                            }}
                                                        />
                                                        <span id="help_value_en" className="fs-tiny form-label"></span>
                                                    </div>
                                                    {/* Part number fa */}
                                                    <div>
                                                        <DynamicAttributeField
                                                            onChange={(value) => handleChange('title_fa', value)}
                                                            className='p-2'
                                                            data={{
                                                                attribute_name_en: 'title_fa',
                                                                attribute_name_fa: 'مقدار فارسی',
                                                                attr_type: pageData.meta_datas.title_fa,
                                                                attr_value: pageData.title_fa
                                                            }}
                                                        />
                                                        <span id="help_value_en" className="fs-tiny form-label"></span>
                                                    </div>
                                                    {/* Part number bz */}
                                                    <div>
                                                        <DynamicAttributeField
                                                            onChange={(value) => handleChange('title_bz', value)}
                                                            className='p-2'
                                                            data={{
                                                                attribute_name_en: 'title_bz',
                                                                attribute_name_fa: 'مقدار بازاری',
                                                                attr_type: pageData.meta_datas.title_bz,
                                                                attr_value: pageData.title_bz
                                                            }}
                                                        />
                                                        <span id="help_value_en" className="fs-tiny form-label"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Organize Card */}
                                    </div>
                                    {/* /Second column */}
                                    <div className="col-12">
                                        <AttrListComponent updateAttrList={updateAttrList} inputs={pageData.category_attrs} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* {/* / Content Footer */}
                        {/* / Footer */}

                        <div className="content-backdrop fade"></div>
                    </div>
                    {/* Content wrapper */}
                </div>
                {/* / Layout page */}
            </div>

            {/* Overlay */}
            <div className="layout-overlay layout-menu-toggle"></div>

            {/* Drag Target Area To SlideIn Menu On Small Screens */}
            <div className="drag-target"></div>
        </Fragment>
    );
}
export default CreateCategoryPage;