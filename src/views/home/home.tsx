import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import logo from '../../assets/image/logo.svg'
import { Outlet } from 'react-router-dom'
import MainMenu from '../../components/Main-Menu';
import HomeHeader from './cps/Header';
import { useKeepOutlet } from '../../utils/keepalive';

const { Sider, Content, Footer } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const element = useKeepOutlet()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="logo"
          style={{
            height: '32px',
            margin: '16px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <img style={{ width: '50px' }} src={logo} alt="" />
          {!collapsed && <h2>react 组件库</h2>}
        </div>
        <MainMenu></MainMenu>
      </Sider>
      <Layout>
        <HomeHeader setCollapsed={setCollapsed} collapsed={collapsed}></HomeHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            maxHeight: 'calc(100vh - 160px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* <Outlet /> */}
          {element}
        </Content>
        <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>
          {`React Component Library ©${new Date().getFullYear()}`}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;