

// components/Layout.tsx
import classNames from "classnames";
import React, {  useState } from "react";
import { Sidebar } from "./sidebarItem";
import { MenuItems } from './menuItems.json'
import { useNavbar } from "../../context/sideBar.context";
// import { Bars3Icon } from "@heroicons/react/24/outline";
const SideBar = (props) => {
  // const [collapsed, setSidebarCollapsed] = useState(true);
  const { collapsed, toggleNavbar } = useNavbar();

  return (
    <div
      className={classNames({
        // 👇 use grid layout
        "grid min-h-screen": true,
        // 👇 toggle the width of the sidebar depending on the state
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        // 👇 transition animation classes
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      {/* sidebar */}
      <Sidebar navItems = {MenuItems} collapsed={collapsed} setCollapsed={toggleNavbar} />
      
      {/* content */}
      <div className=""> {props.children}</div>
    </div>
  );
};
export default SideBar;

