import React,{useEffect,useState} from "react";
import { Column } from "@ant-design/plots";
import {useDispatch,useSelector} from "react-redux"
import { getMonthlyData,getOrders,getYearlyData } from "../features/auth/authSlice";

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    staus: `London, Park Lane no. ${i}`,
  });
}
const Dashboard = () => {

 const dispatch = useDispatch();

 const monthlyDataState = useSelector((state)=> state?.auth?.monthlyData);
 const yearlyDataState = useSelector((state)=> state?.auth?.yearlyData);

 const [dataMonthly,setDataMonthly] = useState([])
 const [monthlySales,setMonthlySales] = useState([]);

 useEffect(()=>{
   dispatch(getMonthlyData());
   dispatch(getYearlyData());
  
 },[])

 useEffect(()=>{
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let data = [];
  let orderCount = [];
  for(let index =0;index<monthlyDataState?.length;index++){
    data.push({type:monthNames[monthlyDataState[index]?._id?.month-1],income:monthlyDataState[index]?.amount});
    orderCount.push({type:monthNames[monthlyDataState[index]?._id?.month-1],sales:monthlyDataState[index]?.count})
  }
  setDataMonthly(data)
  setMonthlySales(orderCount)
 },[monthlyDataState])

  const config = {
    data:dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#022530";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  const config2 = {
    data:monthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#022530";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Income</p>
            <h4 className="mb-0 sub-title">₹{yearlyDataState && yearlyDataState[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            
            <p className="mb-0  desc">Total Income collection</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total Sales</p>
            <h4 className="mb-0 sub-title">{yearlyDataState && yearlyDataState[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0  desc">Total Orders till now</p>
          </div>
        </div>
      
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
        <h3 className="mb-5 mt-5 title">Sale Statics</h3>
        <div>
          <Column {...config2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;