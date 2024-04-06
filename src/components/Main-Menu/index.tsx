import { AntDesignOutlined, ApiOutlined, AppstoreAddOutlined, BgColorsOutlined, BugOutlined, CalendarOutlined, ColumnWidthOutlined, InsuranceOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/components',
    icon: <AppstoreAddOutlined />,
    label: '自定义组件',
    children: [
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
        key: '/color-picker',
        icon: <BgColorsOutlined />,
        label: '颜色选择器',
      },
      {
        key: '/icon',
        icon: <AntDesignOutlined />,
        label: '图标',
      },
      {
        key: '/space',
        icon: <ColumnWidthOutlined />,
        label: '间距',
      },
    ]
  },
  {
    key: '/security',
    icon: <InsuranceOutlined />,
    label: '安全相关',
    children: [
      {
        key: '/test',
        icon: <ApiOutlined />,
        label: '单元测试',
      },
      {
        key: '/error-log',
        icon: <BugOutlined />,
        label: '错误日志',
      }
    ]
  }
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