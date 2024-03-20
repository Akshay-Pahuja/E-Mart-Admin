import { React, useEffect} from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { createColor,resetState,getAColor,updateAColor} from '../features/color/colorSlice';
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate,useLocation } from 'react-router-dom';

let schema = yup.object().shape({
    title: yup.string().required("Color name is Required"),
})


const Addcolor = () => {

const dispatch = useDispatch();
const location = useLocation();
const navigate = useNavigate();
const getColorId = location.pathname.split("/")[3];

    const newColor = useSelector((state) => state.color);
  
    const { isSuccess, isError, isLoading, createdColor,colorName,updatedColor} = newColor;

    useEffect(() => {
      if (getColorId !== undefined) {
        dispatch(getAColor(getColorId));
      } else {
        dispatch(resetState());
      }
    }, [getColorId]);

    useEffect(() => {
      if (isSuccess && createdColor) {
        toast.success("Color Added Successfullly!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      if (isSuccess && updatedColor) {
        toast.success("Color Updated Successfullly!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate("/admin/color-list");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        title: colorName || "",
        },
        validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          }, 3000);
        }
      },
    });

  return (
    <div>
    <h3 className="mb-4 title">
      {getColorId !== undefined ? "Edit" : "Add"} Color
    </h3>
    <div>
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          name="title"
          onChng={formik.handleChange("title")}
          onBlr={formik.handleBlur("title")}
          val={formik.values.title}
          label="Enter Color"
          id="color"
        />
        <div className="error">
          {formik.touched.title && formik.errors.title}
        </div>
        <button
          className="btn btn-success border-0 rounded-3 my-5"
          type="submit"
        >
          {getColorId !== undefined ? "Edit" : "Add"} Color
        </button>
      </form>
    </div>
  </div>
  )
}

export default Addcolor
