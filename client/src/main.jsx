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
import Tests from './pages/tests'
import Test from './pages/tests/test.jsx'
import Drugs from './pages/drugs'
import Drug from './pages/drugs/drug.jsx'
import DockDesk from './pages/doctorsDesk'
import DocDest from './pages/doctorsDesk/docDesk.jsx'
import DocDestAfter from './pages/doctorsDesk/docDeskAfter.jsx'
import Lab from './pages/lab'
import LabTest from './pages/lab/lab.jsx'
import PatientTriage from './pages/triage/triage.jsx'
import Patient from './pages/patients/patient.jsx'
import Finance from './pages/finance'

import Login from './pages/login.jsx'
import DataAnalisis from './pages/dataAnalisis.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
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
        path: "laboratory",
        element: <Lab />,
      },
      {
        path: "laboratory/:name",
        element: <LabTest />,
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
        path: "tests",
        element: <Tests />,
      },
      {
        path: "tests/:name",
        element: <Test />,
      },
      {
        path: "drugs",
        element: <Drugs />,
      },
      {
        path: "drugs/:name",
        element: <Drug />,
      },
      {
        path: "doctors-desk",
        element: <DockDesk />,
      },
      {
        path: "doctors-desk/doctors-table",
        element: <DocDest />,
      },
      {
        path: "doctors-desk/doctors-table-after",
        element: <DocDestAfter />,
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
