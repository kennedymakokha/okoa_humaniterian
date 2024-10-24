import React, { useContext, useEffect } from 'react'
// import { SidebarContext } from './index'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import cn from "classnames";
import Logo from './../../assets/logo.png'
import { useSelector } from 'react-redux';

export const Sidebar = ({ collapsed, navItems, setCollapsed }) => {

    const { userInfo } = useSelector((state) => state.auth)
    const Icon = collapsed ? "m8.25 4.5 7.5 7.5-7.5 7.5" : "M15.75 19.5 8.25 12l7.5-7.5";
    const navigate = useNavigate();

    useEffect(() => {
        console.log(userInfo)
        if (userInfo === null) {
            navigate('/login?id=1213')
            // if(userInfo.role === 'admin'){
            //   navItems = navItems.filter(item => item.role === 'admin')
            // }else if(userInfo.role === 'teacher'){
            //   navItems = navItems.filter(item => item.role === 'teacher')
            // }else if(userInfo.role === 'student'){
            //   navItems = navItems.filter(item => item.role ==='student')
            // }

        }
    }, [])


    return (
        <div
            className={cn({
                "bg-[rgb(101,12,174)] rounded-tl-md text-zinc-50 z-20": true,
            })}
        >
            <div
                className={cn({
                    "flex flex-col justify-between ": true,
                })}
            >
                {/* logo and collapse button */}
                <div
                    className={cn({
                        "flex items-center  bg-[rgb(101,12,174)] shadow-2xl  rounded-tl-md  ": true,
                        "p-4 justify-between": !collapsed,
                        "py-4 justify-center": collapsed,
                    })}
                >
                    {!collapsed && <span className="whitespace-nowrap flex items-center gap-x-2 text-white font-bold uppercase">
                        <img src={Logo} alt=" " className=" w-10 h-10" />
                        Okoa CBO</span>}
                    <button
                        className={cn({
                            "grid place-content-center": true, // position
                            "hover:bg-purple-200 ": true, // colors
                            "w-10 h-10 rounded-full relative z-0": true, // shape
                        })}
                        // 👇 set the collapsed state on click
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <img src={Logo} alt="w-10 h-10" className={`w-10 h-10 ${!collapsed && "hidden"} `} />
                        <div className="absolute inset-0 flex justify-center items-center z-20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={!collapsed ? 1.5 : 3} stroke="currentColor" className={`size-6 ${!collapsed ? "text-slate-100" : "text-white"} font-bold`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={Icon} />
                            </svg>
                        </div>
                    </button>
                </div>
                <nav className="flex-grow">
                    <ul
                        className={cn({
                            "my-2 flex flex-col gap-2 items-stretch": true,
                        })}
                    >
                        {navItems.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={cn({
                                        "text-purple-100 hover:bg-purple-900 flex": true, //colors
                                        "transition-colors duration-300": true, //animation
                                        "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                                        "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                                    })}
                                >
                                    <Link to={item.url} className="flex gap-2 capitalize items-center">
                                        <div className=" group size-6 relative z-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6`}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                            </svg>
                                            <div className="absolute hidden size-6   group-hover:flex inset-0 flex justify-center items-center z-10">
                                                <div className="flex  p-2 bg-purple-600 rounded-md text-white uppercase"><p className="text-[10px] font-bold">{item.title}</p></div>
                                                
                                            </div>
                                        </div>

                                        <span>{!collapsed && item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div
                    className={cn({
                        " fixed w-auto bottom-0 grid place-content-stretch p-4": true,
                    })}
                >
                    <div className="flex gap-4 items-center  h-11 overflow-hidden">
                        <img
                            src={"https://via.placeholder.com/150"}
                            height={36}
                            width={36}
                            alt="profile image"
                            className="rounded-full"
                        />
                        {!collapsed && (
                            <div className="flex  flex-col">
                                <span className="text-purple-50 my-0 uppercase text-[12px]">{userInfo?.name}</span>
                                <Link to="/" className="text-purple-200 text-sm">
                                    View Profile
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
