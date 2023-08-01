/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ activeMenu, onMenuClick }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleMenuItemClick = (menu) => {
    onMenuClick(menu);
    setDrawerOpen(false);
  };

  return (
    <div className="w-full ">
     
      <label
        htmlFor="drawer-toggle"
        className="block lg:hidden bg-blue-800 text-white px-4 py-2 cursor-pointer"
      >
        Open Dashboard
      </label>
    
      <input
        type="checkbox"
        id="drawer-toggle"
        className="hidden"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div
        className={`${
          isDrawerOpen ? "block" : "hidden"
        } bg-gray-700 font-bold text-cyan-500 min-h-screen w-full lg:w-auto lg:block lg:relative`}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                className={`block py-2 px-4  rounded hover:bg-pink-900  hover:text-white  ${
                  activeMenu === "PendingOrder" ? "bg-cyan-700 text-white"  : ""
                }`}
                onClick={() => handleMenuItemClick("PendingOrder")}
              >
                <small className="">Pending Orders</small>
              </Link>
            </li>

            <li>
              <Link
                className={`block py-2 px-4 rounded hover:bg-pink-900  hover:text-white  ${
                  activeMenu === "ServedOrder" ? "bg-cyan-700 text-white"  : ""
                }`}
                onClick={() => handleMenuItemClick("ServedOrder")}
              >
                <small className="">Served Order</small>
              </Link>
            </li>

            <li>
              <Link
                className={`block py-2 px-4 rounded hover:bg-pink-900  hover:text-white  ${
                  activeMenu === "CompletedOrder" ? "bg-cyan-700 text-white"  : ""
                }`}
                onClick={() => handleMenuItemClick("CompletedOrder")}
              >
                <small className="">Completed Orders </small>
              </Link>
            </li>

        
       


            <li>
              <Link
                to="/"
                className={`block py-2 px-4 rounded hover:bg-pink-900  hover:text-white ${
                  activeMenu === "settings" ? "bg-cyan-700 text-white" : ""
                }`}
                
              >
                    <small className="">Back to Home </small>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
