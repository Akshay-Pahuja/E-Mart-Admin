import React, { useEffect,useState } from 'react'
import { Table } from "antd";
import { getBlogs ,deleteABlog,resetState} from '../features/blogs/blogSlice';
import { useDispatch,useSelector } from 'react-redux';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from '../components/CustomModel';
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
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];


const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
   const dispatch = useDispatch();

   useEffect(()=>{
    dispatch(getBlogs());
    dispatch(resetState());
   },[])

   const blogState = useSelector((state) => state.blog.blogs);

   const data1 = [];
  for (let i = 0; i < blogState.length; i++) {
      data1.push({
        key: i + 1,
        name: blogState[i].title,
        category: blogState[i].category,

        action: (
          <>
            <Link to={`/admin/addblog/${blogState[i]._id}`} className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogState[i]._id)}
          >
            <AiFillDelete />
          </button>
          </>
        ),
    
      });
    
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Are you sure you want to delete this blog?"
      />
      </div>
  )
}

export default Bloglist
