import { useState } from 'react';


const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
        useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleNotificationDropdown = () =>
        setIsNotificationDropdownOpen(!isNotificationDropdownOpen);

    return (
        <header className="w-full bg-white shadow p-4 sticky z-1">
            <nav className="flex justify-between items-center">
                {/* Logo and system name */}
                <div className="text-2xl font-bold flex gap-2 items-center">
                    <div className="w-10 h-10 bg-black/10 rounded-full" />
                   Salama Clinic
                </div>

                {/* Search bar and icons */}
                <div className="flex items-center space-x-6">
                    <input
                        type="text"
                        placeholder="Search"
                        className="hidden md:block px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-black-300 transition-all duration-300"
                    />

                    {/* Notification icon */}
                    <div className="relative flex items-center">
                        <button
                            className="h-8 w-6 text-gray-500"
                            onClick={toggleNotificationDropdown}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>

                            <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                2
                            </span>
                        </button>

                        {/* Notification dropdown */}
                        {isNotificationDropdownOpen && (
                            <div className="absolute top-8 right-0 mt-4 z-2 w-96 bg-white rounded-xl shadow flex-col justify-start items-start inline-flex">
                                {/* Notification dropdown content here */}
                            </div>
                        )}
                    </div>

                    {/* Dropdown for profile */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2"
                            onClick={toggleDropdown}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>

                            <span className="hidden md:block font-medium">
                                CodeWithChintan
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>

                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-4 w-48 bg-white shadow-md rounded-md z-10">
                                <ul className="py-2">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Profile
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Settings
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;