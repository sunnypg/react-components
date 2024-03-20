import { ApiOutlined, CalendarOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const items = [
  {
    key: '/mini-calendar',
    icon: <CalendarOutlined />,
    label: '迷你日历',
  },
  {
    key: '/calendar',
    icon: <CalendarOutlined />,
    label: '日历',
  },
  {
    key: '/test',
    icon: <ApiOutlined />,
    label: '单元测试',
  },
]

const MainMenu: React.FC = memo(() => {
  const currentRoute = useLocation()
  const navigateTo = useNavigate()

  const menuClick = useCallback(({ key, keyPath }: { key: string; keyPath: string[] }) => {
    navigateTo(key)
  }, [])

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[currentRoute.pathname]}
      mode="inline"
      items={items}
      onClick={menuClick}
    ></Menu>
  )
})

export default MainMenu