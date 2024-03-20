import axios from "axios";
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig";

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/getallbrands`);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}brand/createbrand`, brand, config);

  return response.data;
};

const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/get-a-brand/${id}`, config);

  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/updatebrand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/deletebrand/${id}`, config);
  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;