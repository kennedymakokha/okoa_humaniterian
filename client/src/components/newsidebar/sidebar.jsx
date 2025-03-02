import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuItems } from '../../components/sidebar/menuItems.json'
import { useGet_patients_countQuery } from '../../features/slices/patientsSlice';
import { socket } from '../../pages/root';
import { useSelector } from 'react-redux';


const SidebarItem = ({ href, label, isCollapsed, icon, title }) => {
    const location = useLocation();
    const isActive = location.pathname === href;
    const { data, refetch } = useGet_patients_countQuery()
    const { userInfo } = useSelector((state) => state.auth)
    // useEffect(() => {
    //     const array = ["nurses", "doctors", "admin", "receptionists", "pharmacists", "lab tech", "accountants"]
    //     if (userInfo !== null) {
    //         // navigate('/login?id=1213')
    //         for (let index = 0; index < array.length; index++) {
    //             const element = array[index];
    //             if (userInfo.role === `${element}`) {
    //                 setNewNavItems(navItems.filter(item => item.roles.includes(`${element}`)))
    //             }
    //         }
    //     }
    // }, [])
    useEffect(() => {
        socket.on("update_patients", (e) => {
            // setCount()
            refetch()
        })
    }, [])

    return (
        <li className="group">
            <Link
                to={href}
                className={`flex justify-between items-center py-2.5 px-4 hover:bg-white transition ${isActive ? 'bg-white border-y-2 border-black-500' : ''
                    }`}
            >
                <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>

                    <span
                        className={`text-black text-base font-medium leading-tight ml-4 text-nowrap ${isCollapsed ? 'hidden' : 'block'
                            }`}
                    >
                        {label}
                    </span>
                </div>
                <div className="flex items-center justify-center text-blue-500      ">
                    {title === "Triage" ? data?.triage : title === "Laboratory" ? data?.lab : title === "Doctors Desk" ? `${data?.doctableB4}-${data?.doctableafter}` : ""}
                </div>
            </Link>

        </li>
    );
};

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
        useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleNotificationDropdown = () =>
        setIsNotificationDropdownOpen(!isNotificationDropdownOpen);



    return (
        <aside
            className={`${isCollapsed ? 'w-14' : 'w-[15%]'
                } h-auto bg-blue-200 transition-all duration-300 ease-in-out sm:flex relative hidden`}
        >
            <button
                onClick={toggleSidebar}
                className="absolute -right-2.5 top-0 w-6 h-6 flex justify-center items-center hover:bg-gray-300 rounded-full transition cursor-pointer focus:outline-none bg-gray-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d={isCollapsed ? "m8.25 4.5 7.5 7.5-7.5 7.5" : "M15.75 19.5 8.25 12l7.5-7.5"} />
                </svg>

            </button>

            {/* Sidebar Navigation */}
            <nav className="mt-4">
                <ul>
                    {MenuItems.map((item) => (

                        <SidebarItem
                            key={item.url}
                            title={item.title}
                            href={item.url}
                            label={item.title}
                            isCollapsed={isCollapsed}
                            icon={item.icon}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
