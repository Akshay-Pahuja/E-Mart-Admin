import { React, useEffect} from 'react'
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { createCategory,resetState,getAProductCategory,updateAProductCategory } from '../features/pcategory/pcategorySlice';
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLocation,useNavigate } from 'react-router-dom';

let schema = yup.object().shape({
    title: yup.string().required("Category name is Required"),
})

const Addcat = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
const getCategoryId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.pCategory);
  const { isSuccess, isError, isLoading, createdCategory,categoryName,updatedProductCategory } = newCategory;
  
  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getAProductCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);

   useEffect(() => {
      if (isSuccess && createdCategory) {
        toast.success("New Category Added Successfullly!", {
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

        if (isSuccess && updatedProductCategory) {
          toast.success("Category Updated Successfullly!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            navigate("/admin/category-list");
        }
  
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        title: categoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
          if (getCategoryId !== undefined) {
            const data = { id: getCategoryId, categoryData: values };
            dispatch(updateAProductCategory(data));
            dispatch(resetState());
          } else {
            dispatch(createCategory(values));
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
        {getCategoryId !== undefined ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Enter Category"
            id="category"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCategoryId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addcat
