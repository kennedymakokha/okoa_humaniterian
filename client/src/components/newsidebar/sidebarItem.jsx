// src/components/SidebarItem.js
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ href, label, isCollapsed, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li className={`group`}>
      <Link 
        to={href} 
        className={`flex items-center py-2.5 px-4 hover:bg-gray-700 transition-all duration-300 
                    ${isActive ? "bg-gray-700" : ""}`}>
        {icon}
        <span className={`text-white ml-4 ${isCollapsed ? "hidden" : "block"} transition-all duration-300`}>
          {label}
        </span>
      </Link>
    </li>
  );
};

export default SidebarItem;
