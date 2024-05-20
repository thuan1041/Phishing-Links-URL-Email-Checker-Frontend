import { Outlet } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Layout } from 'antd';
const { Content, Sider } = Layout;
import './homelayout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeLayout = () => {
  return (
    <>
      <Layout
        className='homelayout-container'
      >
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout >
    </>
  );
}

export default HomeLayout;
