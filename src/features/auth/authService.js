import axios from "axios"
import { base_url } from "../../utils/base_url"
import {config} from "../../utils/axiosconfig"

const login = async(user)=>{
    const response = await axios.post(`${base_url}user/admin-login`,user);
    if(response.data)
    {
        localStorage.setItem("user",JSON.stringify(response.data))
    }

    return response.data;
};

const getOrders = async () => {
    const response = await axios.get(`${base_url}user/getallOrders`,config);
  
    return response.data;
  };

  const getMonthlyOrders = async()=>{
    const response = await axios.get(`${base_url}user/getMonthWiseOrderIncome`,config );
    return response.data;
  }

  const getYearlyOrders = async()=>{
    const response = await axios.get(`${base_url}user/getYearlyTotalOrders`,config );
    return response.data;
  }

  const updateOrder = async(data)=>{
    const response = await axios.put(`${base_url}user/updateOrder/${data.id}`,{status:data.status}, config);
    return response.data;
  }

  const forgotPassword = async(data)=>{
    const response = await axios.post(`${base_url}user/forgot-password-token`,data);
    if(response.data)
    {
        return response.data;
    }
}

const resetPassword = async(data)=>{
  const response = await axios.put(`${base_url}user/reset-password/${data.token}`,{password:data?.password});
  if(response.data)
  {
      return response.data;
  }
}

const authService = {
    login,
    getOrders,
    getMonthlyOrders,
    getYearlyOrders,
    updateOrder,
    forgotPassword,
    resetPassword
}

export default authService;