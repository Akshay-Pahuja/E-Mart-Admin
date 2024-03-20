import React, { useEffect } from 'react'
import { Table } from "antd";
import { useState } from 'react';
import { getProductCategories,resetState,deleteAProductCategory } from '../features/pcategory/pcategorySlice';
import { useDispatch,useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModel";

const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

 
const Categorylist = () => {

  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

   const dispatch = useDispatch();
   useEffect(()=>{
    dispatch(getProductCategories());
    dispatch(resetState());
   },[])

   const pCategoryState = useSelector((state) => state.pCategory.pCategories);

   const data1 = [];
  for (let i = 0; i < pCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      name: pCategoryState[i].title,
      
      action: (
        <>
          <Link to={`/admin/category/${pCategoryState[i]._id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pCategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCategory= (e) => {
    dispatch(deleteAProductCategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategories());
    }, 100);
  };
   
  return (
    <div>
    <h3 className="mb-4 title">Categorylist</h3>
    <div>
      <Table columns={columns} dataSource={data1} />
    </div>
    <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(categoryId);
        }}
        title="Are you sure you want to delete this category?"
      />
    </div>
  )
}

export default Categorylist
