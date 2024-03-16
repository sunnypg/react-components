import { useEffect, Suspense } from 'react'
import { useRoutes, useLocation, useNavigate } from 'react-router-dom'
import router from './router'
import { message } from 'antd'

// 登录页
function ToLogin() {
  const navigateTo = useNavigate()
  useEffect(() => {
    navigateTo('/login')
    message.warning('您还没有登录，请登录后再访问！')
  }, [])
  return <div></div>
}
// 首页
function ToHome() {
  const navigateTo = useNavigate()
  useEffect(() => {
    navigateTo('/')
    message.warning('您已经登录过了！')
  }, [])
  return <div></div>
}
// 路由守卫
function BeforeRouterEnter() {
  const outlet = useRoutes(router)
  const location = useLocation()
  const token = 'token'
  if (location.pathname === '/login' && token) {
    return <ToHome />
  }
  if (location.pathname !== '/login' && !token) {
    return <ToLogin />
  }

  return outlet
}

function App() {
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <BeforeRouterEnter></BeforeRouterEnter>
      </Suspense>
    </div>
  )
}

export default App
