import { AntDesignOutlined, ApiOutlined, AppstoreAddOutlined, BgColorsOutlined, BugOutlined, CalendarOutlined, ColumnWidthOutlined, InsuranceOutlined, LoadingOutlined, BellOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const menus: MenuItem[] = [
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
      {
        key: '/animation',
        icon: <LoadingOutlined />,
        label: '动画',
      },
      {
        key: '/message',
        icon: <BellOutlined />,
        label: '全局提示',
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

export default menus