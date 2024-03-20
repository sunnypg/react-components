import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import Test from '../views/test/test'

const Home = lazy(() => import('../views/home/home'))
const MiniCalendar = lazy(() => import('../views/mini-calendar'))
const Calendar = lazy(() => import('../views/calendar'))
const ErrorLog = lazy(() => import('../views/errorLog'))
const ColorPicker = lazy(() => import('../views/colorPicker'))
const Icon = lazy(() => import('../views/icon'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/mini-calendar',
        element: <MiniCalendar />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/test',
        element: <Test />,
      },
      {
        path: '/error-log',
        element: <ErrorLog />,
      }
      ,
      {
        path: '/color-picker',
        element: <ColorPicker />,
      },
      {
        path: '/icon',
        element: <Icon />,
      }
    ]
  }
]

export default routes
