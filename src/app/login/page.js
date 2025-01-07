"use client";
import { useState } from "react";
import { baseApi } from "../../api/baseApi";
import Cookies from 'js-cookie';
import LoadingBtn from '@/src/components/LoadingBtn';

const Login = () => {
    const [formDisabled, setFormDisabled] = useState(false);
    const [pageData, setPageData] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPageData(pageData => ({ ...pageData, [name]: value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormDisabled(true);
        const requestUrl = '/api2/token/';
        baseApi
            .post(requestUrl, pageData)
            .then(res => {
                localStorage.setItem('msg', 'خوش آمدید!');
                Cookies.set("authToken", res.data.access, { expires: 1 }); 
                window.location.href = "/product/save/1"; 
            })
            .catch(err => {
                console.log('err', err);
            })
            .finally(()=>{
                setFormDisabled(false);
            })

    }
    return (
        <section className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card rounded-4">
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="/login-bg.jpg"
                                        alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form onSubmit={handleSubmit} className={`${formDisabled ? "disabled" : ""}`} autoComplete="off">

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <img src="/logo.svg" alt="logo" />
                                            </div>

                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                            <div className="form-outline mb-4">
                                                <input autoComplete="off" value={pageData.username} onChange={handleChange} type="text" name="username" id="username" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="username">Username</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input autoComplete="off" value={pageData.password} onChange={handleChange} type="password" name="password" id="password" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="password">Password</label>
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <LoadingBtn
                                                    isLoading={formDisabled}
                                                    type={'submit'}
                                                >
                                                    Login
                                                </LoadingBtn>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;