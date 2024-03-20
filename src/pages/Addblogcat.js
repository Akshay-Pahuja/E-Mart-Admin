
import { React, useEffect} from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { createBlogCategory,resetState,getABlogCategory,updateABlogCategory } from '../features/bcategory/bcategorySlice';
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate,useLocation } from 'react-router-dom';

let schema = yup.object().shape({
    title: yup.string().required("BlogCategory is Required"),
})

const Addblogcat = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
const getbCategoryId = location.pathname.split("/")[3];
    const newBlogCategory = useSelector((state) => state.bCategory);
  
    const { isSuccess, isError, isLoading, createdBlogCategory,bcategoryName,updatedCategory } = newBlogCategory;

    useEffect(() => {
      if (getbCategoryId !== undefined) {
        dispatch(getABlogCategory(getbCategoryId));
      } else {
        dispatch(resetState());
      }
    }, [getbCategoryId]);

    useEffect(() => {
      if (isSuccess && createdBlogCategory) {
        toast.success("BlogCategory Added Successfullly!", {
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
   
      if (isSuccess && updatedCategory) {
        toast.success("Blog Category Updated Successfullly!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate("/admin/blog-category-list");
      }

      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        title: bcategoryName || "",
        },
        validationSchema: schema,
    onSubmit: (values) => {
      if (getbCategoryId !== undefined) {
        const data = { id: getbCategoryId, categoryData: values };
        dispatch(updateABlogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
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
      {getbCategoryId !== undefined ? "Edit" : "Add"} Blog Category</h3>
      <div>
        <form 
        onSubmit={formik.handleSubmit}
        className="d-flex gap-3 flex-column"
        >
            <CustomInput
            type="text"
            label="Enter BlogCategory Name"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getbCategoryId !== undefined ? "Edit" : "Add"} BlogCategory
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addblogcat
