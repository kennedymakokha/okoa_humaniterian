import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import './../src/fonts/LexendDeca-VariableFont_wght.ttf'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Errorpage from './pages/errorpage.jsx'

// import Logs from './pages/admin/logs'
// import { store } from './store.jsx'
// import { Provider } from 'react-redux'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Root from './pages/root.jsx'
import ErrorPage from './pages/errorPage.jsx'
import Courses from './pages/courses'
import Course from './pages/courses/course.jsx'
import Lecturers from './pages/lecturers'
import Cert from './pages/certificate'
import Students from './pages/students'
import Student from './pages/students/student.jsx'
import Finance from './pages/finance'
import { Provider } from 'react-redux'
import { store } from './store.js'
import Login from './pages/login.jsx'
import DataAnalisis from './pages/dataAnalisis.jsx'
import { NavbarProvider } from './context/sideBar.context.jsx'
const rootFontStyle = {
  // fontSize: '29px',
  // fontFamily: "RalewayDots-Regular",
  // color: ' rgb(71, 84, 103)'
}

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "courses/:name",
        element: <Course />,
      },
      {
        path: "instructors",
        element: <Lecturers />,
      },
      {
        path: "instructors/:name",
        element: <Student />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "students/:name",
        element: <Student />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "certificate",
        element: <Cert />,
      },
      {
        path: "data-entry-checker",
        element: <DataAnalisis />,
      },
      {
        path: "accounts",
        element: <Finance />,
      },
      // {
      //   path: "shelves",
      //   element: <Shelves />,
      // },
      // {
      //   path: "services/:name/:town",
      //   element: <Warehouse />,
      // },
      // {
      //   path: "shelves-in/:name",
      //   element: <Warehouse />,
      // },
      // {
      //   path: "chats",
      //   element: <Chats />,
      // },
      // {
      //   path: "add-listing",
      //   element: <Listings />,
      // },

      // {
      //   path: "login",
      //   element: <Login />,
      // },
      // {
      //   path: "activate",
      //   element: <Activate />,
      // },
      // {
      //   path: "signup",
      //   element: <SignUp />,
      // },
      // {
      //   path: "forgot-password",
      //   element: <ForgotPass />,
      // },
      // {
      //   path: "admin",
      //   element: <Admin />,
      // },
      // {
      //   path: "admin/affiliate",
      //   element: <Affiliate />,
      // },
      // {
      //   path: "admin/towns",
      //   element: <Towns />,
      // },
      // {
      //   path: "admin/space-categories",
      //   element: <Categories />,
      // },
      // // {
      // //   path: "admin/logs",
      // //   element: <Logs />,
      // // },
      // {
      //   path: "admin/space-sub-categories",
      //   element: <SubCategories />,
      // },
      // {
      //   path: "admin/areas",
      //   element: <Areas />,
      // },
      // {
      //   path: "admin/customers",
      //   element: <Customers />,
      // },
      // {
      //   path: "admin/shelf-owners/:name",
      //   element: <OwnerDetails />,
      // },
      // {
      //   path: "admin/shelf-owners",
      //   element: <Owners />,
      // },
      // {
      //   path: "admin/shelves",
      //   element: <Owners />,
      // },
      // {
      //   path: "admin/shelves/:name",
      //   element: <ShelfDetails />,
      // },

    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NavbarProvider>
      <Provider store={store}>
        <div style={rootFontStyle}>
          <RouterProvider router={router} />
          {/* <ToastContainer /> */}
        </div>
      </Provider>
    </NavbarProvider>
  </React.StrictMode>,
)
