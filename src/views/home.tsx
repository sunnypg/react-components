import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Button, theme, Avatar } from 'antd';
import logo from '../assets/image/logo.svg'
import { Outlet } from 'react-router-dom'
import MainMenu from '../components/Main-Menu';

const { Header, Sider, Content, Footer } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ cursor: 'pointer', marginRight: '25px' }}>
            <Avatar
              size={36}
              icon={<UserOutlined />}
              src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
            />
            <span style={{ marginLeft: '5px' }}>菠萝不吹雪</span>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            maxHeight: 'calc(100vh - 160px)',
            overflow: 'auto',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>
          {`React Component Library ©${new Date().getFullYear()}`}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;