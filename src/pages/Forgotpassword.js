import React from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { forgotPasswordToken } from "../features/auth/authSlice";
import {useNavigate} from "react-router-dom";

let schema = Yup.object().shape({
  email: Yup.string().email("Email is not correct").required("email required"),
});

const Forgotpassword = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema:schema,
    onSubmit: values => {
      dispatch(forgotPasswordToken(values));
      navigate("/")
      window.location.reload();
    },
  });

  return (
    <div className="py-5" style={{ background: "#115f73", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
        We will send you an email to reset your password
        </p>
       
         <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
              <CustomInput type = "email" name = 'email'  label='email'  onChng={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
         val={formik.values.email} />
          <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button
            className="border-2 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#115f73"  }}
            type="submit"
          >
            Submit
          </button>
                    <Link to="/">Cancel</Link>
                  </div>
                </div>
              </form>
      </div>
    </div>
  );
};

export default Forgotpassword;