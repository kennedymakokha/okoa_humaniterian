

import classNames from "classnames";
import React, { useEffect, useState } from "react";
// import { Sidebar } from "./sidebarItem";
import { MenuItems } from '../components/sidebar/menuItems.json'
import { Sidebar } from "../components/sidebar/sidebarItem";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Logout from './../assets/gout.png'
import Login from "./login";
import { useLogoutMutation } from "../features/slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/slices/authSlice";
import { io } from "socket.io-client";
import { setCount } from './../features/slices/authSlice';
import { useGet_patients_countQuery } from "../features/slices/patientsSlice";
export const socket = io(`http://localhost:5000/`);
// import { Bars3Icon } from "@heroicons/react/24/outline";
const Layout = (props) => {
    const [collapsed, setSidebarCollapsed] = useState(false);
    // const { collapsed, toggleNavbar } = useNavbar();
    const location = useLocation();


    const { userInfo } = useSelector((state) => state.auth)
    console.log(userInfo)
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation();
    const dispatch = useDispatch()
    const LogOutHandler = async () => {
        try {
            // await logoutApiCall({ token: "token" }).unwrap()
            dispatch(logout({ id: userInfo.id, token: localStorage.getItem('token') }))
            navigate('/login?id=1213')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (MenuItems.filter(item => !item.roles.includes(`${userInfo.role}`))) {
            navigate("/unauthorized")
        }
    }, [])
  

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        });

        socket.on("disconnect", () => {
            console.log(socket.id); // undefined
        });



    }, [])



    return (
        < >
            {location.pathname === "/login" ? <Login /> :
                <div
                    className={classNames({
                        // 👇 use grid layout
                        "grid min-h-screen ": true,
                        // 👇 toggle the width of the sidebar depending on the state
                        "grid-cols-sidebar": !collapsed,
                        "grid-cols-sidebar-collapsed": collapsed,
                        // 👇 transition animation classes

                        "transition-[grid-template-columns]  duration-300 ease-in-out": true,
                    })}
                >
                    {/* sidebar */}

                    <Sidebar navItems={MenuItems} collapsed={collapsed} setCollapsed={() => setSidebarCollapsed(prev => !prev)} />

                    {/* content */}
                    <div className="bg-gray-50">
                        <div className={`flex w-full ${collapsed ? "h-[8%]" : "h-[10%]"} bg-[#98daf8] shadow-2xl  px-2 items-center justify-end`}>
                            <span onClick={() => LogOutHandler()} className="bg-white cursor-pointer flex pointe items-center  gap-x-2 px-3 py-2 text-red-600 text-[14px] rounded-md shadow-2xl">
                                <img src={Logout} alt="" className="w-5 h-5" />
                                Logout</span>
                        </div>
                        <div className="px-4">

                            <Outlet />
                        </div>

                    </div>
                </div>}
        </>

    );
};
export default Layout;

// import { Outlet, useLocation } from "react-router-dom";
// // import Header from "../containers/layout/navbar/header";
// // import Footer from "../containers/Footer/footer";
// // import { handleurl } from "../utils/handleUrl";
// // import Icons from "./about/components/Icons";

// export default function Root() {
//   const location = useLocation();

//   return (
//     <div className="flex w-full h-auto  flex-col overflow-x-hidden">
//       {/* {location.pathname !== "/forgot-password" && location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/activate" && location.pathname !== "/admin" && location.pathname !== "/admin/affiliate" && handleurl(location.pathname, 1) !== "admin" && <Header />} */}
//       <div className=" w-full h-full relative z-0 over-flow-hidden">
//         <div className=" my-0 mx-auto bg-red-100  min-h-[400px] p-[3rem 20px]">
//           <Outlet />
//           {/* {location.pathname === "/" && <Icons />} */}
//         </div>
//         <div className="static w-full  bg-primary-100 p-[3rem 20px] bottom-0">
//           {/* {location.pathname !== "/forgot-password" && location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/activate" && <Footer />} */}
//         </div>
//       </div>
//     </div>
//   );
// }

