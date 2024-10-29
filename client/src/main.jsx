import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './pages/root.jsx'
import ErrorPage from './pages/errorPage.jsx'
import Specializations from './pages/speciality/index.jsx'

import Users from './pages/users/index.jsx'
import Cert from './pages/certificate'
import Patients from './pages/patients'
import Triage from './pages/triage'
import PatientTriage from './pages/triage/triage.jsx'
import Patient from './pages/patients/patient.jsx'
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
        path: "users",
        element: <Users />,
      },
      {
        path: "specialities",
        element: <Specializations />,
      },
      {
        path: "users/:name",
        element: <Patient />,
      },
      {
        path: "instructors",
        element: <Users />,
      },
      {
        path: "instructors/:name",
        element: <Patient />,
      },
      {
        path: "patients",
        element: <Patients />,
      },
      {
        path: "triage",
        element: <Triage />,
      },
      {
        path: "triage/:name",
        element: <PatientTriage />,
      },
      {
        path: "patients/:name",
        element: <Patient />,
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
