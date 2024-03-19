import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('../views/home'))
const MiniCalendar = lazy(() => import('../views/mini-calendar'))
const Calendar = lazy(() => import('../views/calendar'))

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
      }
    ]
  }
]

export default routes
