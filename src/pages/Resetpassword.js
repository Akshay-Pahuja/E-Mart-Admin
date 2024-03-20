import React from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../features/auth/authSlice";

let schema = Yup.object().shape({
  password: Yup.string().required("Password required"),
});

const Resetpassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split('/')[2];
   
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema:schema,
    onSubmit: values => {
      dispatch(resetPassword({token:getToken,password:values.password}))
      navigate("/")
      setTimeout(()=>{
        window.location.reload();
      },200)
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
        <h3 className="text-center title"> Reset Password</h3>
        <p className="text-center">Please enter your new password.</p>
        <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
        <CustomInput type = "password" name = 'password' label='Password'  onChng={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
         val={formik.values.password} />
         <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>

                <button
            className="border-2 mt-2 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#115f73"  }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;