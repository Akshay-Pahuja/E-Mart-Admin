import axios from "axios";
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/getallcategory`);

  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(`${base_url}category/createcategory`, category, config);

  return response.data;
};

const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/get-a-category/${id}`, config);

  return response.data;
};

const updateProductCategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/updatecategory/${category.id}`,
    { title: category.categoryData.title },
    config
  );

  return response.data;
};

const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/deletecategory/${id}`, config);

  return response.data;
};

const pcategoryService = {
  getProductCategories,
  createCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default pcategoryService;