import { Menu } from 'antd';
import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import menus from './menus'
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
      defaultOpenKeys={['/components']}
      mode="inline"
      items={menus}
      onClick={menuClick}
    ></Menu>
  )
})

export default MainMenu