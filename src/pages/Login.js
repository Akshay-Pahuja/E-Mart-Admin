import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../components/CustomInput'
import { toast } from "react-toastify";
import {useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom'

let schema = Yup.object().shape({
  email: Yup.string().email("Email is not correct").required("email required"),
  password: Yup.string().required("Password required"),
});

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const authState = useSelector((state) => state);

   const { user, isError, isSuccess, isLoading, message } = authState.auth;
    
  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    validationSchema:schema,
    onSubmit: values => {
      dispatch(login(values))
    },
  });

  
  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
      setTimeout(()=>{
        window.location.reload();
      },300)
    } else {
      navigate("");
    }
  }, [user, isError, isSuccess, isLoading,message]);
  

  return (
    <div className="py-5" style={{ background: "#115f73", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
      <h3 className="text-center title">Login</h3>
      <p className="text-center">Login to your account to continue.</p>
      <div className="error text-center">
          {message.message === "Rejected" ? "You are not an Admin" : ""}
        </div>
      <form action = "" onSubmit={formik.handleSubmit}>
        <CustomInput type = "text" name = 'email' label= "Email address" id="email"  onChng={formik.handleChange("email")}
         val={formik.values.email} />
         {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
        <CustomInput type = "password" name = 'password' label= "Password" id="pass" onChng={formik.handleChange("password")}
         val={formik.values.password} />
         <div className='error'>
         {formik.touched.password && formik.errors.password ? (
         <div>{formik.errors.password}</div>
       ) : null}
         </div>
        
        <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password
            </Link>
          </div>

        <button 
            className="border-2 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ background: "#115f73" }}
            type="submit"
          >
            Login
        </button>
      </form>
      </div>
    </div>
  )
}

export default Login
