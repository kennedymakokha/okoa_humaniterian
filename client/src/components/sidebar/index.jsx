

// components/Layout.tsx
import classNames from "classnames";
import React, {  useState } from "react";
import { Sidebar } from "./sidebarItem";
import { MenuItems } from './menuItems.json'
// import { Bars3Icon } from "@heroicons/react/24/outline";
const SideBar = (props) => {
  const [collapsed, setSidebarCollapsed] = useState(true);
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
      <Sidebar navItems = {MenuItems} collapsed={collapsed} setCollapsed={()=>setSidebarCollapsed(prev=>!prev)} />
      
      {/* content */}
      <div className=""> {props.children}</div>
    </div>
  );
};
export default SideBar;

