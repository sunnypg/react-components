import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('../views/home'))
const MiniCalendar = lazy(() => import('../components/Mini-Calendar'))
const Calendar = lazy(() => import('../components/Calendar'))

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
