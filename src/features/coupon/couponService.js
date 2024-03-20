// import axios from "axios";
// import { base_url } from "../../utils/base_url"
// import { config } from "../../utils/axiosconfig";

// const getCoupons = async () => {
//   const response = await axios.get(`${base_url}coupon/getallcoupons`,config);
//   return response.data;

// };

// const createCoupon = async (coupon) => {
//   const response = await axios.post(`${base_url}coupon/createcoupon`,coupon,config);

//   return response.data;
// };

// const getCoupon = async (id) => {
//   const response = await axios.get(`${base_url}coupon/get-a-coupon/${id}`, config);

//   return response.data;
// };

// const updateCoupon = async (coupon) => {
//   const response = await axios.put(
//     `${base_url}coupon/updatecoupon/${coupon.id}`,
//     {
//       name: coupon.couponData.name,
//       expiry: coupon.couponData.expiry,
//       discount: coupon.couponData.discount,
//     },
//     config
//   );

//   return response.data;
// };

// const deleteCoupon = async (id) => {
//   const response = await axios.delete(`${base_url}coupon/deletecoupon/${id}`, config);

//   return response.data;
// };

// const couponService = {
//   getCoupons,
//   createCoupon,
//   getCoupon,
//   updateCoupon,
//   deleteCoupon,
// };

// export default couponService;

import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url"
const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/getallcoupons`,config);

  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/createcoupon`,coupon,config);
  return response.data;
};
const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${base_url}coupon/updatecoupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config
  );

  return response.data;
};
const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/get-a-coupon/${id}`, config);

  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/deletecoupon/${id}`, config);
  return response.data;
};
const couponService = {
  getCoupons,
  createCoupon,
  deleteCoupon,
  getCoupon,
  updateCoupon,
};

export default couponService;