import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Sidebar from "./sidebar";


const AdminLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

    return (
        <div className="h-auto flex flex-col bg-blue-50">
            <Navbar />
            <div className="flex flex-grow overflow-hidden">
                <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
                <div className={`flex-grow p-2 transition-all duration-300 ${isSidebarCollapsed ? "ml-1" : "ml-1"}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;