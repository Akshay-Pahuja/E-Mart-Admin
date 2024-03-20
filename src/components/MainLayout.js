import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {IoIosNotifications} from "react-icons/io"
import {SiGooglemarketingplatform} from "react-icons/si"
import { Outlet } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {FiUsers} from "react-icons/fi"
import { useNavigate } from 'react-router-dom';
import {BiSolidDashboard,BiLogoProductHunt,BiCategory,BiDuplicate} from "react-icons/bi"
import {AiOutlineShoppingCart,AiOutlineBgColors} from "react-icons/ai"
import {SiBrandfolder} from "react-icons/si"
import {TbClipboardList} from "react-icons/tb"
import {FaBlogger,FaList} from "react-icons/fa"
import {RiAddBoxLine,RiCoupon2Line} from "react-icons/ri"
import {CgList} from "react-icons/cg"
import {AiOutlineLogout} from "react-icons/ai"
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const authState = useSelector((state)=>state.auth);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">BM</span>
            <span className="lg-logo">BetterMart</span>
          </h2>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({key})=>{
            if(key === "signout"){
               localStorage.clear();
              
                navigate("/")
                window.location.reload();
              
            }
            else{
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <BiSolidDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <FiUsers className='fs-4'/>,
              label: 'Customers',
            },
            {
              key: 'Catalog',
              icon: <AiOutlineShoppingCart className='fs-4'/>,
              label: 'Catalog',
              children : [
                {
                  key: 'product',
                  icon: <BiLogoProductHunt className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <BiLogoProductHunt className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand',
                },
                {
                  key: 'brand-list',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <BiCategory className='fs-4' />,
                  label: 'Category',
                },
                {
                  key: 'category-list',
                  icon: <BiCategory className='fs-4' />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'orders',
              icon: <TbClipboardList className='fs-4'/>,
              label: 'Orders',
            },
            {
              key: 'marketing',
              icon: <SiGooglemarketingplatform className='fs-4'/>,
              label: 'Marketing',
              children : [
                {
                  key: 'addcoupon',
                  icon: <RiCoupon2Line className='fs-4'/>,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <FaList className='fs-4'/>,
                  label: 'Coupon list',
                },
              ]
            },
            {
              key: 'blog',
              icon: <FaBlogger className='fs-4'/>,
              label: 'Blogs',
              children : [
                {
                  key: 'addblog',
                  icon: <RiAddBoxLine className='fs-4'/>,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaList className='fs-4'/>,
                  label: 'Blog list',
                },
                {
                  key: 'blog-category',
                  icon: <BiDuplicate className='fs-4'/>,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <CgList className='fs-4'/>,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key:"signout",
               icon:<AiOutlineLogout className='fs-4'/>,
               label:'Log Out'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header  className="d-flex justify-content-between ps-1 pe-5" style={{ padding: 0, background: colorBgContainer }}>
        {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
            <div className="d-flex gap-4 align-items-center">
            {/* <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div> */}

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                {/* <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                /> */}
                <h5>Welcome</h5>
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{authState?.user?.firstname} {authState?.user?.lastname}</h5>
                <p className="mb-0">{authState?.user?.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
           <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;