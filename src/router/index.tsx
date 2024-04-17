import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
import Test from '../views/test/test'

const Home = lazy(() => import('../views/home/home'))
const MiniCalendar = lazy(() => import('../views/miniCalendar/mini-calendar'))
const Calendar = lazy(() => import('../views/calendar/calendar'))
const ErrorLog = lazy(() => import('../views/errorLog'))
const ColorPicker = lazy(() => import('../views/colorPicker/colorPicker'))
const Icon = lazy(() => import('../views/icon'))
const Space = lazy(() => import('../views/space/space'))
const Animation = lazy(() => import('../views/animation'))

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
      },
      {
        path: '/space',
        element: <Space />,
      },
      {
        path: '/animation',
        element: <Animation />,
      }
    ]
  }
]

export default routes
