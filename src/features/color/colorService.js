import axios from "axios";
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosconfig";

const getColors = async () => {
    const response = await axios.get(`${base_url}color/getallColors`);
  
    return response.data;
  };

  const createColor = async (color) => {
    const response = await axios.post(`${base_url}color/createColor`, color, config);
  
    return response.data;
  };

  const getColor = async (id) => {
    const response = await axios.get(`${base_url}color/get-a-Color/${id}`, config);
  
    return response.data;
  };
  
  const updateColor = async (color) => {
    const response = await axios.put(
      `${base_url}color/updateColor/${color.id}`,
      { title: color.colorData.title },
      config
    );
  
    return response.data;
  };

  const deleteColor = async (id) => {
    const response = await axios.delete(`${base_url}color/deleteColor/${id}`, config);
  
    return response.data;
  };

const colorService = {
  getColors,
  createColor,
  getColor,
  updateColor,
  deleteColor,
};

export default colorService;