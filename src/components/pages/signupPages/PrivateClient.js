import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Spinner from '../../layouts/Spinner';
import { useDispatch } from 'react-redux';
import { register } from "../../../redux/actions/authAction";
import { privateClientSchema } from './validationSchema'

const PrivateClient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const stopLoading = () => setLoading(false);
    const handleSubmit = (values, actions) => {
        setLoading(true)
        console.log(values);
        const paylaod = {
            ...values,
            userType: "private_client"
        }
        dispatch(register(paylaod, navigate, stopLoading));
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            terms: false
        },
        validationSchema: privateClientSchema,
        onSubmit: handleSubmit,


    });
    const { name, email, password, phone, terms } = formik.values;

    return (
        <div className="mt-8">
            {
                loading ? <Spinner /> :

                    <form onSubmit={formik.handleSubmit}>
                        <div className="w-full">
                            <label className="block">Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="mt-1 w-full py-2 px-2 border-gray-400 rounded border"
                                value={name}
                                id="name"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.name && formik.errors.name ? <p className='text-red-500'>{formik.errors.name}</p> : null
                            }
                        </div>
                        <div className="w-full mt-6">
                            <label className="block">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="mt-1 w-full py-2 px-2 border-gray-400 rounded border"
                                value={email}
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {
                                formik.touched.email && formik.errors.email ? <p className='text-red-500'>{formik.errors.email}</p> : null
                            }
                        </div>
                        <div className="w-full mt-6">
                            <label className="block">Phone Number</label>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                className="mt-1 w-full py-2 px-2 border-gray-400 rounded border"
                                value={phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                id="phone"
                                name="phone"
                            />
                            {
                                formik.touched.phone && formik.errors.phone ? <p className='text-red-500'>{formik.errors.phone}</p> : null
                            }
                        </div>
                        <div className="w-full mt-6">
                            <label className="block">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your desired password"
                                className="mt-1 w-full py-2 px-2 border-gray-400 rounded border"
                                value={password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                id="password"
                                name="password"
                            />
                            {
                                formik.touched.password && formik.errors.password ? <p className='text-red-500'>{formik.errors.password}</p> : null
                            }
                        </div>
                        <div className="mt-8 w-11/12 flex">
                            <input
                                type="checkbox"
                                className="p-4 border-gray-400"
                                value={terms}
                                onChange={formik.handleChange}
                                id="terms"
                                name="terms"
                                required
                            />
                            {
                                formik.touched.terms && formik.errors.terms ? <p className='text-red-500'>{formik.errors.terms}</p> : null
                            }
                            <p className="px-2">
                                I agree to the
                                <span className="text-primary pl-2">
                                    terms & conditions
                                </span>
                            </p>
                        </div>
                        <div className="mt-6 w-full flex">
                            <button
                                type='submit'
                                className="w-full text-lg text-white bg-primary py-2 rounded fw-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
            }
            <div className="mt-10">
                Already have an account?{" "}
                <Link to="/login"><span className="text-primary fw-600 fs-500 pl-2">Login</span></Link>
            </div>
        </div>
    )
}

export default PrivateClient