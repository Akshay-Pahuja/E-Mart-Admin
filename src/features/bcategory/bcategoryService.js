import axios from "axios";
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig";

const getbCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/getallcategory`);

  return response.data;
};

const createBlogCategory = async (blogcat) => {
  const response = await axios.post(`${base_url}blogcategory/createcategory`, blogcat, config);

  return response.data;
};

const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/get-a-category/${id}`, config);

  return response.data;
};

const updateBlogCategory = async (category) => {
  const response = await axios.put(
    `${base_url}blogcategory/updatecategory/${category.id}`,
    { title: category.categoryData.title },
    config
  );
  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/deletecategory/${id}`, config);

  return response.data;
};

const bcategoryService = {
  getbCategories,
  createBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};

export default bcategoryService;