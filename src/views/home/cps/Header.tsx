import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import Fullscreen from "./FullScreen";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

function HomeHeader(props: HeaderProps) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
        type="text"
        icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => props.setCollapsed(!props.collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div style={{ cursor: 'pointer', marginRight: '25px' }}>
        <Fullscreen></Fullscreen>
        <Avatar
          size={36}
          icon={<UserOutlined />}
          src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          style={{ marginLeft: '10px' }}
        />
        <span style={{ margin: '0 5px 0 5px' }}>菠萝不吹雪</span>
      </div>
    </Header>
  )
}

export default HomeHeader