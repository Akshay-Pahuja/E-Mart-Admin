import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url"

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/getallProducts`);
  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/createProduct`, product, config);
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/admin/deleteProduct/${id}`, config);
  return response.data;
};

// const getProduct = async (id) => {
//   const response = await axios.get(`${base_url}product/getproduct/${id}`, config);

//   return response.data;
// };

// const updateProduct = async (product) => {
//   const response = await axios.put(
//     `${base_url}product/admin/updateProduct/${product.id}`,
//     { title: product.productData.title },
//     { description: product.productData.description },
//     { brand: product.productData.brand },
//     { category: product.productData.category },
//     { color: product.productData.color },
//     { price: product.productData.price },
//     config
//   );
//   return response.data;
// };

const productService = {
  getProducts,
  createProduct,
  deleteProduct, 
  // getProduct,
  // updateProduct,
};

export default productService;