import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MasterLayout from './Components/MasterLayout/MasterLayout'
import NotFound from './Components/NotFound/NotFound'
import Home from './Components/Home/Home'
import Users from './Components/Users/Users'
import Profile from './Components/Profile/Profile'
import AddUser from './Components/AddUser/AddUser'
import AuthLayout from './Components/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import { ToastContainer } from 'react-toastify'
import UpdateUser from './UpdateUser/UpdateUser'

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children:
        [
          { index: true, element: <Login /> },
          { path: 'login', element: <Login /> }
        ]
    },

    {
      path: 'dashboard',
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children:
        [
          { index: true, element: <Home /> },
          { path: 'home', element: <Home /> },
          { path: 'users', element: <Users />, },
          { path: 'users/:index', element: <UpdateUser /> },
          { path: 'profile', element: <Profile /> },
          { path: 'addUser', element: <AddUser /> }
        ]
    }
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
