import React, { useEffect, useState } from "react";
import { Layout, Input, Button, Avatar, Menu, Dropdown, Row, Col, message } from 'antd';
import { HomeOutlined, BellOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import InputURL from "../components/URL/InputURL";
import MainHeader from "../components/headers/Header";

const { Footer } = Layout;

const InputURLWrapper = styled.div`
    @media (min-width: 768px) {
      width: 70%;
    }
`;

const HomeSublayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainHeader />
      <Content style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <InputURLWrapper>
          <InputURL />
        </InputURLWrapper>
      </Content>
      <Footer style={{ textAlign: 'center' }}>2024 Frontend Code by thuan1041</Footer>
    </Layout>
  )
};

export default HomeSublayout;
